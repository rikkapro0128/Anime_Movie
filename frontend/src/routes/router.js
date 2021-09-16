import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Admin from '../views/Admin';
import ListAnime from '../views/LS-Anime';
import ReportAnime from '../views/Report-Anime';
import DetailAnime from '../views/Detail-Anime';
import AddAnime from '../views/Add-Anime';
import notFound from '../views/404NotFound';
import MovieByLabel from '../views/MovieByLabel';
import ViewMovie from '../views/View-Movie';

const routes = [
    { path: '/', name: 'trang-chu', component: Home },
    { path: '/dang-nhap', name: 'dang-nhap', component: Login },
    { path: '/dang-ky', name: 'dang-ky', component: Register },
    { 
      path: '/movie/:label_anime',
      name: 'movie-by-label',
      component: MovieByLabel,
    },
    {
      path: '/view-movie/:label_anime',
      name: 'view-movie',
      component: ViewMovie,
    },
    { 
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'danh-sach-anime',
          name: 'danh-sach-anime',
          components: { ListAnime },
        },
        {
          path: 'danh-sach-anime/:label_anime',
          name: 'detail-anime',
          components: { DetailAnime },
        },
        {
          path: 'phan-hoi',
          name: 'phan-hoi',
          components: { ReportAnime },
        },
        {
          path: 'them-anime',
          components: { AddAnime },
        }
      ],
    },
    { path: '/404-not-found', name: '404-not-found', component: notFound },
    { path: '/:pathMatch(.*)*', redirect: { name: '404-not-found' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
