import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile browsers fire a large vertical resize whenever the soft keyboard opens
 * or the address bar shows/hides. ScrollTrigger answers that resize with a
 * refresh(), which remeasures every trigger and touches the scroll position —
 * enough to blur an input the user has just tapped, so the keyboard closes again
 * right away and the tap looks like it did nothing.
 *
 * ignoreMobileResize skips the refresh for vertical resizes of 25% or more of
 * the viewport on touch-only devices. Trigger start/end positions can drift a
 * little after such a resize, which is the better trade against taps that never
 * land.
 *
 * Imported for its side effect from main.tsx so it runs once, before any
 * component creates a trigger.
 */
ScrollTrigger.config({ ignoreMobileResize: true });
