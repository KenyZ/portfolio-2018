import React from 'react'
import './cursor.scss'
import { TweenLite, CSSPlugin } from 'gsap/all';
import Globals from '../../helpers/Globals'
import Utils from '../../helpers/Utils';
const plugin = [CSSPlugin]

class Cursor extends React.Component{
    
    static dispatchedEvents(){
        return Utils.isMobile() ? {} : {
            onMouseEnter(){
                if(Globals.Cursor) Globals.Cursor.classList.add('active')
            },
            onMouseLeave(){
                if(Globals.Cursor) Globals.Cursor.classList.remove('active')
            }
        }
    }

    _onMouseMove = (e) => {
        let mouse = {
            x: e.clientX,
            y: e.clientY
        }
        let circle = this.circle

        TweenLite.to(circle, .4, {
            css: {
                x: mouse.x,
                y: mouse.y
            }
        })

    }
    componentDidMount(){
        window.addEventListener('mousemove', this._onMouseMove, false)
        Globals.Cursor = this.cursor
    }
    render(){
        return(
            <div 
                ref={el => this.cursor = el} 
                className="cursorCustom" 
                id="cursor"
            >
                <div ref={el => this.circle = el} className="circle" />
            </div>
        )
    }
}

export default Cursor