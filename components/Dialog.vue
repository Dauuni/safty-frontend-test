<template>
  <div class="dialog_inner">
    <div class="dialog-header">
      {{ title }}
    </div>
    <div
      class="dialog-contents"
      style="white-space: pre-line"
      v-text="text"
    ></div>
    <div class="dialog-footer">
      <button
        v-for="(button, index) in buttons"
        :key="`button-${index}`"
        class="dialog-button"
        :class="[button.class]"
        @click="handleClick(button)"
      >
        {{ button.title }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
  },
  methods: {
    handleClick(button) {
      button.handler()
      this.$emit('close')
    },
    brToNewLine(value) {
      return value.split('<br />').join('\n')
    },
  },
}
</script>

<style lang="scss">
.vm--overlay {
  background: rgba(0, 0, 0, 0.3);
}

.vm--modal {
  border-radius: 0 !important;

  .dialog_inner {
    background-color: $blue-gray-80;
  }

  .dialog-header {
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid $gray-30;
    font-size: 14px;
    font-weight: 700;
    color: $white-100;
  }

  .dialog-contents {
    padding: 20px;
    font-size: 14px;
    color: $white-100;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    text-align: right;
  }

  .dialog-button {
    border-color: transparent;
    font-size: 16px;
    padding: 8px 20px;
  }

  .dialog-button {
    border-color: transparent;
    font-size: 12px;
    padding: 8px 18px;
    border-radius: 0.5rem;
  }

  .dialog-button-cancel {
    color:  $blue-gray-100;
    background-color: $white-100;
    margin-right: 4px;

    &:hover {
      opacity: 0.7;
    }
  }
  
  .dialog-button-confirm {
    color: $white-100;
    background-color: $blue-gray-100;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
