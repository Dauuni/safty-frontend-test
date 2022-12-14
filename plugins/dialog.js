import Vue from 'vue'
import Dialog from '@/components/Dialog'

const dialogPlugin = {
  install: (Vue) => {
    Vue.prototype.$alert = function (
      text,
      title = '알림',
      confirmButtonText = '확인'
    ) {
      return new Promise((resolve) => {
        this.$modal.show(
          Dialog,
          {
            title,
            text,
            buttons: [
              {
                title: confirmButtonText,
                handler: () => {
                  resolve()
                },
                class: 'dialog-button-confirm',
              },
            ],
          },
          {
            height: 'auto',
            width: '400px',
            classes: 'dialog_wrap',
          }
        )
      })
    }
    Vue.prototype.$confirm = function (
      text,
      title = '확인',
      confirmButtonText = '확인',
      cancelButtonText = '취소'
    ) {
      return new Promise((resolve, reject) => {
        this.$modal.show(
          Dialog,
          {
            title,
            text,
            buttons: [
              {
                title: cancelButtonText,
                handler: () => {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  reject()
                },
                class: 'dialog-button-cancel',
              },
              {
                title: confirmButtonText,
                handler: () => {
                  resolve()
                },
                class: 'dialog-button-confirm',
              },
            ],
          },
          {
            height: 'auto',
            width: '400px',
            classes: 'dialog_wrap',
          }
        )
      })
    }
  },
}

Vue.use(dialogPlugin)
