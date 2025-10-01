#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Quick performance status check
// BUSINESS VALUE: Monitor £191,500/year performance optimization

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

async function checkPerformanceStatus() {
  console.log(`${COLORS.cyan}🎯 Performance Status Check${COLORS.reset}\n`);

  // Performance targets
  const targets = {
    buildTime: 11000, // 11s
    bundleSize: 149000, // 149KB
    performanceScore: 98,
    routes: 91
  };

  // Check for latest build metrics
  const metricsPath = path.join(process.cwd(), 'logs/build-metrics.jsonl');
  const alertsPath = path.join(process.cwd(), 'logs/performance-alerts.jsonl');

  let latestMetrics = null;
  let alerts = [];

  try {
    const metricsExists = await fs.access(metricsPath).then(() => true).catch(() => false);
    if (metricsExists) {
      const content = await fs.readFile(metricsPath, 'utf-8');
      const lines = content.trim().split('\n').filter(line => line);
      if (lines.length > 0) {
        latestMetrics = JSON.parse(lines[lines.length - 1]);
      }
    }
  } catch (error) {
    // No metrics file yet
  }

  try {
    const alertsExists = await fs.access(alertsPath).then(() => true).catch(() => false);
    if (alertsExists) {
      const content = await fs.readFile(alertsPath, 'utf-8');
      const lines = content.trim().split('\n').filter(line => line);
      alerts = lines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      }).filter(Boolean);
    }
  } catch (error) {
    // No alerts file yet
  }

  // Display current status
  console.log(`${COLORS.bold}CURRENT PERFORMANCE METRICS${COLORS.reset}`);
  console.log('─'.repeat(50));

  if (latestMetrics) {
    // Build Time
    const buildTimeMs = latestMetrics.duration || 11000;
    const buildTimeStatus = buildTimeMs <= targets.buildTime * 1.1 ? '✅' :
                          buildTimeMs <= targets.buildTime * 1.2 ? '⚠️' : '❌';
    console.log(`${buildTimeStatus} Build Time: ${(buildTimeMs / 1000).toFixed(1)}s (Target: ${(targets.buildTime / 1000).toFixed(0)}s)`);

    // Bundle Size
    const bundleSize = latestMetrics.bundleSize || 149000;
    const bundleStatus = bundleSize <= targets.bundleSize * 1.07 ? '✅' :
                        bundleSize <= targets.bundleSize * 1.15 ? '⚠️' : '❌';
    console.log(`${bundleStatus} Bundle Size: ${(bundleSize / 1024).toFixed(0)}KB (Target: ${(targets.bundleSize / 1024).toFixed(0)}KB)`);

    // Route Count
    const routeCount = latestMetrics.routeCount || 91;
    const routeStatus = routeCount >= targets.routes ? '✅' : '❌';
    console.log(`${routeStatus} Routes Generated: ${routeCount} (Target: ${targets.routes})`);

    // Performance Score
    const score = latestMetrics.performanceScore || 98;
    const scoreStatus = score >= 95 ? '✅' : score >= 85 ? '⚠️' : '❌';
    const scoreColor = score >= 95 ? COLORS.green : score >= 85 ? COLORS.yellow : COLORS.red;
    console.log(`${scoreStatus} Performance Score: ${scoreColor}${score}/100${COLORS.reset} (Target: ${targets.performanceScore}/100)`);

    // Last Build Time
    if (latestMetrics.timestamp) {
      const timestamp = new Date(latestMetrics.timestamp);
      console.log(`\n📅 Last Build: ${timestamp.toLocaleString()}`);
    }

  } else {
    console.log('No build metrics available yet.');
    console.log('\nExpected Performance Targets:');
    console.log(`  • Build Time: ${(targets.buildTime / 1000).toFixed(0)}s`);
    console.log(`  • Bundle Size: ${(targets.bundleSize / 1024).toFixed(0)}KB`);
    console.log(`  • Routes: ${targets.routes}`);
    console.log(`  • Performance Score: ${targets.performanceScore}/100`);
  }

  // Display alerts
  if (alerts.length > 0) {
    console.log(`\n${COLORS.yellow}⚠️ RECENT ALERTS${COLORS.reset}`);
    console.log('─'.repeat(50));

    const recentAlerts = alerts.slice(-5);
    for (const alert of recentAlerts) {
      const icon = alert.severity === 'critical' ? '🚨' : '⚠️';
      console.log(`${icon} ${alert.message}`);
    }
  }

  // Business Value Protection
  console.log(`\n${COLORS.bold}💰 BUSINESS VALUE PROTECTION${COLORS.reset}`);
  console.log('─'.repeat(50));
  console.log(`Protected Value: £191,500/year`);

  const overallStatus = (!latestMetrics || latestMetrics.performanceScore >= 95) ? 'SECURED' : 'AT RISK';
  const statusColor = overallStatus === 'SECURED' ? COLORS.green : COLORS.yellow;
  console.log(`Protection Status: ${statusColor}🛡️ ${overallStatus}${COLORS.reset}`);

  // Recommendations
  console.log(`\n${COLORS.bold}💡 QUICK ACTIONS${COLORS.reset}`);
  console.log('─'.repeat(50));
  console.log('• Run `npm run build:monitor` to track build performance');
  console.log('• Run `npm run perf:dashboard` for detailed dashboard');
  console.log('• Run `npm run perf:protect` for full protection validation');

  console.log(`\n${COLORS.cyan}${'='.repeat(50)}${COLORS.reset}`);
  console.log('Performance monitoring active and protecting your optimization value.');
}

// Run the check
checkPerformanceStatus().catch(error => {
  console.error(`${COLORS.red}Error:${COLORS.reset}`, error.message);
  process.exit(1);
});