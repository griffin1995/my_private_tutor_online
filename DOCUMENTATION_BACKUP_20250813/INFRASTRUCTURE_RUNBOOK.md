# 🚨 INFRASTRUCTURE EMERGENCY RUNBOOK - MY PRIVATE TUTOR ONLINE

**CRITICAL:** This is a premium tutoring service with royal endorsements. All procedures must maintain the highest service standards.

---

## 📋 EMERGENCY CONTACT INFORMATION

### **Immediate Response Team**
- **Technical Lead:** `admin@myprivatetutoronline.com`
- **Database Admin:** `tech@myprivaretutoronline.com`
- **Emergency Phone:** `+44XXXXXXXXX`
- **Slack Channel:** `#infrastructure-alerts`

### **Service Providers**
- **Hosting:** Vercel (support@vercel.com)
- **Database:** MongoDB Atlas (support@mongodb.com)
- **Domain:** [Your domain registrar]
- **Monitoring:** [Your monitoring service]

---

## 🎯 RECOVERY TIME OBJECTIVES (RTO/RPO)

| **Scenario** | **RTO (Recovery Time)** | **RPO (Data Loss Window)** | **Priority** |
|--------------|------------------------|----------------------------|--------------|
| Database Failure | 30 minutes | 24 hours | P0 (Critical) |
| Application Error | 5 minutes | 0 hours | P0 (Critical) |
| Backup System Failure | 2 hours | 24 hours | P1 (High) |
| Monitoring Failure | 1 hour | N/A | P2 (Medium) |

---

## 🚨 INCIDENT RESPONSE PROCEDURES

### **STEP 1: IMMEDIATE ASSESSMENT**
1. **Check Health Status:**
   ```bash
   curl https://myprivatetutoronline.com/api/infrastructure/health
   ```

2. **Verify Core Services:**
   - Website loading: https://myprivatetutoronline.com
   - Admin panel: https://myprivatetutoronline.com/admin
   - API health: https://myprivatetutoronline.com/api/health

3. **Check Error Logs:**
   ```bash
   tail -f logs/errors/errors-$(date +%Y-%m-%d).jsonl
   ```

### **STEP 2: INCIDENT CLASSIFICATION**

#### **P0 - CRITICAL (Royal Client Impact)**
- Complete website outage
- Database connection failure
- Payment system down
- Global error boundary triggered

**Response Time:** Immediate (< 5 minutes)

#### **P1 - HIGH (Service Degradation)**
- Slow response times (> 2 seconds)
- Backup system failure
- High error rate (> 5%)

**Response Time:** < 30 minutes

#### **P2 - MEDIUM (Monitoring Issues)**
- Monitoring alerts not working
- Non-critical component failures

**Response Time:** < 2 hours

### **STEP 3: COMMUNICATION PROTOCOL**
1. **Post in Slack:** #infrastructure-alerts
2. **Email stakeholders** if P0/P1 incident
3. **Update status page** (if applicable)
4. **Prepare client communication** for extended outages

---

## 💾 DATABASE DISASTER RECOVERY

### **DATABASE FAILURE SCENARIOS**

#### **Scenario A: Connection Timeout**
```bash
# 1. Check MongoDB connection
curl -f $MONGODB_URI/admin/ping || echo "Database unreachable"

# 2. Check connection pool
node -e "
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
client.connect().then(() => {
  console.log('✅ Database connection successful');
  client.close();
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
});
"

# 3. Restart database connection pool
pm2 restart next-app
```

#### **Scenario B: Data Corruption**
```bash
# 1. Stop application to prevent further damage
pm2 stop next-app

# 2. Assess corruption scope
mongosh $MONGODB_URI --eval "
  db.runCommand({dbStats: 1});
  db.collection_name.count();
"

# 3. Restore from latest backup
cd /var/backups/mongodb
ls -la full-backup-* | tail -5  # Find recent backups

# 4. Restore procedure
mongorestore --uri="$MONGODB_URI" \
  --db=tinacms \
  --drop \
  --gzip \
  full-backup-YYYY-MM-DDTHH-MM-SS/tinacms/

# 5. Verify restoration
mongosh $MONGODB_URI --eval "
  db.collection_name.count();
  db.collection_name.findOne();
"

# 6. Restart application
pm2 start next-app
```

