<template>
  <h1>About Page</h1>
  <div>Home Page has {{ count }} views</div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
};
</script>
