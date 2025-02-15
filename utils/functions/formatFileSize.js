export const formatFileSize = (fileSizeInBytes) => {
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
  return `${fileSizeInMB.toFixed(2)} MB`
}
