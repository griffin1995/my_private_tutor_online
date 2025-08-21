import { defineConfig } from "tinacms";

// CONTEXT7 SOURCE: /tinacms/docs - Security: Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_TINA_CLIENT_ID: process.env['NEXT_PUBLIC_TINA_CLIENT_ID'],
  TINA_TOKEN: process.env['TINA_TOKEN']
};

// Check for missing environment variables in production
if (process.env.NODE_ENV === 'production') {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// CONTEXT7 SOURCE: /tinacms/docs - Your hosting provider will set this automatically
const branch = process.env['NEXT_PUBLIC_TINA_BRANCH'] || "main";

export default defineConfig({
  branch,
  clientId: requiredEnvVars.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: requiredEnvVars.TINA_TOKEN || "",
  
  // CONTEXT7 SOURCE: /tinacms/docs - Use local content API for development
  ...(process.env['TINA_PUBLIC_IS_LOCAL'] === "true" 
    ? { contentApiUrlOverride: "/api/tina/gql" } 
    : {}),
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "landingPage",
        label: "Landing Page",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "landing-page",
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              {
                type: "string",
                name: "siteName",
                label: "Site Name",
                required: true,
              },
              {
                type: "object",
                name: "logo",
                label: "Logo",
                fields: [
                  {
                    type: "image",
                    name: "main",
                    label: "Main Logo",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Logo Alt Text",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "width",
                    label: "Logo Width (pixels)",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "height",
                    label: "Logo Height (pixels)",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "navigation",
                label: "Navigation",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Main Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "string",
                name: "primaryButtonText",
                label: "Primary Button Text",
                required: true,
              },
              {
                type: "string",
                name: "secondaryButtonText",
                label: "Secondary Button Text",
                required: true,
              },
              {
                type: "image",
                name: "videoPlaceholder",
                label: "Video Placeholder Image",
                required: true,
              },
              {
                type: "string",
                name: "videoPlaceholderAlt",
                label: "Video Placeholder Alt Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "trustIndicators",
            label: "Trust Indicators",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionDescription",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "indicators",
                label: "Trust Indicators",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (Emoji)",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "studentJourney",
            label: "Student Journey",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionSubtitle",
                label: "Section Subtitle",
                required: true,
              },
              {
                type: "string",
                name: "sectionDescription",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "steps",
                label: "Journey Steps",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "step",
                    label: "Step Number",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Step Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Step Icon (Emoji)",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Step Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration/Timeline",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionSubtitle",
                label: "Section Subtitle",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Quote",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Author Role/Title",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "avatar",
                    label: "Author Photo",
                  },
                  {
                    type: "number",
                    name: "rating",
                    label: "Star Rating (1-5)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Services Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionDescription",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "services",
                label: "Services",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Service Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Service Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Service Icon (Emoji or Icon Class)",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "features",
                    label: "Service Features",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "feature",
                        label: "Feature",
                        required: true,
                      },
                    ],
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Call to Action Text",
                  },
                  {
                    type: "string",
                    name: "ctaLink",
                    label: "Call to Action Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "results",
            label: "Results & Statistics",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionDescription",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "statistics",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "number",
                    label: "Statistic Number",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Statistic Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Statistic Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Statistic Icon",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "sectionDescription",
                label: "Section Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "string",
                name: "formTitle",
                label: "Form Title",
                required: true,
              },
              {
                type: "string",
                name: "formDescription",
                label: "Form Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "submitButtonText",
                label: "Submit Button Text",
                required: true,
              },
              {
                type: "object",
                name: "contactInfo",
                label: "Contact Information",
                fields: [
                  {
                    type: "string",
                    name: "email",
                    label: "Email Address",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "phone",
                    label: "Phone Number",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "address",
                    label: "Address",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "companyName",
                label: "Company Name",
                required: true,
              },
              {
                type: "object",
                name: "logo",
                label: "Footer Logo",
                fields: [
                  {
                    type: "image",
                    name: "main",
                    label: "Footer Logo",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Footer Logo Alt Text",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "width",
                    label: "Footer Logo Width (pixels)",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "height",
                    label: "Footer Logo Height (pixels)",
                    required: true,
                  },
                ],
              },
              {
                type: "string",
                name: "description",
                label: "Company Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "object",
                name: "footerSections",
                label: "Footer Sections",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "links",
                    label: "Links",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Link Label",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "Link URL",
                        required: true,
                      },
                    ],
                  },
                ],
              },
              {
                type: "string",
                name: "copyrightText",
                label: "Copyright Text",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "seasonalContent",
        label: "Seasonal Content",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "seasonal-content",
        },
        fields: [
          {
            type: "object",
            name: "seasons",
            label: "Seasonal Content",
            fields: [
              {
                type: "object",
                name: "spring",
                label: "Spring Content",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Call to Action Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "focusArea",
                    label: "Focus Area",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "bgGradient",
                    label: "Background Gradient Class",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "summer",
                label: "Summer Content",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Call to Action Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "focusArea",
                    label: "Focus Area",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "bgGradient",
                    label: "Background Gradient Class",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "autumn",
                label: "Autumn Content",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Call to Action Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "focusArea",
                    label: "Focus Area",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "bgGradient",
                    label: "Background Gradient Class",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "winter",
                label: "Winter Content",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Call to Action Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "focusArea",
                    label: "Focus Area",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "bgGradient",
                    label: "Background Gradient Class",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Additional Pages",
        path: "src/content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "src/content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});