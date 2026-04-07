import siteSettings from "./content/settings/site.json";

export const SITE = {
  name: siteSettings.churchName,
  shortName: siteSettings.localIdentifier,
  title: `${siteSettings.churchName} | ${siteSettings.localIdentifier}`,
  description: siteSettings.description,
  author: siteSettings.churchName,
  url: siteSettings.canonicalUrl,
  locale: "es_HN",
  themeColor: "#f6f1e7",
};
