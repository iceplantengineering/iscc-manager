import {
  IoTDevice,
  SensorReading,
  EdgeCollector,
  BufferedData,
  DataBuffer,
  CollectorMetrics,
  HealthStatus,
  HealthCheck,
  ErrorLog,
  IoTEvent,
  DeviceStatus,
  DataQuality,
  CollectorConfiguration
} from './types';

/**
 * Edge Data Collector Service
 * Manages IoT devices, data collection, buffering, and transmission
 */
export class EdgeCollectorService {
  private static instance: EdgeCollectorService;
  private collectors: Map<string, EdgeCollector> = new Map();
  private devices: Map<string, IoTDevice> = new Map();
  private eventLog: IoTEvent[] = [];
  private isRunning: boolean = false;

  private constructor() {}

  static getInstance(): EdgeCollectorService {
    if (!EdgeCollectorService.instance) {
      EdgeCollectorService.instance = new EdgeCollectorService();
    }
    return EdgeCollectorService.instance;
  }

  // Initialize the service
  async initialize(): Promise<void> {
    this.isRunning = true;
    await this.startDataCollection();
    this.logEvent({
      eventType: 'SYSTEM_START',
      deviceId: 'SYSTEM',
      severity: 'INFO',
      message: 'Edge Collector Service initialized'
    });
  }

  // Shutdown the service
  async shutdown(): Promise<void> {
    this.isRunning = false;
    await this.stopAllCollectors();
    this.logEvent({
      eventType: 'SYSTEM_STOP',
      deviceId: 'SYSTEM',
      severity: 'INFO',
      message: 'Edge Collector Service shutdown'
    });
  }

  // Register a new edge collector
  registerCollector(collector: Omit<EdgeCollector, 'dataBuffer' | 'metrics' | 'health'>): EdgeCollector {
    const fullCollector: EdgeCollector = {
      ...collector,
      dataBuffer: this.createDataBuffer(collector.configuration.bufferSize),
      metrics: this.createInitialMetrics(),
      health: this.createInitialHealth()
    };

    this.collectors.set(collector.collectorId, fullCollector);
    this.logEvent({
      eventType: 'DEVICE_CONNECTED',
      deviceId: collector.collectorId,
      collectorId: collector.collectorId,
      severity: 'INFO',
      message: `Edge collector registered: ${collector.name}`
    });

    return fullCollector;
  }

  // Register a new IoT device
  registerDevice(device: IoTDevice): IoTDevice {
    this.devices.set(device.deviceId, device);
    this.logEvent({
      eventType: 'DEVICE_CONNECTED',
      deviceId: device.deviceId,
      severity: 'INFO',
      message: `Device registered: ${device.name} (${device.deviceType})`
    });

    // Start monitoring the device
    this.startDeviceMonitoring(device);
    return device;
  }

  // Get collector by ID
  getCollector(collectorId: string): EdgeCollector | undefined {
    return this.collectors.get(collectorId);
  }

  // Get device by ID
  getDevice(deviceId: string): IoTDevice | undefined {
    return this.devices.get(deviceId);
  }

  // Get all collectors
  getAllCollectors(): EdgeCollector[] {
    return Array.from(this.collectors.values());
  }

  // Get all devices
  getAllDevices(): IoTDevice[] {
    return Array.from(this.devices.values());
  }

