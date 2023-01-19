<template>
  <Popup
    :popup-name="popup.name"
    :title="pageTitle"
    :width="popup.width"
    :height="popup.height"
    :use-modify-button="!isCreateMode && !isModifyMode"
    :use-delete-button="!isCreateMode"
    class="CCodePopup"
    @closed="handleClosed"
    @confirm="handleConfirm"
    @deleted="handleDeleted"
    @modify="handleModify"
  >
    <!-- C Code 코드  -->
    <h3 class="my-5 content__subtitle__popup">기본정보</h3>
    <div class="form__list">
      <label
        class="form__label"
        :class="{ 'form__label--required': isCreateMode }"
        >코드</label
      >
      <input
        type="text"
        class="form__input"
        ref="cCode"
        v-model="form.cCd"
        :placeholder="$const.message.code.emptyCheck.cCode"
        :disabled="!isCreateMode"
      />
    </div>
    <!-- C Code 코드 명 -->
    <div class="form__list">
      <label
        class="form__label"
        :class="{ 'form__label--required': isCreateMode || isModifyMode }"
        >코드 명</label
      >
      <input
        type="text"
        class="form__input"
        ref="cCodeName"
        v-model="form.cdNm"
        :placeholder="$const.message.code.emptyCheck.cCodeName"
        :disabled="!isCreateMode && !isModifyMode"
      />
    </div>
    <!-- A Code  -->
    <div class="form__list">
      <label class="form__label"> A Code </label>
      <input
        type="text"
        class="form__input"
        ref="aCode"
        v-model="aCode"
        disabled
      />
    </div>
    <!-- B Code  -->
    <div class="form__list">
      <label class="form__label"> B Code </label>
      <input
        type="text"
        class="form__input"
        ref="bCode"
        v-model="bCode"
        disabled
      />
    </div>
    <!-- 사용 여부 -->
    <div class="form__list">
      <label
        class="form__label"
        :class="{ 'form__label--required': isCreateMode || isModifyMode }"
        >사용 여부</label
      >
      <div class="form__radio">
        <input
          type="radio"
          id="c-code-useYn-y"
          ref="useYn"
          v-model="form.useYn"
          :value="'Y'"
          :disabled="!isCreateMode && !isModifyMode"
        />
        <label for="c-code-useYn-y">Yes</label>
      </div>
      <div class="mx-4 form__radio">
        <input
          type="radio"
          id="c-code-useYn-n"
          v-model="form.useYn"
          :value="'N'"
          :disabled="!isCreateMode && !isModifyMode"
        />
        <label for="c-code-useYn-n">No</label>
      </div>
    </div>
    <!-- 위험 범위 -->
    <h3 class="my-5 content__subtitle__popup" v-if="aCode === 'EQUIP'">
      중장비
    </h3>
    <div class="form__list" v-if="aCode === 'EQUIP'">
      <label class="form__label">위험 범위</label>
      <input
        type="text"
        class="form__input"
        ref="danRange"
        v-model="form.danRange"
        :placeholder="$const.message.code.emptyCheck.danRange"
        :disabled="!isCreateMode && !isModifyMode"
        @input="checkDanRange"
        required="required"
      />
    </div>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup.vue";
import { isEmpty, onlyNumber } from "@/utils/comlib";

export default {
  name: "CCodePopup",
  components: { Popup },
  props: {
    cCode: {
      type: String,
      required: false,
      default: "",
    },
    aCode: {
      type: String,
      required: true,
      default: "",
    },
    bCode: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      isModifyMode: false,
      popup: {
        name: "CCodePopup",
        width: "500",
        height: "500",
        title: "C Code 등록",
      },
      form: {
        cCd: "",
        cdNm: "",
        useYn: "",
        danRange: "",
        bCd: "",
        aCd: "",
      },
    };
  },
  computed: {
    isCreateMode() {
      return isEmpty(this.cCode);
    },
    pageTitle() {
      return this.isCreateMode
        ? "C Code 등록"
        : this.isModifyMode
        ? "C Code 수정"
        : "C Code 정보";
    },
  },
  methods: {
    /* ==== Open ==== */
    async open() {
      await this.$modal.show(this.popup.name);

      if (!this.isCreateMode) {
        const result = await this.$axios.get(
          `/safty/api/cCode/read/${this.cCode}`
        );
        this.form = result.data.data[0];
      }
    },
    /* ==== Closed ==== */
    handleClosed() {
      this.isModifyMode = false;
      this.resetForm();
      this.$modal.hide(this.popup.name);
      this.$emit("close");
    },
    /* ==== Confirm ==== */
    handleConfirm() {
      if (!this.validation()) {
        return;
      }

      this.$confirm(this.$const.message.common.confirm.save)
        .then(() => {
          // 확인 버튼 클릭 시
          this.createModifyACode();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== Deleted ==== */
    handleDeleted() {
      // 확인 버튼 클릭 시
      this.$confirm(this.$const.message.common.confirm.delete)
        .then(async () => {
          await this.$axios.delete(`/safty/api/cCode/delete/${this.cCode}`);
          this.$toast.show(this.$const.message.common.success.delete);
          this.handleClosed();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== Modify Mode ==== */
    handleModify() {
      this.isModifyMode = true;
    },
    /* ==== Create & Modify ==== */
    async createModifyACode() {
      const data = {
        ...this.form,
        bCd: this.bCode,
        aCd: this.aCode,
      };

      if (this.isCreateMode) {
        try {
          await this.$axios.post("/safty/api/cCode/regist", data);
        } catch (error) {
          this.$toast.error(error);
        }
      }

      if (this.isModifyMode) {
        try {
          await this.$axios.put(`/safty/api/cCode/update/${this.cCode}`, data);
          this.isModifyMode = false;
        } catch (error) {
          this.$toast.error(error);
        }
      }
      this.$toast.show(this.$const.message.common.success.save);
      this.handleClosed();
    },
    /* ==== 입력 내용 초기화 ==== */
    resetForm() {
      this.form.cCd = "";
      this.form.cdNm = "";
      this.form.useYn = "";
      this.form.danRange = "";
    },

    /* ==== 위험 범위 숫자만 입력 확인 ==== */
    checkDanRange() {
      const str = this.form.danRange; // 위험 범위
      const last = str[str.length - 1]; // 위험 범위의 마지막 문자열

      if (
        window.onkeydown !== 8 &&
        window.onkeydown !== 46 &&
        !onlyNumber(str)
      ) {
        if (!onlyNumber(last)) {
          this.form.danRange = str.slice(0, -1);

          if (this.form.danRange !== "") {
            this.$toast.error(this.$const.message.common.error.onlyNumber);
          }
        } else {
          this.form.danRange = "";
          this.$toast.error(this.$const.message.common.error.onlyNumber);
        }
      }
    },
    /* ==== 유효성 검사 ==== */
    validation() {
      if (isEmpty(this.form.cCd.trim())) {
        this.$toast.error(this.$const.message.code.emptyCheck.cCode);
        this.$refs.cCode.focus();
        return false;
      }

      if (isEmpty(this.form.cdNm.trim())) {
        this.$toast.error(this.$const.message.code.emptyCheck.cCodeName);
        this.$refs.cCodeName.focus();
        return false;
      }

      if (isEmpty(this.form.useYn)) {
        this.$toast.error(this.$const.message.code.emptyCheck.useYn);
        this.$refs.useYn.focus();
        return false;
      }

      return true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
