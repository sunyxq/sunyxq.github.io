module.exports = {
  title: 'Hello FE',
  description: 'some notes about FE',
  plugins: [
    '@vuepress/back-to-top',
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      // { text: '首页', link: '/' },
      { text: '基础', link: '/base/' },
      { text: '进阶', link: '/advanced/' },
      { text: '工具', link: '/tool/websites/' },
      { text: '教程', link: '/tutorial/'},
      { text: 'GitHub', link: 'https://github.com/sunyxq' },
    ],
    sidebar: {
      '/base/': [
        {
          title: 'ES',
          collapsable: false,
          children: [
            ['es/', 'Introduction'],
            'es/js-skill'
          ]
        },
        {
          title: 'HTML',   // 必要的
          // path: '/base/',      // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            'html/upload-file',
            'html/html-skill',
          ]
        },
        {
          title: 'CSS',
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 0
          children: [
            ['css/', 'Introduction'],
            'css/hide-bar',
            'css/bfc'
          ]
        }, {
          title: 'GIT',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['git/', 'Introduction'],
            'git/base',
          ]
        } , {
          title: 'WEBPACK',
          collapsable: false,
          children: [
            ['webpack/', 'Introduction'],
            'webpack/base',
            'webpack/advanced',
            'webpack/optimization',
            "webpack/custome-cra-config"
          ]
        }
      ],
      '/tool/': [
        {
          title: '官网',
          collapsable: false,
          children: [
            ['websites/', 'Introduction'],
            'websites/official',
            'websites/softwares',
          ]
        },
        {
          title: 'Github',
          collapsable: false,
          children: [
            ['githubs/', 'Introduction']
          ]
        },
        {
          title: 'Blog',
          collapsable: false,
          children: [
            ['blogs/', 'Introduction']
          ]
        }
      ],
      // '/tutorial': [
      //   {
      //     title: 'React',
      //     collapsable: false,
      //     path: 'react/'
      //   }
      // ]
    }
  }
}