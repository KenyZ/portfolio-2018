import React from 'react'
import {Link} from 'react-router-dom'
import Utils from '../../../../helpers/Utils'
import Cursor from '../../../../components/Cursor/Cursor';
import Store from '../../../../helpers/Store'

export default class WorkListItem extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            previewReady: false,
            previewSrc: null,
            hover: false,
            storedVideo: Store['workItem-' + this.props.workData.id_name] || null
        }
    }

    componentWillUnmount(){
        Store['workItem-' + this.props.workData.id_name] = this.thisVideo.src
    }

    onMouseEnter = () => {
        let preview = document.getElementById('workItemPreview' + this.props.workData.id)


        if(!Utils.isMobile()){
            this.setState({
                hover: true
            })
            preview.classList.add('active')
            if(this.thisVideo) this.thisVideo.play()
        } else {
            if(this.state.previewReady){
                let video = preview.querySelectorAll('video')[0]
                video.style['left'] = ''
                video.style['top'] = ''
            }
        }
    }

    onMouseLeave = () => {

        if(!Utils.isMobile()){
            let preview = document.getElementById('workItemPreview' + this.props.workData.id)

            this.setState({
                hover: false
            })
            preview.classList.remove('active')
            if(this.thisVideo) this.thisVideo.pause()
        }
    }

    onMousemove = (e) => {
        
        
        if(!Utils.isMobile()){
            if(this.state.hover){

                let preview = document.getElementById('workItemPreview' + this.props.workData.id)


                let target = document.getElementById('workItemLink' + this.props.workData.id)
                let mouse = Utils.getMouseIn(target, e)

                preview.style['transform'] = 'matrix(1, 0, 0, 1, ' + mouse.x + ', ' + mouse.y + ')'

            }
        }
        
    }

    render(){

        const work = this.props.workData
        const linesInWorkTitle = work.title.split(' ')
        const desktopMode = this.props.desktopMode

        const desktopModeProps = {
            onMouseMove: this.onMousemove,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
        }

        const mobileModeProps = {
            style: {
                transform: ''
            }
        }

        const conditionalProps = desktopMode ? desktopModeProps : {}
        const conditionalProps2 = desktopMode ? {} : mobileModeProps

        return(
            <Link 
                className="anim-home-item workList-item"
                to={'/projets/' + work.id_name}
                {...Cursor.dispatchedEvents()}
            >
                <div 
                    className="workList-link" 
                    {...conditionalProps}    
                    id={'workItemLink' + work.id}
                    >
                    <small className="number">0{this.props.itemIndex}</small>
                    <span className="text">
                        {
                            linesInWorkTitle.map((line, idx) => {
                                return(
                                    <span key={work.id + idx}className="line">{line}</span>
                                )
                            })
                        }
                    </span>
                </div>
                <div 
                    id={'workItemPreview' + work.id}
                    className="workList-itemPreview"
                    {...conditionalProps2}
                    >
                    <video 
                        className="image" 
                        // src={this.state.storedVideo || this.state.previewSrc} 
                        muted 
                        autoPlay={!this.props.desktopMode}
                        loop
                        ref={el => this.thisVideo = el}
                        onCanPlay={() => {
                            this.setState({loaded: true})
                        }}
                        src={'/medias/videopreviews/' + (work.id_name) + '.mp4'}
                    ></video> 
                    {!this.state.loaded && <div className="loading"><div className="spinner-border"></div></div>}
                </div>
            </Link>
        )
    }
}