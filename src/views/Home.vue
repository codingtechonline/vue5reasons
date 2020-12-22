<template>
  <h1>Home Page</h1>
  <div class="container">
    <button
      @click.prevent="
        (e) => {
          $store.commit('decrement', 1);
        }
      "
    >
      -
    </button>
    <div>Page Views {{ count }}</div>
    <button
      @click.prevent="
        (e) => {
          $store.commit('increment', 1);
        }
      "
    >
      +
    </button>
  </div>
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

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
