const syrinx_config = Object.assign({
  app: {
    title: 'Syrinx',
    description: 'User Interface for Swift Navigation devices',
    company: 'Swift Navigation',
    head: {
      titleTemplate: 'Syrinx - %s',
      defaultTitle: 'Syrinx',
      meta: [
        { name: 'description', content: 'Information about Syrinx' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Syrinx' },
        { property: 'og:image', content: '/source/assets/img/SwiftNav_Logo_NoText.svg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Syrinx' },
        { property: 'og:description', content: 'Syrinx' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@jkretzmer' },
        { property: 'og:creator', content: '@jkretzmer' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
});

module.exports = syrinx_config;
