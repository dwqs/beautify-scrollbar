import './index.less';

import {
    createDiv,
    getCSS,
    setCSS,
    getDeltaFromEvent,
    remove
} from './dom-helpers';

export default class BeautifyScrollBar {
    constructor (element, opts = {}) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
    
        if (!element || !element.nodeName) {
            throw new Error('no element is specified to initialize BeautifyScrollBar');
        }
            
        const defaultOpts = {
            wheelSpeed: 1
        };

        this.element = element;
        this.ownerDocument = this.element.ownerDocument || document;
        this.rect = this.element.getBoundingClientRect();
        this.options = Object.assign({}, defaultOpts, opts);

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
        this.mouseMoveHandler = this._mouseMoveHandler.bind(this); // throttle(this._mouseMoveHandler.bind(this), 20, 10);
        this.mouseUpHandler = this._mouseUpHandler.bind(this);

        if (this.element.classList) {
            this.element.classList.add('beautify-scroll-container');
        } else {
            const cls = this.element.className;
            this.element.className = cls + ' beautify-scroll-container';
        }

        // contentWidth/contentHeight of this.options to scroll based container lazy-load.
        this.contentWidth = isNaN(this.options.contentWidth) ? Math.max(this.element.scrollWidth, element.clientWidth) : this.options.contentWidth;
        this.contentHeight = isNaN(this.options.contentHeight) ? Math.max(this.element.scrollHeight, element.clientHeight) : this.options.contentHeight;

        this.containerWidth = this.rect.width || element.clientWidth;
        this.containerHeight = this.rect.height || element.clientHeight;

        this.maxScrollLeft = this.contentWidth - this.containerWidth;
        this.maxScrollTop = this.contentHeight - this.containerHeight;

