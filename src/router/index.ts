import { createRouter, createWebHistory } from "vue-router";

import AgenciesView from "@/views/AgenciesView.vue";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import SeriesView from "@/views/SeriesView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/agencies",
      name: "agencies",
      component: AgenciesView,
    },
    {
      path: "/series",
      name: "series",
      component: SeriesView,
    },
    {
      path: "/locations",
      name: "locations",
      component: PlaceholderView,
      props: { title: "Locations" },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
