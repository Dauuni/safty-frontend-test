<template>
  <vue-ads-pagination
      :total-items="totalCount"
      :items-per-page="limit"
      :page="currentPage"
      class="pagination"
  >
      <template slot-scope="props">
          <div class="hidden">{{ props }}</div>
      </template>
      <template slot="buttons" slot-scope="props">
          <vue-ads-page-button
              v-for="(button, key) in props.buttons"
              :key="key"
              v-bind="button"
              class="pagination__btn"
              @page-change="changePage(button.page)"
          />
      </template>
  </vue-ads-pagination>
</template>

<script>
import 'vue-ads-pagination/dist/vue-ads-pagination.css'
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination'

export default {
    name: 'Pagination',
    components: {
        VueAdsPagination,
        VueAdsPageButton,
    },
    props: {
      totalCount: {
        type: [Number, String],
        default: 0,
      },
      currentPage: {
        type: [Number, String],
        default: 1,
      },
      limit: {
        type: [Number, String],
        default: 10,
      }
    },
    methods: {
      changePage(page) {
        this.$emit('changePage', page)
      }
    },
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  ::v-deep .vue-ads-justify-end {
    justify-content: center;
  }
    &__btn {
    @include body(font-md);
    width: 15px;
    height: 30px;
    line-height: 30px;
    margin-left: 15px;
    background: transparent;
    border: none;
    text-align: center;
    font-weight: normal;
    color: $gray-60;
    cursor: pointer;

    &:hover {
      background: transparent;
      opacity: 0.6;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:first-child {
      background: url('~/assets/img/icon-arrow-prev.png') no-repeat center
        center / 10px;
    }

    &:last-child {
      background: url('~/assets/img/icon-arrow-next.png') no-repeat center
        center / 10px;
    }

    &.vue-ads-bg-teal-500 {
      color: $white-100;
      background-color: transparent;
      border-bottom: 2px solid $white-100;
      cursor: pointer;
    }
  }
}
</style>