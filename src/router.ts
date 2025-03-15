import { Router } from "@vaadin/router";

export const routes = [
  {
    path: "/",
    component: "page-default",
  },
  {
    path: "/products",
    component: "page-product",
    children: [         // Alt routelar
      { path: '/', component: 'page-product-list', outlet: 'products-outlet' },        // /products
    ]
  },
  {
    path: "/contact",
    component: "page-contact",
    action: async () => {
      await import("@/pages/contact.ts");
    },
  },
  {
    path: "/user/:id",
    component: "page-user",
    action: async () => {
      await import("@/pages/user.ts");
    },
  },
  {
    path: "(.*)",
    component: "page-not-found",
  },
];

export const router = new Router(document.querySelector("#root"));
router.setRoutes(routes);