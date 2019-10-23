<template>
  <cpn :show-hidden="false"></cpn>
</template>

<script>
const cpn = () => import('./UserManager')
export default {
  components: {
    cpn
  }
}
</script>

<style scoped>

</style>
