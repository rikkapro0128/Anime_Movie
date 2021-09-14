import API_Admin_Movie from './api/AdminMovie.js';
import API_Take_Movie from './api/CommonMovie.js';

export default function(app) {
    app.use('/admin', API_Admin_Movie);
    app.use('/take-mv', API_Take_Movie);
}
