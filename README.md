# perfmark

[![CircleCI](https://circleci.com/gh/nivrith/perfmark/tree/master.svg?style=svg)](https://circleci.com/gh/nivrith/perfmark/tree/master)
[![NPM Downloads](https://img.shields.io/npm/dw/perfmark.svg)](https://www.npmjs.com/package/perfmark)
[![node](https://img.shields.io/node/v/perfmark.svg)](https://www.npmjs.com/package/perfmark)
[![License MIT](https://img.shields.io/github/license/nivrith/perfmark.svg)](https://github.com/nivrith/perfmark/blob/master/LICENSE)

elegant benchmarking in node &amp; typescript based on [benchmark](https://www.npmjs.com/package/benchmark)

## Highlights

- Written in Typescript

## Installation

npm:

```shell
$ npm install perfmark --save-dev
```

yarn:

```shell
$ yarn add --dev perfmark
```

## Usage

> elegant benchmarking in node &amp; typescript

```js
  const PerfMark = require('perfmark');

  const fibonacci = (n: number): number => {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
  }

  const benchmark = new Perfmark();
  benchmark
    .add('fib1', () =>{
      fibonacci(1);
    })
    .add('fib3', ()=> {
      fibonacci(3)
    })
    .run()

```

## License

MIT © [Nivrith](https://github.com/nivrith)
