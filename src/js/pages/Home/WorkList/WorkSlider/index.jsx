import React from 'react'
import './workSlider.scss'
import Utils from '../../../../helpers/Utils';
import Cursor from '../../../../components/Cursor/Cursor';

export default class WorkSlider extends React.Component{
    
    constructor(props){
        super(props)

        this.workSlider = null
        this.state = {
            dragging: false,
            cursorPosition: 0
        }
    }

    componentDidMount(){
        document.addEventListener('mouseup', this._globalOnMouseUp)
        document.addEventListener('touchend', this._globalOnMouseUp)
    }
    
    componentWillUnmount(){
        document.removeEventListener('mouseup', this._globalOnMouseUp)
        document.removeEventListener('touchend', this._globalOnMouseUp)
    }

    setCursor = (value) => {

        this.workSliderCursor.style['margin-left'] = value + '%'

        let worksLength = this.props.worksLength
        let step = (1 / worksLength) * 100
        let currentStep = Math.floor(value / step)
        currentStep = Math.min(currentStep, 6)
        currentStep++

        this.workSliderCursor.innerText = '0' + currentStep + ' - 0' + this.props.worksLength

    }
    
    _globalOnMouseUp = () => {

        if(this.state.dragging === true){
            this._onMouseUp()
        }
    }
    
    _onMouseDown = () => {
        this.setState({dragging: true})
        this.workSlider.classList.add('cursor-on')
    }

    _onMouseUp = ()  => {
        this.setState({dragging: false})
        this.workSlider.classList.remove('cursor-on')
    }
    
    _onMouseMove(event){
        return (event) => {
            event.persist()
            if(this.state.dragging === true && this.workSlider){
                let mouse = Utils.getMouseIn(this.workSlider, event)
                let width = this.workSlider.offsetWidth
                let pos = Math.floor((mouse.x / width) * 100)
                pos = Math.max(pos, 0)
                pos = Math.min(pos, 100)
                this.setCursor(pos)
                this.props.onSlideProps(pos)
            }
        }
    }

    render(){
        return(
            <div 
                ref={el => {this.workSlider = el}} 
                className="workSlider" id="workSlider" 
                onMouseMove={this._onMouseMove()}
                onTouchMove={this._onMouseMove()}
            >
                <div className="inner">
                    <button 
                        ref={el => {this.workSliderCursor = el}} 
                        // onClick={this._onMouseUp} 
                        onMouseDown={this._onMouseDown}
                        onMouseUp={this._onMouseUp} 

                        onTouchStart={this._onMouseDown}
                        onTouchEnd={this._onMouseUp} 
                        tabIndex="-1"
                        id="cursor" 
                        className="cursor"
                        {...Cursor.dispatchedEvents()}
                    >{'01 - 0' + this.props.worksLength}</button>
                </div>
            </div>
        )
    }
}