const PublicMain = () =>
    import("../components/public/main");
const PublicHome = () =>
    import("../components/public/home");
const PublicArticles = () =>
    import("../components/public/articles");
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
const modifyPwd = () =>
    import("../components/admin/modifyPwd");
const PublicArticleInfo = () =>
    import("../components/public/articleDetails");
const UserLogin = () =>
    import("../components/public/login");
const UserRegister = () =>
    import ("../components/public/register");
const User = () =>
    import ("../components/public/user");

export default [{
    path: "/",
    component: PublicMain,
    children: [{
        path: "/",
        name: "publicHome",
        component: PublicHome,
    },{
        path: "article",
        name: "publicArticles",
        component: PublicArticles
    }, {
        path: "article/details/:id",
        component: PublicArticleInfo
    }, {
        path: "/about",
        component: About
    }, {
        path: "/user/modifyPwd",
        component: modifyPwd,
        name: "userModifyPwd"
    }]
}, {
    path: "/user",
    component: User,
    children: [{
        path: "login",
        component: UserLogin,
        name: "userLogin"
    }, {
        path: "register",
        component: UserRegister,
        name: "userRegister"
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
        name: "adminModifyPwd",
        component: modifyPwd
    }]
}, {
    path: "*",
    component: Error404
}];