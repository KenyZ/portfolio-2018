import React from 'react'
import CustomizedScrollbar from '../CustomizedScrollbar';
import Globals from '../../helpers/Globals';


export default class TransitionManager extends React.Component{

    isHome(pathname){
        return pathname && pathname === '/'
    }

    isAbout(pathname){
        return pathname && pathname === '/àpropos'
    }

    isWorkSingle(pathname){
        return pathname && pathname.includes('/projets/')
    }

    isLeavingWorkSingle(prev, current){
        return prev && this.isWorkSingle(prev) && !this.isWorkSingle(current)
    }

    componentDidMount(){
        this.handle(null, this.props.location.pathname)
    }

    componentDidUpdate(prevProps){

        const prev = prevProps.location.pathname
        const current = this.props.location.pathname

        if(prev !== current){
            this.handle(prev, current)
        }

    }

    handle(prev, current){

        // LEAVING
        if(this.isWorkSingle(prev)){ // FROM SINGLE TO ?
            CustomizedScrollbar.scrollTop()
        }
        else if(this.isAbout(prev)){
            CustomizedScrollbar.scrollTop()
        }

        // LEAVE AND GO
        if(this.isLeavingWorkSingle(prev, current)){ // LEAVE SINGLE
            document.body.classList.remove('in-workSingle')
        }

        // GOING
        if(this.isWorkSingle(current)){ // GO TO SINGLE
            document.body.classList.add('in-workSingle')
        }

        else if(this.isAbout(current)){ // GO ABOUT
            Globals.Canvas3d.state.self.goAbout()
        }

        else if(this.isHome(current)){
            Globals.Canvas3d.state.self.goHome()
        }

        

        

    }

    render(){
        return this.props.children
    }
}