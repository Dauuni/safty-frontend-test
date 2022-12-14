<template>
  <Popup
    :popup-name="popup.name"
    :title="pageTitle"
    :width="popup.width"
    :height="popup.height"
    :use-modify-button="!isCreateMode && !isModifyMode"
    :use-delete-button="!isCreateMode"
    class="BCodePopup"
    @closed="handleClosed"
    @confirm="handleConfirm"
    @deleted="handleDeleted"
    @modify="handleModify"
  >
  <!-- B Code 코드  -->
  <h3 class="my-5 content__subtitle__popup">기본정보</h3>
  <div class="form__list">
    <label
      class="form__label"
      :class="{ 'form__label--required': isCreateMode || isModifyMode }"
    >코드</label>
    <input 
      type="text"
      class="form__input"
      ref="bCode" 
      v-model="form.bCode"
      :placeholder="$const.message.code.emptyCheck.bCode"
      :disabled="!isCreateMode"
    />
  </div>
  <!-- B Code 코드 명 -->
  <div class="form__list">
    <label
      class="form__label"
      :class="{ 'form__label--required': isCreateMode || isModifyMode }"
    >코드 명</label>
    <input 
      type="text"
      class="form__input"
      ref="bCodeName" 
      v-model="form.bCodeName"
      :placeholder="$const.message.code.emptyCheck.bCodeName"
      :disabled="!isCreateMode"
    />
  </div>
  <!-- A Code  -->
  <div class="form__list">
    <label class="form__label">
      A Code
    </label>
    <input 
      type="text"
      class="form__input"
      ref="aCode"
      v-model="aCode"
      disabled
    />
  </div>
  <!-- 사용 여부 -->
  <div class="form__list">
    <label 
      class="form__label"
      :class="{ 'form__label--required': isCreateMode }"
      >사용 여부</label>
    <div class="form__radio">
      <input 
        type="radio"
        id="b-code-useYn-y"
        ref="useYn"
        v-model="form.useYn"
        :value="'Y'"
        :disabled="!isCreateMode && !isModifyMode"
      />
      <label for="b-code-useYn-y">Yes</label>
    </div>
    <div class="mx-4 form__radio">
      <input 
        type="radio"
        id="b-code-useYn-n"
        v-model="form.useYn"
        :value="'N'"
        :disabled="!isCreateMode && !isModifyMode"
      />
      <label for="b-code-useYn-n">No</label>
    </div>
  </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Popup.vue'
import { isEmpty } from '@/utils/comlib'

export default {
  name: 'BCodePopup',
  components: { Popup },
  props: {
    bCodeData: {
      type: String,
      required: false,
      default: '',
    },
    aCode: {
      type: String,
      required: true,
      default: '',
    }
  },
  data() {
    return {
      isModifyMode: false,
      popup: {
        name: 'BCodePopup',
        width: '500',
        height: '460',
        title: 'B Code 등록'
      },
      form: {
        bCode: '',
        bCodeName: '',
        useYn: '',
      }
    }
  },
  computed: {
    isCreateMode() {
      return isEmpty(this.bCodeData)
    },
    pageTitle() {
      return this.isCreateMode
        ? 'B Code 등록'
        : this.isModifyMode
        ? 'B Code 수정'
        : 'B Code 정보'
    }
  },
  methods: {
    /* ==== Open ==== */
    async open() {
      await this.$modal.show(this.popup.name)

      if (!this.isCreateMode) {
        // ⚠️ B Code 조회 함수 ⚠️
      }
    },

    /* ==== Closed ==== */
    handleClosed() {
      this.isModifyMode = false
      this.resetForm()
      this.$modal.hide(this.popup.name)
    },

    /* ==== Confirm ==== */
    handleConfirm() {
      if (!this.validation()) {
        return
      }

      this.$confirm(this.$const.message.common.confirm.save).then(() => {
        this.createModifyACode()
      })
    },

    /* ==== Deleted ==== */
    handleDeleted() {
      // 확인 버튼 클릭 시
      this.$confirm(this.$const.message.common.confirm.delete).then(async () => {
        // ⚠️ API ⚠️
        this.toast.show(this.$const.message.common.success.delete)
        this.handleClosed()
      })
      .catch((error) => {
        this.$toast.error(error)
      })
    },

    /* ==== Modify Mode ==== */
    handleModify() {
      this.isModifyMode = true
    },

    /* ==== Create & Modify ==== */
    async createModifyACode() {
      const data = {
        ...this.form,
      }
      if (this.isCreateMode) {
        try {
          // ⚠️ API ⚠️
        } catch (error) {
          this.$toast.error(error)
        }
      }

      if (this.isModifyMode) {
        try {
          // ⚠️ API ⚠️
          this.isModifyMode = false
        } catch (error) {
          this.$toast.error(error)
        }
      }
      this.$toast.show(this.$const.message.common.success.save)
      this.handleClosed()
    },

    /* ==== 입력 내용 초기화 ==== */
    resetForm() {
      this.form.bCode = ''
      this.form.bCodeName = ''
      this.form.useYn = ''
    },

    /* ==== 유효성 검사 ==== */
    validation() {
      if(isEmpty(this.form.bCode)) {
        this.$toast.error(this.$const.message.code.emptyCheck.bCode)
        this.$refs.bCode.focus()
        return false
      }

      if(isEmpty(this.form.bCodeName)) {
        this.$toast.error(this.$const.message.code.emptyCheck.bCodeName)
        this.$refs.bCodeName.focus()
        return false
      }

      if(isEmpty(this.form.useYn)) {
        this.$toast.error(this.$const.message.code.emptyCheck.useYn)
        this.$refs.useYn.focus()
        return false
      }

      return true
    }
  }
}
</script>

<style lang="scss" scoped></style>