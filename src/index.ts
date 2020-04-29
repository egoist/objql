function coerce(data: any, schema: any) {
  return typeof schema === 'function' ? schema(data) : data
}

interface Types {
  [type: string]: (v: any) => any
}

interface Options {
  types?: Types
}

// TODO: too many anys
function objql(data: any, schema: any, { types }: Options = {}): any {
  if (!data) return data

  if (typeof schema === 'string') {
    schema = JSON.parse(schema)
  }

  if (Array.isArray(data)) {
    return data.map((item) =>
      objql(item, Array.isArray(schema) ? schema[0] : schema)
    )
  }

  if (typeof data === 'object') {
    const result: { [key: string]: any } = {}
    for (const key of Object.keys(schema)) {
      const value = data[key]
      const type = schema[key]
      let actualType: any

      if (typeof type === 'string') {
        actualType = types && types[type]
        if (typeof actualType !== 'function') {
          throw new Error(`Cannot find custom type: ${type}`)
        }
      } else {
        actualType = type
      }

      if (value == undefined) {
        continue
      }
      result[key] = objql(value, actualType)
    }
    return result
  }

  return coerce(data, schema)
}

export default objql
