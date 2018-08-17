const PublicMain = () => import("../public/main");
const PublicHome = () => import("../public/home");
const About = () => import("../public/about");

const AdminLogin = () => import("../admin/login");
const AdminMain = () => import("../admin/main");
const AdminHome = () => import("../admin/home");
const AddArticle = () => import("../admin/addEditArticle");
const ArticleClassify = () => import("../admin/classify");

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
    children: [{
        path: "/xsys",
        component: AdminHome,
        name: "adminHome"
    },{
        path: "article/add",
        name: "addArticle",
        component: AddArticle
    },{
        path: "article/classify",
        component: ArticleClassify
    }]
}];