#### **Scenario C: Complete Database Loss**
```bash
# 1. IMMEDIATELY preserve any remaining data
mongodump --uri="$MONGODB_URI" --out=/tmp/emergency-backup-$(date +%s)

# 2. Locate most recent backup
find /var/backups/mongodb -name "full-backup-*" -type d | sort | tail -1

# 3. Verify backup integrity
node scripts/verify-backup-integrity.js /path/to/latest/backup

# 4. Restore from verified backup
mongorestore --uri="$MONGODB_BACKUP_URI" \
  --db=tinacms \
  --gzip \
  /path/to/verified/backup/tinacms/

# 5. Update DNS if switching to backup database
# 6. Test all critical functionality
# 7. Monitor for 24 hours
```

---

## ⚠️ APPLICATION ERROR RECOVERY

### **React Error Boundary Failures**

#### **Global Application Crash**
```javascript
// Check error logs for global boundary triggers
grep -r "Global error boundary" logs/errors/

// If global boundary is repeatedly triggered:
// 1. Identify failing component from error logs
// 2. Deploy hotfix to isolate component
// 3. Add temporary fallback UI
```

#### **Component-Level Errors**
```bash
# 1. Identify error pattern
grep -A 5 -B 5 "ComponentName" logs/errors/errors-$(date +%Y-%m-%d).jsonl

# 2. Check for browser-specific issues
grep "User-Agent" logs/errors/errors-$(date +%Y-%m-%d).jsonl | sort | uniq -c

# 3. Deploy component isolation
git checkout main
git pull
# Edit component to add additional error boundary
git commit -m "hotfix: isolate failing component"
vercel --prod
```

### **Performance Degradation**
```bash
# 1. Check current metrics
curl https://myprivatetutoronline.com/api/infrastructure/health | jq '.metrics'

# 2. Monitor resource usage
top -p $(pgrep node)
free -h
df -h

# 3. Scale resources if needed (Vercel)
vercel scale --prod --region lon1
```

---

## 🔄 BACKUP SYSTEM RECOVERY

### **Failed Backup Detection**
```bash
# 1. Check last successful backup
ls -la /var/backups/mongodb/ | tail -10

# 2. Verify backup age
find /var/backups/mongodb -name "full-backup-*" -mtime -1 -type d

# 3. Manually trigger backup
node -e "
const { defaultBackupManager } = require('./src/lib/infrastructure/database-backup');
defaultBackupManager.createFullBackup()
  .then(metadata => console.log('✅ Backup completed:', metadata))
  .catch(err => console.error('❌ Backup failed:', err));
"
```

### **Backup Corruption**
```bash
# 1. Test backup integrity
node -e "
const { defaultBackupManager } = require('./src/lib/infrastructure/database-backup');
defaultBackupManager.verifyBackupIntegrity('/var/backups/mongodb/full-backup-YYYY-MM-DD')
  .then(isValid => console.log('Backup valid:', isValid))
  .catch(err => console.error('Verification failed:', err));
"

# 2. If corrupted, find next valid backup
for backup in /var/backups/mongodb/full-backup-*; do
  echo "Testing $backup"
  node -e "/* verification code */" && echo "✅ Valid" && break
done

# 3. Create new backup immediately
# 4. Investigate corruption cause
```

---

## 📊 MONITORING SYSTEM RECOVERY

### **Health Checks Failing**
```bash
# 1. Restart monitoring service
pm2 restart monitoring-service

# 2. Check monitoring logs
tail -f logs/monitoring.log

# 3. Verify MongoDB connection from monitoring
mongosh $MONGODB_URI --eval "db.adminCommand('ping')"

# 4. Test health endpoint manually
curl -v https://myprivatetutoronline.com/api/infrastructure/health
```

### **Alert System Failure**
```bash
# 1. Check environment variables
env | grep ALERT_

# 2. Test Slack webhook
curl -X POST $SLACK_WEBHOOK_URL \
  -H 'Content-type: application/json' \
  -d '{"text":"Test alert from infrastructure team"}'

# 3. Test email alerts (if configured)
node -e "
const nodemailer = require('nodemailer');
// Test email configuration
"

# 4. Verify log file permissions
ls -la logs/errors/
chmod 755 logs/errors/
```

---

## 🔐 SECURITY INCIDENT RESPONSE

### **Unauthorized Access Detected**
1. **Immediately revoke all API keys**
2. **Change all database passwords**
3. **Check access logs:**
   ```bash
   grep -i "unauthorized\|forbidden\|hack" logs/errors/*.jsonl
   ```
4. **Review recent deployments**
5. **Contact Vercel security team**
6. **Prepare incident report**

### **Data Breach Suspected**
1. **IMMEDIATELY isolate affected systems**
2. **Preserve evidence - DO NOT modify logs**
3. **Contact legal team**
4. **Prepare GDPR compliance documentation**
5. **Notify affected clients within 72 hours**

---

## 🧪 TESTING & VALIDATION PROCEDURES

