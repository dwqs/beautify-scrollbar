const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
    }
};

function microtaskDebounce (fn) {
    let called = false;
    return function () {
        if (called) {
            return;
        }
        const context = this;
        called = true;
        window.Promise.resolve().then(() => {
            called = false;
            fn.apply(context, arguments);
        });
    };
}

function taskDebounce (fn) {
    let scheduled = false;
    return function () {
        if (!scheduled) {
            const context = this;
            scheduled = true;
            setTimeout(() => {
                scheduled = false;
                fn.apply(context, arguments);
            }, timeoutDuration);
        }
    };
}

const supportsMicroTasks = isBrowser && window.Promise;

export default (supportsMicroTasks ? microtaskDebounce : taskDebounce);
