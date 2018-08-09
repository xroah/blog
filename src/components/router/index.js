import PublicMain from "../public/main";
import PublicHome from "../public/home";
import About from "../public/about";

import AdminLogin from "../admin/login";
import AdminMain from "../admin/main";

export default [{
    path: "/",
    component: PublicMain,
    children: [{
        path: "/",
        component: PublicHome
    }, {
        path: "/about",
        component: About
    }]
}, {
    path: "/xsys/login",
    component: AdminLogin
}, {
    path: "/xsys",
    component: AdminMain,
    children: [

    ]
}];