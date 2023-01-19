<template>
  <div class="UserList">
    <!-- 타이틀 -->
    <h1 class="mb-5 content__subtitle">근로자 관리</h1>
    <div class="mb-5 contour"></div>
    <!-- 컨텐츠 영역 -->
    <div class="flex items-start">
      <!-- 당일 근태 현황 -->
      <div class="w-1/2 h-1/2 mr-3 mb-4">
        <div class="mb-4 block">
          <div class="block__worker">
            <span class="block__name">당일 근태 현황</span>
          </div>
        </div>
        <!-- 당일 근태 현황 그래프 -->
        <DoughnutChart />
      </div>
      <!-- 주간 근태 현황 -->
      <div class="w-1/2 h-1/2 mr-3 mb-4">
        <div class="mb-4 block">
          <div class="block__worker">
            <span class="block__name">주간 근태 현황</span>
          </div>
        </div>
        <!-- 주간 그래프 -->
        <BarChart />
      </div>
    </div>
    <!-- 근로자 목록 -->
    <div>
      <!-- 검색 Form -->
      <div class="search-form-sort">
        <div class="mb-4 search-form">
          <!-- 출근 여부 -->
          <div class="flex flex-col mr-2">
            <div class="search-form__label">출근 여부</div>
            <div class="w-24">
              <vue-select
                v-model="worker.search.form.gtwYn"
                label="codeName"
                :options="worker.search.gtwYnList"
                :reduce="(codeName) => codeName.code"
                :clearable="false"
                :searchable="false"
                @input="gtwYnChange"
              />
            </div>
          </div>
          <!-- 역할 -->
          <div class="flex flex-col mr-2">
            <div class="search-form__label">역할</div>
            <div class="flex">
              <div class="w-24 mr-2">
                <vue-select
                  v-model="worker.search.form.bCd"
                  label="cdNm"
                  :options="worker.search.bRoleList"
                  :reduce="(cdNm) => cdNm.bCd"
                  :clearable="false"
                  :searchable="false"
                  @input="bRoleChange"
                />
              </div>
              <div class="w-32">
                <vue-select
                  v-model="worker.search.form.cCd"
                  label="cdNm"
                  :options="worker.search.cRoleList"
                  :reduce="(cdNm) => cdNm.cCd"
                  :clearable="false"
                  :searchable="false"
                  :disabled="worker.search.form.bCd === $const.keys.common.all"
                  @input="cRoleChange"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <!-- 근로자 input -->
            <div class="search-form__label">검색어</div>
            <div class="flex items-center">
              <div class="mr-2 search-form__input">
                <input
                  type="text"
                  v-model="worker.search.form.keyword"
                  placeholder="Worker"
                  @keyup.enter="clickSearchButtonWorker"
                />
              </div>
              <!-- 검색 버튼 -->
              <button
                type="button"
                class="mr-2 btn btn--sm btn--line"
                @click="clickSearchButtonWorker"
              >
                {{ $const.button.search }}
              </button>
            </div>
          </div>
        </div>
        <!-- 등록 버튼 -->
        <div class="flex mr-2 btn__create">
          <button @click="openFormPage">
            <fa class="fa-2x" icon="plus" />
          </button>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="grid__worker">
        <table class="grid__base">
          <caption class="hide">
            근로자 리스트
          </caption>
          <colgroup>
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="15%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>이름</th>
              <th>역할</th>
              <th>휴대폰번호</th>
              <th>현장</th>
              <th>MAC Addr</th>
              <th>디바이스 등록</th>
              <th>출근 여부</th>
              <th>등록 날짜</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="worker.grid.totalCount > 0">
              <tr
                v-for="(worker, index) in worker.grid.list"
                :key="`Worker-${worker.idx}`"
                @click="openFormPage(worker)"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ worker.workerNm }}</td>
                <td>{{ worker.cdNm }}</td>
                <td>{{ worker.mobile }}</td>
                <td>{{ worker.area }}</td>
                <td>{{ worker.macAddr }}</td>
                <td class="no-hover" id="td_device">
                  <button @click.stop="`#td_device`, openDevicePopup(worker)">
                    <fa icon="mobile-screen-button" class="fa-lg" />
                  </button>
                </td>
                <td>
                  <fa
                    icon="circle"
                    :class="{
                      dataY: worker.gtwYn === 'Y',
                      dataN: worker.gtwYn === 'N',
                    }"
                  />
                </td>
                <td>{{ worker.crteDt }}</td>
              </tr>
            </template>
            <tr v-else class="no-data">
              <td colspan="9">
                {{ $const.message.common.emptyCheck.worker }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="worker.grid.totalCount > 5"
        :total-count="worker.grid.totalCount"
        :current-page="worker.grid.pNum"
        :limit="worker.grid.pSize"
        @changePage="changeWorkerPage"
      />
    </div>
    <DeviceRegistPopup
      ref="devicePopup"
      :worker-idx="worker.popup.idx"
      :worker-nm="worker.popup.workerNm"
      :mac-addr="worker.popup.macAddr"
      @close="clickSearchButtonWorker"
    />
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart.vue";
import BarChart from "@/components/BarChart.vue";
import DeviceRegistPopup from "@/safty/worker/DeviceRegistPopup.vue";

export default {
  name: "Worker",
  components: { DoughnutChart, BarChart, DeviceRegistPopup },
  data() {
    return {
      worker: {
        aCd: "WORKER",
        search: {
          gtwYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          bRoleList: [{ bCd: "ALL", cdNm: "전체" }],
          cRoleInitList: [{ cCd: "ALL", cdNm: "전체" }],
          cRoleList: [{ cCd: "ALL", cdNm: "전체" }],
          form: {
            bCd: "ALL",
            cCd: "ALL",
            gtwYn: "ALL",
            keyword: "",
          },
        },
        grid: {
          list: [],
          totalCount: 0,
          pNum: 0,
          pSize: 5,
        },
        searched: {
          bCd: "",
          cCd: "",
          gtwYn: "",
          keyword: "",
        },
        popup: {
          idx: 0,
          workerNm: "",
          macAddr: "",
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /* ==== mounted ==== */
    init() {
      this.getBRoleList();
      this.clickSearchButtonWorker();
    },
    /* ===== 근로자 역할 조회 ==== */
    async getBRoleList() {
      const result = await this.$axios.get("/safty/api/bCode/sublist", {
        params: { aCd: this.worker.aCd },
      });
      this.worker.search.bRoleList = this.worker.search.bRoleList.concat(
        result.data.data
      );
    },
    /* ==== 검색 버튼 클릭 시 ==== */
    clickSearchButtonWorker() {
      this.initWorkerSearchedForm();
      this.worker.grid.pNum = 0;
      this.getWorker();
    },
    /* ==== Searched Form 고정 세팅 ====*/
    initWorkerSearchedForm() {
      Object.assign(this.worker.searched, this.worker.search.form);
    },
    /* ==== 근로자 조회 ==== */
    async getWorker() {
      const params = {
        ...this.worker.searched,
        pNum: this.worker.grid.pNum + 1,
        pSize: this.worker.grid.pSize,
      };
      // 출근 여부가 전체일 때
      if (params.gtwYn === this.$const.keys.common.all) {
        params.gtwYn = "";
      }

      // 역할이 전체일 때
      if (params.bCd === this.$const.keys.common.all) {
        params.bCd = "";
      }

      if (params.cCd === this.$const.keys.common.all) {
        params.cCd = "";
      }

      try {
        const result = await this.$axios.get("/safty/api/workerT/getList", {
          params,
        });
        this.worker.grid.list = result.data.data.dataList;
        this.worker.grid.totalCount = result.data.data.totalCount;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== 출근 여부 select box 선택 시 ==== */
    gtwYnChange(gtwYn) {
      this.worker.grid.pNum = 0;
      this.worker.searched.gtwYn = gtwYn;
      this.worker.search.form.keyword = "";
      this.worker.searched.keyword = "";
      this.getWorker();
    },
    /* ==== 역할 B Code select box 선택 시 ==== */
    async bRoleChange(bCode) {
      this.worker.grid.pNum = 0;
      this.worker.searched.bCd = bCode;
      this.worker.search.form.keyword = "";
      this.worker.searched.keyword = "";
      if (this.worker.search.form.bCd === this.$const.keys.common.all) {
        this.worker.searched.cCd = this.$const.keys.common.all;
      }
      this.getWorker();

      if (this.worker.search.form.cCd) {
        this.worker.search.form.cCd = this.$const.keys.common.all;
      }
      const result = await this.$axios.get("/safty/api/cCode/sublist", {
        params: { bCd: bCode },
      });
      this.worker.search.cRoleList = this.worker.search.cRoleInitList.concat(
        result.data.data
      );
    },
    /* ==== 역할 C Code select box 선택 시 ==== */
    cRoleChange(cCode) {
      this.worker.grid.pNum = 0;
      this.worker.searched.cCd = cCode;
      this.worker.search.form.keyword = "";
      this.worker.searched.keyword = "";
      this.getWorker();
    },
    /* ==== 정보 페이지 Open ==== */
    openFormPage(workerData) {
      let pageId = "create";

      if (workerData.idx) {
        pageId = workerData.idx;
      }

      const pathObj = {
        name: "worker-id",
        params: {
          id: pageId,
        },
      };

      this.$router.push(pathObj);
    },
    /* ==== 디바이스 등록 Popup Open ==== */
    openDevicePopup(workerData) {
      this.worker.popup.idx = workerData.idx;
      this.worker.popup.workerNm = workerData.workerNm;
      this.worker.popup.macAddr = workerData.macAddr;
      this.$refs.devicePopup.open();
    },
    /* ==== 페이지 이동 ==== */
    changeWorkerPage(page) {
      this.worker.grid.pNum = page;
      Object.assign(this.worker.search.form, this.worker.searched);
      this.getWorker();
    },
  },
};
</script>

<style lang="scss" scoped></style>
