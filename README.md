[![build pass](https://api.travis-ci.org/dwqs/beautify-scrollbar.svg?branch=master)](https://travis-ci.org/dwqs/beautify-scrollbar) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) ![npm-version](https://img.shields.io/npm/v/beautify-scrollbar.svg) ![license](https://img.shields.io/npm/l/beautify-scrollbar.svg)
# beautify-scrollbar
Beautify browser's scrollbars.

## Installation

npm:

```
npm i --save beautify-scrollbar
```
or yarn

```
yarn add  beautify-scrollbar
```

## Get Started

```
import BeautifyScrollbar from 'beautify-scrollbar';

const container = document.querySelector('#container')
const bs = new BeautifyScrollbar(container);

// or
const bs = new BeautifyScrollbar('#container');
```

Visit the [examples](https://dwqs.github.io/beautify-scrollbar).

## Development
```
git clone git@github.com:dwqs/beautify-scrollbar.git

cd beautify-scrollbar

npm i 

npm run dev
```

## LICENSE
MIT