export const PAGES = {
  home: "/",
  about: "/about",
  artists: "/artists",
  artistDetail: "/artists/:slug",
  events: "/events",
  eventsUpcoming: "/events/upcoming",
  eventsArchive: "/events/archive",
  eventDetail: "/events/:slug",
  services: "/services",
  contact: "/contact",
  termsOfUses: "/termes-dutilisation",
} as const;

export type PageKey = keyof typeof PAGES;

export function buildPagePath(
  page: PageKey,
  params: Record<string, string> = {},
): string {
  return PAGES[page].replace(/:([a-zA-Z]+)/g, (_, key: string) => {
    return params[key] ?? `:${key}`;
  });
}
