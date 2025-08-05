"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, Info, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

// CMS DATA SOURCE: Using Context7 MCP documentation for React 19 components
// Reference: /meta/react security monitoring patterns

interface SecurityEvent {
  id: string
  type: 'rate_limit' | 'csrf_failure' | 'auth_failure' | 'suspicious_input' | 'sql_injection_attempt'
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  clientIp: string
  path: string
  details: Record<string, any>
}

interface SecurityMetrics {
  totalEvents24h: number
  criticalEvents: number
  blockedRequests: number
  uniqueIps: number
  topThreats: Array<{ type: string; count: number }>
}

export function SecurityMonitor() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSecurityData()
    const interval = setInterval(fetchSecurityData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchSecurityData = async () => {
    try {
      const [eventsRes, metricsRes] = await Promise.all([
        fetch('/api/admin/security/events'),
        fetch('/api/admin/security/metrics')
      ])

      if (eventsRes.ok && metricsRes.ok) {
        const eventsData = await eventsRes.json()
        const metricsData = await metricsRes.json()
        setEvents(eventsData.events || [])
        setMetrics(metricsData)
      }
    } catch (error) {
      console.error('Failed to fetch security data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4" />
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'medium':
        return <Info className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive'
      case 'high':
        return 'warning'
      case 'medium':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Events (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalEvents24h || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {metrics?.criticalEvents || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Blocked Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.blockedRequests || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Unique IPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.uniqueIps || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>
                Real-time monitoring of security threats and suspicious activities
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSecurityData}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No security events in the last 24 hours
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      event.severity === 'critical' && "bg-red-100 text-red-600",
                      event.severity === 'high' && "bg-orange-100 text-orange-600",
                      event.severity === 'medium' && "bg-yellow-100 text-yellow-600",
                      event.severity === 'low' && "bg-blue-100 text-blue-600"
                    )}>
                      {getSeverityIcon(event.severity)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {event.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge variant={getSeverityColor(event.severity) as any}>
                          {event.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.clientIp} • {event.path} • {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Threats */}
      {metrics?.topThreats && metrics.topThreats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Security Threats</CardTitle>
            <CardDescription>Most common threat types in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.topThreats.map((threat) => (
                <div key={threat.type} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {threat.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <Badge variant="outline">{threat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}