<template>
  <div>
    <client-only>
      <div>
        <date-picker
          v-model="date"
          value-type="format"
          :clearable="false"
          :editable="false"
          :disabled-date="disabledDate"
          :placeholder="datePlaceholder"
          :disabled="readOnly"
        ></date-picker>
      </div>
    </client-only>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    future: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    defaultMonth: {
      type: Number,
      require: false,
      default: 3,
    },
    datePlaceholder: {
      type: String,
      require: false,
      default: "날짜를 선택해 주세요.",
    },
    selectDay: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      nowDay: dayjs().format("YYYY-MM-DD"),
    };
  },
  computed: {
    date: {
      get() {
        return this.selectDay;
      },
      set(newVal) {
        this.$emit("dateChange", newVal);
      },
    },
  },
  methods: {
    disabledDate(date) {
      // 오늘 이후 날짜 선택 여부 결정
      if (this.disabled && this.nowDay) {
        return date > new Date(this.nowDay);
      }
      if (this.nowDay) {
        return date > new Date(this.nowDay);
      }
      if (this.disabled) {
        return date > new Date();
      }
      return;
    },
  },
};
</script>

<style lang="scss" scoped></style>
