# St Saviour's Catholic Church Website

A modern, accessible, and fully-featured website for St Saviour's Catholic Church in Lewisham, built with Next.js 14 and TypeScript.

## 🌟 Features

- **Modern Design**: Navy/gold color scheme with responsive layout
- **Complete CMS**: File-based content management system
- **Accessibility**: WCAG 2.1 AA compliant throughout
- **Performance**: Optimized images, 143 kB bundle size
- **Legal Compliance**: UK church requirements, GDPR, safeguarding
- **27 Pages**: Complete website structure with all essential pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:griffin1995/st_saviours_lewisham.git
cd st_saviours_lewisham

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Admin Access
- **URL**: `http://localhost:3000/admin/login`
- **Username**: `admin`
- **Password**: `StSaviours2025!`

**⚠️ Important**: Change the default password before production deployment.

## 📚 Documentation

- **[Project Status](PROJECT_STATUS.md)** - Current status and overview
- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Complete technical specifications
- **[Admin Guide](ADMIN_GUIDE.md)** - User instructions for parish staff
- **[Implementation History](IMPLEMENTATION_HISTORY.md)** - Detailed development records
- **[CLAUDE.md](CLAUDE.md)** - Project instructions and guidelines

## 🛠 Technology Stack

- **Framework**: Next.js 14.2.30 with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Images**: Next.js Image optimization
- **Content**: File-based JSON storage
- **Authentication**: JWT with HTTP-only cookies

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── pages/              # Next.js pages
│   │   ├── admin/          # Admin CMS pages
│   │   └── api/admin/      # API endpoints
│   └── lib/                # Utility functions
├── data/                   # JSON content storage
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🔧 Development

### Available Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
```

### Environment Variables
Create a `.env.local` file:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StSaviours2025!
JWT_SECRET=your-secure-jwt-secret
NODE_ENV=development
```

## 📝 Content Management

### Adding Content
1. Access admin panel at `/admin/login`
2. Use the dashboard to manage:
   - News articles
   - Parish events
   - Mass times
   - Parish groups
   - Photo galleries
   - Website settings

### Data Storage
All content is stored in JSON files in the `/data` directory:
- `news.json` - News articles
- `events.json` - Parish events
- `mass-times.json` - Weekly Mass schedule
- `settings.json` - Website configuration
- `parish-groups.json` - Community groups
- `gallery.json` - Photo galleries

## 🔒 Security

- JWT authentication with secure cookies
- Protected API routes
- Input validation and sanitization
- Environment variable security
- Maintenance mode capability

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader compatible
- High contrast color scheme
- Motion sensitivity support

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Responsive images
- Touch-friendly interface

## 🚀 Deployment

### Production Checklist
1. Change default admin password
2. Set secure JWT secret
3. Configure environment variables
4. Set up SSL certificates
5. Configure domain DNS
6. Test all functionality

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Traditional web hosting with Node.js support

## 📞 Support

For technical support or questions:
- **Parish Office**: 020 8852 7411
- **Email**: parish@saintsaviours.org.uk

## 📄 License

This project is created specifically for St Saviour's Catholic Church, Lewisham.

## 🎯 Project Status

✅ **Complete** - All phases delivered successfully
- 27 pages implemented
- Complete CMS system
- Legal compliance achieved
- Performance optimized
- Production ready

---

*Built with ❤️ for St Saviour's Catholic Church, Lewisham*