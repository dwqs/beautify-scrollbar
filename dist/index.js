!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.BeautifyScrollbar=e():t.BeautifyScrollbar=e()}(window,function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var h=e[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,i),h.l=!0,h.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i(2);var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function h(t){var e=window.document.createElement("div");return e.className=t,e}function o(t){t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)}function n(t,e){if("object"===(void 0===e?"undefined":s(e))){for(var i in e){var h=e[i];"number"==typeof h&&(h+="px"),t.style[i]=h}return t}}function l(t){var e=(t.getAttribute("class")||"").replace(/^\s+|\s+$/g,"").split(/\s+/);return""===e[0]&&e.shift(),e}function r(t,e){return l(t).includes(e)}function a(t,e){if(e&&"string"==typeof e&&t&&t.nodeName){for(var i=[],s=l(t),h=e.split(" "),o=0;o<h.length;o++){var n=h[o];n&&(t.classList?t.classList.remove(n):s.splice(s.indexOf(n),1))}i=s,t.classList||t.setAttribute("class",i.join(" "))}}function u(t,e){if(e&&"string"==typeof e&&t&&t.nodeName){for(var i=l(t),s=e.split(" "),h=0;h<s.length;h++){var o=s[h];o&&(t.classList?t.classList.add(o):i.push(o))}t.classList||t.setAttribute("class",i.join(" "))}}var c=function(t){if("function"==typeof window.CustomEvent)return new CustomEvent(t,{bubbles:!1,cancelable:!1,detail:null});var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,null),e},m=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),"string"==typeof e&&(e=document.querySelector(e)),!e||!e.nodeName)throw new Error("no element is specified to initialize BeautifyScrollBar");this.element=e,this.ownerDocument=this.element.ownerDocument||document,this.rect=this.element.getBoundingClientRect(),this.options=Object.assign({},{wheelSpeed:1,threshold:0,shownScrollbarX:!0,shownScrollbarY:!0,maxThumbXLength:void 0,maxThumbYLength:void 0},i,{threshold:isNaN(i.threshold)||i.threshold<=0?0:i.threshold,wheelSpeed:isNaN(i.wheelSpeed)||i.wheelSpeed<=0?1:i.wheelSpeed,maxThumbXLength:isNaN(i.maxThumbXLength)||i.maxThumbXLength<=0?void 0:i.maxThumbXLength,maxThumbYLength:isNaN(i.maxThumbYLength)||i.maxThumbYLength<=0?void 0:i.maxThumbYLength}),this.lastScrollLeft=0,this.lastScrollTop=0,this.xBar=null,this.xThumb=null,this.xThumbWidth=null,this.yBar=null,this.yThumb=null,this.yThumbHeight=null,this.startingMousePageY=0,this.startingMousePageX=0,this.startingScrollTop=0,this.startingScrollLeft=0,this.yScrollFactor=0,this.xScrollFactor=0,this.dragDirect="",this.wheelEventHandler=this._wheelEventHandler.bind(this),this.docMouseMoveHandler=this._docMouseMoveHandler.bind(this),this.docMouseUpHandler=this._docMouseUpHandler.bind(this),this.downXThumb=this._mouseDownHandler.bind(this,"x"),this.downYThumb=this._mouseDownHandler.bind(this,"y"),this.handleMouseEnter=this._handlerEnter.bind(this),this.handleMouseLeave=this._handlerLeave.bind(this),u(this.element,"beautify-scroll-container"),this._computed(),this._createBarEle(),this._bindEvent()}return t.prototype._computed=function(){this.contentWidth=isNaN(this.options.contentWidth)?Math.max(this.element.scrollWidth,this.rect.width):this.options.contentWidth,this.contentHeight=isNaN(this.options.contentHeight)?Math.max(this.element.scrollHeight,this.rect.height):this.options.contentHeight,this.containerWidth=this.rect.width,this.containerHeight=this.rect.height,this.maxScrollLeft=this.contentWidth-this.containerWidth,this.maxScrollTop=this.contentHeight-this.containerHeight},t.prototype._createBarEle=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.maxScrollTop>0&&this.options.shownScrollbarY){var e=0,i=0,s=0;this.yBar||(this.yBar=h("beautify-scroll__y-bar"),this.element.appendChild(this.yBar),this.yBar.setAttribute("tabindex",-1),this.yThumb=h("beautify-scroll__y-thumb"),this.yBar.appendChild(this.yThumb),this.yThumb.addEventListener("mousedown",this.downYThumb,!1)),t&&(e=this.yBar.style.top,i=this.yBar.style.right,s=this.yThumb.style.top),n(this.yBar,{height:this.containerHeight,right:i,top:e});var o=parseInt(this.containerHeight*this.containerHeight/this.contentHeight,10);this.yThumbHeight=isNaN(this.options.maxThumbYLength)||o<=this.options.maxThumbYLength?o:this.options.maxThumbYLength,n(this.yThumb,{top:s,height:this.yThumbHeight}),this.yScrollFactor=(this.contentHeight-this.containerHeight)/(this.containerHeight-this.yThumbHeight)}if(this.maxScrollLeft>0&&this.options.shownScrollbarX){var l=0,r=0,a=0;this.xBar||(this.xBar=h("beautify-scroll__x-bar"),this.element.appendChild(this.xBar),this.xBar.setAttribute("tabindex",-1),this.xThumb=h("beautify-scroll__x-thumb"),this.xBar.appendChild(this.xThumb),this.xThumb.addEventListener("mousedown",this.downXThumb,!1)),t&&(l=this.xBar.style.left,r=this.xBar.style.bottom,a=this.xThumb.style.left),n(this.xBar,{left:l,width:this.containerWidth,bottom:r});var u=parseInt(this.containerWidth*this.containerWidth/this.contentWidth,10);this.xThumbWidth=isNaN(this.options.maxThumbXLength)||u<=this.options.maxThumbXLength?u:this.options.maxThumbXLength,n(this.xThumb,{left:a,width:this.xThumbWidth}),this.xScrollFactor=(this.contentWidth-this.containerWidth)/(this.containerWidth-this.xThumbWidth)}},t.prototype._handlerEnter=function(){this.yThumb&&u(this.yThumb,"shown"),this.xThumb&&u(this.xThumb,"shown")},t.prototype._handlerLeave=function(){this.yThumb&&a(this.yThumb,"shown"),this.xThumb&&a(this.xThumb,"shown")},t.prototype._bindEvent=function(){void 0!==window.onwheel?this.element.addEventListener("wheel",this.wheelEventHandler,!1):void 0!==window.onmousewheel&&this.element.addEventListener("mousewheel",this.wheelEventHandler,!1),this.element.addEventListener("mouseenter",this.handleMouseEnter,!1),this.element.addEventListener("mouseleave",this.handleMouseLeave,!1)},t.prototype._handleScrollDiff=function(){var t=this.element.scrollTop-this.lastScrollTop,e=this.element.scrollLeft-this.lastScrollLeft;0===this.element.scrollTop&&t&&this.element.dispatchEvent(c("bs-y-reach-start")),this.element.scrollTop===this.maxScrollTop&&t&&this.element.dispatchEvent(c("bs-y-reach-end")),0===this.element.scrollLeft&&e&&this.element.dispatchEvent(c("bs-x-reach-start")),this.element.scrollLeft===this.maxScrollLeft&&e&&this.element.dispatchEvent(c("bs-x-reach-end")),this.element.scrollHeight-this.element.scrollTop-this.rect.height<=this.options.threshold&&this.element.dispatchEvent(c("bs-reach-threshold"))},t.prototype._updateScrollBarStyle=function(){this.yBar&&n(this.yBar,{top:this.element.scrollTop,height:this.containerHeight,right:-this.element.scrollLeft});var t=parseInt(this.element.scrollTop*(this.containerHeight-this.yThumbHeight)/this.maxScrollTop,10);this.yThumb&&n(this.yThumb,{top:t,height:this.yThumbHeight}),this.xBar&&n(this.xBar,{left:this.element.scrollLeft,width:this.containerWidth,bottom:-this.element.scrollTop});var e=parseInt(this.element.scrollLeft*(this.containerWidth-this.xThumbWidth)/this.maxScrollLeft,10);this.xThumb&&n(this.xThumb,{left:e,width:this.xThumbWidth});var i=this.element.scrollTop-this.lastScrollTop,s=this.element.scrollLeft-this.lastScrollLeft;(i||s)&&this.element.dispatchEvent(c("bs-update-scroll-value"))},t.prototype._docMouseMoveHandler=function(t){if(t.stopPropagation(),t.preventDefault(),this.lastScrollLeft=this.element.scrollLeft,this.lastScrollTop=this.element.scrollTop,"x"===this.dragDirect){var e=this.startingScrollLeft+this.xScrollFactor*(t.pageX-this.startingMousePageX);this.element.scrollLeft=e>this.maxScrollLeft?this.maxScrollLeft:e}else if("y"===this.dragDirect){var i=this.startingScrollTop+this.yScrollFactor*(t.pageY-this.startingMousePageY);this.element.scrollTop=i>this.maxScrollTop?this.maxScrollTop:i}this._handleScrollDiff(),this._updateScrollBarStyle()},t.prototype._docMouseUpHandler=function(t){t.stopPropagation(),t.preventDefault(),"x"===this.dragDirect&&this.xThumb&&a(this.xThumb,"focus"),"y"===this.dragDirect&&this.yThumb&&a(this.yThumb,"focus"),this.ownerDocument.removeEventListener("mousemove",this.docMouseMoveHandler),this.ownerDocument.removeEventListener("mouseup",this.docMouseUpHandler)},t.prototype._mouseDownHandler=function(t,e){e.stopPropagation(),e.preventDefault(),"x"===t&&(this.startingMousePageX=e.pageX,this.startingScrollLeft=this.element.scrollLeft,this.xThumb&&u(this.xThumb,"focus")),"y"===t&&(this.startingMousePageY=e.pageY,this.startingScrollTop=this.element.scrollTop,this.yThumb&&u(this.yThumb,"focus")),this.dragDirect=t,this.ownerDocument.addEventListener("mousemove",this.docMouseMoveHandler,!1),this.ownerDocument.addEventListener("mouseup",this.docMouseUpHandler,!1)},t.prototype._wheelEventHandler=function(t){t.stopPropagation(),(this.maxScrollTop>0||this.maxScrollLeft>0)&&t.preventDefault(),this.yThumb&&!r(this.yThumb,"shown")&&u(this.yThumb,"shown"),this.xThumb&&!r(this.xThumb,"shown")&&u(this.xThumb,"shown");var e=function(t){var e=t.deltaX,i=-1*t.deltaY;return void 0!==e&&void 0!==i||(e=-1*t.wheelDeltaX/6,i=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,i*=10),e!=e&&i!=i&&(e=0,i=t.wheelDelta),t.shiftKey?[-i,-e]:[e,i]}(t),i=e[0],s=e[1];if(this.lastScrollLeft=this.element.scrollLeft,this.lastScrollTop=this.element.scrollTop,this._shouldUpdateScrollLeft(i)){var h=this.element.scrollLeft+i*this.options.wheelSpeed;this.element.scrollLeft=h>this.maxScrollLeft?this.maxScrollLeft:h}if(this._shouldUpdateScrollTop(s)){var o=this.element.scrollTop-s*this.options.wheelSpeed;this.element.scrollTop=o>this.maxScrollTop?this.maxScrollTop:o}this._handleScrollDiff(),this._updateScrollBarStyle()},t.prototype._shouldUpdateScrollLeft=function(t){return!(0===this.element.scrollLeft&&t<=0||this.element.scrollLeft===this.maxScrollLeft&&t>0)},t.prototype._shouldUpdateScrollTop=function(t){return!(0===this.element.scrollTop&&t>=0||this.element.scrollTop===this.maxScrollTop&&t<0)},t.prototype._unbindEvent=function(){this.element.removeEventListener("mouseenter",this.handleMouseEnter,!1),this.element.removeEventListener("mouseleave",this.handleMouseLeave,!1),this.element.removeEventListener("wheel",this.wheelEventHandler,!1),this.element.removeEventListener("mousewheel",this.wheelEventHandler,!1),this.xThumb&&this.xThumb.removeEventListener("mousedown",this.downXThumb,!1),this.yThumb&&this.yThumb.removeEventListener("mousedown",this.downYThumb,!1)},t.prototype.update=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.element&&(this.rect=this.element.getBoundingClientRect(),this.options=Object.assign({},this.options,t),this._computed(),this._createBarEle(!0))},t.prototype.destroy=function(){this.element&&(this._unbindEvent(),a(this.element,"beautify-scroll-container"),this.element=null,this.yBar&&o(this.yBar),this.xBar&&o(this.xBar),this.xBar=null,this.xThumb=null,this.xThumbWidth=null,this.yBar=null,this.yThumb=null,this.yThumbHeight=null,this.wheelEventHandler=null,this.docMouseMoveHandler=null,this.docMouseUpHandler=null,this.downXThumb=null,this.downYThumb=null,this.handleMouseEnter=null,this.handleMouseLeave=null)},t}();e.default=m},,function(t,e){}])});