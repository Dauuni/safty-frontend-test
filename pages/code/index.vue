<template>
  <div class="CodeList">
    <!-- 타이틀 -->
    <h1 class="mb-5 content__subtitle">코드 관리</h1>
    <div class="mb-5 contour"></div>
    <!-- 컨텐츠 영역 -->
    <div class="flex items-start">
      <!-- A 코드 -->
      <div class="w-1/3 mr-3">
        <div class="mb-4 block">
          <div class="block__code">
            <span class="block__name">A Code</span>
          </div>
        </div>
        <div class="search-form-sort">
          <!-- 검색 Form -->
          <div class="mb-4 search-form">
            <!-- 사용여부 -->
            <div class="flex flex-col mr-2">
              <div class="search-form__label">사용 여부</div>
              <div class="w-24">
                <vue-select
                  v-model="aCd.search.form.useYn"
                  label="codeName"
                  :options="aCd.search.useYnList"
                  :reduce="(codeName) => codeName.code"
                  :clearable="false"
                  :searchable="false"
                  @input="aUseYnChange"
                />
              </div>
            </div>
            <!-- 코드명 input -->
            <div class="flex flex-col">
              <div class="search-form__label">검색어</div>
              <div class="flex items-center">
                <div class="mr-2 search-form__input">
                  <input
                    type="text"
                    v-model="aCd.search.form.keyword"
                    placeholder="A Code"
                    @keyup.enter="clickSearchButtonACode"
                  />
                </div>
                <!-- 검색 버튼 -->
                <button
                  type="button"
                  class="mr-2 btn btn--sm btn--line"
                  @click="clickSearchButtonACode"
                >
                  {{ $const.button.search }}
                </button>
              </div>
            </div>
          </div>
          <!-- 등록 버튼 -->
          <div class="flex mr-2 btn__create">
            <button @click="openACodePopup">
              <fa class="fa-2x" icon="plus" />
            </button>
          </div>
        </div>
        <!-- 그리드 영역 -->
        <div class="grid">
          <div class="grid__wrap">
            <table class="grid__base">
              <caption class="hide">
                A Code 리스트
              </caption>
              <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="30%" />
                <col width="20%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>코드</th>
                  <th>코드 명</th>
                  <th>사용 여부</th>
                  <th>B</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="aCd.grid.totalCount > 0">
                  <tr
                    v-for="(aCode, index) in aCd.grid.list"
                    :key="`aCode-${aCode.aCd}`"
                    :class="{
                      'grid--active': aCd.grid.isActive === aCode.aCd,
                    }"
                    @click="openACodePopup(aCode)"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ aCode.aCd }}</td>
                    <td>
                      {{ aCode.cdNm }}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{
                          dataY: aCode.useYn === 'Y',
                          dataN: aCode.useYn === 'N',
                        }"
                      />
                    </td>
                    <td class="no-hover" id="td_b">
                      <button
                        :class="{
                          'button--active': aCd.grid.isActive === aCode.aCd,
                        }"
                        @click.stop="`#td_b`, showBCodeList(aCode.aCd)"
                      >
                        <fa icon="circle-right" />
                      </button>
                    </td>
                  </tr>
                </template>
                <tr v-else class="no-data">
                  <td colspan="5">
                    {{ $const.message.common.emptyCheck.aCode }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            v-if="aCd.grid.totalCount > 10"
            :total-count="aCd.grid.totalCount"
            :current-page="aCd.grid.pNum"
            :limit="aCd.grid.pSize"
            @changePage="changeACodePage"
          />
        </div>
      </div>
      <!-- B 코드 -->
      <div class="w-1/3 mr-3">
        <div class="mb-4 block">
          <div class="block__code">
            <span class="block__name">B Code</span>
          </div>
        </div>
        <div class="search-form-sort">
          <!-- 검색 Form -->
          <div class="mb-4 search-form">
            <!-- 사용여부 -->
            <div class="flex flex-col mr-2">
              <div class="search-form__label">사용 여부</div>
              <div class="w-24">
                <vue-select
                  v-model="bCd.search.form.useYn"
                  label="codeName"
                  :options="bCd.search.useYnList"
                  :reduce="(codeName) => codeName.code"
                  :clearable="false"
                  :searchable="false"
                  :disabled="!bCd.searched.aCd"
                  @input="bUseYnChange"
                />
              </div>
            </div>
            <!-- 코드명 input -->
            <div class="flex flex-col">
              <div class="search-form__label">코드 명</div>
              <div class="flex items-center">
                <div class="mr-2 search-form__input">
                  <input
                    type="text"
                    v-model="bCd.search.form.keyword"
                    placeholder="B Code"
                    :disabled="!bCd.searched.aCd"
                    @keyup.enter="clickSearchButtonBCode"
                  />
                </div>
                <!-- 검색 버튼 -->
                <button
                  type="button"
                  class="mr-2 btn btn--sm btn--line"
                  :disabled="!bCd.searched.aCd"
                  @click="clickSearchButtonBCode"
                >
                  {{ $const.button.search }}
                </button>
              </div>
            </div>
          </div>
          <!-- 등록 버튼 -->
          <div class="flex mr-2 btn__create">
            <button @click="openBCodePopup" :disabled="!bCd.searched.aCd">
              <fa class="fa-2x" icon="plus" />
            </button>
          </div>
        </div>
        <!-- 그리드 영역 -->
        <div class="grid">
          <div class="grid__wrap">
            <table class="grid__base">
              <caption class="hide">
                B Code 리스트
              </caption>
              <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="30%" />
                <col width="20%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>코드</th>
                  <th>코드 명</th>
                  <th>사용 여부</th>
                  <th>C</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="bCd.searched.aCd && bCd.grid.totalCount > 0">
                  <tr
                    v-for="(bCode, index) in bCd.grid.list"
                    :key="`bCode-${bCode.bCd}`"
                    :class="{
                      'grid--active': bCd.grid.isActive === bCode.bCd,
                    }"
                    @click="openBCodePopup(bCode)"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ bCode.bCd }}</td>
                    <td>
                      {{ bCode.cdNm }}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{
                          dataY: bCode.useYn === 'Y',
                          dataN: bCode.useYn === 'N',
                        }"
                      />
                    </td>
                    <td class="no-hover" id="td_c">
                      <button
                        :class="{
                          'button--active': bCd.grid.isActive === bCode.bCd,
                        }"
                        @click.stop="`#td_c`, showCCodeList(bCode.bCd)"
                      >
                        <fa icon="circle-right" />
                      </button>
                    </td>
                  </tr>
                </template>
                <tr v-if="!bCd.searched.aCd" class="no-data">
                  <td colspan="5">
                    {{ $const.message.message.code.emptyCheck.checkACode }}
                  </td>
                </tr>
                <tr
                  v-if="bCd.searched.aCd && !bCd.grid.totalCount"
                  class="no-data"
                >
                  <td colspan="5">
                    {{ $const.message.common.emptyCheck.bCode }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            v-if="bCd.grid.totalCount > 10"
            :total-count="bCd.grid.totalCount"
            :current-page="bCd.grid.pNum"
            :limit="bCd.grid.pSize"
            @changePage="changeBCodePage"
          />
        </div>
      </div>
      <!-- C 코드 -->
      <div class="w-1/3">
        <div class="mb-4 block">
          <div class="block__code">
            <span class="block__name">C Code</span>
          </div>
        </div>
        <div class="search-form-sort">
          <!-- 검색 Form -->
          <div class="mb-4 search-form">
            <!-- 사용여부 -->
            <div class="flex flex-col mr-2">
              <div class="search-form__label">사용 여부</div>
              <div class="w-24">
                <vue-select
                  v-model="cCd.search.form.useYn"
                  label="codeName"
                  :options="cCd.search.useYnList"
                  :reduce="(codeName) => codeName.code"
                  :clearable="false"
                  :searchable="false"
                  :disabled="!cCd.searched.bCd"
                  @input="cUseYnChange"
                />
              </div>
            </div>
            <!-- 코드명 input -->
            <div class="flex flex-col">
              <div class="search-form__label">코드 명</div>
              <div class="flex items-center">
                <div class="mr-2 search-form__input">
                  <input
                    type="text"
                    v-model="cCd.search.form.keyword"
                    placeholder="C Code"
                    :disabled="!cCd.searched.bCd"
                    @keyup.enter="clickSearchButtonCCode"
                  />
                </div>
                <!-- 검색 버튼 -->
                <button
                  type="button"
                  class="mr-2 btn btn--sm btn--line"
                  :disabled="!cCd.searched.bCd"
                  @click="clickSearchButtonCCode"
                >
                  {{ $const.button.search }}
                </button>
              </div>
            </div>
          </div>
          <!-- 등록 버튼 -->
          <div class="flex mr-2 btn__create">
            <button :disabled="!cCd.searched.bCd" @click="openCCodePopup">
              <fa class="fa-2x" icon="plus" />
            </button>
          </div>
        </div>
        <!-- 그리드 영역 -->
        <div class="grid">
          <div class="grid__wrap">
            <table v-if="bCd.searched.aCd !== 'EQUIP'" class="grid__base">
              <caption class="hide">
                C Code 리스트
              </caption>
              <colgroup>
                <col width="10%" />
                <col width="35%" />
                <col width="35%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>코드</th>
                  <th>코드 명</th>
                  <th>사용 여부</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cCd.searched.bCd && cCd.grid.totalCount > 0">
                  <tr
                    v-for="(cCode, index) in cCd.grid.list"
                    :key="`cCode-${cCode.cCd}`"
                    :class="{
                      'grid--active': cCd.grid.isActive === cCode.cCd,
                    }"
                    @click="openCCodePopup(cCode)"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ cCode.cCd }}</td>
                    <td>
                      {{ cCode.cdNm }}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{
                          dataY: cCode.useYn === 'Y',
                          dataN: cCode.useYn === 'N',
                        }"
                      />
                    </td>
                  </tr>
                </template>
                <tr v-if="!cCd.searched.bCd" class="no-data">
                  <td colspan="4">
                    {{ $const.message.message.code.emptyCheck.checkBCode }}
                  </td>
                </tr>
                <tr
                  v-if="cCd.searched.bCd && !cCd.grid.totalCount"
                  class="no-data"
                >
                  <td colspan="4">
                    {{ $const.message.common.emptyCheck.cCode }}
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-else class="grid__base">
              <caption class="hide">
                C Code 리스트
              </caption>
              <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="25%" />
                <col width="15%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>코드</th>
                  <th>코드 명</th>
                  <th>위험 범위</th>
                  <th>사용 여부</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cCd.searched.bCd && cCd.grid.totalCount > 0">
                  <tr
                    v-for="(cCode, index) in cCd.grid.list"
                    :key="`cCode-${cCode.cCd}`"
                    :class="{
                      'grid--active': cCd.grid.isActive === cCode.cCd,
                    }"
                    @click="openCCodePopup(cCode)"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ cCode.cCd }}</td>
                    <td>
                      {{ cCode.cdNm }}
                    </td>
                    <td>
                      {{ cCode.danRange }}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{
                          dataY: cCode.useYn === 'Y',
                          dataN: cCode.useYn === 'N',
                        }"
                      />
                    </td>
                  </tr>
                </template>
                <tr v-if="!cCd.searched.bCd" class="no-data">
                  <td colspan="5">
                    {{ $const.message.message.code.emptyCheck.checkBCode }}
                  </td>
                </tr>
                <tr
                  v-if="cCd.searched.bCd && !cCd.grid.totalCount"
                  class="no-data"
                >
                  <td colspan="5">
                    {{ $const.message.common.emptyCheck.cCode }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            v-if="cCd.grid.totalCount > 10"
            :total-count="cCd.grid.totalCount"
            :current-page="cCd.grid.pNum"
            :limit="cCd.grid.pSize"
            @changePage="changeCCodePage"
          />
        </div>
      </div>
    </div>
    <ACodePopup
      ref="aCode"
      :a-code="aCd.popup.aCode"
      @close="clickSearchButtonACode"
    />
    <BCodePopup
      ref="bCode"
      :b-code="bCd.popup.bCode"
      :a-code="bCd.searched.aCd"
      @close="clickSearchButtonBCode"
    />
    <CCodePopup
      ref="cCode"
      :c-code="cCd.popup.cCode"
      :a-code="bCd.searched.aCd"
      :b-code="cCd.searched.bCd"
      @close="clickSearchButtonCCode"
    />
  </div>
</template>

<script>
import ACodePopup from "@/safty/code/ACodePopup";
import BCodePopup from "@/safty/code/BCodePopup";
import CCodePopup from "@/safty/code/CCodePopup";

export default {
  name: "Code",
  components: {
    ACodePopup,
    BCodePopup,
    CCodePopup,
  },
  data() {
    return {
      modal: true,
      aCd: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: "",
            useYn: "ALL",
          },
        },
        grid: {
          isActive: false,
          list: [],
          totalCount: 0,
          pNum: 0,
          pSize: 10,
        },
        searched: {
          useYn: "",
          keyword: "",
        },
        popup: {
          aCode: "",
        },
      },
      bCd: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: "",
            useYn: "ALL",
          },
        },
        grid: {
          isActive: false,
          list: [],
          totalCount: 0,
          pNum: 0,
          pSize: 10,
        },
        searched: {
          useYn: "",
          keyword: "",
          aCd: "",
        },
        popup: {
          bCode: "",
        },
      },
      cCd: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: "",
            useYn: "ALL",
          },
        },
        grid: {
          list: [],
          totalCount: 0,
          pNum: 0,
          pSize: 10,
          pIndex: 0,
        },
        searched: {
          useYn: "",
          keyword: "",
          bCd: "",
        },
        popup: {
          cCode: "",
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
      this.clickSearchButtonACode();
    },
    /* ==== A Code 검색 버튼 클릭 시 ==== */
    clickSearchButtonACode() {
      this.initACodeSearchedForm();

      if (!this.aCd.popup.aCode) {
        this.aCd.grid.pNum = 0;
      }

      if (this.bCd.searched.aCd) {
        this.bCd.grid.list = [];
        this.bCd.grid.totalCount = 0;
        this.bCd.searched.aCd = "";
      }

      if (this.cCd.searched.bCd) {
        this.cCd.grid.list = [];
        this.cCd.grid.totalCount = 0;
        this.cCd.searched.bCd = "";
      }

      this.getACode();
    },
    /* ==== B Code 검색 버튼 클릭 시 ==== */
    clickSearchButtonBCode() {
      if (!this.bCd.searched.aCd) {
        this.$toast.show(this.$const.message.code.emptyCheck.checkACode);
      } else {
        this.initBCodeSearchedForm();

        if (!this.bCd.popup.bCode) {
          this.bCd.grid.pNum = 0;
        }

        if (this.cCd.searched.bCd) {
          this.cCd.grid.list = [];
          this.cCd.grid.totalCount = 0;
          this.cCd.searched.bCd = "";
        }

        this.getBCode();
      }
    },
    /* ==== C Code 검색 버튼 클릭 시 ==== */
    clickSearchButtonCCode() {
      if (!this.cCd.searched.bCd) {
        this.$toast.show(this.$const.message.code.emptyCheck.checkBCode);
      } else {
        this.initCCodeSearchedForm();

        if (!this.cCd.popup.cCode) {
          this.cCd.grid.pNum = 0;
        }

        this.getCCode();
      }
    },
    /* ==== A Code Searched Form 고정 세팅 ==== */
    initACodeSearchedForm() {
      Object.assign(this.aCd.searched, this.aCd.search.form);
    },
    /* ==== A Code 조회 ==== */
    async getACode() {
      const params = {
        ...this.aCd.searched,
        pNum: this.aCd.grid.pNum + 1,
        pSize: this.aCd.grid.pSize,
      };

      // 사용 여부가 전체일 때
      if (params.useYn === this.$const.keys.common.all) {
        params.useYn = "";
      }
      try {
        const result = await this.$axios.get("/safty/api/aCode/getList", {
          params,
        });
        this.aCd.grid.list = result.data.data.dataList;
        this.aCd.grid.totalCount = result.data.data.totalCount;
        this.aCd.grid.isActive = false;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== A Code B Button 클릭 시 B Code 조회 ==== */
    showBCodeList(acode) {
      this.cCd.grid.totalCount = 0;
      this.bCd.searched.aCd = acode;
      this.aCd.grid.isActive = acode;

      if (this.bCd.grid.isActive) {
        this.bCd.grid.isActive = false;
      }

      // 초기화
      this.bCd.search.form.useYn = this.bCd.search.useYnList[0].code;
      this.bCd.search.form.keyword = "";
      this.cCd.searched.bCd = "";

      this.clickSearchButtonBCode();
    },
    /* ==== A Code Page 전환 ==== */
    changeACodePage(page) {
      this.aCd.grid.pNum = page;
      Object.assign(this.aCd.search.form, this.aCd.searched);
      this.getACode();
    },
    /* ==== B Code Search Form 고정 세팅 ==== */
    initBCodeSearchedForm() {
      Object.assign(this.bCd.searched, this.bCd.search.form);
    },
    /* ==== B Code 조회 ==== */
    async getBCode() {
      const params = {
        ...this.bCd.searched,
        pNum: this.bCd.grid.pNum + 1,
        pSize: this.bCd.grid.pSize,
      };

      // 사용 여부가 전체일 때
      if (params.useYn === this.$const.keys.common.all) {
        params.useYn = "";
      }

      try {
        const result = await this.$axios.get("/safty/api/bCode/getList", {
          params,
        });
        this.bCd.grid.list = result.data.data.dataList;
        this.bCd.grid.totalCount = result.data.data.totalCount;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== B Code Page 전환 ==== */
    changeBCodePage(page) {
      this.bCd.grid.pNum = page;
      Object.assign(this.bCd.search.form, this.bCd.searched);
      this.getBCode();
    },
    /* ==== C Code Search Form 고정 세팅 ==== */
    initCCodeSearchedForm() {
      Object.assign(this.cCd.searched, this.cCd.search.form);
    },
    /* ==== B Code C Button 클릭 시 C Code 조회 ==== */
    showCCodeList(bcode) {
      this.cCd.searched.bCd = bcode;
      this.bCd.grid.isActive = bcode;

      // 초기화
      this.cCd.search.form.useYn = this.cCd.search.useYnList[0].code;
      this.cCd.search.form.keyword = "";

      this.clickSearchButtonCCode();
    },
    /* ==== C Code 조회 ==== */
    async getCCode() {
      const params = {
        ...this.cCd.searched,
        pNum: this.cCd.grid.pNum + 1,
        pSize: this.cCd.grid.pSize,
      };

      // 사용 여부가 전체일 때
      if (params.useYn === this.$const.keys.common.all) {
        params.useYn = "";
      }

      try {
        const result = await this.$axios.get("/safty/api/cCode/getList", {
          params,
        });
        this.cCd.grid.list = result.data.data.dataList;
        this.cCd.grid.totalCount = result.data.data.totalCount;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    /* ==== C Code Page 전환 ==== */
    changeCCodePage(page) {
      this.cCd.grid.pNum = page;
      Object.assign(this.cCd.search.form, this.cCd.searched);
      this.getCCode();
    },
    /* ==== A Code Popup Open ==== */
    openACodePopup(aCodeData) {
      if (aCodeData) {
        this.aCd.popup.aCode = aCodeData.aCd;
      } else {
        this.aCd.popup.aCode = "";
      }
      this.$refs.aCode.open();
    },
    /* ==== B Code Popup Open ==== */
    openBCodePopup(bCodeData) {
      if (bCodeData) {
        this.bCd.popup.bCode = bCodeData.bCd;
      } else {
        this.bCd.popup.bCode = "";
      }
      this.$refs.bCode.open();
    },
    /* ==== C Code Popup Open ==== */
    openCCodePopup(cCodeData) {
      if (cCodeData) {
        this.cCd.popup.cCode = cCodeData.cCd;
      } else {
        this.cCd.popup.cCode = "";
      }
      this.$refs.cCode.open();
    },
    /* ==== A Code 사용여부 select box 선택 시 ==== */
    aUseYnChange(useYn) {
      this.aCd.searched.useYn = useYn;
      this.aCd.search.form.keyword = "";
      this.aCd.searched.keyword = "";
      this.getACode();
    },
    /* ==== B Code 사용여부 select box 선택 시 ==== */
    bUseYnChange(useYn) {
      this.bCd.searched.useYn = useYn;
      this.bCd.search.form.keyword = "";
      this.bCd.searched.keyword = "";
      this.getBCode();
    },
    /* ==== C Code 사용여부 select box 선택 시 ==== */
    cUseYnChange(useYn) {
      this.cCd.searched.useYn = useYn;
      this.cCd.search.form.keyword = "";
      this.cCd.searched.keyword = "";
      this.getCCode();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/code.scss";
</style>
