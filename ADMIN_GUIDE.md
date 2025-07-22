# St Saviour's Website - Admin Guide

## Complete User Guide for Parish Staff

### Getting Started

#### Accessing the Admin System
1. **Login URL**: `https://your-website.com/admin/login`
2. **Username**: `admin`
3. **Password**: `StSaviours2025!`
4. **⚠️ Important**: Change the password in production settings

#### Admin Dashboard Overview
After logging in, you'll see the main dashboard with:
- **Quick Statistics**: Total articles, events, upcoming activities
- **Management Cards**: Access to all content areas
- **Quick Actions**: Common tasks like adding news or events

---

## Content Management

### Managing News Articles

#### Adding a News Article
1. Click **"News Articles"** from the dashboard
2. Click **"Add Article"** button
3. Fill in the form:
   - **Title**: Headline for the article (keep under 60 characters)
   - **Excerpt**: Short summary for previews (2-3 sentences)
   - **Content**: Full article text (supports line breaks)
   - **Category**: Choose from dropdown (Announcement, Liturgical Season, Sacraments, etc.)
   - **Author**: Defaults to "Parish Office" (can be changed)
   - **Image**: Path to image file (upload to `/public/images/news/` first)
4. Choose **"Save as Draft"** or **"Publish Article"**
5. Click **"Save"**

#### Editing Existing Articles
1. Go to **News Management**
2. Use the search bar to find specific articles
3. Click the **edit icon** (pencil) next to any article
4. Make your changes and save
5. Use **"Update Article"** to save changes

#### Publishing and Unpublishing
- **Green checkmark** = Published (visible on website)
- **Yellow circle** = Draft (not visible on website)
- Click the status icon to toggle between published/draft

#### Article Categories
- **Announcement**: General parish announcements
- **Liturgical Season**: Advent, Lent, Easter information
- **Sacraments**: Baptism, Communion, Confirmation news
- **Social**: Community events and gatherings
- **Youth**: Children and young adult activities

### Managing Parish Events

#### Adding New Events
1. Click **"Events"** from the dashboard
2. Click **"Add Event"** button
3. Complete the event form:
   - **Event Title**: Clear, descriptive name
   - **Description**: Full details about the event
   - **Date**: Use the date picker
   - **Start Time**: Event beginning time
   - **End Time**: Optional, when event finishes
   - **Location**: Where the event takes place
   - **Category**: Type of event (Social, Liturgical, etc.)
   - **Contact Person**: Who to contact for information
   - **Registration Required**: Check if people need to sign up
4. Choose **"Publish Immediately"** or save as draft
5. Click **"Create Event"**

#### Event Categories
- **Social**: Coffee mornings, parish dinners
- **Liturgical**: Special Masses, prayer services
- **Sacraments**: Baptisms, weddings, funerals
- **Education**: Talks, study groups
- **Charity**: Fundraising, volunteer activities
- **Youth**: Children's activities, youth groups

### Managing Mass Times

#### Updating the Weekly Schedule
1. Click **"Mass Times"** from the dashboard
2. Click on any **day of the week**
3. For each day, you can:
   - **Add Service**: Click "Add Service" button
   - **Edit Service**: Modify existing times
   - **Remove Service**: Delete services no longer offered

#### Adding a New Service
1. Click **"Add Service"** for the relevant day
2. Fill in the details:
   - **Time**: Use format like "10:00 AM" or "6:30 PM"
   - **Type**: Choose from dropdown (Mass, Spanish Mass, Confession, etc.)
   - **Description**: Optional details like "Family Mass" or "Quiet Mass"
3. Click **"Save All Changes"** when finished

#### Service Types Available
- **Sunday Mass**: Regular Sunday services
- **Weekday Mass**: Monday-Saturday services
- **Saturday Vigil**: Saturday evening Mass
- **Spanish Mass**: Spanish-language services
- **Confession**: Sacrament of Reconciliation
- **Adoration**: Eucharistic Adoration
- **Vespers**: Evening prayer
- **Special Service**: Other liturgical services

### Managing Parish Groups

#### Adding Community Groups
1. Click **"Parish Groups"** from the dashboard
2. Click **"Add Group"** button
3. Complete the group information:
   - **Group Name**: Official name of the group
   - **Description**: What the group does and its purpose
   - **Category**: Type of group (Devotional, Charitable, etc.)
   - **Meeting Time**: When the group meets
   - **Location**: Where meetings are held
   - **Contact Person**: Who to contact for information
   - **Contact Phone**: Phone number for enquiries
   - **Email**: Email contact (optional)
   - **Age Range**: If specific to certain ages
   - **Additional Notes**: Any special information

#### Group Categories
- **Devotional**: Prayer groups, Legion of Mary
- **Charitable**: St Vincent de Paul, fundraising groups
- **Social**: Coffee groups, parish social committee
- **Music**: Choir, music ministry
- **Practical**: Flower arranging, church maintenance
- **Children**: Children's liturgy, Sunday school
- **Youth**: Young adult groups, youth ministry
- **Adult**: Adult education, bible study

#### Group Status Management
- **Active**: Group is currently meeting and accepting members
- **Inactive**: Group is temporarily not meeting
- **New Members Welcome**: Check if group is recruiting
- Toggle these settings by clicking the status buttons

### Managing Photo Gallery

#### Creating Photo Albums
1. Click **"Gallery"** from the dashboard
2. Click **"Add Album"** button
3. Fill in album details:
   - **Album Title**: Name for the photo collection
   - **Description**: What the photos show
   - **Category**: Type of photos (Liturgical, Community, etc.)
   - **Date**: When photos were taken
4. Add individual photos:
   - **Image URL**: Path to the image file
   - **Caption**: Description of the photo
   - **Alt Text**: Accessibility description
