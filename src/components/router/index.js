const PublicMain = () => import("../public/main");
const PublicHome = () => import("../public/home");
const About = () => import("../public/about");

const AdminLogin = () => import("../admin/login");
const AdminMain = () => import("../admin/main");
const AdminHOme = () => import("../admin/home");
const addArticle = () => import("../admin/addEditArticle");

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
    name: "adminMain",
    component: AdminMain,
    children: [{
        path: "/xsys",
        component: AdminHOme
    },{
        path: "/article/add",
        name: "addArticle",
        component: addArticle
    }]
}];