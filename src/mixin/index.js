export default {
  mounted() {
    this.$store.commit("addHistory", {
      name: this.$route.name,
      path: this.$route.path
    });
  }
};
