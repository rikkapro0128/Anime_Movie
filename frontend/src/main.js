import { createApp } from 'vue';
import Container from './Container';
import router from '@/routes/router';
import { movie } from './vuex/movie'

const app = createApp(Container);

app.use(router);
app.use(movie);

app.mount('#app');
