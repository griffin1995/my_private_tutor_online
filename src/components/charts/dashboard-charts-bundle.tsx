// CONTEXT7 SOURCE: Dashboard Charts Bundle - Admin-only Dashboard Components
// Specialized bundle for dashboard-specific chart combinations
// Part of Phase 3 Bundle Optimization: Route-based Code Splitting

'use client';

import * as React from 'react';
import {
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface DashboardChartsProps {
  readonly type: 'testimonials' | 'faq' | 'client-success';
  readonly data?: any[];
  readonly className?: string;

export const DashboardChartsBundle: React.FC<DashboardChartsProps> = ({
  type,
  data = [],
  className = '',
}) => {
  const renderTestimonialsCharts = () => (
    <div className="testimonials-dashboard-charts space-y-6">
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">Testimonial Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="testimonials"
              stroke="#CA9E5B"
              fill="#CA9E5B"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderFAQCharts = () => (
    <div className="faq-dashboard-charts space-y-6">
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">FAQ Search Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? '#3F4A7E' : '#CA9E5B'}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderClientSuccessCharts = () => (
    <div className="client-success-charts space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Success Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${220 + index * 30}, 70%, ${50 + index * 10}%)`}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Performance Indicators</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="80%"
              data={data}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
                fill="#3F4A7E"
              />
              <Legend />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`dashboard-charts-bundle ${className}`}>
      {type === 'testimonials' && renderTestimonialsCharts()}
      {type === 'faq' && renderFAQCharts()}
      {type === 'client-success' && renderClientSuccessCharts()}
    </div>
  );
};

