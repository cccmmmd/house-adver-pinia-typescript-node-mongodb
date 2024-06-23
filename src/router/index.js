import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Create from "../pages/Create.vue";

const routes = [
	{
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/create",
        name: "create",
        component: Create,
    },
	{
		path: '/:pathMatch(.*)*',
		redirect: "/",
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;