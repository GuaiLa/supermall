<template>
  <div id="profile">

    <nav-bar class="profile-nav"><div slot="center">我的档案</div></nav-bar>

    <profile-title></profile-title>
    <profile-content @toCartClick="toCartClick"></profile-content>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import ProfileTitle from "./childComps/ProfileTitle"
import ProfileContent from "./childComps/ProfileContent"

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileTitle,
    ProfileContent
  },
  methods: {
    toCartClick() {
      // console.log('我要跳转到购物车页面');
      this.$router.push("/shopcart");
    }
  }
}
</script>

<style scoped>
  #profile {
    height: 100vh;
    overflow: hidden;
  }

  .profile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    background-color: var(--color-tint);
    color: #fff;
  }
</style>