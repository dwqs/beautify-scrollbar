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

// or with options
const bs = new BeautifyScrollbar('#container', {
    wheelSpeed: 2
});
```

Visit the [examples](https://dwqs.github.io/beautify-scrollbar).

>Note: the height of this container element which is returned by `getBoundingClientRect()` can not be 0, it must hava a `height` style.

## Options
### wheelSpeed {Number}
The scroll speed applied to mousewheel event.

**Default:** `1`

### threshold {Number}
The threshold value to trigger next-fetch in infinite scrolling.

**Default:** `1`

### shownScrollbarX {Boolean}
When set to false, the scroll bar in X axis will not be available, regardless of the content width.

**Default:** `true`

### shownScrollbarY {Boolean}
When set to false, the scroll bar in Y axis will not be available, regardless of the content height.

**Default:** `true`

### maxThumbXLength {Number}
When set to an integer value, the thumb part of the scrollbar will not expand over that number of pixels.

**Default:** `true`

### maxThumbYLength {Number}
When set to an integer value, the thumb part of the scrollbar will not expand over that number of pixels.

**Default:** `true`

## Events
beautify-scrollbar dispatches custom events.

```js
container.addEventListener('bs-x-reach-end', () => ..., false);
```

### `bs-y-reach-start`
This event fires when scrolling reaches the start of the y-axis.

### `bs-y-reach-end`
This event fires when scrolling reaches the end of the y-axis.

### `bs-x-reach-start`
This event fires when scrolling reaches the start of the x-axis.

### `bs-x-reach-end`
This event fires when scrolling reaches the end of the x-axis.

### `bs-threshold`
This event fires when `diff-value` reaches the end of the `options.threshold`.

>diff-value = container.scrollHeight - container.scrollTop - container.height

## Development
```
git clone git@github.com:dwqs/beautify-scrollbar.git

cd beautify-scrollbar

npm i 

npm run dev
```

## LICENSE
MIT