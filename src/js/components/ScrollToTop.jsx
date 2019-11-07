
import React from 'react'
import {withRouter} from 'react-router-dom'
import Globals from '../helpers/Globals';

class ScrollToTop extends React.Component{

    constructor(props){
        super(props)

        this.state = {
          
        }

        Globals.ScrollToTop = this
    }


    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){
            // console.log('did update')
            // this.restoreScroll()
        }
    }

    render(){
        return this.props.children
    }
}

export default withRouter(ScrollToTop)