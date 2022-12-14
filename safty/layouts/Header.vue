<template>
  <header class="header">
    <nuxt-link to="/"><span>산업재해안전관리플랫폼</span></nuxt-link>
    <div class="flex items-center">
      <span>관리자</span>
      <button class="header__logout">
        <fa icon="arrow-right-from-bracket"/>
        <span class="hide">로그아웃</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>