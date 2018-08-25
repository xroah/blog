const PublicMain = () =>
    import ("../components/public/main");
const PublicHome = () =>
    import ("../components/public/home");
const About = () =>
    import ("../components/public/about");

const AdminLogin = () =>
    import ("../components/admin/login");
const AdminMain = () =>
    import ("../components/admin/main");
const AdminHome = () =>
    import ("../components/admin/home");
const AddArticle = () =>
    import ("../components/admin/addEditArticle");
const ArticleClassify = () =>
    import ("../components/admin/classify");
const ArticleDetails = () =>
    import ("../components/admin/articleDetails");
const Error404 = () =>
    import ("../components/common/error");

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
        path: "article",
        component: AdminHome,
        name: "adminHome"
    }, {
        path: "article/add",
        name: "addArticle",
        component: AddArticle
    }, {
        path: "article/edit/:id?",
        component: AddArticle
    }, {
        path: "article/details/:id?",
        component: ArticleDetails
    }, {
        path: "classify",
        component: ArticleClassify
    }]
}, {
    path: "*",
    component: Error404
}];