        !!this.maxScrollTop && this.createBarEle();
        this.bindWheelEvent();
    }

    updateContentHeight (contentHeight) {
        // async get data
        this.contentHeight = contentHeight;
        this.maxScrollTop = contentHeight - this.containerHeight;
        if (!this.yBar) {
            this.createBarEle();
        }
    }

    createBarEle () {
        if (this.maxScrollTop > 0) {
            this.yBar = createDiv('beautify-scroll__y-bar');
            this.element.appendChild(this.yBar);
            setCSS(this.yBar, { height: this.containerHeight, right: 0, top: 0 });
            this.yBar.setAttribute('tabindex', 0);

            this.yThumb = createDiv('beautify-scroll__y-thumb');
            this.yBar.appendChild(this.yThumb);
            this.yThumbHeight = parseInt(this.containerHeight * this.containerHeight / this.contentHeight, 10);
            setCSS(this.yThumb, { top: 0, height: this.yThumbHeight });
            
            this.yScrollFactor = (this.contentHeight - this.containerHeight) / (this.containerHeight - this.yThumbHeight);
            this.yThumb.addEventListener('mousedown', this.mouseDownHandler.bind(this, 'y'), false);
        }

        if (this.maxScrollLeft > 0) {
            this.xBar = createDiv('beautify-scroll__x-bar');
            this.element.appendChild(this.xBar);
            setCSS(this.xBar, { left: 0, width: this.containerWidth, bottom: 0 });
            this.xBar.setAttribute('tabindex', 0);

            this.xThumb = createDiv('beautify-scroll__x-thumb');
            this.xBar.appendChild(this.xThumb);
            this.xThumbWidth = parseInt(this.containerWidth * this.containerWidth / this.contentWidth, 10);
            setCSS(this.xThumb, { left: 0, width: this.xThumbWidth });

            this.xScrollFactor = (this.contentWidth - this.containerWidth) / (this.containerWidth - this.xThumbWidth);
            this.xThumb.addEventListener('mousedown', this.mouseDownHandler.bind(this, 'x'), false);
        }
    }

    bindWheelEvent () {
        if (typeof window.onwheel !== 'undefined') {
            // passive: https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=zh-cn
            // #https://github.com/utatti/perfect-scrollbar/issues/560
            this.element.addEventListener('wheel', this.wheelEventHandler, false);
        } else if (typeof window.onmousewheel !== 'undefined') {
            this.element.addEventListener('mousewheel', this.wheelEventHandler, false);
        }
    }

    _mouseMoveHandler (e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.dragDirect === 'x') {
            const scrollLeft = this.startingScrollLeft + this.xScrollFactor * (e.pageX - this.startingMousePageX);
            this.element.scrollLeft = scrollLeft > this.maxScrollLeft ? this.maxScrollLeft : scrollLeft;
        } else if (this.dragDirect === 'y') {
            const scrollTop = this.startingScrollTop + this.yScrollFactor * (e.pageY - this.startingMousePageY);
            this.element.scrollTop = scrollTop > this.maxScrollTop ? this.maxScrollTop : scrollTop;
        }

        this.updateScrollBarStyle();
    }

    _mouseUpHandler (e) {
        e.stopPropagation();
        e.preventDefault();

        this.ownerDocument.removeEventListener('mousemove', this.mouseMoveHandler);
        this.ownerDocument.removeEventListener('mouseup', this.mouseUpHandler);
    }

    mouseDownHandler (direct, e) {
        e.stopPropagation();
        e.preventDefault();

        if (direct === 'x') {
            this.startingMousePageX = e.pageX;
            this.startingScrollLeft = this.element.scrollLeft;
        }

        if (direct === 'y') {
            this.startingMousePageY = e.pageY;
            this.startingScrollTop = this.element.scrollTop;
        }
        this.dragDirect = direct;
        this.ownerDocument.addEventListener('mousemove', this.mouseMoveHandler, false);
        this.ownerDocument.addEventListener('mouseup', this.mouseUpHandler, false);
    }

    updateScrollBarStyle () {
        this.yBar && setCSS(this.yBar, { top: this.element.scrollTop, height: this.containerHeight, right: -this.element.scrollLeft });
        const yThumbTop = parseInt(this.element.scrollTop * (this.containerHeight - this.yThumbHeight) / this.maxScrollTop, 10);
        this.yThumb && setCSS(this.yThumb, { top: yThumbTop, height: this.yThumbHeight });

        this.xBar && setCSS(this.xBar, { left: this.element.scrollLeft, width: this.containerWidth, bottom: -this.element.scrollTop });
        const xThumbLeft = parseInt(this.element.scrollLeft * (this.containerWidth - this.xThumbWidth) / this.maxScrollLeft, 10);
        this.xThumb && setCSS(this.xThumb, { left: xThumbLeft, width: this.xThumbWidth });

        if (typeof this.options.callBack === 'function') {
            this.options.callBack({
                scrollLeft: this.element.scrollLeft,
                scrollTop: this.element.scrollTop
            });
        }
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

        // const scrollTop = this.element.scrollTop - deltaY * this.options.wheelSpeed;
        // this.element.scrollTop = scrollTop > this.maxScrollTop ? this.maxScrollTop : scrollTop;

        if (this.shouldUpdateScrollTop(deltaY)) {
            const scrollTop = this.element.scrollTop - deltaY * this.options.wheelSpeed;
            this.element.scrollTop = scrollTop > this.maxScrollTop ? this.maxScrollTop : scrollTop;
        }

        if (this.shouldUpdateScrollLeft(deltaX)) {
            const scrollLeft = this.element.scrollLeft + deltaX * this.options.wheelSpeed;
            this.element.scrollLeft = scrollLeft > this.maxScrollLeft ? this.maxScrollLeft : scrollLeft;
        } 

        this.updateScrollBarStyle();
    }

    shouldUpdateScrollLeft (deltaX) {
        if (this.element.scrollLeft === this.maxScrollLeft && deltaX > 0) {
            // right
            return false;
        }

        if (this.element.scrollLeft === 0 && deltaX <= 0) {
            // left
            return false;
        }

        return true;
    }

    shouldUpdateScrollTop (deltaY) {
        if (this.element.scrollTop === this.maxScrollTop && deltaY < 0) {
            // bottom
            return false;
        }

        if (this.element.scrollTop === 0 && deltaY >= 0) {
            // top
            return false;
        }

        return true;
    }

    removeAllEventListener () {
        this.element.removeEventListener('wheel', this.wheelEventHandler);
        this.element.removeEventListener('mousewheel', this.wheelEventHandler);
        this.xThumb && this.xThumb.removeAllEventListener('mousedown');
        this.yThumb && this.yThumb.removeAllEventListener('mousedown');
    }

    removeClasses () {
        this.element.className = this.element.className
            .split(' ')
            .filter(name => !name.match(/^beautify\-scroll\-container$/))
            .join(' ');
    }

    destroy () {
        this.removeAllEventListener();
        this.removeClasses();

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
        this.mouseMoveHandler = null;
        this.mouseUpHandler = null;
    }
};
