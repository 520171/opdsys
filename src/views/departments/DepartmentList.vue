<template>
  <cpn :show-hidden="false"></cpn>
</template>
<script>
const cpn = () => import('./DepartmentManager')
export default {
  components: {
    cpn
  }
}
</script>
