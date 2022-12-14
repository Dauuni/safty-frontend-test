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
        <!-- 검색 Form -->
        <div class="mb-4 search-form">
          <!-- 사용여부 -->
          <div class="flex flex-col mr-2">
            <div class="search-form__label">사용 여부</div>
            <div class="w-24">
              <vue-select
                v-model="aCode.search.form.useYn"
                label="codeName"
                :options="aCode.search.useYnList"
                :reduce="(codeName) => codeName.code"
                :clearable="false"
                :searchable="false"
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
                  v-model="aCode.search.form.keyword"
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
          <!-- 등록 버튼 -->
          <div class="flex btn__create">
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
                <col width="10%">
                <col width="30%">
                <col width="30%">
                <col width="20%">
                <col width="10%">
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
                <template v-if="aCode.grid.totalCount > 0">
                  <tr 
                    v-for="acode in aCode.grid.list"
                    :key="`aCode-${acode.aCode}`"
                    :class="{
                      'grid--active':
                        aCode.grid.isActive === acode.aCode,
                    }"
                  >
                    <td>{{ acode.rNum}}</td>
                    <td>{{ acode.aCode }}</td>
                    <td>
                      {{ acode.aCodeName}}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{'useY': acode.useYn === 'Y', 'useN': acode.useYn === 'N'}"
                        />
                    </td>
                    <td class="no-hover">
                      <button 
                        :class="{
                          'button--active':
                          aCode.grid.isActive === acode.aCode
                        }"
                        @click="showBCodeList(acode.aCode)">
                        <fa icon="circle-right"/>
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
        </div>
      </div>
      <!-- B 코드 -->
      <div class="w-1/3 mr-3">
        <div class="mb-4 block">
          <div class="block__code">
            <span class="block__name">B Code</span>
          </div>
        </div>
        <!-- 검색 Form -->
        <div class="mb-4 search-form">
          <!-- 사용여부 -->
          <div class="flex flex-col mr-2">
            <div class="search-form__label">사용 여부</div>
            <div class="w-24">
              <vue-select
                v-model="bCode.search.form.useYn"
                label="codeName"
                :options="bCode.search.useYnList"
                :reduce="(codeName) => codeName.code"
                :clearable="false"
                :searchable="false"
                :disabled="!bCode.searched.aCode"
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
                  v-model="bCode.search.form.keyword"
                  placeholder="B Code"
                  :disabled="!bCode.searched.aCode"
                />
              </div>
              <!-- 검색 버튼 -->
              <button 
                type="button"   
                class="mr-2 btn btn--sm btn--line"
                :disabled="!bCode.searched.aCode">
                {{ $const.button.search }}
              </button>
            </div>
          </div>
          <!-- 등록 버튼 -->
          <div class="flex btn__create">
            <button
                @click="openBCodePopup"
                :disabled="!bCode.searched.aCode"
            >
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
                <col width="10%">
                <col width="30%">
                <col width="30%">
                <col width="20%">
                <col width="10%">
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
                <template v-if="bCode.searched.aCode && bCode.grid.totalCount > 0">
                  <tr 
                    v-for="bcode in bCode.grid.list"
                    :key="`bCode-${bcode.bCode}`"
                    :class="{
                      'grid--active':
                        bCode.grid.isActive === bcode.bCode,
                    }"
                  >
                    <td>{{ bcode.rNum}}</td>
                    <td>{{ bcode.bCode }}</td>
                    <td>
                      {{ bcode.bCodeName}}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{'useY': bcode.useYn === 'Y', 'useN': bcode.useYn === 'N'}"
                        />
                    </td>
                    <td class="no-hover">
                      <button 
                        :class="{
                          'button--active':
                          bCode.grid.isActive === bcode.bCode
                        }"
                        @click="showCCodeList(bcode.bCode)">
                        <fa icon="circle-right"/>
                      </button>
                    </td>
                  </tr>
                </template>
                <tr v-if="!bCode.searched.aCode" class="no-data">
                  <td colspan="5">
                    {{ $const.message.message.code.emptyCheck.checkACode }}
                  </td>
                </tr>
                <tr v-if="bCode.searched.aCode && !bCode.grid.totalCount" class="no-data">
                  <td colspan="5">
                    {{ $const.message.common.emptyCheck.bCode }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- C 코드 -->
      <div class="w-1/3">
        <div class="mb-4 block">
          <div class="block__code">
            <span class="block__name">C Code</span>
          </div>
        </div>
        <!-- 검색 Form -->
        <div class="mb-4 search-form">
          <!-- 사용여부 -->
          <div class="flex flex-col mr-2">
            <div class="search-form__label">사용 여부</div>
            <div class="w-24">
              <vue-select
                v-model="cCode.search.form.useYn"
                label="codeName"
                :options="cCode.search.useYnList"
                :reduce="(codeName) => codeName.code"
                :clearable="false"
                :searchable="false"
                :disabled="!cCode.searched.bCode"
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
                  v-model="cCode.search.form.keyword"
                  placeholder="C Code"
                  :disabled="!cCode.searched.bCode"
                />
              </div>
              <!-- 검색 버튼 -->
              <button 
                type="button" 
                class="mr-2 btn btn--sm btn--line"
                :disabled="!cCode.searched.bCode">
                {{ $const.button.search }}
              </button>
            </div>
          </div>
          <!-- 등록 버튼 -->
          <div class="flex btn__create">
            <button 
              :disabled="!cCode.searched.bCode"
              @click="openCCodePopup">
              <fa class="fa-2x" icon="plus" />
            </button>
          </div>
        </div>
        <!-- 그리드 영역 -->
        <div class="grid">
          <div class="grid__wrap">
            <table v-if="bCode.searched.aCode !== 'EQUIP'" class="grid__base">
              <caption class="hide">
                C Code 리스트
              </caption>
              <colgroup>
                <col width="10%">
                <col width="35%">
                <col width="35%">
                <col width="20%">
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
                <template v-if="cCode.searched.bCode && cCode.grid.totalCount > 0">
                  <tr 
                    v-for="ccode in cCode.grid.list"
                    :key="`cCode-${ccode.cCode}`"
                    :class="{
                      'grid--active':
                        cCode.grid.isActive === ccode.cCode,
                    }"
                    @click="openCCodePopup(ccode)"
                  >
                    <td>{{ ccode.rNum}}</td>
                    <td>{{ ccode.cCode }}</td>
                    <td>
                      {{ ccode.cCodeName}}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{'useY': ccode.useYn === 'Y', 'useN': ccode.useYn === 'N'}"
                        />
                    </td>
                  </tr>
                </template>
                <tr v-if="!cCode.searched.bCode" class="no-data">
                  <td colspan="4">
                    {{ $const.message.message.code.emptyCheck.checkBCode }}
                  </td>
                </tr>
                <tr v-if="cCode.searched.bCode && !cCode.grid.totalCount" class="no-data">
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
                <col width="10%">
                <col width="30%">
                <col width="25%">
                <col width="15%">
                <col width="20%">
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
                <template v-if="cCode.searched.bCode && cCode.grid.totalCount > 0">
                  <tr 
                    v-for="ccode in cCode.grid.list"
                    :key="`cCode-${ccode.cCode}`"
                    :class="{
                      'grid--active':
                        cCode.grid.isActive === ccode.cCode,
                    }"
                    @click="openCCodePopup(ccode)"
                  >
                    <td>{{ ccode.rNum}}</td>
                    <td>{{ ccode.cCode }}</td>
                    <td>
                      {{ ccode.cCodeName}}
                    </td>
                    <td>
                      {{ ccode.danRange}}
                    </td>
                    <td>
                      <fa
                        icon="circle"
                        :class="{'useY': ccode.useYn === 'Y', 'useN': ccode.useYn === 'N'}"
                        />
                    </td>
                  </tr>
                </template>
                <tr v-if="!cCode.searched.bCode" class="no-data">
                  <td colspan="5">
                    {{ $const.message.message.code.emptyCheck.checkBCode }}
                  </td>
                </tr>
                <tr v-if="cCode.searched.bCode && !cCode.grid.totalCount" class="no-data">
                  <td colspan="5">
                    {{ $const.message.common.emptyCheck.cCode }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination 
            v-if="cCode.grid.totalCount > 10"
            :total-count="cCode.grid.totalCount"
            :current-page="cCode.grid.currentPage"
            :limit="cCode.grid.limit"
            @changePage="changeCCodePage"
          />
        </div>
      </div>
    </div>
    <ACodePopup 
      ref="aCode"
      :a-code-data="aCode.popup.aCodeData"
    />
    <BCodePopup 
      ref="bCode"
      :b-code-data="bCode.popup.bCodeData"
      :a-code="bCode.searched.aCode"
    />
    <CCodePopup 
      ref="cCode"
      :c-code-data="cCode.popup.cCodeData"
      :a-code="bCode.searched.aCode"
      :b-code="cCode.searched.bCode"
    />
  </div>
</template>

<script>
import ACodePopup from '@/safty/code/ACodePopup'
import BCodePopup from '@/safty/code/BCodePopup'
import CCodePopup from '@/safty/code/CCodePopup'

export default {
  name: "Code",
  components: {
    ACodePopup,
    BCodePopup,
    CCodePopup
  },
  data() {
    return {
      aCode: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: '',
            useYn: 'ALL',
          },
        },
        grid: {
          isActive: 'false',
          list: [],
          totalCount: 0,
          currentPage: 0,
          limit: 10,
        },
        searched: {
          useYn: '',
          keyword: '',
        },
        popup: {
          aCodeData: '',
        }
      },
      bCode: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: '',
            useYn: 'ALL',
          },
        },
        grid: {
          isActive: 'false',
          list: [],
          totalCount: 0,
          currentPage: 0,
          limit: 10,
        },
        searched: {
          useYn: '',
          keyword: '',
          aCode: '',
        },
        popup: {
          bCodeData: '',
        }
      },
      cCode: {
        search: {
          useYnList: [
            { code: "ALL", codeName: "전체" },
            { code: "Y", codeName: "Yes" },
            { code: "N", codeName: "No" },
          ],
          form: {
            keyword: '',
            useYn: 'ALL',
          },
        },
        grid: {
          list: [],
          totalCount: 0,
          currentPage: 0,
          limit: 10,
        },
        searched: {
          useYn: '',
          keyword: '',
          bCode: '',
        },
        popup: {
          cCodeData: '',
        }
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    /* ==== mounted ==== */
    async init() {
      this.clickSearchButtonACode()
    },
    /* ==== A Code 검색 버튼 클릭 시 ==== */
    async clickSearchButtonACode() {
      this.initACodeSearchedForm()
      this.aCode.grid.currentPage = 0
      await this.getACode()
      // this.clearACode()
    },
    /* ==== B Code 검색 버튼 클릭 시 ==== */
    clickSearchButtonBCode() {
      if(!this.bCode.searched.aCode) {
        this.$toast.show(this.$const.message.code.emptyCheck.checkACode)
      } else {
        this.initBCodeSearchedForm()
        this.bCode.grid.currentPage = 0
        this.getBCode()
      }
    },
    /* ==== C Code 검색 버튼 클릭 시 ==== */
    clickSearchButtonCCode() {
      if(!this.cCode.searched.bCode) {
        this.$toast.show(this.$const.message.code.emptyCheck.checkBCode)
      } else {
        this.initCCodeSearchedForm()
        this.cCode.grid.currentPage = 0
        this.getCCode()
      }
    },
    /* ==== A Code Searched Form 고정 세팅 ==== */
    initACodeSearchedForm() {
      Object.assign(this.aCode.searched, this.aCode.search.form)
    },
    /* ==== A Code 조회 ==== */
    async getACode() {
      const params = {
        ...this.aCode.searched,
        currentPage: this.aCode.grid.currentPage + 1,
        limit: this.aCode.grid.limit,
      }

      // 사용 여부가 전체일 때
      if(params.useYn === this.$const.keys.common.all) {
        params.useYn = ''
      }
      try {
        /* ⚠️ mock -> api로 수정 해야 함 ⚠️ */
        const result = await this.$axios.get('/safty/api/acode')
        this.aCode.grid.list = result.data.body.data
        this.aCode.grid.totalCount = result.data.body.totalCount
        this.aCode.grid.isActive = false
      } catch (error) { 
        this.$toast.error(error)
      }
    },
    /* ==== A Code B Button 클릭 시 B Code 조회 ==== */
    showBCodeList(acode) {
      this.bCode.searched.aCode = acode
      this.aCode.grid.isActive = acode

      // 초기화
      this.bCode.search.form.useYn = this.bCode.search.useYnList[0].code
      this.bCode.search.form.keyword = ''
      this.cCode.searched.bCode = ''
      
      this.clickSearchButtonBCode();
    },
    /* ==== B Code Search Form 고정 세팅 ==== */
    initBCodeSearchedForm() {
      Object.assign(this.bCode.searched, this.bCode.search.form)
    }, 
    /* ==== B Code 조회 ==== */
    async getBCode() {
      const params = {
        ...this.bCode.searched,
        currentPage: this.bCode.grid.currentPage + 1,
        limit: this.bCode.grid.limit,
      }

      // 사용 여부가 전체일 때
      if (params.useYn === this.$const.keys.common.all) {
        params.useYn = ''
      }

      try {
        /* ⚠️ mock -> api로 수정 해야 함 ⚠️ */
        const result = await this.$axios.get('/safty/api/bcode', {params: {aCode: params.aCode}})
        this.bCode.grid.list = result.data.body.data
        this.bCode.grid.totalCount = result.data.body.totalCount
      } catch (error) {
        this.$toast.error(error)
      }
    },
    /* ==== C Code Search Form 고정 세팅 ==== */
    initCCodeSearchedForm() {
      Object.assign(this.cCode.searched, this.cCode.search.form)
    },
    /* ==== B Code C Button 클릭 시 C Code 조회 ==== */
    showCCodeList(bcode) {
      this.cCode.searched.bCode = bcode
      this.bCode.grid.isActive = bcode

      // 초기화
      this.cCode.search.form.useYn = this.cCode.search.useYnList[0].code
      this.cCode.search.form.keyword = ''
      
      this.clickSearchButtonCCode();
    },
    /* ==== C Code 조회 ==== */
    async getCCode() {
      const params = {
        ...this.cCode.searched,
        currentPage: this.cCode.grid.currentPage + 1,
        limit: this.cCode.grid.limit,
      }

      // 사용 여부가 전체일 때
      if (params.useYn === this.$const.keys.common.all) {
        params.useYn = ''
      }

      try {
        /* ⚠️ mock -> api로 수정 해야 함 ⚠️ */
        const result = await this.$axios.get('/safty/api/ccode', {params: {bCode: params.bCode}})
        this.cCode.grid.list = result.data.body.data
        this.cCode.grid.totalCount = result.data.body.totalCount
      } catch(error) {``
        this.$toast.error(error)
      }
    },
    /* ==== C Code Page 전환 ==== */
    changeCCodePage(page) {
      this.cCode.grid.currentPage = page
      Object.assign(this.cCode.search.form, this.cCode.searched)
      this.getCCode()
    },
    /* ==== A Code Popup Open ==== */
    openACodePopup(aCodeData) {
      if (aCodeData) {
        this.aCode.popup.aCodeData = aCodeData.aCode
      } else {
        this.aCode.popup.aCodeData = ''
      }
      this.$refs.aCode.open()
    },
    /* ==== B Code Popup Open ==== */
    openBCodePopup(bCodeData) {
      if (bCodeData) {
        this.bCode.popup.bCodeData = bCodeData.bCode
      } else {
        this.bCode.popup.bCodeData = ''
      }
      this.$refs.bCode.open()
    },
    /* ==== C Code Popup Open ==== */
    openCCodePopup(cCodeData) {
      if (cCodeData) {
        this.cCode.popup.cCodeData = cCodeData.cCode
      } else {
        this.cCode.popup.cCodeData = ''
      }
      this.$refs.cCode.open()
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/code.scss'
</style>
