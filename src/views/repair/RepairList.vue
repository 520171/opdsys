<template>
  <cpn :show-hidden="false"></cpn>
</template>

<script>
const cpn = () => import('./RepairManager')
export default {
  name: 'RepairList',
  components: {
    cpn
  }
}
</script>

<style scoped>

</style>