  // Add sensor reading to buffer
  async addSensorReading(reading: SensorReading, collectorId?: string): Promise<void> {
    const bufferedData: BufferedData = {
      dataId: `data_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      deviceId: reading.deviceId,
      timestamp: reading.timestamp,
      dataType: 'SENSOR_READING',
      rawData: reading,
      processedData: reading,
      transmissionStatus: 'PENDING',
      retryCount: 0,
      priority: this.calculatePriority(reading),
      tags: this.generateTags(reading)
    };

    // Add to collector buffer if specified
    if (collectorId && this.collectors.has(collectorId)) {
      const collector = this.collectors.get(collectorId)!;
      this.addToBuffer(collector, bufferedData);
    }

    // Add to device's last reading
    const device = this.devices.get(reading.deviceId);
    if (device) {
      device.lastReading = reading;
      device.lastSeen = reading.timestamp;
    }

    this.logEvent({
      eventType: 'DATA_RECEIVED',
      deviceId: reading.deviceId,
      collectorId,
      severity: 'INFO',
      message: `Sensor reading received: ${reading.value} ${reading.unit}`
    });
  }

  // Get buffered data for transmission
  getBufferedData(collectorId: string, limit?: number): BufferedData[] {
    const collector = this.collectors.get(collectorId);
    if (!collector) return [];

    const pendingData = collector.dataBuffer.data
      .filter(data => data.transmissionStatus === 'PENDING')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return limit ? pendingData.slice(0, limit) : pendingData;
  }

  // Mark data as transmitted
  markDataTransmitted(dataIds: string[], collectorId: string): void {
    const collector = this.collectors.get(collectorId);
    if (!collector) return;

    dataIds.forEach(dataId => {
      const data = collector.dataBuffer.data.find(d => d.dataId === dataId);
      if (data) {
        data.transmissionStatus = 'TRANSMITTED';
        data.retryCount = 0;
      }
    });

    this.updateMetrics(collector);
  }

  // Retry failed transmissions
  async retryFailedTransmissions(collectorId: string): Promise<number> {
    const collector = this.collectors.get(collectorId);
    if (!collector) return 0;

    const failedData = collector.dataBuffer.data
      .filter(data => data.transmissionStatus === 'FAILED' && data.retryCount < collector.configuration.maxRetries);

    let retriedCount = 0;
    for (const data of failedData) {
      data.transmissionStatus = 'RETRYING';
      data.retryCount++;
      retriedCount++;
    }

    if (retriedCount > 0) {
      this.logEvent({
        eventType: 'SYNC_COMPLETED',
        deviceId: collectorId,
        collectorId,
        severity: 'INFO',
        message: `Retrying ${retriedCount} failed transmissions`
      });
    }

    return retriedCount;
  }

  // Get collector health status
  getCollectorHealth(collectorId: string): HealthStatus | undefined {
    const collector = this.collectors.get(collectorId);
    return collector?.health;
  }

  // Get device status
  getDeviceStatus(deviceId: string): DeviceStatus | undefined {
    const device = this.devices.get(deviceId);
    return device?.status;
  }

  // Get recent events
  getEventLog(limit?: number): IoTEvent[] {
    const events = [...this.eventLog].reverse();
    return limit ? events.slice(0, limit) : events;
  }

  // Private helper methods
  private createDataBuffer(maxSize: number): DataBuffer {
    return {
      bufferId: `buffer_${Date.now()}`,
      size: 0,
      maxSize,
      usagePercentage: 0,
      data: [],
      compressionRatio: 1.0
    };
  }

  private createInitialMetrics(): CollectorMetrics {
    return {
      uptime: 0,
      messagesReceived: 0,
      messagesSent: 0,
      bytesReceived: 0,
      bytesSent: 0,
      errorRate: 0,
      averageResponseTime: 0,
      lastDeviceUpdate: new Date(),
      devicesOnline: 0,
      devicesOffline: 0
    };
  }

  private createInitialHealth(): HealthStatus {
    return {
      status: 'HEALTHY',
      checks: [],
      lastCheck: new Date(),
      nextCheck: new Date(Date.now() + 60000) // Next check in 1 minute
    };
  }

  private addToBuffer(collector: EdgeCollector, data: BufferedData): void {
    collector.dataBuffer.data.push(data);
    collector.dataBuffer.size = collector.dataBuffer.data.length;
    collector.dataBuffer.usagePercentage = (collector.dataBuffer.size / collector.dataBuffer.maxSize) * 100;

    // Update timestamps
    if (!collector.dataBuffer.oldestData || data.timestamp < collector.dataBuffer.oldestData) {
      collector.dataBuffer.oldestData = data.timestamp;
    }
    if (!collector.dataBuffer.newestData || data.timestamp > collector.dataBuffer.newestData) {
      collector.dataBuffer.newestData = data.timestamp;
    }

    // Clean up old data if buffer is full
    if (collector.dataBuffer.size > collector.dataBuffer.maxSize) {
      collector.dataBuffer.data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      collector.dataBuffer.data.splice(0, collector.dataBuffer.size - collector.dataBuffer.maxSize);
      collector.dataBuffer.size = collector.dataBuffer.data.length;
      collector.dataBuffer.usagePercentage = (collector.dataBuffer.size / collector.dataBuffer.maxSize) * 100;
    }
  }

  private calculatePriority(reading: SensorReading): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (reading.quality.status === 'BAD' || reading.quality.status === 'INVALID') {
      return 'HIGH';
    }
    if (!reading.isValid || reading.validationErrors.length > 0) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  private generateTags(reading: SensorReading): string[] {
    const tags: string[] = [];
    tags.push(`device:${reading.deviceId}`);
    tags.push(`quality:${reading.quality.status}`);
    tags.push(`unit:${reading.unit}`);
    if (reading.quality.confidence < 0.5) {
      tags.push('low-confidence');
    }
    return tags;
  }

  private async startDataCollection(): Promise<void> {
    while (this.isRunning) {
      try {
        await this.simulateDataCollection();
        await this.performHealthChecks();
        await this.syncDataWithUpstream();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second interval
      } catch (error) {
        console.error('Data collection error:', error);
        this.logEvent({
          eventType: 'ERROR_OCCURRED',
          deviceId: 'SYSTEM',
          severity: 'ERROR',
          message: `Data collection error: ${error}`
        });
      }
    }
  }

  private async simulateDataCollection(): Promise<void> {
    // Simulate data collection from registered devices
    for (const device of this.devices.values()) {
      if (device.status === 'ONLINE' && Math.random() > 0.3) { // 70% chance of data
        const reading: SensorReading = {
          readingId: `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          deviceId: device.deviceId,
          timestamp: new Date(),
          value: this.generateMockValue(device.deviceType),
          unit: this.getUnitForDeviceType(device.deviceType),
          quality: this.generateMockQuality(),
          isValid: Math.random() > 0.1, // 90% valid
          validationErrors: [],
          tags: []
        };

        await this.addSensorReading(reading);
      }
    }
  }

  private generateMockValue(deviceType: string): number {
    switch (deviceType) {
      case 'SENSOR':
        return Math.random() * 100;
      case 'METER':
        return Math.random() * 1000;
      case 'PLC':
        return Math.floor(Math.random() * 10);
      default:
        return Math.random() * 500;
    }
  }

  private getUnitForDeviceType(deviceType: string): string {
    switch (deviceType) {
      case 'SENSOR':
        return '°C';
      case 'METER':
        return 'kWh';
      case 'PLC':
        return 'state';
      default:
        return 'unit';
    }
  }

  private generateMockQuality(): DataQuality {
    const statuses: Array<'GOOD' | 'UNCERTAIN' | 'BAD' | 'INVALID'> = ['GOOD', 'UNCERTAIN', 'BAD', 'INVALID'];
    const weights = [0.8, 0.15, 0.04, 0.01]; // 80% good, 15% uncertain, etc.

    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < statuses.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        return {
          status: statuses[i],
          confidence: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
          reason: i > 0 ? 'Random simulation' : undefined
        };
      }
    }

    return {
      status: 'GOOD',
      confidence: 0.95
    };
  }

  private async performHealthChecks(): Promise<void> {
    for (const collector of this.collectors.values()) {
      const checks: HealthCheck[] = [
        {
          name: 'connectivity',
          status: 'PASS',
          message: 'Connectivity OK',
          timestamp: new Date(),
          duration: Math.random() * 100
        },
        {
          name: 'buffer_usage',
          status: collector.dataBuffer.usagePercentage > 80 ? 'WARNING' : 'PASS',
          message: `Buffer usage: ${collector.dataBuffer.usagePercentage.toFixed(1)}%`,
          timestamp: new Date(),
          duration: Math.random() * 50
        },
        {
          name: 'device_status',
          status: 'PASS',
          message: `${collector.connectedDevices.length} devices connected`,
          timestamp: new Date(),
          duration: Math.random() * 75
        }
      ];

      collector.health.checks = checks;
      collector.health.status = checks.every(c => c.status === 'PASS') ? 'HEALTHY' :
                               checks.some(c => c.status === 'WARNING') ? 'WARNING' : 'ERROR';
      collector.health.lastCheck = new Date();
      collector.health.nextCheck = new Date(Date.now() + 60000);
    }
  }

  private async syncDataWithUpstream(): Promise<void> {
    for (const collector of this.collectors.values()) {
      if (Math.random() > 0.8) { // 20% chance of sync
        const pendingData = this.getBufferedData(collector.collectorId, 10);
        if (pendingData.length > 0) {
          // Simulate successful sync
          const dataIds = pendingData.map(d => d.dataId);
          this.markDataTransmitted(dataIds, collector.collectorId);

          collector.metrics.messagesSent += pendingData.length;
          collector.lastSync = new Date();
        }
      }
    }
  }

  private async stopAllCollectors(): Promise<void> {
    for (const collector of this.collectors.values()) {
      collector.status.overall = 'OFFLINE';
      collector.status.connectivity = false;
      collector.status.processing = false;
    }
  }

  private startDeviceMonitoring(device: IoTDevice): void {
    // Simulate device status changes
    const updateStatus = () => {
      if (!this.isRunning) return;

      const random = Math.random();
      if (random < 0.1) {
        device.status = 'ERROR';
      } else if (random < 0.2) {
        device.status = 'OFFLINE';
      } else {
        device.status = 'ONLINE';
      }

      device.lastSeen = new Date();

      setTimeout(updateStatus, 30000 + Math.random() * 30000); // 30-60 seconds
    };

    setTimeout(updateStatus, 5000); // Start after 5 seconds
  }

  private logEvent(event: Omit<IoTEvent, 'eventId' | 'timestamp'>): void {
    const fullEvent: IoTEvent = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...event
    };

    this.eventLog.push(fullEvent);
    if (this.eventLog.length > 1000) {
      this.eventLog = this.eventLog.slice(-500); // Keep last 500 events
    }
  }

  private updateMetrics(collector: EdgeCollector): void {
    collector.metrics.devicesOnline = collector.connectedDevices.length;
    collector.metrics.devicesOffline = this.devices.size - collector.metrics.devicesOnline;
    collector.metrics.uptime = Math.random() * 5 + 95; // 95-100%
    collector.metrics.errorRate = Math.random() * 2; // 0-2%
    collector.metrics.averageResponseTime = Math.random() * 100 + 50; // 50-150ms
  }
}