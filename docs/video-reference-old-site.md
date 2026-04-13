# Old site video reference

## Summary

I reviewed the two local `.mov` files from the old website and extracted key frames into `docs/video-reference/frames`.

These videos are useful as motion and art-direction references, not as sources of editorial content.

## Files reviewed

- `old-website-assets/Assets Gazma Site/Videos/Vide╠üos/ouverture site.mov`
- `old-website-assets/Assets Gazma Site/Videos/Vide╠üos/ligne_du_temps.mov`

## 1. Opening logo animation

### Best use

- hero/preloader inspiration
- page-intro transition
- short hover or reveal motif for the home page
- logo motion reference when rebuilding the first fold

### Key frame

![Opening logo glow](./video-reference/frames/ouverture-05.jpg)

### Reading

This video is a clean logo reveal on black with a strong white glow pulse. It does not contain layout information, but it does confirm the intended opening mood:

- black field
- centered logo
- stark monochrome contrast
- glow / pulse instead of complex motion

### Rebuild recommendation

- Use this as a motion reference for the home hero or a short intro overlay
- Keep the rebuild restrained: black background, crisp logo, controlled glow
- Do not build the full hero around blur alone; pair it with clear messaging and CTAs

### Contact sheet

![Opening contact sheet](./video-reference/frames/contact-ouverture.jpg)

## 2. Timeline particle animation

### Best use

- About page timeline section
- vertical divider between sections
- subtle ambient background for milestones or manifesto quotes

### Key frame

![Timeline particle column](./video-reference/frames/timeline-08.jpg)

### Reading

This video is a vertical monochrome particle column. It reads as an atmospheric timeline marker or energy beam, not as a standalone content block.

What it gives us:

- a vertical composition language for the history page
- a motion cue for scroll-linked sections
- a restrained black-and-white ambient effect

### Rebuild recommendation

- Reuse as a timeline visual motif on `/about`
- It can also work as a divider behind milestone cards
- Do not use it as a homepage hero: it is too abstract and too narrow
- Do not ship the original video as a heavy runtime background
- Preferred implementation: rebuild the effect with CSS/SCSS and lightweight JavaScript animation if needed

### Contact sheet

![Timeline contact sheet](./video-reference/frames/contact-timeline.jpg)

## Practical decisions for rebuild

### Home page

- Use the opening logo animation as inspiration for the first fold
- Preferred direction: static hero with subtle motion overlay or short intro transition
- Keep real page content visible immediately: title, positioning, CTAs

### About page

- Use the particle timeline as a motif for the history/milestones section
- This is the strongest direct reuse opportunity from the video assets

### What not to do

- Do not treat these videos as page wireframes
- Do not infer navigation or section structure from them
- Do not overuse them as heavy autoplay backgrounds on mobile

## Output created

Frames extracted under:

- `docs/video-reference/frames/ouverture-*.jpg`
- `docs/video-reference/frames/timeline-*.jpg`
- `docs/video-reference/frames/contact-ouverture.jpg`
- `docs/video-reference/frames/contact-timeline.jpg`
