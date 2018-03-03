// CustomEvent: https://caniuse.com/#search=CustomEvent
function createCustomEvent (eventName) {
    if (typeof window.CustomEvent === 'function') {
        return new CustomEvent(eventName, {
            bubbles: false,
            cancelable: false,
            detail: null
        });
    } else {
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(eventName, false, false, null);
        return evt;
    }
};

export default createCustomEvent;
