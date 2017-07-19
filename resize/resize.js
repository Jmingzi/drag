class Resize {
    constructor (options) {
        if (!options.resizeParentSelector) {
            console.log('resizeParentSelector is must')
            return 
        }

        this.options = options
        this.bind()
    }  

    bind () {
        let sizAble = false,
            downX, 
            downY, 
            clientRect, 
            resizeParentElem, 
            resizeParentRect, 
            classList

        utils.on('mousedown', document.body, ['.resize'], (e) => {
            e.stopPropagation()
            sizAble = true
            
            downX = e.pageX
            downY = e.pageY

            classList = utils.getParentByClass(e.target, '.resize').classList
            resizeParentElem = utils.getParentByClass(e.target, this.options.resizeParentSelector)
            resizeParentRect = resizeParentElem.getBoundingClientRect()
            clientRect = e.target.getBoundingClientRect()

            console.log('resize down')
        })

        document.addEventListener('mousemove', (e) => {
            e.stopPropagation()

            if (sizAble && resizeParentElem) {
                let diffX = e.pageX - downX,
                    diffY = e.pageY - downY

                const { width, height, left, top, right, bottom } = resizeParentRect
                const resizeLineDot = {
                    'line-xt': {
                        isSelf: classList.contains('line-xt'),
                        width: `${width}px`,
                        height: `${height - diffY}px`,
                        top: `${top + diffY}px`
                    },
                    'line-xb': {
                        isSelf: classList.contains('line-xb'),
                        width: `${width}px`,
                        height: `${height + diffY}px`,
                        top: `${top}px`,
                        left: `${left}px`
                    },
                    'line-yl': {
                        isSelf: classList.contains('line-yl'),
                        width: `${width - diffX}px`,
                        height: `${height}px`,
                        top: `${top}px`,
                        left: `${left + diffX}px`
                    },
                    'line-yr': {
                        isSelf: classList.contains('line-yr'),
                        width: `${width + diffX}px`,
                        height: `${height}px`,
                        top: `${top}px`,
                        left: `${left}px`
                    },
                    'dot-lt': {
                        isSelf: classList.contains('dot-lt'),
                        width: `${width - diffX}px`,
                        height: `${height - diffY}px`,
                        top: `${top + diffY}px`,
                        left: `${left + diffX}px`
                    },
                    'dot-rt': {
                        isSelf: classList.contains('dot-rt'),
                        width: `${width + diffX}px`,
                        height: `${height - diffY}px`,
                        top: `${top + diffY}px`,
                        left: `${left}px`
                    },
                    'dot-lb': {
                        isSelf: classList.contains('dot-lb'),
                        width: `${width - diffX}px`,
                        height: `${height + diffY}px`,
                        top: `${top}px`,
                        left: `${left + diffX}px`
                    },
                    'dot-rb': {
                        isSelf: classList.contains('dot-rb'),
                        width: `${width + diffX}px`,
                        height: `${height + diffY}px`,
                        top: `${top}px`,
                        left: `${left}px`
                    }
                }
                
                Object.keys(resizeLineDot).forEach(item => {
                    if (resizeLineDot[item].isSelf) {
                        Object.keys(resizeLineDot[item]).forEach(key => {
                            resizeParentElem.style[key] = resizeLineDot[item][key]
                        })
                    }
                })
            }
        })

        document.addEventListener('mouseup', (e) => {
            e.stopPropagation()
            
            if (sizAble && resizeParentElem) {
                sizAble = false
                resizeParentElem = null
                console.log('resize up')
            }        
        })
    }
}




