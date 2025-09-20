// ダミーデータ生成用のユーティリティ関数

// サプライチェーンフロー用データ生成
export const generateSupplyChainData = () => {
  return {
    procurement: {
      suppliers: 12,
      activeOrders: 8,
      quality: 98,
      sustainability: 92,
      pendingApprovals: 3,
      totalSpend: "¥45,600,000",
      avgDeliveryTime: "3.2日"
    },
    processing: {
      productionLines: 3,
      activeLots: 5,
      efficiency: 88,
      capacity: 75,
      totalOutput: "1,245 kg",
      defects: 12,
      rework: 8
    },
    warehouse: {
      totalCapacity: 1000,
      currentStock: 680,
      utilization: 68,
      turnover: 4.2,
      slowMoving: 15,
      obsolescence: 2
    },
    distribution: {
      pendingShipments: 12,
      inTransit: 8,
      delivered: 156,
      onTime: 94,
      totalRoutes: 8,
      avgDeliveryTime: "2.3日"
    },
    recycling: {
      collectionRate: 65,
      recycledProducts: 420,
      co2Reduced: 12.5,
      circularity: 78,
      wasteReduction: 85,
      reuseRate: 72
    }
  };
};

// リアルタイム在庫データ生成
export const generateInventoryData = () => {
  const categories = ["raw", "semi", "finished"];
  const items = [
    {
      id: "RM-001",
      name: "バイオマス原料",
      category: "raw",
      currentStock: 1250,
      maxCapacity: 2000,
      unit: "kg",
      location: "倉庫A-1",
      status: "normal",
      lastUpdated: "2025-09-20 10:30",
      supplier: "グリーンマテリアル株式会社",
      leadTime: 3,
      quality: "A+",
      biomassRatio: 85
    },
    {
      id: "RM-002",
      name: "石油系原料",
      category: "raw",
      currentStock: 680,
      maxCapacity: 1500,
      unit: "kg",
      location: "倉庫A-2",
      status: "low",
      lastUpdated: "2025-09-20 09:15",
      supplier: "石油化学工業",
      leadTime: 5,
      quality: "A",
      biomassRatio: 15
    },
    {
      id: "SP-001",
      name: "プレミックス",
      category: "semi",
      currentStock: 320,
      maxCapacity: 500,
      unit: "kg",
      location: "倉庫B-1",
      status: "normal",
      lastUpdated: "2025-09-20 11:00",
      productionLine: "ライン1",
      shelfLife: 30,
      quality: "A"
    },
    {
      id: "FP-001",
      name: "炭素繊維製品",
      category: "finished",
      currentStock: 450,
      maxCapacity: 800,
      unit: "個",
      location: "倉庫C-1",
      status: "optimal",
      lastUpdated: "2025-09-20 10:45",
      productionDate: "2025-09-18",
      certification: "ISCC+",
      readyForShipment: true
    },
    {
      id: "FP-002",
      name: "複合材料製品",
      category: "finished",
      currentStock: 280,
      maxCapacity: 600,
      unit: "個",
      location: "倉庫C-2",
      status: "normal",
      lastUpdated: "2025-09-20 09:30",
      productionDate: "2025-09-17",
      certification: "ISCC+",
      readyForShipment: false
    }
  ];

  return items;
};

// 配送追跡データ生成
export const generateShippingData = () => {
  return [
    {
      id: "SHP-20250920-001",
      orderId: "ORD-789456",
      customer: "株式会社テクノマテリアル",
      destination: "東京都港区赤坂1-2-3",
      items: [
        { name: "炭素繊維製品", quantity: 50, weight: "250kg" },
        { name: "複合材料製品", quantity: 30, weight: "180kg" }
      ],
      status: "in_transit",
      carrier: "JPエクスプレス",
      trackingNumber: "JPX-7890123456",
      estimatedDelivery: "2025-09-21 14:00",
      actualDelivery: null,
      progress: 65,
      currentLocation: "埼玉県さいたま市",
      driver: "山田 太郎",
      vehicle: "トラック T-1234",
      contact: "090-1234-5678",
      isccCertified: true,
      carbonFootprint: "45.2 kg CO2"
    },
    {
      id: "SHP-20250920-002",
      orderId: "ORD-789457",
      customer: "環境ソリューションズ株式会社",
      destination: "大阪府大阪市北区梅田1-1-1",
      items: [
        { name: "プラスチック製品", quantity: 100, weight: "500kg" }
      ],
      status: "preparing",
      carrier: "グリーン物流",
      trackingNumber: "GL-9876543210",
      estimatedDelivery: "2025-09-22 10:00",
      actualDelivery: null,
      progress: 20,
      currentLocation: "倉庫C-1",
      driver: null,
      vehicle: null,
      contact: "06-1234-5678",
      isccCertified: true,
      carbonFootprint: "78.5 kg CO2"
    },
    {
      id: "SHP-20250919-003",
      orderId: "ORD-789432",
      customer: "サステナブル工業株式会社",
      destination: "愛知県名古屋市中区栄3-2-1",
      items: [
        { name: "炭素繊維製品", quantity: 25, weight: "125kg" },
        { name: "プラスチック製品", quantity: 75, weight: "375kg" }
      ],
      status: "delivered",
      carrier: "エコ配送サービス",
      trackingNumber: "ECD-4567891230",
      estimatedDelivery: "2025-09-20 09:00",
      actualDelivery: "2025-09-20 08:45",
      progress: 100,
      currentLocation: "配達完了",
      driver: "佐藤 花子",
      vehicle: "EVトラック E-5678",
      contact: "052-1234-5678",
      isccCertified: true,
      carbonFootprint: "32.1 kg CO2"
    }
  ];
};

