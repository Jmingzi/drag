class Drag {
    constructor (options) {
        if (!options.selector) {
            console.log('selector is must')
            return
        }

        this.options = options
        this.bind()
    }

    bind () {
        let moveAble = false,
            zIndex = 1, 
            clientRect,
            moveElem,
            startDiffLeft,
            startDiffTop,
            endLeft, 
            endTop

        utils.on('mousedown', document, this.options.selector, (e) => {
            e.stopPropagation()

            moveAble = true
            moveElem = e.target
            clientRect = moveElem.getBoundingClientRect()
            startDiffLeft = e.pageX - clientRect.left
            startDiffTop = e.pageY - clientRect.top
            console.log('start')

            this.options.downCallBack && this.options.downCallBack(moveElem)
        })

        document.addEventListener('mousemove', (e) => {
            e.stopPropagation()
            
            if (moveAble && moveElem) {
                endLeft = e.pageX - startDiffLeft
                endTop = e.pageY - startDiffTop
                moveElem.style.left = `${endLeft}px`
                moveElem.style.top = `${endTop}px`
                
                this.options.moveCallBack && this.options.moveCallBack(moveElem)
            }
        })

        document.addEventListener('mouseup', (e) => {
            e.stopPropagation()

            if (moveAble && moveElem) {
                moveAble = false
                moveElem = null
                console.log('end')

                this.options.upCallBack && this.options.upCallBack(moveElem)
            }
        })
    }
}
