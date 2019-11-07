
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import './customizedScrollbar.scss'
import EventBus from '../../helpers/EventBus';
import Globals from '../../helpers/Globals';
import { TweenLite, Power2 , CSSPlugin} from 'gsap/all';
import Utils from '../../helpers/Utils'
const plugin = [CSSPlugin]

export default class CustomizedScrollbar extends React.Component{
    
    setPercentageScroll = (el) => {
        
        let scrollValue = el.scrollTop / (el.scrollHeight - document.documentElement.clientHeight)
        window.getScrollPercentage = scrollValue
        if(this.props.dispatchEvent) EventBus.dispatchEvent({type: 'scrolling', data: {scrollValue}})
    }

    componentDidMount(){
        this.saveComponentFromGlobals()
    }
    componentWillUnmount(){
        this.removeFromGlobals()
    }

    saveComponentFromGlobals(ref){
        Globals.scrollingContainers.push(this.containerRef)

        if(Utils.isMobile()){
            this.containerRef.classList.add('ps-on-mobile')
        }
    }
    removeFromGlobals(){
        Globals.scrollingContainers.pop()
    }

    static scrollTop(){
        const ctn = Globals.scrollingContainers[0]
        TweenLite.to(ctn, 1, {
            scrollTop: 0,
            ease: Power2.easeInOut
        })
        // ctn.scrollTop = 0
    }
    

    render(){

        const {children, passedProps} = this.props
        return(
            <PerfectScrollbar 
                {...(passedProps || {})} 
                style={{height: '100vh'}}
                onScrollY={(el) => {this.setPercentageScroll(el)}}
                containerRef={ref => {this.containerRef = ref}}
            >
                {children}
            </PerfectScrollbar>
        )
    }
}