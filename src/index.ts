function coerce(data: any, schema: any) {
  return typeof schema === 'function' ? schema(data) : data
}

// TODO: too many anys
function objql(data: any, schema: any): any {
  if (!data) return data

  if (Array.isArray(data)) {
    if (!Array.isArray(schema)) {
      throw new TypeError(`schema must be an array`)
    }
    return data.map(item => objql(item, schema[0]))
  }

  if (typeof data === 'object') {
    const result: { [key: string]: any } = {}
    for (const key of Object.keys(schema)) {
      const value = data[key]
      if (value == undefined) {
        continue
      }
      result[key] = objql(value, schema[key])
    }
    return result
  }

  return coerce(data, schema)
}

export default objql
