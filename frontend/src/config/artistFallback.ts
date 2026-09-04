import gazmatekLogo from "@/assets/svg/logo.svg";

/**
 * Stand-in portrait for artists who have not sent a photo yet.
 *
 * This replaced placehold.co, which was both an extra third-party request on
 * every such card and a small privacy leak: the artist's name travelled to
 * that service inside the image URL.
 *
 * The logo is a tall transparent glyph, so anywhere it is used the image needs
 * `object-fit: contain` instead of the `cover` a real portrait gets — see the
 * `imageFallback` modifier in the consuming stylesheets.
 */
export const ARTIST_FALLBACK_IMAGE = gazmatekLogo;
