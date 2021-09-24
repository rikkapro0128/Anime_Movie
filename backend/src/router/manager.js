import API_Admin_Action from './api/AdminActions.js';
import API_User_Action from './api/UserActions.js';
import API_Work_Movie from './api/WorkMovie.js';
import API_System_Sign from './api/SystemSign.js';
import API_System_Test from './api/SystemTest.js';
import helpSign from '../utils/sign.js';

export default function(app) {
    app.use('/admin', helpSign.checkPermission('admin'), API_Admin_Action);
    app.use('/user', helpSign.checkPermission('user'), API_User_Action);
    app.use('/take-mv', API_Work_Movie);
    app.use('/st-sign', API_System_Sign);
    app.use('/test', API_System_Test);
}
