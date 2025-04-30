export const checkEmptyFields = (obj: Record<string, unknown>, parentKey: string = '') => {
  const emptyFields: boolean[] = []

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key

    if (
      value === ''
        || value === null
        || value === undefined
        || (Array.isArray(value) && value.length === 0)
        || (typeof value === 'object' && Object.keys(value).length === 0)
    ) {
      emptyFields.push(false)
    } else if (typeof value === 'object') {
      emptyFields.push(...checkEmptyFields(value as Record<string, unknown>, fullKey))
    } else {
      emptyFields.push(true)
    }
  })

  return emptyFields
}
