import { about } from "./content/about.js";
import { categories } from "./content/categories.js";
import { home } from "./content/home.js";
import { navigation } from "./content/navigation.js";
import { researchItems } from "./content/research.js";

export const siteContent = {
  navigation,
  home,
  categories,
  about,
  research: {
    heading: "资料札记",
    items: researchItems
  }
};
