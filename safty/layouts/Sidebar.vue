<template>
  <div class="Sidebar">
    <ul class="Sidebar__list">
      <li v-for="menuIcon in menuIconList" :key="`sidebar-menu-${menuIcon}`">
        <!-- 1 depth -->
        <div class="Sidebar__1depth Sidebar__list--menu">
          <span class="icon icon__menu">
            <fa :icon="menuIcon" />
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuIconList: [
        "house-chimney",
        "user-group",
        "map-location-dot",
        "d",
        "code"
      ]
    }
  }

}
</script>

<style>

</style>