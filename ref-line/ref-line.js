// https://github.com/think2011/ref-line/blob/master/src/ref-line.js
class RefLine {
    constructor (options) {
        this.options = Object.assign({
            gap: 3
        }, options)

        this.refLines = {
            xt: null,
            xm: null,
            xb: null,
            yl: null,
            ym: null,
            yr: null
        }

        this.initRefLine()
    }

    initRefLine () {
        Object.keys(this.refLines).forEach(line => {
            let node = this.refLines[line] = document.createElement('div')

            node.style.cssText = `display:none;opacity:0.7;position:absolute;background:#4DAEFF;z-index:199111250;${line[0] === 'x' ? 'width:100%;height:1px;left:0;' : 'width:1px;height:100%;top:0;'}`
            
            node.show = function () {
                this.style.display = 'block'
            }

            node.hide = function () {
                this.style.display = 'none'
            }

            document.body.appendChild(node)
        })
    }

    checkPaint (dragCurrNode, checkNodes) {
        let dragCurrClientRect = dragCurrNode.getBoundingClientRect()

        this.unCheckPaint()
        Array.from(checkNodes).forEach((box) => {
            if (box === dragCurrNode) {
                return undefined
            }

            const { top, right, bottom, left, width, height } = box.getBoundingClientRect()
            let middleX = top + height / 2,
                middleY = left + width / 2,
                computeTop, 
                computeLeft

            let conditions = {
                top: [
                    // xt-top
                    {
                        isNearly: this.isNearly(dragCurrClientRect.top, top),
                        lineNode: this.refLines.xt,
                        dragValue: top,
                        lineValue: top
                    },
                    // xt-bottom 
                    {
                        isNearly: this.isNearly(dragCurrClientRect.bottom, top),
                        lineNode: this.refLines.xt,
                        dragValue: top - dragCurrClientRect.height,
                        lineValue: top
                    },
                    // xm-middle
                    {
                        isNearly: this.isNearly(dragCurrClientRect.top + dragCurrClientRect.height / 2, middleX),
                        lineNode: this.refLines.xm,
                        lineValue: middleX,                        
                        dragValue: middleX - dragCurrClientRect.height / 2            
                    },
                    // xb-top
                    {
                        isNearly: this.isNearly(dragCurrClientRect.bottom, bottom),
                        lineNode: this.refLines.xb,
                        lineValue: bottom,
                        dragValue: bottom - dragCurrClientRect.height
                    },
                    // xb-bottom
                    {
                        isNearly: this.isNearly(dragCurrClientRect.top, bottom),
                        lineNode: this.refLines.xb,
                        dragValue: bottom,
                        lineValue: bottom                     
                    }
                ],
                left: [
                    // yl-left
                    {
                        isNearly: this.isNearly(dragCurrClientRect.left, left),
                        lineNode: this.refLines.yl,
                        dragValue: left,
                        lineValue: left                      
                    },
                    // yl-right
                    {
                        isNearly: this.isNearly(dragCurrClientRect.right, left),
                        lineNode: this.refLines.yl,
                        dragValue: left - dragCurrClientRect.width,
                        lineValue: left           
                    },
                    // ym-middle
                    {
                        isNearly: this.isNearly(dragCurrClientRect.left + dragCurrClientRect.width / 2, middleY),
                        lineNode: this.refLines.ym,
                        dragValue: middleY - dragCurrClientRect.width / 2,
                        lineValue: middleY                        
                    },
                    // yr-left
                    {
                        isNearly: this.isNearly(dragCurrClientRect.right, right),
                        lineNode: this.refLines.yr,
                        dragValue: right - dragCurrClientRect.width,
                        lineValue: right                       
                        
                    },
                    // yr-right
                    {
                        isNearly: this.isNearly(dragCurrClientRect.left, right),
                        lineNode: this.refLines.yr,
                        dragValue: right,
                        lineValue: right                     
                    }
                ]
            }   
            
            for (let key in conditions) {
                // 遍历符合的条件并处理
                conditions[key].forEach((condition) => {
                    if (!condition.isNearly) return

                    // item.classList.add('ref-line-active')
                    dragCurrNode.style[key] = `${condition.dragValue}px`
                    condition.lineNode.style[key] = `${condition.lineValue}px`
                    condition.lineNode.show()
                })
            }
            // x 
            // if (this.isNearly(dragCurrClientRect.top, top)) {
            //     computeTop = top
            // } else if (this.isNearly(dragCurrClientRect.top, middleX)) {
            //     computeTop = middleX
            // } else if (this.isNearly(dragCurrClientRect.top, bottom)) {
            //     computeTop = bottom
            // }

            // // y
            // if (this.isNearly(dragCurrClientRect.left, left)) {
            //     computeLeft = left
            // } else if (this.isNearly(dragCurrClientRect.left, middleY)) {
            //     computeLeft = middleY
            // } else if (this.isNearly(dragCurrClientRect.left, right)) {
            //     computeLeft = right
            // }

            // if (this.isDef(computeTop)) {
            //     this.refLines.xt.style.top = `${computeTop}px`
            //     dragCurrNode.style.top = `${computeTop}px`
            //     this.refLines.xt.show()
            // } 

            // if (this.isDef(computeLeft)) {
            //     this.refLines.yl.style.left = `${computeLeft}px`
            //     dragCurrNode.style.left = `${computeLeft}px`
            //     this.refLines.yl.show()
            // } 
        })
    }

    unCheckPaint () {
        Object.keys(this.refLines).forEach(line => this.refLines[line].hide())
    }

    isNearly (val1, val2) {
        return Math.abs(val1 - val2) <= this.options.gap
    }

    isDef (param) {
        return param !== undefined
    }
}
