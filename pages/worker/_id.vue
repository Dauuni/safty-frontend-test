<template>
  <div class="flex flex-col WorkerDetail">
    <div class="mb-4 block">
      <div class="block__worker">
        <span class="block__name">{{
          mode === this.$const.keys.mode.read ? "근로자 정보" : "근로자 등록"
        }}</span>
      </div>
    </div>
    <div>
      <!-- 기본 정보 -->
      <div class="mb-5 cont-box">
        <h3 class="mb-5 content__pagetitle">기본 정보</h3>
        <!-- 근로자 이름 -->
        <div class="w-1/3 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >이름</label
          >
          <input
            type="text"
            v-model="worker.workerNm"
            class="form__input"
            :placeholder="$const.message.worker.emptyCheck.workerNm"
            :disabled="mode === $const.keys.mode.read"
          />
        </div>
        <!-- 성별 -->
        <div class="w-1/2 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >성별</label
          >
          <div class="form__create__radio">
            <input
              type="radio"
              id="worker-gender-man"
              v-model="worker.gender"
              :value="`MAN`"
              :disabled="mode === $const.keys.mode.read"
            />
            <label for="worker-gender-man">남자</label>
          </div>
          <div class="mx-4 form__create__radio">
            <input
              type="radio"
              id="worker-gender-woman"
              v-model="worker.gender"
              :value="`WOMAN`"
              :disabled="mode === $const.keys.mode.read"
            />
            <label for="worker-gender-woman">여자</label>
          </div>
        </div>
        <!-- 휴대폰 번호 -->
        <div class="w-1/3 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >휴대폰 번호</label
          >
          <input
            type="text"
            v-model="worker.mobile"
            class="form__input"
            :placeholder="$const.message.worker.emptyCheck.mobile"
            :disabled="mode === $const.keys.mode.read"
          />
        </div>
        <!-- 생년월일 -->
        <div class="w-1/2 form__list">
          <label class="form__info">생년월일</label>
          <Date
            ref="birthday"
            :read-only="mode === $const.keys.mode.read"
            :select-day="worker.birthday"
            @dateChange="setBirthday"
          />
        </div>
        <!-- 주소 -->
        <div class="w-1/2 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >주소</label
          >
          <input
            type="address"
            class="flex-1 mr-2 form__input"
            v-model="worker.address"
            :placeholder="$const.message.worker.emptyCheck.searchAddr"
            disabled
          />
          <button
            v-if="mode !== $const.keys.mode.read"
            :disabled="mode === $const.keys.mode.read"
            class="btn btn--md btn--line"
            @click="searchAddress"
          >
            {{ $const.button.search }}
          </button>
        </div>
        <!-- 역할 -->
        <div class="w-1/3 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >역할</label
          >
          <div class="w-28 mr-2">
            <vue-select
              v-model="worker.bCd"
              label="cdNm"
              :options="select.bCdList"
              :reduce="(cdNm) => cdNm.bCd"
              :clearble="false"
              :searchable="false"
              :disabled="mode === $const.keys.mode.read"
              placeholder="선택"
              @input="getRoleCList"
            />
          </div>
          <div class="w-36">
            <vue-select
              v-model="worker.cCd"
              label="cdNm"
              :options="select.cCdList"
              :reduce="(cdNm) => cdNm.cCd"
              :clearble="false"
              :searchable="false"
              placeholder="선택"
              :disabled="mode === $const.keys.mode.read || !worker.bCd"
            />
          </div>
        </div>
        <!-- 입사 날짜 -->
        <div class="w-1/2 form__list">
          <label class="form__info">입사 날짜</label>
          <Date
            ref="joinDt"
            :date-mode="$const.keys.mode.joinDt"
            :read-only="mode === $const.keys.mode.read"
            :select-day="worker.joinDt"
            @dateChange="setJoinDt"
          />
        </div>
        <!-- 외국인 여부 -->
        <div class="w-1/2 form__list">
          <label
            class="form__info"
            :class="{ 'form__info--required': mode !== $const.keys.mode.read }"
            >외국인 여부</label
          >
          <div class="form__create__radio">
            <input
              type="radio"
              id="worker-foreigner-y"
              v-model="worker.foreigner"
              :value="`Y`"
              :disabled="mode === $const.keys.mode.read"
            />
            <label for="worker-foreigner-y">Yes</label>
          </div>
          <div class="mx-4 form__create__radio">
            <input
              type="radio"
              id="worker-foreigner-n"
              v-model="worker.foreigner"
              :value="`N`"
              :disabled="mode === $const.keys.mode.read"
            />
            <label for="worker-foreigner-n">No</label>
          </div>
        </div>
        <!-- 디바이스 정보 -->
        <div class="w-1/3 form__list">
          <label class="form__info">디바이스 정보</label>
          <input
            type="text"
            v-model="macAddr"
            class="flex-1 mr-2 form__input"
            :placeholder="$const.message.worker.emptyCheck.device"
            disabled
          />
          <button
            v-if="mode !== $const.keys.mode.read"
            :disabled="mode === $const.keys.mode.read"
            class="btn btn--md btn--line"
            @click="deviceRegistPopup"
          >
            {{ $const.button.search }}
          </button>
        </div>
        <div class="text-right mt-4">
          <button
            type="buttom"
            class="mr-2 btn__cancel"
            v-if="mode !== $const.keys.mode.read"
            @click="goToWorkerList"
          >
            {{ $const.button.cancel }}
          </button>
          <button
            type="buttom"
            class="mr-2 btn__list"
            v-if="mode === $const.keys.mode.read"
            @click="goToWorkerList"
          >
            {{ $const.button.list }}
          </button>
          <button
            type="buttom"
            class="mr-2 btn__delete"
            v-if="mode !== $const.keys.mode.create"
            @click="deleteWorker"
          >
            {{ $const.button.delete }}
          </button>
          <button
            type="buttom"
            class="mr-2 btn__ok"
            v-if="mode === $const.keys.mode.read"
            @click="clickModifyButton"
          >
            {{ $const.button.modify }}
          </button>
          <button
            type="buttom"
            class="mr-2 btn__ok"
            v-if="mode !== $const.keys.mode.read"
            @click="clickConfirmButton"
          >
            {{ $const.button.confirm }}
          </button>
        </div>
      </div>
    </div>
    <SearchAddressPopup ref="searchAddressPopup" @addressData="setAddress" />
    <DeviceRegistPopup
      ref="devicePopup"
      :worker-idx="worker.idx"
      :worker-nm="worker.workerNm"
      :mac-addr="macAddr"
      :form-mode="isFormMode"
      @workerDeviceData="setWorkerDevice"
    />
  </div>
