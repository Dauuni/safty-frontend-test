<template>
  <modal
    :name="popupName"
    :draggable="draggable"
    :width="popupWidth"
    :height="popupHeight"
    :class="{ dragPopup: draggable }"
    @closed="handleClosed"
  >
    <div class="popup">
      <!-- header -->
      <div class="popup__header">
        <div>{{ title }}</div>
        <button
          type="button"
          class="btn icon icon__close--white"
          @click="$modal.hide(popupName)"
        >
          <span class="hide">닫기</span>
        </button>
      </div>
      <!-- content -->
      <div class="popup__content">
        <slot></slot>
      </div>
      <!-- footer -->
      <div v-if="useFooter" class="popup__footer">
        <slot name="footer">
          <button
            v-if="useCancelButton"
            type="button"
            class="mr-1 btn__cancel"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </button>
          <button
            v-if="useDeleteButton"
            type="button"
            class="mr-1 btn__delete"
            @click="handleDeleted"
          >
            {{ deleteButtonText }}
          </button>
          <button
            v-if="useModifyButton"
            type="button"
            class="mr-1 btn__ok"
            @click="handleModify"
          >
            {{ modifyButtonText }}
          </button>
          <button
            v-if="!useModifyButton"
            type="button"
            class="btn__ok"
            @click="handleConfirm"
          >
            {{ okButtonText }}
          </button>
        </slot>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    popupName: {
      type: [String],
      required: true,
    },
    title: {
      type: [String],
      required: false,
      default: "",
    },
    width: {
      type: [String],
      required: false,
      default: "1024",
    },
    height: {
      type: [String],
      required: false,
      default: "800",
    },
    draggable: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    useFooter: {
      type: [Boolean],
      required: false,
      default: true,
    },
    useCancelButton: {
      type: [Boolean],
      required: false,
      default: true,
    },
    useDeleteButton: {
      type: [Boolean],
      required: false,
      default: false,
    },
    useModifyButton: {
      type: [Boolean],
      required: false,
      default: false,
    },
    cancelButtonText: {
      type: [String],
      required: false,
      default: "취소",
    },
    deleteButtonText: {
      type: [String],
      required: false,
      default: "삭제",
    },
    modifyButtonText: {
      type: [String],
      required: false,
      default: "수정",
    },
    okButtonText: {
      type: [String],
      required: false,
      default: "확인",
    },
  },
  computed: {
    popupWidth() {
      return this.width;
    },
    popupHeight() {
      return this.height;
    },
  },
  methods: {
    handleClosed() {
      this.$emit("closed");
    },
    handleCancel() {
      this.hide();
      this.$emit("cancel");
    },
    handleDeleted() {
      this.$emit("deleted");
    },
    handleModify() {
      this.$emit("modify");
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    hide() {
      this.$modal.hide(this.popupName);
    },
  },
};
</script>

<style lang="scss" scoped>
.vm--overlay {
  background: rgba(0, 0, 0, 0.3);
}

::v-deep .vm--modal {
  box-shadow: 0 3px 30px 10px rgb(0 0 0 / 5%);
  border-radius: 0;
}

.popup {
  @apply h-full flex flex-col;
  background-color: $blue-gray-80;

  &__header {
    @apply flex items-center justify-between;
    height: 60px;
    padding: 0 5px 0 15px;
    border-bottom: 1px solid $white-100;
    font-weight: 500;
  }

  &__content {
    @apply h-full overflow-y-auto;
    @include body(font-sm);
    padding: 10px 20px;
  }

  &__footer {
    padding: 10px 20px 10px;
    text-align: right;

    .btn__cancel,
    .btn__ok,
    .btn__delete {
      border-color: transparent;
      font-size: 12px;
      padding: 8px 18px;
    }

    .btn__cancel,
    .btn__delete {
      color: $blue-gray-100;
      background-color: $white-100;
      &:hover {
        opacity: 0.7;
      }
    }

    .btn__ok {
      color: $white-100;
      background-color: $blue-gray-100;
      border-color: $gray-50;
      border-width: 1px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
}

.dragPopup {
  ::v-deep .vm--overlay {
    display: none;
  }
}
</style>
