import { createRouter, createWebHistory } from "vue-router";
import helper from "../utils/helperToken.js";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Admin from "../views/Admin";
import User from "../views/User";
import UserInfo from "../views/UserInfo";
import ListAnime from "../views/LS-Anime";
import ReportAnime from "../views/Report-Anime";
import DetailAnime from "../views/Detail-Anime";
import AddAnime from "../views/Add-Anime";
import notFound from "../views/404NotFound";
import MovieByLabel from "../views/MovieByLabel";
import ViewMovie from "../views/View-Movie";
import Navigationmovies from "../views/NavigationMovies";

const routes = [
	{ path: "/", name: "trang-chu", component: Home },
	{ path: "/page", name: "phan-trang", component: Navigationmovies },
	{ path: "/dang-nhap", name: "dang-nhap", component: Login },
	{ path: "/dang-ky", name: "dang-ky", component: Register },
	{
		path: "/movie/:label_anime",
		name: "movie-by-label",
		component: MovieByLabel
	},
	{
		path: "/view-movie/:label_anime",
		name: "view-movie",
		component: ViewMovie
	},
	{
		path: "/admin",
		name: "admin",
		component: Admin,
		redirect: () => {
			return { path: "/admin", name: "danh-sach-anime" };
		},
		children: [
			{
				path: "danh-sach-anime",
				name: "danh-sach-anime",
				component: ListAnime
			},
			{
				path: "danh-sach-anime/:label_anime",
				name: "detail-anime",
				component: DetailAnime
			},
			{
				path: "phan-hoi",
				name: "phan-hoi",
				component: ReportAnime
			},
			{
				path: "them-anime",
				component: AddAnime
			}
		]
	},
	{
		path: "/user",
		name: "user",
		component: User,
		redirect: () => {
			return { path: "/user", name: "thong-tin-cua-ban" };
		},
		children: [
			{
				path: "thong-tin-cua-ban",
				name: "thong-tin-cua-ban",
				components: { UserInfo }
			}
		]
	},
	{ path: "/404-not-found", name: "404-not-found", component: notFound },
	{ path: "/:pathMatch(.*)*", redirect: { name: "404-not-found" } }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth"
			};
		}
	}
});

router.beforeEach(async () => {
	const message = await helper.checkTokenIsExpire();
	// console.log(message)
	if (message === "NEXT!") {
		return true;
	}
	if (message === "SESSION EXPIRE!") {
		helper.resetLogin();
		return "/";
	} else {
		return false;
	}
});

export default router;
