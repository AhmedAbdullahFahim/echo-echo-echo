export const convertToBase64 = (safeUrl) => {
  let base64 = safeUrl.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4 !== 0) {
    base64 += '='
  }
  return base64
}
