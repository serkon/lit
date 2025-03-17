import { Router } from '@vaadin/router';
import { autoRegisterPages } from './utils/route-auto-loader.util';

await autoRegisterPages();

export const configureRouter = async () => {
  const routes = [
    {
      path: '/',
      component: 'default-page',
    },
    {
      path: '/employees',
      component: 'employee-list'
    },

    {
      path: '/employee/:id',
      component: 'employee-detail'
    },
    {
      path: '/contact',
      component: 'page-contact',
      action: async () => {
        await import('@/pages/contact.ts');
      },
    },
    {
      path: '(.*)',
      component: 'page-not-found',
    },
  ];

  const router = new Router(document.querySelector('#root'));
  router.setRoutes(routes);
};

// Router'ı başlat
configureRouter().catch(console.error);

/**
 * 
 src/
├── pages/
│   ├── default.page.ts    # Ana layout
│   ├── product/
│   │   ├── list.page.ts   # /product/list
│   │   └── [id].page.ts   # /product/:id
│   └── user.page.ts       # /user
└── router.ts
 */
