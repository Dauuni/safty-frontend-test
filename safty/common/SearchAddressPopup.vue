<template>
  <Popup
    :popup-name="popup.name"
    :title="popup.title"
    :width="popup.width"
    :height="popup.height"
    :use-footer="true"
    @confirm="handleConfirm"
    @closed="handleClosed"
  >
    <vue-daum-postcode
      v-if="openSearchPost"
      class="mb-10 address"
      @complete="onComplete"
    >
    </vue-daum-postcode>
    <div class="mt-4 px-4">
      <div class="form__list">
        <label class="form__label">기본 주소 </label>
        <input
          type="text"
          v-model="form.normalAddress"
          class="form__input"
          :disabled="openSearchPost"
          :readonly="!openSearchPost"
          :placeholder="$const.message.common.address.auto"
        />
        <button
          v-if="!openSearchPost"
          class="btn btn--md btn--line ml-2"
          @click="searchAddress"
        >
          {{ $const.button.search }}
        </button>
      </div>
      <div class="form__list">
        <label class="form__label">상세 주소</label>
        <input
          type="text"
          ref="detailAddress"
          v-model="form.detailAddress"
          class="form__input"
          :disabled="openSearchPost"
          @keyup.enter="handleConfirm"
        />
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  components: { Popup },
  data() {
    return {
      openSearchPost: true,
      popup: {
        name: "SearchAddressPopup",
        width: "600",
        height: "auto",
        title: "주소 검색",
      },
      form: {
        normalAddress: "",
        detailAddress: "",
      },
    };
  },
  methods: {
    /* ==== 검색 버튼 클릭 ==== */
    searchAddress() {
      this.openSearchPost = !this.openSearchPost;
      this.form.normalAddress = "";
      this.form.detailAddress = "";
    },
    /* ==== 주소 선택 ==== */
    onComplete(addressData) {
      this.openSearchPost = false;
      this.form.normalAddress = addressData.address;
      this.$nextTick(() => {
        this.$refs.detailAddress.focus();
      });
    },
    /* ==== 팝업 Open ==== */
    open() {
      this.$modal.show(this.popup.name);
    },
    /* ==== 팝업 Close ==== */
    close() {
      this.$modal.hide(this.popup.name);
    },
    /* ==== 확인 버튼 클릭 ==== */
    handleConfirm() {
      if (!this.form.detailAddress) {
        this.$toast.show($const.message.worker.emptyCheck.detailAddress);
        return;
      }
      const address = `${this.form.normalAddress}#${this.form.detailAddress}`;
      this.$emit("addressData", address);
      this.close();
    },
    handleClosed() {
      this.openSearchPost = true;
      this.form.normalAddress = "";
      this.form.detailAddress = "";
      this.$emit("closed");
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  height: 380px;
  overflow: auto;
}
::v-deep .vue-daum-postcode-container {
  height: 380px !important;
}
</style>
