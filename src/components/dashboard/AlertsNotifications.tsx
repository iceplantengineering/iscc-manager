import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Bell, CheckCircle, XCircle } from "lucide-react";

interface AlertItem {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertsNotificationsProps {
  alerts: AlertItem[];
}

export function AlertsNotifications({ alerts }: AlertsNotificationsProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      default:
        return 'default';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-primary">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Alerts/Notifications
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {activeAlerts.length} unconfirmed alerts
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">Unconfirmed Alerts</h3>
            <div className="space-y-3">
              {activeAlerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <Alert key={alert.id} variant={getAlertVariant(alert.type)} className="border-l-4">
                    <IconComponent className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold">{alert.title}</div>
                          <div className="text-sm mt-1">{alert.message}</div>
                          <div className="text-xs text-muted-foreground mt-2">{alert.timestamp}</div>
                        </div>
                        <Badge variant="outline" className={getAlertColor(alert.type)}>
                          {alert.type === 'error' ? 'Error' :
                           alert.type === 'warning' ? 'Warning' :
                           alert.type === 'success' ? 'Success' : 'Info'}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </div>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-600">Acknowledged Alerts</h3>
            <div className="space-y-3">
              {acknowledgedAlerts.slice(0, 3).map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className="border rounded-lg p-4 bg-gray-50/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-700">{alert.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{alert.message}</div>
                          <div className="text-xs text-gray-500 mt-2">{alert.timestamp}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                        Acknowledged
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            {acknowledgedAlerts.length > 3 && (
              <div className="text-center">
                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-300">
                  {acknowledgedAlerts.length - 3} more acknowledged alerts
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* No Alerts Case */}
        {alerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-green-600">System Operating Normally</p>
            <p className="text-sm text-muted-foreground mt-2">No alerts at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}