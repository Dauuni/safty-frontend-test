script
<template>
  <Popup
    :popup-name="popup.name"
    :title="popup.title"
    :width="popup.width"
    :height="popup.height"
    @closed="handleClosed"
    @confirm="handleConfirm"
  >
    <div class="search-form-sort">
      <!-- 현재 장착된 디바이스 정보 -->
      <h3 class="flex my-5 content__subtitle__popup">
        현재 장착된 디바이스 정보
      </h3>
      <!-- 해제 버튼 -->
      <div class="flex mr-2 btn__minus">
        <button @click="clickClearButton">
          <fa class="fa-2x" icon="minus" />
        </button>
      </div>
    </div>
    <div class="mb-10 grid">
      <table class="grid__base">
        <caption class="hide">
          현재 장착된 디바이스 정보
        </caption>
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>Mac Address</th>
            <th>코드 명</th>
            <th>디바이스 명</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="workerDevice.macAddr">
            <tr>
              <td>{{ workerDevice.macAddr }}</td>
              <td>{{ workerDevice.cdNm }}</td>
              <td>{{ workerDevice.deviceNm }}</td>
            </tr>
          </template>
          <tr v-else class="no-data">
            <td colspan="3">
              {{ $const.message.common.emptyCheck.deviceInfo }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="flex mb-5 content__subtitle__popup">디바이스 목록</h3>
    <!-- 디바이스 목록 -->
    <div class="search-form-sort">
      <div class="mb-4 search-form">
        <!-- B Code -->
        <div class="flex flex-col mr-2">
          <div class="search-form__label">중분류</div>
          <div class="w-24">
            <vue-select
              v-model="search.form.bCd"
              label="cdNm"
              :options="search.bCodeList"
              :reduce="(cdNm) => cdNm.bCd"
              :clearble="false"
              :searchable="false"
              disabled
            />
          </div>
        </div>
        <!-- C Code -->
        <div class="flex flex-col mr-2">
          <div class="search-form__label">소분류</div>
          <div class="w-28">
            <vue-select
              v-model="search.form.cCd"
              label="cdNm"
              :options="search.cCodeList"
              :reduce="(cdNm) => cdNm.cCd"
              :clearble="false"
              :searchable="false"
              disabled
            />
          </div>
        </div>
        <div class="flex flex-col">
          <!-- 검색어 input -->
          <div class="search-form__label">검색어</div>
          <div class="flex items-center">
            <div class="mr-1 search-form__input">
              <input
                type="text"
                v-model="search.form.keyword"
                placeholder="Device"
                @keyup.enter="clickSearchButton"
              />
            </div>
            <button
              type="button"
              class="btn btn--sm btn--line"
              @click="clickSearchButton"
            >
              {{ $const.button.search }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex search-form__checked">
        <!-- 전체보기 -->
        <div class="search-form__pst">
          <input
            type="checkbox"
            id="all"
            v-model="checked"
            checked
            @change="allCheckbox"
          />
          <label class="form__label--all" for="all">전체보기</label>
        </div>
      </div>
    </div>
    <div class="popup__grid">
      <div class="grid">
        <table class="grid__base">
          <caption class="gide">
            디바이스 목록
          </caption>
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="20%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th>Mac Addr</th>
              <th>코드 명</th>
              <th>디바이스 명</th>
              <th>장착 대상</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="device.totalCount > 0">
              <tr
                v-for="device in device.list"
                :key="`device-${device.macAddr}`"
              >
                <td>{{ device.macAddr }}</td>
                <td>{{ device.cdNm }}</td>
                <td>{{ device.deviceNm }}</td>
                <td>{{ device.workerNm }}</td>
                <td>
                  <button
                    class="btn__reg"
                    :disabled="device.workerNm !== ''"
                    @click="clickRegisterButton(device)"
                  >
                    {{ $const.button.register }}
                  </button>
                </td>
              </tr>
            </template>
            <tr v-else class="no-data">
              <td colspan="5">{{ $const.message.common.emptyCheck.device }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  name: "DeviceRegistPopup",
  components: { Popup },
  props: {
    workerIdx: {
      type: Number,
      required: false,
      default: 0,
    },
    workerNm: {
      type: String,
      required: false,
      default: "",
    },
    macAddr: {
      type: String,
      required: false,
      default: "",
    },
    formMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      popup: {
        name: "DeviceRegistPopup",
        title: "근로자 디바이스 등록",
        width: "600",
        height: "600",
      },
      isCancel: false,
      aCd: "DEVICE",
      search: {
        bCodeInitList: [{ bCd: "ALL", cdNm: "전체" }],
        bCodeList: [{ bCd: "ALL", cdNm: "전체" }],
        cCodeInitList: [{ cCd: "ALL", cdNm: "전체" }],
        cCodeList: [{ cCd: "ALL", cdNm: "전체" }],
        form: {
          bCd: "ALL",
          cCd: "ALL",
          keyword: "",
        },
      },
      searched: {
        bCd: "",
        cCd: "",
        keyword: "",
      },
      workerDevice: {
        idx: 0,
        macAddr: "",
        cdNm: "",
        deviceNm: "",
      },
      device: {
        list: [],
        totalCount: 0,
      },
      checked: true,
      putYn: true,
    };
  },
  methods: {
    /* ==== Open ==== */
    async open() {
      await this.$modal.show(this.popup.name);

      if (this.macAddr) {
        const result = await this.$axios.get("/safty/api/deviceMngT/read", {
          params: { macAddr: this.macAddr },
        });
        this.workerDevice = result.data.data[0];
      }

      await this.init();
    },
    /* ==== Closed ==== */
    handleClosed() {
      this.gridInit();
      this.$modal.hide(this.popup.name);
      this.$emit("close");
    },
    /* ==== 초기 세팅 함수 ==== */
    init() {
      this.getBRoleList();
      this.clickSearchButton();
    },
    /* ==== 현재 장착된 디바이스 정보 Grid & search form 초기화 ==== */
    gridInit() {
      this.workerDevice.idx = 0;
      this.workerDevice.macAddr = "";
      this.workerDevice.cdNm = "";
      this.workerDevice.deviceNm = "";
      this.search.form.bCd = this.$const.keys.common.all;
      this.search.form.cCd = this.$const.keys.common.all;
      this.search.form.keyword = "";
    },
    /* ==== 검색 버튼 클릭 시 ==== */
    async clickSearchButton() {
      await this.initSearchedForm();
      this.getDevice();
    },
    /* ==== Searched Form 고정 세팅 ==== */
    initSearchedForm() {
      Object.assign(this.searched, this.search.form);
    },
    /* ==== Device Code 조회 / disabled ==== */
    async getBRoleList() {
      const bCode = await this.$axios.get("/safty/api/bCode/sublist", {
        params: { aCd: this.aCd },
      });
      this.search.bCodeList = this.search.bCodeInitList.concat(bCode.data.data);
      this.search.form.bCd = "MOVE";

      const cCode = await this.$axios.get("/safty/api/cCode/sublist", {
        params: { bCd: this.search.form.bCd },
      });
      this.search.cCodeList = this.search.cCodeInitList.concat(cCode.data.data);
      this.search.form.cCd = "WEAR";
    },
    /* ================================= SELECT BOX 수동적으로 선택 ================================= */
    /* ==== Device B Code 조회 ==== */
    // async getBRoleList() {
    //   const result = await this.$axios.get("/safty/api/bCode/sublist", {
    //     params: { aCd: this.aCd },
    //   });
    //   this.search.bCodeList = this.search.bCodeList.concat(result.data.data);
    // },
    /* ==== B Code select box 내용 변경 시 ==== */
    // async bCodeChange(bCode) {
    //   this.searched.bCd = bCode;
    //   this.search.form.keyword = "";
    //   this.searched.keyword = "";
    //   if (this.search.form.bCd === this.$const.keys.common.all) {
    //     this.searched.cCd = this.$const.keys.common.all;
    //   }
    //   this.getDevice();

    //   if (this.search.form.cCd) {
    //     this.search.form.cCd = this.$const.keys.common.all;
    //   }

    //   const result = await this.$axios.get("/safty/api/cCode/sublist", {
    //     params: { bCd: bCode },
    //   });
    //   this.search.cCodeList = this.search.cCodeInitList.concat(
    //     result.data.data
    //   );
    // },
    /* ==== C Code select box 내용 변경 시 ==== */
    // cCodeChange(cCode) {
    //   this.searched.cCd = cCode;
    //   this.search.form.keyword = "";
    //   this.searched.keyword = "";
    //   this.getDevice();
    // },
    /* =============================================================================================== */
    /* ==== 디바이스 목록 조회 ==== */
    async getDevice() {
      const params = {
        ...this.searched,
      };

      // 중분류가 전체일 때 ' ALL '로 변경
      if (params.bCd === this.$const.keys.common.all) {
        params.bCd = "";
      }

      // 소분류가 전체일 때 ' ALL '로 변경
      if (params.cCd === this.$const.keys.common.all) {
        params.cCd = "";
      }
      try {
        const result = await this.$axios.get(
          "/safty/api/deviceMngT/getListPopup",
          {
            params,
          }
        );
        this.device.list = result.data.data;
        this.device.totalCount = this.device.list.length;

        if (!this.workerIdx && this.macAddr) {
          const deviceMap = this.device.list.find(
            (e) => e.macAddr === this.macAddr
          );
          deviceMap.workerNm = this.workerNm;
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 해제 버튼 클릭 ==== */
    clickClearButton() {
      this.isCancel = true;
      this.workerDevice.macAddr = "";
      this.workerDevice.cdNm = "";
      this.workerDevice.deviceNm = "";

      const deviceMap = this.device.list.find(
        (e) => e.workerNm === this.workerNm
      );
      deviceMap.workerNm = "";
    },
    /* ==== 등록 버튼 클릭 ==== */
    clickRegisterButton(deviceData) {
      const deviceMap = this.device.list.find(
        (e) => e.idx === this.workerDevice.idx
      );

      if (deviceMap !== undefined) {
        deviceMap.workerNm = "";
      }

      deviceData.workerNm = this.workerNm;
      this.workerDevice.idx = deviceData.idx;
      this.workerDevice.macAddr = deviceData.macAddr;
      this.workerDevice.cdNm = deviceData.cdNm;
      this.workerDevice.deviceNm = deviceData.deviceNm;
    },
    /* ==== 확인 버튼 클릭 ==== */
    handleConfirm() {
      this.$confirm(this.$const.message.common.confirm.save)
        .then(async () => {
          if (!this.formMode) {
            await this.mainDeviceRegister();
          } else {
            await this.formDeviceRegister();
          }
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    /* ==== 메인화면 근로자 디바이스 등록 === */
    async mainDeviceRegister() {
      if (this.isCancel) {
        this.putYn = false;
      }

      const data = {
        deviceIdx: this.workerDevice.idx,
        workerIdx: this.workerIdx,
        putYn: this.putYn,
      };

      const macUpdate = {
        idx: this.workerIdx,
        macAddr: this.workerDevice.macAddr,
      };

      try {
        if (!this.isCancel) {
          await this.$axios.post("/safty/api/workerDeviceMapT/regist", data);
        } else {
          await this.$axios.put("/safty/api/workerDeviceMapT/update", data);
          this.putYn = true;
        }
      } catch (error) {
        this.$toast.error(error);
      }
      await this.$axios.put("/safty/api/workerT/update", macUpdate);
      this.isCancel = false;
      this.$toast.show(this.$const.message.common.success.save);
      this.handleClosed();
    },
    /* ==== 폼 화면 디바이스 정보 ==== */
    async formDeviceRegister() {
      const workerDevice = {
        ...this.workerDevice,
        isCancel: this.isCancel,
      };
      await this.$emit("workerDeviceData", workerDevice);
      this.handleClosed();
    },
    /* ==== 전체보기 ==== */
    async allCheckbox() {
      const params = {
        ...this.searched,
      };

      // 중분류가 전체일 때 ' ALL '로 변경
      if (params.bCd === this.$const.keys.common.all) {
        params.bCd = "";
      }

      // 소분류가 전체일 때 ' ALL '로 변경
      if (params.cCd === this.$const.keys.common.all) {
        params.cCd = "";
      }
      try {
        if (!this.checked) {
          const result = await this.$axios.get(
            "/safty/api/deviceMngT/get-list-null",
            { params }
          );
          this.device.list = result.data.data;
          this.device.totalCount = this.device.list.length;
        } else {
          await this.getDevice();
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
