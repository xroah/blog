<template>
    <section>
        <login :click="login"></login>
    </section>
</template>

<script>
import Login from "../../common/login";
import fetch from "../../common/fetch";
export default {
  components: {
    Login
  },
  methods: {
    async login(userName, password) {
      try {
        await fetch("/api/login", {
          method: "post",
          body: {
            userName,
            password
          }
        });
      } catch (err) {}
    }
  }
};
</script>
