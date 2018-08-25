<template>
    <nav class="admin-nav-bar">
        <ul class="admin-nav list-unstyled">
            <li>
                <router-link to="/xsys/article" active-class="active">文章</router-link>
            </li>
            <li>
                <router-link exact to="/xsys/classify" active-class="active">分类管理</router-link>
            </li>
        </ul>
    </nav>
</template>

<style src="./index.scss"></style>