</template>

<script>
import mode from "@/mixins/mode.vue";
import Date from "@/components/Date.vue";
import SearchAddressPopup from "@/safty/common/SearchAddressPopup.vue";
import DeviceRegistPopup from "@/safty/worker/DeviceRegistPopup.vue";

export default {
  name: "worker-id",
  mixins: [mode],
  components: { Date, SearchAddressPopup, DeviceRegistPopup },
  data() {
    return {
      title: "",
      select: {
        bCdList: [],
        cCdList: [],
      },
      worker: {
        idx: 0,
        workerNm: "",
        gender: "",
        mobile: "",
        birthday: "",
        address: "",
        aCd: "WORKER",
        bCd: "",
        cCd: "",
        crteDt: "",
        joinDt: "",
        foreigner: "",
        gtwYn: "",
      },
      deviceData: {
        idx: 0,
        macAddr: "",
        cdNm: "",
        deviceNm: "",
      },
      macAddr: "",
      isCancel: false,
      isFormMode: false,
      putYn: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /* ==== mounted ==== */
    async init() {
      this.mode === this.$const.keys.mode.read &&
        (await this.getWorkerDetail());
      this.getRoleBList();
      this.getRoleCList();
    },
    /* ===== 근로자 역할 B Code 조회 ==== */
    async getRoleBList() {
      const bCodeRole = await this.$axios.get("/safty/api/bCode/sublist", {
        params: { aCd: this.worker.aCd },
      });
      this.select.bCdList = bCodeRole.data.data;
    },
    /* ===== 근로자 역할 C Code 조회 ==== */
    async getRoleCList() {
      if (this.mode !== this.$const.keys.mode.read && this.worker.cCd) {
        this.worker.cCd = "";
      }

      if (this.worker.bCd) {
        const cCodeRole = await this.$axios.get("/safty/api/cCode/sublist", {
          params: { bCd: this.worker.bCd },
        });
        this.select.cCdList = cCodeRole.data.data;
      }
    },
    /* ==== 근로자 등록 or 수정 ==== */
    async createAndModifyWorker() {
      const workerJson = { ...this.worker };

      if (this.mode === this.$const.keys.mode.create) {
        try {
          const result = await this.$axios.post(
            "/safty/api/workerT/regist",
            workerJson
          );
          this.worker.idx = result.data.data;
          await this.deviceWorkerMap();
          this.goToWorkerList();
        } catch (error) {
          this.$toast.error(error);
        }
      } else if (this.mode === this.$const.keys.mode.modify) {
        try {
          await this.$axios.put("/safty/api/workerT/update", workerJson);
          await this.deviceWorkerMap();
          this.isModify = false;
        } catch (error) {
          this.$toast.error(error);
        }
      }
      this.$toast.show(this.$const.message.common.success.save);
    },
    /* ==== 근로자 정보 상세 조회 ==== */
    async getWorkerDetail() {
      try {
        const result = await this.$axios.get(
          `/safty/api/workerT/read/${this.$route.params.id}`
        );
        this.macAddr = result.data.data[0].macAddr;
        delete result.data.data[0]["macAddr"];
        this.worker = result.data.data[0];
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 확인 버튼 클릭 ==== */
    clickConfirmButton() {
      this.$confirm(this.$const.message.common.confirm.save)
        .then(async () => {
          this.createAndModifyWorker();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== 수정 버튼 클릭 ==== */
    clickModifyButton() {
      this.isModify = true;
    },
    /* ==== 주소 검색 팝업창 Open */
    searchAddress() {
      this.$refs.searchAddressPopup.open();
    },
    /* ==== 근로자 목록 화면으로 이동 ==== */
    goToWorkerList() {
      this.$router.push("/worker");
    },
    /* ==== 근로자 삭제 ==== */
    deleteWorker() {
      this.$confirm(this.$const.message.common.confirm.delete)
        .then(async () => {
          await this.$axios.delete(
            `/safty/api/workerT/delete/${this.$route.params.id}`
          );
          this.$toast.show(this.$const.message.common.success.delete);
          this.goToWorkerList();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== Datepicker 생년월일 데이터 ==== */
    setBirthday(date) {
      this.worker.birthday = date;
    },
    /* ==== Datepicker 입사날짜 데이터 ==== */
    setJoinDt(date) {
      this.worker.joinDt = date;
    },
    /* ==== 주소 값 세팅 ==== */
    setAddress(address) {
      const splitAddress = address.split("#");
      this.worker.address = splitAddress[0] + " " + splitAddress[1];
    },
    /* ==== 디바이스 등록 팝업 Open ==== */
    deviceRegistPopup() {
      this.isFormMode = true;
      this.$refs.devicePopup.open();
    },
    /* ==== 디바이스 값 세팅 ==== */
    setWorkerDevice(deviceData) {
      this.isCancel = deviceData.isCancel;
      this.deviceData = deviceData;
      this.macAddr = this.deviceData.macAddr;
    },
    /* ==== 디바이스 근로자 매핑 ==== */
    async deviceWorkerMap() {
      if (this.isCancel) {
        this.putYn = false;
      }

      const data = {
        deviceIdx: this.deviceData.idx,
        workerIdx: this.worker.idx,
        putYn: this.putYn,
      };

      try {
        if (!this.isCancel) {
          await this.$axios.post("/safty/api/workerDeviceMapT/regist", data);
        } else {
          await this.$axios.put("/safty/api/workerDeviceMapT/update", data);
          this.isCancel = true;
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn__cancel,
.btn__list,
.btn__ok,
.btn__delete {
  font-size: 12px;
  padding: 8px 18px;
}

.btn__cancel,
.btn__delete,
.btn__list {
  color: $blue-gray-100;
  background-color: $white-100;
  border-color: $gray-50;
  border-width: 1px;
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
</style>
