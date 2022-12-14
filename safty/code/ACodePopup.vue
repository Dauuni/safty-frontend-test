<template>
  <Popup
    :popup-name="popup.name"
    :title="pageTitle"
    :width="popup.width"
    :height="popup.height"
    :use-modify-button="!isCreateMode && !isModifyMode"
    :use-delete-button="!isCreateMode"
    class="ACodePopup"
    @closed="handleClosed"
    @confirm="handleConfirm"
    @deleted="handleDeleted"
    @modify="handleModify"
    @cancle="handleClosed"
  >
  <!-- A Code 코드  -->
  <h3 class="my-5 content__subtitle__popup">기본정보</h3>
  <div class="form__list">
    <label
      class="form__label"
      :class="{ 'form__label--required': isCreateMode || isModifyMode }"
    >코드</label>
    <input 
      type="text"
      class="form__input"
      ref="aCode" 
      v-model="form.aCode"
      :placeholder="$const.message.code.emptyCheck.aCode"
      :disabled="!isCreateMode"
    />
  </div>
  <!-- A Code 코드 명 -->
  <div class="form__list">
    <label
      class="form__label"
      :class="{ 'form__label--required': isCreateMode || isModifyMode }"
    >코드 명</label>
    <input 
      type="text"
      class="form__input"
      ref="aCodeName" 
      v-model="form.aCodeName"
      :placeholder="$const.message.code.emptyCheck.aCodeName"
      :disabled="!isCreateMode"
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
        id="a-code-useYn-y"
        v-model="form.useYn"
        :value="'Y'"
        :disabled="!isCreateMode && !isModifyMode"
      />
      <label for="a-code-useYn-y">Yes</label>
    </div>
    <div class="mx-4 form__radio">
      <input 
        type="radio"
        id="a-code-useYn-n"
        v-model="form.useYn"
        :value="'N'"
        :disabled="!isCreateMode && !isModifyMode"
      />
      <label for="a-code-useYn-n">No</label>
    </div>
  </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Popup.vue'
import { isEmpty } from '@/utils/comlib'

export default {
  name: 'ACodePopup',
  components: { Popup },
  props: {
    aCodeData: {
      type: String,
      required: false,
      default: '',
    }
  },
  data() {
    return {
      isModifyMode: false,
      popup: {
        name: 'ACodePopup',
        width: '500',
        height: '460',
        title: 'A Code 등록'
      },
      form: {
        aCode: '',
        aCodeName: '',
        useYn: '',
      }
    }
  },
  computed: {
    isCreateMode() {
      return isEmpty(this.aCodeData)
    },
    pageTitle() {
      return this.isCreateMode
        ? 'A Code 등록'
        : this.isModifyMode
        ? 'A Code 수정'
        : 'A Code 정보'
    }
  },
  methods: {
    /* ==== Open ==== */
    async open() {
      await this.$modal.show(this.popup.name)

      if (!this.isCreateMode) {
        // ⚠️ A Code 조회 함수 ⚠️
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
      this.form.aCode = ''
      this.form.aCodeName = ''
      this.form.useYn = ''
    },
    /* ==== 유효성 검사 ==== */
    validation() {
      if (isEmpty(this.form.aCode.trim())) {
        this.$toast.error(this.$const.message.code.emptyCheck.aCode)
        this.$refs.aCode.focus()
        return false
      } 
      
      if (isEmpty(this.form.aCodeName.trim())) {
        this.$toast.error(this.$const.message.code.emptyCheck.aCodeName)
        this.$refs.aCodeName.focus()
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped></style>