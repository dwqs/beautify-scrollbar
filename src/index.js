import './index.less';

import {
    createDiv,
    getCSS,
    setCSS,
    getDeltaFromEvent,
    remove
} from './dom-helpers';

import {
    removeClass,
    addClass
} from './class-helpers';

import createCustomEvent from './custom-event';

const events = {
    'x-start': 'bs-x-reach-start',
    'x-end': 'bs-x-reach-end',
    'y-start': 'bs-y-reach-start',
    'y-end': 'bs-y-reach-end',
    'threshold': 'bs-threshold'
};

export default class BeautifyScrollBar {
    constructor (element, opts = {}) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
    
        if (!element || !element.nodeName) {
            throw new Error('no element is specified to initialize BeautifyScrollBar');
        }
            
        const defaultOpts = {
            wheelSpeed: 1,
            threshold: 0,
            shownScrollbarX: true,
            shownScrollbarY: true,
            maxThumbXLength: undefined,
            maxThumbYLength: undefined
        };

        this.element = element;
        this.ownerDocument = this.element.ownerDocument || document;
        this.rect = this.element.getBoundingClientRect();
        if (!this.rect.height) {
            throw new Error('the height of container can not be 0');
        }
        this.options = Object.assign({}, defaultOpts, opts, {
            threshold: (isNaN(opts.threshold) || opts.threshold <= 0) ? 0 : opts.threshold,
            wheelSpeed: (isNaN(opts.wheelSpeed) || opts.wheelSpeed <= 0) ? 1 : opts.wheelSpeed,
            maxThumbXLength: (isNaN(opts.maxThumbXLength) || opts.maxThumbXLength <= 0) ? undefined : opts.maxThumbXLength,
            maxThumbYLength: (isNaN(opts.maxThumbYLength) || opts.maxThumbYLength <= 0) ? undefined : opts.maxThumbYLength
        });

        // record last scroll value
        this.lastScrollLeft = 0;
        this.lastScrollTop = 0;

        // scrollbar element
        this.xBar = null;
        this.xThumb = null;
        this.xThumbWidth = null;
        this.yBar = null;
        this.yThumb = null;
        this.yThumbHeight = null;

        // for mouse drag
        this.startingMousePageY = 0;
        this.startingMousePageX = 0;
        this.startingScrollTop = 0;
        this.startingScrollLeft = 0;
        this.yScrollFactor = 0;
        this.xScrollFactor = 0;
        this.dragDirect = '';

        // event binding
        this.wheelEventHandler = this._wheelEventHandler.bind(this);
        this.docMouseMoveHandler = this._docMouseMoveHandler.bind(this); // throttle(this._mouseMoveHandler.bind(this), 20, 10);
        this.docMouseUpHandler = this._docMouseUpHandler.bind(this);

        addClass(this.element, 'beautify-scroll-container');

