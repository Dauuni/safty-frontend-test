/* ==== 빈 값 확인 ==== */
export function isEmpty(value) {
  const result = false

  if (value === undefined) {
    return true
  }

  if (typeof value === 'number') {
    if (value === 0) {
      return true
    }
  } else if (typeof value === 'string') {
    if (value === '' || value.length === 0) {
      return true
    }
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true
      }
    } else if (!value) {
      return true
    } else if (Object.keys(value).length === 0) {
      return true
    }
  }

  return result
}

/* ==== 숫자만 입력 ==== */
export function onlyNumber(value) {
  const check = /^[0-9]+$/;

  return check.test(value)
}