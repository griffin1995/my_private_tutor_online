// CONTEXT7 SOURCE: /payloadcms/payload - Payload CMS v3 configuration for Next.js App Router
// ARCHITECTURE REASON: Official Payload v3 documentation for modern TypeScript CMS setup

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export default buildConfig({
  // Secret key for encryption and JWT tokens
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-development',

  // Database configuration using MongoDB
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/my-tutor-online',
  }),

  // Admin configuration
  admin: {
    user: 'users',
    buildPath: path.resolve(__dirname, '../build'),
    routes: {
      admin: '/admin/cms',
    },
    meta: {
      titleSuffix: '- My Private Tutor Online CMS',
      favicon: '/favicon.ico',
      ogImage: '/opengraph-image.png',
    },
  },

  // Collections configuration
  collections: [
    // Users collection for admin access
    {
      slug: 'users',
      auth: {
        useAPIKey: true,
        verify: {
          generateEmailHTML: ({ token, user }) => {
            return `Hello ${user.email}, verify your account with this token: ${token}`
          },
        },
      },
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
    },

    // Testimonials collection
    {
      slug: 'testimonials',
      admin: {
        useAsTitle: 'studentName',
      },
      fields: [
        {
          name: 'studentName',
          type: 'text',
          required: true,
        },
        {
          name: 'parentName',
          type: 'text',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
        {
          name: 'examLevel',
          type: 'select',
          options: [
            { label: '11+ Preparation', value: '11-plus' },
            { label: 'GCSE', value: 'gcse' },
            { label: 'A-Level', value: 'a-level' },
            { label: 'University Prep', value: 'university' },
          ],
        },
        {
          name: 'testimonialText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures],
          }),
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'school',
          type: 'text',
        },
        {
          name: 'achievement',
          type: 'text',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'draft',
          required: true,
        },
      ],
    },

    // FAQ collection
    {
      slug: 'faq',
      admin: {
        useAsTitle: 'question',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures],
          }),
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Getting Started', value: 'getting-started' },
            { label: 'Tutoring Services', value: 'tutoring-services' },
            { label: 'Pricing & Payments', value: 'pricing-payments' },
            { label: 'Scheduling & Booking', value: 'scheduling-booking' },
            { label: 'Academic Support', value: 'academic-support' },
            { label: 'Technical Support', value: 'technical-support' },
          ],
          required: true,
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
        {
          name: 'priority',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Higher numbers appear first in search results',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'draft',
          required: true,
        },
      ],
    },

    // Pages collection for dynamic content
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures],
          }),
        },
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'draft',
          required: true,
        },
      ],
    },

    // Media collection for file uploads
    {
      slug: 'media',
      upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // Recognition Cards collection for About Section
    // CONTEXT7 SOURCE: /payloadcms/payload - Collection for about section recognition cards
    {
      slug: 'recognition-cards',
      admin: {
        useAsTitle: 'headerText',
        group: 'About Section',
        defaultColumns: ['headerText', 'contentType', 'sortOrder', 'status'],
        description: 'Manage recognition cards displayed in the About Section (Tatler, Schools Guide, Royal Clientele)',
      },
      fields: [
        {
          name: 'headerText',
          type: 'text',
          required: true,
          admin: {
            description: 'Card header text (e.g., "As featured in", "As recommended by", "As trusted by")',
          },
        },
        {
          name: 'contentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Logo Image', value: 'logo' },
            { label: 'Icon/SVG', value: 'icon' },
          ],
          defaultValue: 'logo',
          admin: {
            description: 'Choose whether to display a logo image or an SVG icon',
          },
        },
        // Logo fields (shown when contentType === 'logo')
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data) => data.contentType === 'logo',
            description: 'Upload partner/media logo (PNG recommended, max-width 156px)',
          },
        },
        {
          name: 'logoMaxWidth',
          type: 'text',
          defaultValue: '156px',
          admin: {
            condition: (data) => data.contentType === 'logo',
            description: 'CSS max-width value (e.g., "156px", "200px")',
          },
        },
        // Icon fields (shown when contentType === 'icon')
        {
          name: 'iconPath',
          type: 'text',
          admin: {
            condition: (data) => data.contentType === 'icon',
            description: 'Path to SVG icon (e.g., "/icons/royal-crown.svg")',
          },
        },
        {
          name: 'iconAlt',
          type: 'text',
          admin: {
            condition: (data) => data.contentType === 'icon',
            description: 'Accessibility alt text for icon',
          },
        },
        // Footer text (optional - shown for Royal Clientele card)
        {
          name: 'footerText',
          type: 'text',
          admin: {
            description: 'Optional footer text displayed below the content (e.g., "Royal Clientele")',
          },
        },
        // Sorting and status
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          required: true,
          admin: {
            description: 'Order of appearance (0 = first, 1 = second, 2 = third, etc.)',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'published',
          required: true,
        },
      ],
    },
  ],

  // Global settings
  globals: [
    {
      slug: 'settings',
      admin: {
        group: 'Config',
      },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          defaultValue: 'My Private Tutor Online',
        },
        {
          name: 'contactEmail',
          type: 'email',
          defaultValue: 'info@myprivatetutoronline.co.uk',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          defaultValue: '+44 7513 550278',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'socialMedia',
          type: 'group',
          fields: [
            {
              name: 'facebook',
              type: 'text',
            },
            {
              name: 'twitter',
              type: 'text',
            },
            {
              name: 'linkedin',
              type: 'text',
            },
            {
              name: 'instagram',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],

  // Editor configuration
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // CORS configuration
  cors: [
    'http://localhost:3000',
    'https://myprivatetutoronline.com',
    'https://www.myprivatetutoronline.com',
  ],

  // CSRF protection
  csrf: [
    'http://localhost:3000',
    'https://myprivatetutoronline.com',
    'https://www.myprivatetutoronline.com',
  ],
})