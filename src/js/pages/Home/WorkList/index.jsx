import React from 'react'
import WorkListItem from './WorkListItem';

import './workList.scss'

import {TweenLite, CSSPlugin} from 'gsap/all';
import Constants from '../../../helpers/Constants';
import Utils from '../../../helpers/Utils';
import CustomizedScrollbar from '../../../components/CustomizedScrollbar';
import WorkSlider from './WorkSlider';
import Store from '../../../helpers/Store'

const plugin = [CSSPlugin]

const SCROLL_QUANTITY = 150

export default class WorkList extends React.Component{

    constructor(){
        super()

        this.workList = null
        this.workSlider = null
        this.state = {
            works: [],
            desktopMode: true
        }
        
    }

    componentDidMount(){
        this.getWorks()
        this.setState({
            workListScroll: document.getElementById('workListScroll')
        })

        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize, false)
    }

    getWorks = () => {

        if(Store['home_works']){
            this.setState({works: Store['home_works']})
        } else {
            fetch(Constants.API_HOST + 'getWorks.php')
            .then(data => data.json())
            .then(data => {
    
                if(data.code === 200){
                    this.setState({works: data.data})
                    Store['home_works'] = data.data
                } 
            })
        }
        
    }

    _onSlide = (cursorPosition) => {

        let container = this.workList.parentElement
        let max = Utils.getMaxScrollX(container)
        let scrollValue = max * (cursorPosition / 100)

        TweenLite.to(container, .5, {
            scrollLeft: scrollValue,

            callbackScope: this,

            onStart(){
                this.isSliding = true
            },

            onComplete(){
                this.isSliding = false
            }
        })

        container.scrollLeft = scrollValue
    }

    onResize = (e) => {

        if(this.state.desktopMode === true && Utils.isMobile()){
            this.setState({desktopMode: false})
        } 
        else if(this.state.desktopMode === false && !Utils.isMobile()){
            this.setState({desktopMode: true})
        }
    }

    onScroll = (e) => {


        let direction = e.deltaY > 0 ? 1 : -1
        let willScroll = SCROLL_QUANTITY * -direction

        let transform = Utils.getTransformFromMatrix(this.state.workListScroll)

        let wrapperHeight = this.state.workListScroll.offsetHeight

        if(transform){

            if(transform.y + willScroll > SCROLL_QUANTITY){
                return;
            }

            else if(transform.y + willScroll < -(wrapperHeight - SCROLL_QUANTITY)){
                return;
            }

        }

        

        TweenLite.to(this.state.workListScroll, .3, {
            y: '+=' + willScroll,
        })
    }

    render(){

        const self = this

        return(
            <CustomizedScrollbar
                passedProps={{
                    suppressScrollX: true,
                    className: 'hide-scroll',
                    onScrollX(domEl){
                        let max = Utils.getMaxScrollX(domEl)
                        let value = Math.floor((domEl.scrollLeft / max) * 100)
                        value = Math.max(value, 0)
                        value = Math.min(value, 100)
                        self.workSlider.setCursor(value)
                    }
                }}
            >
                <div 
                    ref={el => {
                        window.workListComponent = el
                        this.workList = el
                    }} 
                    id="workList" 
                    className={'workList ' + (this.state.desktopMode ? 'desktopMode' : '')}>
                    <div id="workListScroll" className="inner">
                        <div className="wrapper">
                            {
                                this.state.works.map((work, idx) => {
                                    return(
                                        <WorkListItem key={work.id} desktopMode={this.state.desktopMode} itemIndex={idx + 1} workData={work}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <WorkSlider ref={el => {this.workSlider = el}} worksLength={this.state.works.length} onSlideProps={this._onSlide}/>
            </CustomizedScrollbar>
            
        )
    }
}