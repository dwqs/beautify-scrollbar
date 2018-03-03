function toArray (element) {
    let str = (element.getAttribute('class') || '').replace(/^\s+|\s+$/g, '');
    let classes = str.split(/\s+/);
    if (classes[0] === '') {
        classes.shift();
    }
    return classes;
};

function removeClass (element, cls) {
    if (!cls || typeof cls !== 'string' || !element || !element.nodeName) {
        return void 0;
    }
    
    let _curClasses = [];
    let curClasses = toArray(element);
    let classes = cls.split(' ');

    for (let i = 0; i < classes.length; i++) {
        let clsName = classes[i];
        if (!clsName) {
            continue;
        }
        if (element.classList) {
            element.classList.remove(clsName);
        } else {
            curClasses.splice(curClasses.indexOf(clsName), 1);
        }
    }
    _curClasses = curClasses;

    if (!element.classList) {
        element.setAttribute('class', _curClasses.join(' '));
    }
}

function addClass (element, cls) {
    if (!cls || typeof cls !== 'string' || !element || !element.nodeName) {
        return void 0;
    }

    let curClasses = toArray(element);
    let classes = cls.split(' ');

    for (let i = 0; i < classes.length; i++) {
        let clsName = classes[i];
        if (!clsName) {
            continue;
        }
        if (element.classList) {
            element.classList.add(clsName);
        } else {
            curClasses.push(clsName);
        }
    }

    if (!element.classList) {
        element.setAttribute('class', curClasses.join(' '));
    }
}

export {
    addClass,
    removeClass
};
