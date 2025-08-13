# HOMEPAGE
DO NOTHING

# GENERAL
## HERO SECTIONS HAVE BLUE TEXT. MANUAL FIX HAS BEEN DONE FOR SEVERAL PAGES, BUT THIS SHOULDNT EB THE CASE, IT SHOULD BE MODULAR, AND PART OF THE ACTUAL COMPONENT WE ARE USING. FIX THE COMPONENT SO ALL TEXT IS ALWAYS WHITE IN HERO SECTION.

# HOW IT WORKS PAGE
## SOME OF THE CONTENT IN THE HERO SECTION CURRENTLY HAS BLUE TEXT. ALL CONTENT IN THE HERO SECTION SHOULD HAVE WHITE TEXT. THE SPECIFIC SECTIONS THAT CURRENTLY ARE DISPLAYING BLUE, AND NOT WHITE, TEXT ARE: "{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium trust indicator bar for royal client standards */}
        {/* TRUST INDICATOR REASON: Official Tailwind CSS documentation Section 8.3 recommends trust indicators for premium service positioning */}
        {/* Trust Indicators Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for trust bar visibility */}
              {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for optimal contrast on dark backgrounds */}
              <div className="flex items-center justify-center gap-8 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Tatler Address Book 2025</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>15 Years Excellence</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Royal Client Service</span>
                </div>
              </div>
            </div>
          </div>" AND ALSO "{/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Sophisticated CTA container with royal client service badge */}
          {/* PREMIUM CTA REASON: Official Motion documentation Section 5.2 recommends enhanced CTA treatments for luxury service positioning */}
          <m.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Completely transparent container removed for seamless hero appearance */}
            {/* CONTAINER REMOVAL REASON: Official Tailwind CSS documentation supports direct content placement without visible container styling */}
            {/* Royal Client Service Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-amber-400" />
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for royal service badge */}
              {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for high contrast visibility */}
              <span className="text-white font-medium tracking-wide">Royal Client Service</span>
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
              {heroContent.ctaButtons.map((button, index) => (
                button.type === 'primary' ? (
                  <ShinyButton 
                    key={index}
                    text={button.text}
                    className="px-10 py-5 h-auto text-lg font-semibold shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                ) : (
                  <InteractiveHoverButton 
                    key={index}
                    text={button.text}
                    className="px-10 py-5 text-lg font-semibold border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300"
                  />
                )
              ))}
            </div>
            
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for trust message clarity */}
            {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for maximum readability on dark backgrounds */}
            {/* Trust Message - White text without backdrop blur */}
            <p className="text-white text-sm text-center mb-8">
              Trusted by elite families • Featured in Tatler Address Book 2025 • 15 years of excellence
            </p>
          </m.div>"


## DELETE THE SECTION "Discover our proven 4-step process that has helped thousands of students achieve excellence. Continue reading to learn more"

## REVISE THE COPY FOR THE SECOND CARD <CardContent className="relative px-10 lg:px-12 pb-10 lg:pb-12">
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium feature list enhancement with royal checkmarks */}
                            {/* PREMIUM FEATURES REASON: Official Tailwind CSS documentation Section 6.5 recommends sophisticated list treatments for premium feature presentation */}
                            <ul className="space-y-4">
                              {step.features.map((feature: string, featureIndex: number) => (
                                <li key={featureIndex} className="flex items-start gap-4 group/feature">
                                  {/* Royal checkmark with glow effect */}
                                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover/feature:shadow-xl transition-all duration-300">
                                    <CheckCircle className="w-4 h-4 text-white drop-shadow-sm" />
                                  </div>
                                  <span className="text-slate-600 group-hover/feature:text-slate-500 transition-colors duration-300 font-medium leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>

## In the three tier section Can we match the border colours to the level of tuition please? Tier 3 bronze, Tier 2 Silver and Tier 3 gold. Please add at the bottom of each option ‘From £45/hour’, ‘From £65/hour’ and ‘From £85/hour’ to each respectively.  also, the buttons/badges ("premium excellence", "most popular choice" etc) are too big, pls refine them so that they are smaller. The only option that should have a crown icon is Tier One please. No ‘premium elite’ label on T3 either please.


## "Why Elite FamiliesChoose Our Approach Section", we want to use one of our modular components for this section, we want to use the component "import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'" - we have used this in the homepage, check the landing page file as a reference for how to use it (includes context7 comments/references). Use this (and use any images for now) but include the copy for the "Why Elite FamiliesChoose Our Approach Section". We essentially need to use the trust-indicators-grid component as the new way for us to display the Why Elite FamiliesChoose Our Approach content. Additionally, remove the "Hundreds of hours of teaching experience per tutor" point. 



# SUBJECT TUITION PAGE (SERVICES PAGE)

##


# 11+ BOOTCAMP PAGE 
## 