window.utils = {
    /**
     * 根据父元素选择器获取父元素
     * 
     * @param {Element} target 
     * @param {String} parentClass 
     * @returns {Element}
     */
    getParentByClass (target, parentClass) {
        parentClass = this.getStringBySelector(parentClass)

        while (!this.hasClass(target, parentClass)) {
            target = target.parentNode
        }
        return target
    },  

    /**
     * 去掉选择器选项
     * 
     * @param {String} selector 
     * @returns {String}
     */
    getStringBySelector (selector) {
        if (/^[\.|#]/.test(selector)) {
            selector = selector.substring(1)
        }

        return selector
    },  

    /**
     * 是否是子元素
     * 
     * @param {Element} elem 
     * @param {String} parentClassString 
     * @returns {Boolean}
     */
    isChild (elem, parentClassString) {
        let checkNode = elem,
            isDocumentElem = false,
            isChild = this.hasClass(checkNode, parentClassString)

        while (!isChild && !isDocumentElem) {
            if (checkNode.tagName === 'HTML') {
                isDocumentElem = true
            }

            checkNode = checkNode.parentNode
            isChild = this.hasClass(checkNode, parentClassString)
        }

        return isChild
    },

    hasClass (elem, classString) {
        if (elem && elem.classList) {
            return elem.classList.contains(classString)
        } else {
            return false
        }
    },

    /**
     * 事件委托
     * 
     * @param {String} event 事件类型 
     * @param {Element} rootElem 根元素
     * @param {String|Array} bindElemSelector 被绑定元素的选择器
     * @param {function} callback 触发回调
     */
    on (event, rootElem, bindElemSelector, callback) {
        const _checkBind = (selectString, e) => {
            if (this.hasClass(e.target, selectString) || this.isChild(e.target, selectString)) {
                // console.log(bindElemSelector)
                callback && callback(e)
            }
        }

        rootElem.addEventListener(event, e => {
            if (bindElemSelector instanceof Array) {
                bindElemSelector.forEach(selector => _checkBind(this.getStringBySelector(selector), e))
            } else {
                _checkBind(bindElemSelector.substring(1), e)
            }
        }, false)
    } 
}