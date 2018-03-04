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
import 'beautify-scrollbar/dist/index.css';
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
### wheelSpeed
**Type:** `Number`

**Default:** `1`

The scroll speed applied to mousewheel event.

### threshold
**Type:** `Number`

**Default:** `1`

The threshold value to trigger next-fetch in infinite scrolling.

### shownScrollbarX
**Type:** `Boolean`

**Default:** `true`

When set to false, the scroll bar in X axis will not be available, regardless of the content width.

### shownScrollbarY
**Type:** `Boolean`

**Default:** `true`

When set to false, the scroll bar in Y axis will not be available, regardless of the content height.

### maxThumbXLength
**Type:** `Number`

**Default:** `undefined`

When set to an integer value, the X thumb part of the scrollbar will not expand over that number of pixels.

### maxThumbYLength 
**Type:** `Number`

**Default:** `undefined`

When set to an integer value, the Y thumb part of the scrollbar will not expand over that number of pixels.

## Events
`beautify-scrollbar` dispatches custom events.

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

### `bs-update-scroll-value`
This event fires when scrollLeft or scrollTop is updated.

### `bs-reach-threshold`
This event fires when `diff-value` is lte the `options.threshold`.

>diff-value = container.scrollHeight - container.scrollTop - container.height

## API
### update([options])
Update some props of instance when you need. Maybe it's useful when it combines with [v2-lazy-list](https://github.com/dwqs/v2-lazy-list);

### destroy
Destroy the instance and will unbind events whose instance bind.

## Development
```
git clone git@github.com:dwqs/beautify-scrollbar.git

cd beautify-scrollbar

npm i 

npm run dev
```

## LICENSE
MIT