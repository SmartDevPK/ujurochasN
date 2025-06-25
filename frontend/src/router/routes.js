import Dashboard from "pages/Dashboard.vue";

const routes = [
 
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "home",
      },
      {
        path: "/about",
        component: () => import("pages/AboutPage.vue"),
        name: "about",
      },
      {
        path: "/nutrition",
        component: () => import("pages/NutritionPage.vue"),
        name: "nutrition",
      },
      {
        path: "/primary-health-care",
        component: () => import("pages/PrimaryHealth.vue"),
        name: "primary.health.care",
      },
      {
        path: "/contact-us",
        component: () => import("pages/ContactPage.vue"),
        name: "contact",
      },
      { 
        path: "/dashboard", component: Dashboard ,
      },
     
     
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
