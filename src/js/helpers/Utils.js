

export default {

    getTransformFromMatrix(el){

        let matrixString = window.getComputedStyle(el).transform
        if(matrixString === 'none'){
            return null
        } else {
            matrixString = matrixString
                .replace('matrix(', '')
                .replace(')', '')
                .replace(/\s/g, '')
            matrixString = matrixString.split(',')
            return {
                x: Number(matrixString[matrixString.length - 2]),
                y: Number(matrixString[matrixString.length - 1]),
            }
        }
        
    },

    isMobile(){
        return window.innerWidth < 1140
    },

    getMouseIn(el, event) {
        let rect = el.getBoundingClientRect()

        if(typeof event.clientX === 'undefined' && typeof event.clientY === 'undefined'){
            event = event.touches[0]
        }

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    },

    getMaxScrollX(el){
        return el.scrollWidth - el.clientWidth
    },

    getPercentageScrollX(el){
        return (el['scrollLeft'] / el['scrollWidth']) - el.clientWidth * 100;
    }
}