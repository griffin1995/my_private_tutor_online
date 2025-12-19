
  import { fileURLToPath } from 'url'
  import path from 'path'
  import { postgresAdapter } from '@payloadcms/db-postgres'
  import { lexicalEditor } from '@payloadcms/richtext-lexical'
  import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
  import { buildConfig } from 'payload'
  import sharp from 'sharp'

  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)

  export default buildConfig({
    // Secret key for encrypting Payload data (required)
    secret: process.env['PAYLOAD_SECRET'] || '',

    // Database configuration for Railway PostgreSQL
    db: postgresAdapter({
      pool: {
        connectionString: process.env['DATABASE_URL'],
        // Use SSL for remote connections (Railway), skip for localhost
        ssl: process.env['DATABASE_URL']?.includes('localhost') ||
             process.env['DATABASE_URL']?.includes('127.0.0.1')
          ? false
          : { rejectUnauthorized: false },
      },
    }),

    // Admin configuration - client-optimized interface
    admin: {
      user: 'users',
      meta: {
        titleSuffix: ' - My Private Tutor Online CMS',
        icons: [
          {
            rel: 'icon',
            type: 'image/x-icon',
            url: '/favicon.ico',
          },
        ],
      },
      components: {
        // Custom logo and branding can be added here
      },
    },

    // Collections - Essential content types
    collections: [
      // Users collection for admin access
      {
        slug: 'users',
        auth: true,
        admin: {
          useAsTitle: 'email',
          group: 'Admin',
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

      // Media collection for images and files
      {
        slug: 'media',
        upload: {
          staticDir: 'public/images',
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
              name: 'hero',
              width: 1920,
              height: 1080,
              position: 'centre',
            },
          ],
          adminThumbnail: 'thumbnail',
          mimeTypes: ['image/*'],
        },
        admin: {
          group: 'Media',
        },
        fields: [
          {
            name: 'alt',
            type: 'text',
            required: true,
            admin: {
              description: 'Alternative text for accessibility',
            },
          },
          {
            name: 'caption',
            type: 'text',
            admin: {
              description: 'Optional caption for the image',
            },
          },
        ],
      },

      // Blog posts collection
      {
        slug: 'posts',
        admin: {
          useAsTitle: 'title',
          group: 'Content',
          defaultColumns: ['title', 'publishedAt', 'status'],
        },
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
              description: 'The blog post title',
            },
          },
          {
            name: 'slug',
            type: 'text',
            required: true,
            admin: {
              description: 'URL-friendly version of the title',
            },
          },
          {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            admin: {
              description: 'Brief summary for blog listing pages',
            },
          },
          {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({}),
            required: true,
          },
          {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'publishedAt',
            type: 'date',
            admin: {
              position: 'sidebar',
            },
          },
          {
            name: 'status',
            type: 'select',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
            admin: {
              position: 'sidebar',
            },
          },
        ],
      },

      // Tutors collection
      {
        slug: 'tutors',
        admin: {
          useAsTitle: 'name',
          group: 'Content',
          defaultColumns: ['name', 'subject', 'featured'],
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'bio',
            type: 'richText',
            editor: lexicalEditor({}),
            required: true,
            admin: {
              description: 'Tutor biography and qualifications',
            },
          },
          {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'subject',
            type: 'text',
            required: true,
            admin: {
              description: 'Primary subject expertise',
            },
          },
          {
            name: 'qualifications',
            type: 'array',
            fields: [
              {
                name: 'qualification',
                type: 'text',
                required: true,
              },
            ],
          },
          {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              description: 'Show on homepage',
              position: 'sidebar',
            },
          },
        ],
      },

      // Testimonials collection
      {
        slug: 'testimonials',
        admin: {
          useAsTitle: 'clientName',
          group: 'Content',
          defaultColumns: ['clientName', 'featured', 'rating'],
        },
        fields: [
          {
            name: 'quote',
            type: 'textarea',
            required: true,
            admin: {
              description: 'The testimonial text',
            },
          },
          {
            name: 'clientName',
            type: 'text',
            required: true,
          },
          {
            name: 'clientTitle',
            type: 'text',
            admin: {
              description: 'e.g., "Parent of Year 6 student"',
            },
          },
          {
            name: 'rating',
            type: 'number',
            min: 1,
            max: 5,
            required: true,
          },
          {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              description: 'Show on homepage',
              position: 'sidebar',
            },
          },
        ],
      },
    ],

    // Globals - Page-specific content management
    globals: [
      // Homepage content
      {
        slug: 'homepage',
        admin: {
          group: 'Page Content',
        },
        fields: [
          {
            name: 'heroSection',
            type: 'group',
            fields: [
              {
                name: 'headline',
                type: 'text',
                required: true,
                admin: {
                  description: 'Main headline on homepage',
                },
              },
              {
                name: 'subheading',
                type: 'textarea',
                required: true,
              },
              {
                name: 'backgroundImage',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'ctaText',
                type: 'text',
                defaultValue: 'Book Your Consultation',
              },
              {
                name: 'ctaLink',
                type: 'text',
                defaultValue: '/contact',
              },
            ],
          },
          {
            name: 'statsSection',
            type: 'group',
            fields: [
              {
                name: 'title',
                type: 'text',
                defaultValue: 'Our Track Record',
              },
              {
                name: 'stats',
                type: 'array',
                minRows: 3,
                maxRows: 4,
                fields: [
                  {
                    name: 'number',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'label',
                    type: 'text',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'aboutSection',
            type: 'group',
            fields: [
              {
                name: 'title',
                type: 'text',
                defaultValue: 'Why Choose My Private Tutor Online?',
              },
              {
                name: 'description',
                type: 'richText',
                editor: lexicalEditor({}),
              },
              {
                name: 'features',
                type: 'array',
                fields: [
                  {
                    name: 'title',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },

      // About page content
      {
        slug: 'aboutPage',
        admin: {
          group: 'Page Content',
        },
        fields: [
          {
            name: 'heroSection',
            type: 'group',
            fields: [
              {
                name: 'headline',
                type: 'text',
                required: true,
                admin: {
                  description: 'About page main headline',
                },
              },
              {
                name: 'subheading',
                type: 'textarea',
              },
              {
                name: 'backgroundImage',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          {
            name: 'founderSection',
            type: 'group',
            fields: [
              {
                name: 'title',
                type: 'text',
                defaultValue: 'Meet the Founder',
              },
              {
                name: 'founderName',
                type: 'text',
                required: true,
              },
              {
                name: 'founderBio',
                type: 'richText',
                editor: lexicalEditor({}),
                required: true,
              },
              {
                name: 'founderPhoto',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          {
            name: 'storySection',
            type: 'group',
            fields: [
              {
                name: 'title',
                type: 'text',
                defaultValue: 'Our Story',
              },
              {
                name: 'content',
                type: 'richText',
                editor: lexicalEditor({}),
                required: true,
              },
            ],
          },
        ],
      },

      // How It Works page content
      {
        slug: 'howItWorksPage',
        admin: {
          group: 'Page Content',
        },
        fields: [
          {
            name: 'heroSection',
            type: 'group',
            fields: [
              {
                name: 'headline',
                type: 'text',
                required: true,
                defaultValue: 'How It Works',
              },
              {
                name: 'subheading',
                type: 'textarea',
                defaultValue: 'Our proven process for academic success',
              },
              {
                name: 'backgroundImage',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          {
            name: 'processSteps',
            type: 'array',
            minRows: 3,
            fields: [
              {
                name: 'stepNumber',
                type: 'number',
                required: true,
              },
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                type: 'textarea',
                required: true,
              },
              {
                name: 'icon',
                type: 'text',
                admin: {
                  description: 'Icon name or upload later',
                },
              },
            ],
          },
        ],
      },

      // Subject Tuition page content
      {
        slug: 'subjectTuitionPage',
        admin: {
          group: 'Page Content',
        },
        fields: [
          {
            name: 'heroSection',
            type: 'group',
            fields: [
              {
                name: 'headline',
                type: 'text',
                required: true,
                defaultValue: 'Subject Tuition',
              },
              {
                name: 'subheading',
                type: 'textarea',
                defaultValue: 'Expert tutoring across all subjects and exam levels',
              },
              {
                name: 'backgroundImage',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          {
            name: 'subjects',
            type: 'array',
            fields: [
              {
                name: 'subjectName',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                type: 'textarea',
                required: true,
              },
              {
                name: 'levels',
                type: 'array',
                fields: [
                  {
                    name: 'level',
                    type: 'text',
                    required: true,
                  },
                ],
              },
              {
                name: 'featured',
                type: 'checkbox',
                defaultValue: false,
              },
            ],
          },
        ],
      },

      // Site-wide settings
      {
        slug: 'siteSettings',
        admin: {
          group: 'Site Settings',
        },
        fields: [
          {
            name: 'siteName',
            type: 'text',
            required: true,
            defaultValue: 'My Private Tutor Online',
          },
          {
            name: 'siteDescription',
            type: 'textarea',
            required: true,
            defaultValue: 'Premium online tutoring service for academic excellence',
          },
          {
            name: 'contactEmail',
            type: 'email',
            required: true,
          },
          {
            name: 'contactPhone',
            type: 'text',
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

    // Rich text editor configuration
    editor: lexicalEditor({}),

    // TypeScript configuration
    typescript: {
      outputFile: path.resolve(dirname, 'payload-types.ts'),
    },

    // Security and performance settings for production
    cors: [
      process.env['SERVER_URL'] || 'http://localhost:3000',
      process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : '',
    ].filter(Boolean),

    csrf: [
      process.env['SERVER_URL'] || 'http://localhost:3000',
      process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : '',
    ].filter(Boolean),

    // Note: Rate limiting removed in Payload 3.x (runs on Next.js/serverless)
    // Implement rate limiting at infrastructure level (Cloudflare, Vercel, etc.)

    // GraphQL configuration
    graphQL: {
      maxComplexity: 1000,
      disablePlaygroundInProduction: true,
    },

    // File upload configuration
    upload: {
      limits: {
        fileSize: 5000000, // 5MB max file size
      },
    },

    // Localisation support (optional)
    localization: false,

    // Plugin configuration
    plugins: [
      // Vercel Blob storage for media uploads (required for serverless deployment)
      vercelBlobStorage({
        enabled: Boolean(process.env['BLOB_READ_WRITE_TOKEN']),
        collections: {
          media: true,
        },
        token: process.env['BLOB_READ_WRITE_TOKEN'] || '',
        cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
        clientUploads: true, // Bypass Vercel's 4.5MB serverless limit
      }),
    ],

    // Sharp for image resizing (required for imageSizes in collections)
    sharp,
  })
