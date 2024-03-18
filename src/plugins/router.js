import { createRouter, createWebHistory } from 'vue-router'
import StartPage from "../pages/StartPage.vue";
import FilmCard from "../pages/FilmPage.vue";
import NotFound from "../pages/NotFound.vue";
import PersonPage from "../pages/PersonPage.vue";

const router = createRouter({
	routes:[
		{path: '/', name: 'home', component: StartPage},
		{path: '/person', name: 'person', component: PersonPage},
		{path: '/film/:id', name: 'film', component: FilmCard, props: true},
		{path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound},
	],
	history: createWebHistory(),
})

export default router
