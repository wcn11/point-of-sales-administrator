<template>
  <div id="app">
    <Navigation />

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/navigation.vue";
import $ from 'jquery'

// import FooterView from './components/footer/footer-view.vue'

export default {
  name: "App",
  components: {
    Navigation,
    // FooterView
  },
  created() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
};
</script>

<style>
body {
  background: #e4e4e4 !important;
  padding: 0;
  margin: 0;
  font-family: DM Sans;
}
</style>