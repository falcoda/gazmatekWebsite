import type { PageKey } from "@/config/pages";

interface NavItem {
  id: string;
  page: PageKey;
  labelKey: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    page: "home",
    labelKey: "nav.home",
  },
  {
    id: "about",
    page: "about",
    labelKey: "nav.about",
  },
  {
    id: "artists",
    page: "artists",
    labelKey: "nav.artists",
  },
  {
    id: "events",
    page: "events",
    labelKey: "nav.events",
  },
  {
    id: "services",
    page: "services",
    labelKey: "nav.services",
  },
  {
    id: "contact",
    page: "contact",
    labelKey: "nav.contact",
  },
];

export type { NavItem };
export default navItems;
