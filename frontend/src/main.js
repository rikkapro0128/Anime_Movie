import { createApp } from 'vue';
import Container from './Container';
import router from '@/routes/router';
import { movie } from './vuex/movie'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const app = createApp(Container);
app.use(router);
app.use(movie);
app.use(VuePlyr, { 
    plyr: {
        
    },
});

app.mount('#app');
