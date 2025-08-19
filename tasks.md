# general info about these tasks

## all rules we set out in claude.md but also never assume, never go off task, if you ever encounter any problems then ask me, if you need more data then ask me, if you cant find a path then ask me, if you are confused then ask me, etc etc. ask for feedback after every task before moving to the next. every single task, not just phases, every task. and use the best specialist agent for each task, when i say agent i mean prompt-engineer, frontend-developer etc, i dont mean haiku, sonnet etc, the agents will decide on what model they want themselves. organise tasks in to most logical flow (dont want to keep editing code multiple times when not needed) and complete in order. every task has to be properly scoped out, the parents and children etc understood, we must really know what we're changing and why, even if it uses a lot of tokens/api use, we must always be exhaustive, must always ask, a guided process the whole way.

# landing page

## hero section

### remove all content from the hero section excluding the background video. it should be the background video, and nothing else.

## animated tagline section

### remove the gradient effect and just let it be whatever default colour for now

## scrolling school shields section

### speed up animation by 50%, check logic of how implemented, I can see the kings college london icon several times, unsure if it is a logic problem or invalid cms but fix

## About/introduction section

### Revise the H1 in the about section so that it just uses the default colour (remove the aurora gradient effect)

### In the about section, on the right hand side there is a photo, keep that, underneath the photo add the video component (check codebase to see what one(s) we have installed, and confirm with me before continuing), it should be the video in root called "elizabeth-introduction-sound.mp4". the functionality should be exactly the same as the hero section play button (the pop up on click etc) but it should be the video thumbnail in proper landscape aspect ratio.

### make sure that the right hand column (image and video (when implemented)) always have the same vertical height as the left hand div. i want the logic so that if i was to add a lot more text (and the left hand side got really long) the image and image thumbnail would grow to both be bigger, or if i was to remove a lot of text and it was now only 3 lines instead of 20, then the images would become smaller. the logic should be that the images rescale relative to the size of their sister container on the left.

## built on trust section

### re order the 4 sections. new order: 1. ‘Fit for a King’ 2. ‘Exam insight from the inside’ 3. ‘By Invitation Only’ (about the tutors, not clients) 4. ‘rooted in Britain, appreciated worldwide’

### new copy for "Exam Insight, from the Inside": Our Tier 1 tutors actually write/mark the real tests your child takes. Such insider perspective is rare.

### new copy for "Fit For a King": Our services are trusted by prominent families, including VIPs and royalty.

### new copy for "Rooted in Britain, Appreciated Worldwide": We know British education inside and out and bring that knowledge to families across the globe.

.

## who we support section

### revise button background colour to use our project secondary 'gold'

# footer

## new copy for "Royal Family Endorsed", it must now be "Clientele" and not "Family"

## delete "Exceptional online tutoring trusted by families worldwide. From GCSE excellence to Oxbridge success." and revise that section to use the square logo only.

## increase the size of the H1s (Services, Company, Resources, Contact)

## We currently have "Call us: +44 7513 550278 | Email: info@myprivatetutoronline.com WhatsApp Us" this is underneath a line break. can you remove the text colour please so that its jsut default. Include "WhatsApp Us" as text, with the WhatsApp logo (ask me if you cant access it via any of our libraries/packs) to the right in the same colour, so no green background anymore, and move the logo to the right. also, position this whole section (the 3 bits) on the far right

## the left hand section (which should now be the logo only) should be the same height as the right hand section.

# about page

## hero section

### we currently have a h2 with "Excellence Through Experience", this is good, but on the left and right of it i have tried to add a 'line' effect. the aim was a thin white line as text decoration. however, for some reason the line goes along the bottom of the text, so its at the bottom of the letters, height wise it is at the very bottom. I want it to be in the middle, so its exactly have way height wise between the top and the bottom.

### revise h1 (or its parents, im unsure) so that the text can take up roughly 80% of the viewport width.

### we have a scroll animation at the bottom of our hero section. it currently includes "DISCOVER MORE", delete that text. the horizontal line should be the same gold as "SCROLL". the scroll text and the line should both fade in at the same time to start, then the line and scroll text should both move down at the same time, giving the illusion that its one unit, the line should move down vertically giving the impression that it is a 'pole' (for example) and is moving down back in to its base, one its naer the bottom the line and the text should both fade out at the same time, then the animation should loop.

## "Meet Elizabeth, A Different Kind of Educator Our Founder Elizabeth did not follow the usual path into education. Her unconventional journey through six different schools, across continents, and into the world of business journalism has shaped a unique approach to learning that puts choice, confidence, and individual needs at the heart of everything we do." This section needs to be made roughly 50% smaller.