### **Backup Recovery Testing**
```bash
# Monthly backup recovery test
# 1. Create test database
mongosh mongodb://test-server/test-db

# 2. Restore latest backup to test environment
mongorestore --uri="mongodb://test-server/test-db" \
  --gzip \
  /var/backups/mongodb/latest-backup/tinacms/

# 3. Verify data integrity
mongosh mongodb://test-server/test-db --eval "
  db.collection_name.count();
  db.collection_name.find().limit(5);
"

# 4. Test application functionality
curl http://test-environment.com/api/health
```

### **Error Boundary Testing**
```javascript
// Deliberately trigger error boundary in staging
// 1. Create test component that throws error
// 2. Verify error is caught and reported
// 3. Check error logs are written
// 4. Verify alerts are sent
```

### **Performance Testing**
```bash
# Load testing
ab -n 1000 -c 10 https://myprivatetutoronline.com/

# Memory leak testing
node --inspect server.js &
# Use Chrome DevTools to monitor memory

# Database performance testing
mongosh $MONGODB_URI --eval "
  db.collection_name.explain('executionStats').find({});
"
```

---

## 📞 ESCALATION PROCEDURES

### **When to Escalate:**
- Unable to resolve P0 incident within 30 minutes
- Data loss exceeds RPO objectives
- Security breach suspected
- Client complaints about service quality

### **Escalation Steps:**
1. **Internal Team Lead:** `tech@myprivatetutoronline.com`
2. **External Consultant:** [Emergency consultant contact]
3. **Service Providers:** Vercel Premium Support
4. **Legal Team:** [If data breach]

### **Communication Templates:**

#### **Client Communication (Service Disruption):**
```
Subject: Service Update - My Private Tutor Online

Dear Valued Client,

We are currently experiencing a temporary service disruption and are working urgently to restore full functionality. 

Expected Resolution: [TIME]
Current Status: [STATUS]
Affected Services: [SERVICES]

We sincerely apologise for any inconvenience and will provide updates every 30 minutes until resolved.

Best regards,
Technical Team
My Private Tutor Online
```

#### **Stakeholder Communication (Critical Incident):**
```
Subject: CRITICAL INCIDENT - Immediate Action Required

Incident: [DESCRIPTION]
Impact: [CLIENT IMPACT]
ETA Resolution: [TIME]
Actions Taken: [ACTIONS]
Next Steps: [NEXT STEPS]

Incident Commander: [NAME]
Incident ID: [ID]
Timestamp: [TIME]
```

---

## ✅ POST-INCIDENT PROCEDURES

### **Immediate Post-Resolution:**
1. **Verify full functionality restoration**
2. **Monitor for 2 hours post-resolution**
3. **Send "All Clear" notification**
4. **Schedule post-mortem meeting within 24 hours**

### **Post-Mortem Template:**
- **Incident Summary**
- **Timeline of Events**
- **Root Cause Analysis**
- **Impact Assessment**
- **Actions Taken**
- **Prevention Measures**
- **Process Improvements**

### **Documentation Updates:**
- Update runbook with lessons learned
- Revise monitoring thresholds if needed
- Update contact information
- Review and update backup procedures

---

## 📋 PREVENTIVE MAINTENANCE SCHEDULE

### **Daily:**
- Check health dashboard
- Review error logs
- Verify backup completion

### **Weekly:**
- Test backup restoration
- Review performance metrics
- Update monitoring thresholds
- Check disk space

### **Monthly:**
- Full disaster recovery test
- Security audit
- Update documentation
- Review escalation procedures

### **Quarterly:**
- Infrastructure assessment
- Backup strategy review
- Update contact information
- Conduct emergency drills

---

## 📚 ADDITIONAL RESOURCES

### **Documentation:**
- [MongoDB Backup Documentation](https://docs.mongodb.com/manual/core/backups/)
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Vercel Monitoring](https://vercel.com/docs/observability)
- [Next.js Production Deployment](https://nextjs.org/docs/deployment)

### **Tools:**
- **Monitoring:** `/api/infrastructure/health`
- **Error Tracking:** `/api/errors`
- **Backup Scripts:** `src/lib/infrastructure/database-backup.ts`
- **Health Checks:** `src/lib/infrastructure/monitoring.ts`

### **Useful Commands:**
```bash
# Quick health check
make health-check

# Emergency backup
make emergency-backup

# View recent errors
make view-errors

# Test all systems
make system-test
```

---

**Remember: Royal clients expect premium service. Every minute of downtime affects our reputation and revenue.**

---

*Last Updated: August 8, 2025*
*Next Review: November 8, 2025*
*Document Version: 1.0*