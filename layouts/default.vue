<template>
<div class="frameworkWrap">
  <Header />
  <div class="flex">
    <Sidebar />
    <div class="content__wrap">
      <div class="content">
        <Nuxt />
      </div>
      <footer class="footer font--sm">© Copyright ㈜애버커스</footer>
    </div>
  </div>
</div>

</template>

<script>
import '@/assets/scss/common.scss'
import Header from '@/safty/layouts/Header'
import Sidebar from '@/safty/layouts/Sidebar'

export default {
  name: 'Default',
  components: { Header, Sidebar }
}
</script>

<style lang="scss"></style>