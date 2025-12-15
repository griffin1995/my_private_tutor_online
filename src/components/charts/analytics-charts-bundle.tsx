// CONTEXT7 SOURCE: Analytics Charts Bundle - Admin-only Chart Components
// Bundle for analytics dashboards with full Recharts functionality
// Part of Phase 3 Bundle Optimization: Route-based Code Splitting

'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface AnalyticsChartsProps {
  readonly showPieChart?: boolean;
  readonly showAreaChart?: boolean;
  readonly showRadialChart?: boolean;
  readonly data?: any[];
  readonly className?: string;
}

export const AnalyticsChartsBundle: React.FC<AnalyticsChartsProps> = ({
  showPieChart = true,
  showAreaChart = true,
  showRadialChart = false,
  data = [],
  className = '',
}) => {
  return (
    <div className={`analytics-charts-bundle space-y-6 ${className}`}>
      {showAreaChart && (
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3F4A7E"
                fill="#3F4A7E"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {showPieChart && (
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Distribution Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${index * 45}, 70%, 50%)`}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {showRadialChart && (
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              data={data}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
              />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

