module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dariocuevas.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
