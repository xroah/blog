<template>
    <div class="modify-pwd-wrapper">
        <div class="form-flex">
            <span class="form-label">原密码</span>
            <input type="password" class="v-input form-control">
        </div>
        <div class="form-flex">
            <span class="form-label">新密码</span>
            <input type="password" class="v-input form-control">
        </div>
        <div class="form-flex">
            <span class="form-label">重复密码</span>
            <input type="password" class="v-input form-control">
        </div>
    </div>
</template>

<style lang="scss">
@media screen and (min-width: 641px) {
    .modify-pwd-wrapper {
        width: 300px;
        margin: 0 auto;
        .form-label {
            width: 60px;
            text-align: right;
        }
        .v-input {
            width: 240px;
            flex-grow: 0;
        }
    }
}
</style>

