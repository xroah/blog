const PublicMain = () =>
    import("../components/public/main");
const PublicHome = () =>
    import("../components/public/home");
const About = () =>
    import("../components/public/about");

const AdminLogin = () =>
    import("../components/admin/login");
const AdminMain = () =>
    import("../components/admin/main");
const AdminArticles = () =>
    import("../components/admin/articles");
const AddArticle = () =>
    import("../components/admin/addEditArticle");
const ArticleClassify = () =>
    import("../components/admin/classify");
const ArticleDetails = () =>
    import("../components/admin/articleDetails");
const Error404 = () =>
    import("../components/common/error");

const AdminModifyPwd = () =>
    import("../components/admin/modifyPwd");
const PublicArticleInfo = () => import("../components/public/articleDetails");

export default [{
    path: "/",
    component: PublicMain,
    children: [{
        path: "article",
        name: "publicArticles",
        component: PublicHome
    }, {
        path: "article/details/:id",
        component: PublicArticleInfo
    }, {
        path: "/about",
        component: About
    }]
}, {
    path: "/xsys/login",
    name: "adminLogin",
    component: AdminLogin
}, {
    path: "/xsys",
    component: AdminMain,
    children: [{
        path: "article",
        component: AdminArticles,
        name: "adminArticles"
    }, {
        path: "article/add",
        name: "addArticle",
        component: AddArticle
    }, {
        path: "article/edit/:id?",
        component: AddArticle
    }, {
        path: "article/details/:id",
        component: ArticleDetails
    }, {
        path: "classify",
        component: ArticleClassify
    }, {
        path: "mng/modifyPwd",
        name: "modifyPwd",
        component: AdminModifyPwd
    }]
}, {
    path: "*",
    component: Error404
}];