        this._computed();
        this._createBarEle();
        this._bindEvent();
    }

    _computed () {
        // contentWidth/contentHeight of this.options to scroll based container lazy-load.
        this.contentWidth = isNaN(this.options.contentWidth) ? Math.max(this.element.scrollWidth, this.rect.width) : this.options.contentWidth;
        this.contentHeight = isNaN(this.options.contentHeight) ? Math.max(this.element.scrollHeight, this.rect.height) : this.options.contentHeight;

        this.containerWidth = this.rect.width;
        this.containerHeight = this.rect.height;

        this.maxScrollLeft = this.contentWidth - this.containerWidth;
        this.maxScrollTop = this.contentHeight - this.containerHeight;
    }

    _createBarEle (isUpdate = false) {
        if (this.maxScrollTop > 0 && this.options.shownScrollbarY) {
            let top = 0;
            let right = 0;
            let thumbTop = 0;

            if (!this.yBar) {
                this.yBar = createDiv('beautify-scroll__y-bar');
                this.element.appendChild(this.yBar);
                this.yBar.setAttribute('tabindex', -1);

                this.yThumb = createDiv('beautify-scroll__y-thumb');
                this.yBar.appendChild(this.yThumb);
                this.yThumb.addEventListener('mousedown', this._mouseDownHandler.bind(this, 'y'), false);
            }

            if (isUpdate) {
                top = this.yBar.style.top;
                right = this.yBar.style.right;
                thumbTop = this.yThumb.style.top;
            } 

            setCSS(this.yBar, { height: this.containerHeight, right: right, top: top });
                    
            const yThumbHeight = parseInt(this.containerHeight * this.containerHeight / this.contentHeight, 10);
            this.yThumbHeight = (isNaN(this.options.maxThumbYLength) || yThumbHeight <= this.options.maxThumbYLength) ? yThumbHeight : this.options.maxThumbYLength;
            setCSS(this.yThumb, { top: thumbTop, height: this.yThumbHeight });
            
            this.yScrollFactor = (this.contentHeight - this.containerHeight) / (this.containerHeight - this.yThumbHeight);
        }

        if (this.maxScrollLeft > 0 && this.options.shownScrollbarX) {
            let left = 0;
            let bottom = 0;
            let thumbLeft = 0;

            if (!this.xBar) {
                this.xBar = createDiv('beautify-scroll__x-bar');
                this.element.appendChild(this.xBar);
                this.xBar.setAttribute('tabindex', -1);

                this.xThumb = createDiv('beautify-scroll__x-thumb');
                this.xBar.appendChild(this.xThumb);
                this.xThumb.addEventListener('mousedown', this._mouseDownHandler.bind(this, 'x'), false);
            }
            
            if (isUpdate) {
                left = this.xBar.style.left;
                bottom = this.xBar.style.bottom;
                thumbLeft = this.xThumb.style.left;
            } 
            
            setCSS(this.xBar, { left: left, width: this.containerWidth, bottom: bottom });
            
            const xThumbWidth = parseInt(this.containerWidth * this.containerWidth / this.contentWidth, 10);
            this.xThumbWidth = (isNaN(this.options.maxThumbXLength) || xThumbWidth <= this.options.maxThumbXLength) ? xThumbWidth : this.options.maxThumbXLength;
            setCSS(this.xThumb, { left: thumbLeft, width: this.xThumbWidth });

            this.xScrollFactor = (this.contentWidth - this.containerWidth) / (this.containerWidth - this.xThumbWidth);
        }
    }

    _bindEvent () {
        if (typeof window.onwheel !== 'undefined') {
            // passive: https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=zh-cn
            // #https://github.com/utatti/perfect-scrollbar/issues/560
            this.element.addEventListener('wheel', this.wheelEventHandler, false);
        } else if (typeof window.onmousewheel !== 'undefined') {
            this.element.addEventListener('mousewheel', this.wheelEventHandler, false);
        }

        this.element.addEventListener('mouseenter', () => {
            this.yThumb && addClass(this.yThumb, 'shown');
            this.xThumb && addClass(this.xThumb, 'shown');
        }, false);
        this.element.addEventListener('mouseleave', () => {
            this.yThumb && removeClass(this.yThumb, 'shown');
            this.xThumb && removeClass(this.xThumb, 'shown');
        }, false);
    }

    _handleScrollDiff () {
        const diff = this.element.scrollTop - this.lastScrollTop;
        if (this.element.scrollTop === 0) {
            // reach to top
            diff && this.element.dispatchEvent(createCustomEvent(events['y-start']));
        }

        if (this.element.scrollTop === this.maxScrollTop) {
            // reach to bottom
            diff && this.element.dispatchEvent(createCustomEvent(events['y-end']));
        }

        if (this.element.scrollLeft === 0) {
            // reach to left
            diff && this.element.dispatchEvent(createCustomEvent(events['x-start']));
        }

        if (this.element.scrollLeft === this.maxScrollLeft) {
            // reach to right
            diff && this.element.dispatchEvent(createCustomEvent(events['x-end']));
        }

        if ((this.element.scrollHeight - this.element.scrollTop - this.rect.height) <= this.options.threshold) {
            this.element.dispatchEvent(createCustomEvent(events['threshold']));
        }
    }

    _updateScrollBarStyle () {
        this.yBar && setCSS(this.yBar, { top: this.element.scrollTop, height: this.containerHeight, right: -this.element.scrollLeft });
        const yThumbTop = parseInt(this.element.scrollTop * (this.containerHeight - this.yThumbHeight) / this.maxScrollTop, 10);
        this.yThumb && setCSS(this.yThumb, { top: yThumbTop, height: this.yThumbHeight });

        this.xBar && setCSS(this.xBar, { left: this.element.scrollLeft, width: this.containerWidth, bottom: -this.element.scrollTop });
        const xThumbLeft = parseInt(this.element.scrollLeft * (this.containerWidth - this.xThumbWidth) / this.maxScrollLeft, 10);
        this.xThumb && setCSS(this.xThumb, { left: xThumbLeft, width: this.xThumbWidth });
    }

    _docMouseMoveHandler (e) {
        // document
        e.stopPropagation();
        e.preventDefault();

        this.lastScrollLeft = this.element.scrollLeft;
        this.lastScrollTop = this.element.scrollTop;

        if (this.dragDirect === 'x') {
            const scrollLeft = this.startingScrollLeft + this.xScrollFactor * (e.pageX - this.startingMousePageX);
            this.element.scrollLeft = scrollLeft > this.maxScrollLeft ? this.maxScrollLeft : scrollLeft;
        } else if (this.dragDirect === 'y') {
            const scrollTop = this.startingScrollTop + this.yScrollFactor * (e.pageY - this.startingMousePageY);
            this.element.scrollTop = scrollTop > this.maxScrollTop ? this.maxScrollTop : scrollTop;
        }

        this._handleScrollDiff();
        this._updateScrollBarStyle();
    }

    _docMouseUpHandler (e) {
        // document
        e.stopPropagation();
        e.preventDefault();

        if (this.dragDirect === 'x') {
            this.xThumb && removeClass(this.xThumb, 'focus');
        }

        if (this.dragDirect === 'y') {
            this.yThumb && removeClass(this.yThumb, 'focus');
        }

        this.ownerDocument.removeEventListener('mousemove', this.docMouseMoveHandler);
        this.ownerDocument.removeEventListener('mouseup', this.docMouseUpHandler);
    }

    _mouseDownHandler (direct, e) {
        // current element
        e.stopPropagation();
        e.preventDefault();
        
        if (direct === 'x') {
            this.startingMousePageX = e.pageX;
            this.startingScrollLeft = this.element.scrollLeft;
            this.xThumb && addClass(this.xThumb, 'focus');
        }

        if (direct === 'y') {
            this.startingMousePageY = e.pageY;
            this.startingScrollTop = this.element.scrollTop;
            this.yThumb && addClass(this.yThumb, 'focus');
        }
        this.dragDirect = direct;
        this.ownerDocument.addEventListener('mousemove', this.docMouseMoveHandler, false);
        this.ownerDocument.addEventListener('mouseup', this.docMouseUpHandler, false);
    }

    _wheelEventHandler (e) {
        // avoid triggering browser scroll
        e.stopPropagation();
        if (this.maxScrollTop > 0) {
            // disable body scroll
            e.preventDefault();
        } 
        // Down is positive, Up is negative
        const [deltaX, deltaY] = getDeltaFromEvent(e);

        this.lastScrollLeft = this.element.scrollLeft;
        this.lastScrollTop = this.element.scrollTop;
        
        if (this._shouldUpdateScrollLeft(deltaX)) {
            const scrollLeft = this.element.scrollLeft + deltaX * this.options.wheelSpeed;
            this.element.scrollLeft = scrollLeft > this.maxScrollLeft ? this.maxScrollLeft : scrollLeft;
        }

        if (this._shouldUpdateScrollTop(deltaY)) {
            const scrollTop = this.element.scrollTop - deltaY * this.options.wheelSpeed;
            this.element.scrollTop = scrollTop > this.maxScrollTop ? this.maxScrollTop : scrollTop;
        } 
        
        this._handleScrollDiff();
        this._updateScrollBarStyle();
    }

    _shouldUpdateScrollLeft (deltaX) {
        if (this.element.scrollLeft === 0 && deltaX <= 0) {
            // reach to left
            return false;
        }

        if (this.element.scrollLeft === this.maxScrollLeft && deltaX > 0) {
            // reach to right
            return false;
        }

        return true;
    }

    _shouldUpdateScrollTop (deltaY) {
        if (this.element.scrollTop === 0 && deltaY >= 0) {
            // reach to top
            return false;
        }

        if (this.element.scrollTop === this.maxScrollTop && deltaY < 0) {
            // reach to bottom
            return false;
        }

        return true;
    }

    _unbindEvent () {
        this.element.removeEventListener('mouseenter');
        this.element.removeEventListener('mouseleave');
        this.element.removeEventListener('wheel', this.wheelEventHandler);
        this.element.removeEventListener('mousewheel', this.wheelEventHandler);
        this.xThumb && this.xThumb.removeAllEventListener('mousedown');
        this.yThumb && this.yThumb.removeAllEventListener('mousedown');
    }

    update () {
        if (!this.element) {
            return;
        }
        // async get data
        this._computed();
        this._createBarEle(true);
    }

    destroy () {
        if (!this.element) {
            return;
        }

        this._unbindEvent();
        removeClass(this.element, 'beautify-scroll-container');
        this.element = null;

        this.yBar && remove(this.yBar);
        this.xBar && remove(this.xBar);

        this.xBar = null;
        this.xThumb = null;
        this.xThumbWidth = null;
        this.yBar = null;
        this.yThumb = null;
        this.yThumbHeight = null;

        this.wheelEventHandler = null;
        this.docMouseMoveHandler = null;
        this.docMouseUpHandler = null;
    }
};
