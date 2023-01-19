<template>
  <div>
    <!-- 근로자 목록 -->
    <div class="mb-4 flex items-start">
      <div class="mr-4">
        <div class="flex">
          <h1 class="content-template__subtitle">근로자</h1>
          <span
            v-if="registerInfo.workerNm"
            class="content-template__subtitle"
            >{{ "&nbsp-&nbsp" + registerInfo.workerNm }}</span
          >
        </div>
        <!-- 그리드 영역 -->
        <div class="template__grid">
          <div class="grid">
            <div class="grid__template">
              <table class="grid__base">
                <caption class="hide">
                  근로자 목록
                </caption>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="40%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>역할</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="worker.totalCount > 0">
                    <tr
                      v-for="(worker, index) in worker.list"
                      :key="`${worker.workerNm}-${index}`"
                      :class="{
                        'tp-choose': worker.workerNm === registerInfo.workerNm,
                      }"
                      @click="workerChoose(worker)"
                    >
                      <td>{{ worker.workerNm }}</td>
                      <td>{{ worker.cdNm }}</td>
                      <td>{{ worker.mobile }}</td>
                    </tr>
                  </template>
                  <tr v-else class="no-data">
                    <td colspan="3">
                      {{ $const.message.common.emptyCheck.worker }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 디바이스 목록 -->
      <div class="mr-4">
        <div class="flex">
          <h1 class="mb-4 content-template__subtitle">디바이스</h1>
          <span
            v-if="registerInfo.deviceNm"
            class="content-template__subtitle"
            >{{ "&nbsp-&nbsp" + registerInfo.deviceNm }}</span
          >
        </div>
        <!-- 그리드 영역 -->
        <div class="template__grid">
          <div class="grid">
            <div class="grid__template">
              <table class="grid__base">
                <caption class="hide">
                  디바이스 목록
                </caption>
                <colgroup>
                  <col width="20%" />
                  <col width="40%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>디바이스 명</th>
                    <th>Mac Addr</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="registerInfo.workerIdx && device.totalCount > 0"
                  >
                    <tr
                      v-for="(device, index) in device.list"
                      :key="`${device.deviceNm}-${index}`"
                      :class="{
                        'tp-choose': device.idx === registerInfo.deviceIdx,
                      }"
                      @click="deviceChoose(device)"
                    >
                      <td>{{ device.deviceNm }}</td>
                      <td>{{ device.macAddr }}</td>
                    </tr>
                  </template>
                  <tr v-else-if="!registerInfo.workerIdx">
                    <td colspan="2">
                      {{ $const.message.message.device.emptyCheck.checkWorker }}
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="2">
                      {{ $const.message.common.emptyCheck.device }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 등록 버튼 -->
      <div>
        <button class="btn btn--template" @click="workerDeviceReg">
          {{ $const.button.register }}
        </button>
      </div>
    </div>
    <!-- 근로자 디바이스 장착 목록 -->
    <div>
      <div class="search-form-sort">
        <h1 class="mb-4 content-template__subtitle">
          근로자 디바이스 장착 목록
        </h1>
        <button class="btn btn--clear" @click="allClear">
          {{ $const.button.allClear }}
        </button>
      </div>
      <!-- 그리드 영역 -->
      <div class="grid">
        <div class="grid__template">
          <table class="grid__base">
            <caption class="hide">
              근로자 디바이스 장착 목록
            </caption>
            <colgroup>
              <col width="10%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>이름</th>
                <th>역할</th>
                <th>디바이스 명</th>
                <th>Mac Addr</th>
                <th>장착 일시</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="workerDevice.totalCount > 0">
                <tr v-for="(workerDevice, index) in workerDevice.list">
                  <td>{{ workerDevice.workerNm }}</td>
                  <td>{{ workerDevice.cdNm }}</td>
                  <td>{{ workerDevice.deviceNm }}</td>
                  <td>{{ workerDevice.macAddr }}</td>
                  <td>{{ workerDevice.regTime }}</td>
                  <td>
                    <button
                      class="btn__reg"
                      @click="workerDeviceClear(workerDevice)"
                    >
                      {{ $const.button.clear }}
                    </button>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="6">
                  {{ $const.message.common.emptyCheck.workerDevice }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "~/utils/comlib";
export default {
  name: "workerDeviceFromTemplate",
  layout: "NoLayout",
  data() {
    return {
      worker: {
        list: [],
        totalCount: 0,
      },
      device: {
        list: [],
        totalCount: 0,
      },
      workerDevice: {
        list: [],
        totalCount: 0,
        putYn: false,
      },
      registerInfo: {
        workerIdx: 0,
        deviceIdx: 0,
        workerNm: "",
        deviceNm: "",
        putYn: true,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /* ==== mounted ==== */
    init() {
      this.getWorkerList();
      this.getWorkerDeviceList();
    },
    /* ==== 근로자 리스트 조회 ==== */
    async getWorkerList() {
      try {
        const result = await this.$axios.get("/safty/api/workerT/list-worker");
        this.worker.list = result.data.data;
        this.worker.totalCount = this.worker.list.length;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 디바이스 리스트 조회 ==== */
    async getDeviceList() {
      try {
        const result = await this.$axios.get(
          "/safty/api/deviceMngT/get-list-null"
        );
        this.device.list = result.data.data;
        this.device.totalCount = this.device.list.length;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 근로자 디바이스 장착 리스트 조회 ==== */
    async getWorkerDeviceList() {
      try {
        const result = await this.$axios.get(
          "/safty/api/workerDeviceMapT/worker-device"
        );
        this.workerDevice.list = result.data.data;
        this.workerDevice.totalCount = this.workerDevice.list.length;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 근로자 그리드 클릭 ==== */
    async workerChoose(workerData) {
      if (this.registerInfo.deviceIdx) {
        this.registerInfo.deviceIdx = 0;
        this.registerInfo.deviceNm = "";
      }

      await this.getDeviceList();

      this.registerInfo.workerIdx = workerData.idx;
      this.registerInfo.workerNm = workerData.workerNm;
    },
    /* ==== 디바이스 그리드 클릭 ==== */
    deviceChoose(deviceData) {
      const deviceList = this.device.list.find(
        (e) => e.workerNm === this.registerInfo.workerNm
      );
      if (deviceList != undefined) {
        deviceList.workerNm = "";
      }
      deviceData.workerNm = this.registerInfo.workerNm;
      this.registerInfo.deviceIdx = deviceData.idx;
      this.registerInfo.deviceNm = deviceData.deviceNm;
    },
    /* ==== 근로자 디바이스 등록 ==== */
    workerDeviceReg() {
      if (!this.validaion()) {
        return;
      }

      this.$confirm(this.$const.message.common.confirm.save)
        .then(async () => {
          const data = {
            workerIdx: this.registerInfo.workerIdx,
            deviceIdx: this.registerInfo.deviceIdx,
            putYn: this.registerInfo.putYn,
          };
          await this.$axios.post("/safty/api/workerDeviceMapT/regist", data);
          this.$toast.show(this.$const.message.common.success.save);
          await this.init();
          this.registerInfoClear();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== 전체 초기화 버튼 클릭 ==== */
    allClear() {
      this.$confirm(this.$const.message.common.confirm.allClear)
        .then(async () => {
          const data = {
            putYn: this.workerDevice.putYn,
          };
          await this.$axios.put("/safty/api/workerDeviceMapT/all-clear", data);
          this.$toast.show(this.$const.message.common.success.allClear);
          this.registerInfoClear();
          this.init();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== 근로자 디바이스 장착 해제 버튼 클릭 ==== */
    workerDeviceClear(workerDeviceData) {
      this.$confirm(this.$const.message.common.confirm.clear)
        .then(async () => {
          const data = {
            idx: workerDeviceData.idx,
            putYn: this.workerDevice.putYn,
          };

          await this.$axios.put("/safty/api/workerDeviceMapT/update", data);
          this.$toast.show(this.$const.message.common.success.clear);
          this.registerInfoClear();
          this.init();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== 등록 정보 데이터 초기화 ==== */
    registerInfoClear() {
      this.registerInfo.workerIdx = 0;
      this.registerInfo.deviceIdx = 0;
      this.registerInfo.workerNm = "";
      this.registerInfo.deviceNm = "";
    },
    /* ==== 유효성 검사 ==== */
    validaion() {
      // 근로자 선택하지 않고 등록 버튼 눌렀을 경우
      if (
        isEmpty(this.registerInfo.workerIdx) ||
        isEmpty(this.registerInfo.workerNm.trim())
      ) {
        this.$toast.error(
          this.$const.message.message.device.emptyCheck.checkWorker
        );
        return false;
      }
      // 디바이스 선택하지 않고 등록 버튼 눌렀을 경우
      if (
        isEmpty(this.registerInfo.deviceIdx) ||
        isEmpty(this.registerInfo.deviceNm.trim())
      ) {
        this.$toast.error(
          this.$const.message.message.device.emptyCheck.checkDevice
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
