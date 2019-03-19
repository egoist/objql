import objql from '../src'

test('main', () => {
  expect(objql({}, {})).toEqual({})
  expect(objql({}, { a: true })).toEqual({})
  expect(objql({ a: 1 }, { a: true })).toEqual({ a: 1 })
  expect(objql({ a: 1, b: 2 }, { a: true })).toEqual({ a: 1 })
  expect(objql({ a: 1, b: 2 }, { a: String })).toEqual({ a: '1' })
})

test('array', () => {
  expect(objql([1], [String])).toEqual(['1'])
  expect(objql([{ a: 1 }], [{ a: String }])).toEqual([{ a: '1' }])
  expect(objql([{ a: 1, b: 2 }], [{ a: String }])).toEqual([{ a: '1' }])
})
