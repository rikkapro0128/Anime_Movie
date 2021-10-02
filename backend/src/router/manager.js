import API_Admin_Action from "./api/AdminActions.js";
import API_User_Action from "./api/UserActions.js";
import API_Work_Public from "./api/WorkPublic.js";
import API_System_Sign from "./api/SystemSign.js";
import API_System_Test from "./api/SystemTest.js";
import helpSign from "../utils/sign.js";

export default function (app) {
  app.use("/admin", helpSign.checkPermission(["admin"]), API_Admin_Action);
  app.use(
    "/user",
    helpSign.checkPermission(["user", "admin"]),
    API_User_Action
  );
  app.use("/common", API_Work_Public);
  app.use("/st-sign", API_System_Sign);
  app.use("/test", API_System_Test);
}
