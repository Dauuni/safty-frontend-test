/* ==== A Code 전체 조회 ==== */
export function getACodeList(params) {
  return this({
    url: '/safty/api/acode',
    method: 'get',
    params,
  })
}

/* ==== B Code 전체 조회 ==== */
export function getBCodeList(params) {
  return this({
    url: '/safty/api/bcode',
    method: 'get',
    params,
  })
}