5. Set album options:
   - **Featured Album**: Appears prominently on gallery page
   - **Publish Immediately**: Makes album visible on website

#### Gallery Categories
- **Liturgical**: Christmas, Easter, special Masses
- **Sacraments**: Baptisms, First Communions, Confirmations
- **Community**: Social events, parish gatherings
- **Building**: Church architecture, renovations
- **Youth**: Children's activities, youth events

### Website Settings Management

#### Contact Information
1. Click **"Website Settings"** from dashboard
2. Go to **"Contact Info"** tab
3. Update parish details:
   - **Parish Address**: Full postal address
   - **Main Phone**: Primary contact number
   - **Parish Email**: Main email address
   - **Emergency Phone**: After-hours emergency contact
   - **Safeguarding Phone**: Safeguarding team contact

#### Parish Details
1. Go to **"Parish Details"** tab
2. Update information:
   - **Parish Name**: Official church name
   - **Location**: Area/suburb
   - **Parish Priest**: Current priest's name
   - **Diocese**: Ecclesiastical jurisdiction
   - **Established**: Year church was founded

#### Social Media Links
1. Go to **"Social Media"** tab
2. Add or update links:
   - **Facebook**: Parish Facebook page
   - **YouTube**: Church YouTube channel
   - **Instagram**: Parish Instagram account
   - **Twitter**: Parish Twitter account

#### Website Features
1. Go to **"Website Settings"** tab
2. Configure features:
   - **Live Streaming**: Enable/disable live streaming
   - **Online Donations**: Enable donation links
   - **Maintenance Mode**: Site-wide maintenance message

#### Site Announcements
1. Go to **"Website Settings"** tab
2. Scroll to **"Site Announcements"**
3. Click **"Add Announcement"** to create site-wide messages
4. For each announcement:
   - **Title**: Short announcement title
   - **Message**: Full announcement text
   - **Type**: Info, Warning, Success, or Error styling
   - **Show Until**: Date when announcement expires
   - **Active**: Whether announcement is currently displayed

---

## Best Practices for Content

### Writing Guidelines
- **News Articles**: Write clearly for both parishioners and visitors
- **Event Descriptions**: Include all essential details (who, what, when, where)
- **Mass Times**: Use consistent time format (10:00 AM, not 10am)
- **Categories**: Use existing categories when possible for consistency

### Image Management
- **File Naming**: Use descriptive names (christmas-mass-2024.jpg)
- **File Size**: Keep images under 1MB for faster loading
- **Storage Location**: Upload images to appropriate folders:
  - News: `/public/images/news/`
  - Events: `/public/images/events/`
  - Gallery: `/public/images/gallery/`

### Content Quality Tips
- **Proofread**: Check spelling and grammar before publishing
- **Dates**: Always include relevant dates and contact information
- **Accessibility**: Use clear, simple language for all readers
- **Updates**: Keep information current and remove outdated content

---

## Maintenance Tasks

### Daily Tasks
- Check for new prayer requests or messages
- Review and approve any pending content
- Monitor website for any display issues

### Weekly Tasks
- **Add New Content**: Publish weekly newsletter items
- **Update Events**: Add upcoming events, remove past ones
- **Review Mass Times**: Ensure schedule is accurate
- **Check Images**: Verify all images are displaying correctly

### Monthly Tasks
- **Archive Old News**: Move old articles to draft status
- **Update Contact Info**: Verify phone numbers and email addresses
- **Review Parish Groups**: Update meeting times and contact details
- **Security Check**: Review admin access logs

### Quarterly Tasks
- **Content Audit**: Review all published content for accuracy
- **Image Cleanup**: Remove unused images from server
- **Contact Updates**: Verify all contact information is current
- **Backup Data**: Ensure data backup procedures are working

---

## Troubleshooting

### Common Issues

#### Cannot Login to Admin
- **Check Username/Password**: Verify credentials in `.env.local`
- **Clear Browser Cookies**: Delete saved login data
- **Check Network**: Ensure internet connection is stable
- **Restart Browser**: Close and reopen browser

#### Content Not Appearing on Website
- **Check Published Status**: Ensure content is marked as "published"
- **Clear Browser Cache**: Hard refresh the page (Ctrl+F5)
- **Check Categories**: Verify content is in the correct category
- **Wait for Updates**: Changes may take a few minutes to appear

#### Images Not Displaying
- **Check File Path**: Verify image URL is correct
- **File Permissions**: Ensure images are uploaded to correct folder
- **File Size**: Large images may not load properly
- **File Format**: Use JPG, PNG, or WebP formats

#### Saving Changes Fails
- **Check Internet Connection**: Ensure stable connection
- **Required Fields**: Fill in all mandatory information
- **File Permissions**: Check server has write access
- **Contact Administrator**: If problem persists

### Getting Help
- **Technical Issues**: Contact web administrator
- **Content Questions**: Call parish office: 020 8852 7411
- **Emergency Website Problems**: Have backup contact ready

---

## Security and Access

### User Accounts
- **Single Admin Account**: One login for all parish staff
- **Shared Access**: Multiple people can use same credentials
- **Session Timeout**: Automatic logout after 24 hours of inactivity

### Data Protection
- **No Personal Data**: System stores only public parish information
- **Automatic Backups**: Content is automatically saved to files
- **Version Control**: Previous versions can be restored if needed

### Password Security
- **Change Default Password**: Essential before going live
- **Strong Passwords**: Use combination of letters, numbers, symbols
- **Regular Updates**: Change password every 6 months
- **Confidential Access**: Don't share login details widely

This admin guide provides everything parish staff need to effectively manage the St Saviour's website content without requiring technical knowledge.