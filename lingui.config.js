module.exports = {
  locales: ['en', 'cs', 'fr', 'ru'],
  catalogs: [
    {
      path: 'src/locale/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
};
