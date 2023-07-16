import Auth from "./pages/Auth";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TECHNICAL_SUPPORT_ROUTE} from "./utils/consts";
import TechnicalSupport from "./pages/TechnicalSupport";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth/>
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth/>
  },
  {
    path: TECHNICAL_SUPPORT_ROUTE,
    Component: <TechnicalSupport/>
  },
]