export const generateRawMaterialData = () => {
  const petroleumBased = Math.floor(Math.random() * 20) + 60; // 60-80kg
  const plantBased = Math.floor(Math.random() * 20) + 20; // 20-40kg
  const total = petroleumBased + plantBased;
  const biomassRatio = Math.round((plantBased / total) * 100);

  return {
    petroleumBased,
    plantBased,
    total,
    biomassRatio
  };
};

export const generateProductionLots = () => {
  const lots = [];
  const today = new Date();
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setHours(date.getHours() - i * 2);
    
    lots.push({
      id: `FB-20250910-00${i}`,
      productType: i <= 2 ? '炭素繊維' : i <= 4 ? 'プラスチック' : '複合材料',
      quantity: Math.floor(Math.random() * 50) + 100,
      productionDate: date.toLocaleString('ja-JP'),
      status: i === 1 ? 'active' : i <= 3 ? 'completed' : 'pending'
    });
  }
  
  return lots;
};

export const generateMassBalanceData = () => {
  const petroleumProducts = Math.floor(Math.random() * 20) + 60; // 60-80個
  const biomassProducts = Math.floor(Math.random() * 20) + 20; // 20-40個
  const totalProducts = petroleumProducts + biomassProducts;
  const creditBalance = Math.floor(Math.random() * 100) + 200;
  const creditUsed = Math.floor(Math.random() * 50) + 50;
  
  const allocatedLots = [
    'FB-20250910-001',
    'FB-20250910-003',
    'FB-20250910-005',
    'FB-20250909-012',
    'FB-20250909-015'
  ];

  return {
    petroleumProducts,
    biomassProducts,
    totalProducts,
    creditBalance,
    creditUsed,
    allocatedLots
  };
};

export const generateTraceabilityData = () => {
  const lots = ['FB-20250910-001', 'FB-20250910-002', 'FB-20250910-003', 'FB-20250909-012', 'FB-20250909-015'];
  const data: Record<string, any> = {};

  lots.forEach((lot, index) => {
    const petroleum = Math.floor(Math.random() * 30) + 50;
    const plant = Math.floor(Math.random() * 30) + 20;
    const biomassRatio = Math.round((plant / (petroleum + plant)) * 100);

    data[lot] = {
      lotNumber: lot,
      rawMaterials: {
        petroleum,
        plant,
        biomassRatio
      },
      productionHistory: {
        startTime: `2025-09-${10 - Math.floor(index / 3)} 08:${30 + index * 15}:00`,
        endTime: `2025-09-${10 - Math.floor(index / 3)} 12:${30 + index * 15}:00`,
        line: `生産ライン${index % 3 + 1}`,
        operator: `オペレーター${String.fromCharCode(65 + index)}`
      },
      certification: {
        isccStatus: index === 0 ? 'certified' : index === 1 ? 'pending' : 'certified',
        certificationDate: `2025-09-${5 + index}`,
        validUntil: `2026-09-${5 + index}`
      },
      sdgsFactors: {
        ghgEmission: Math.round((Math.random() * 50 + 100) * 10) / 10,
        energyConsumption: Math.round((Math.random() * 200 + 300) * 10) / 10,
        waterUsage: Math.round((Math.random() * 100 + 150) * 10) / 10
      }
    };
  });

  return data;
};

export const generateAlerts = () => {
  const alerts = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'バイオマス度低下警告',
      message: '現在のバイオマス度が目標値30%を下回っています（現在値: 28%）',
      timestamp: '2025-09-20 03:45:00',
      acknowledged: false
    },
    {
      id: '2',
      type: 'info' as const,
      title: '生産ライン2稼働開始',
      message: 'FB-20250910-004の生産を開始しました',
      timestamp: '2025-09-20 03:30:00',
      acknowledged: false
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'ISCC+認証更新完了',
      message: 'ロットFB-20250910-001のISCC+認証が正常に更新されました',
      timestamp: '2025-09-20 02:15:00',
      acknowledged: true
    },
    {
      id: '4',
      type: 'error' as const,
      title: '原材料投入異常',
      message: '植物由来原料の投入量が計画値と5%以上乖離しています',
      timestamp: '2025-09-20 01:20:00',
      acknowledged: true
    },
    {
      id: '5',
      type: 'info' as const,
      title: 'クレジット残高通知',
      message: 'バイオマスクレジット残高が200kg以下になりました',
      timestamp: '2025-09-19 23:45:00',
      acknowledged: true
    }
  ];

  return alerts;
};