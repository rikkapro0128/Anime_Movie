import { createApp } from 'vue';
import { movie } from './vuex/movie';
import { DraggablePlugin } from '@braks/revue-draggable';
import Container from './Container';
import router from '@/routes/router';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const app = createApp(Container);
app.use(router);
app.use(DraggablePlugin);
app.use(movie);
app.use(VuePlyr, { 
    plyr: {
        
    },
});

app.mount('#app');
