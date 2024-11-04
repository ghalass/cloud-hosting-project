export const ARTICLE_PER_PAGE = 6;

const PRODUCTION_DOMAIN = "https://cloud-hosting-project-seven.vercel.app";
const DEVELOPEMENT_DOMAIN = "http://localhost:3000";
export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPEMENT_DOMAIN;
