# ObjQL

[![NPM version](https://badgen.net/npm/v/objql)](https://npmjs.com/package/objql) [![NPM downloads](https://badgen.net/npm/dm/objql)](https://npmjs.com/package/objql) [![CircleCI](https://badgen.net/circleci/github/egoist/objql/master)](https://circleci.com/gh/egoist/objql/tree/master) [![donate](https://badgen.net/badge/support%20me/donate/ff69b4)](https://patreon.com/egoist) [![chat](https://badgen.net/badge/chat%20on/discord/7289DA)](https://chat.egoist.moe)

> Only query what you need.

## Install

```bash
yarn add objql
```

## Usage

```js
const objql = require('objql')

const data = {
  foo: 1,
  bar: '123',
  baz: {
    foo: new Date(),
    bar: [1, 2, 3],
    baz: 'hello'
  },
  wasted: 'blah blah..'
}

const schema = {
  foo: true, // Select `foo` from `data`
  bar: Number, // Select `bar` from `data` and coerce to `Number(data.foo)`
  baz: {
    foo: true,
    bar: [String],
    baz: v => `${v} world`
  }
}

objql(data, schema)
/* =>
{
  foo: 1,
  bar: 123,
  baz: {
    foo: new Date(),
    bar: ['1', '2', '3'],
    baz: 'hello world'
  }
}
*/
```

### Custom Type

```js
const data = {
  email: 'kevin'
}

const schema = {
  email: 'Email'
}

const types = {
  Email(v) {
    return v.includes('@') ? v : `${v}@gmail.com`
  }
}

objql(data, schema, { types })
/* =>
{
  email: 'kevin@gmail.com'
}
*/
```

### Pass a String as Schema

```js
const data = {
  age: '18'
}

const schema = JSON.stringify({
  age: 'number'
})

const types = {
  number: Number
}

objql(data, schema, { types })
/* =>
{
  age: 18
}
*/
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**objql** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/objql/contributors)).

> [egoist.sh](https://egoist.sh) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
