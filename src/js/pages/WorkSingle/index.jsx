import React from 'react'
import {Link} from 'react-router-dom'

import './workSingle.scss'

import WorkSingleSlider from './WorkSingleSlider'
import CustomizedScrollbar from '../../components/CustomizedScrollbar'
import Constants from '../../helpers/Constants';
import Cursor from '../../components/Cursor/Cursor';
import { Helmet } from 'react-helmet'
import Store from '../../helpers/Store'

export default class WorkSingle extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {}
    }

    static getDate(date){

        if(!date || date === null) return 'undefined';

        let month = date.getMonth()
        let year = date.getFullYear()

        if(month === 0) month = 'Janvier';
        if(month === 1) month = 'Février';
        if(month === 2) month = 'Mars';
        if(month === 3) month = 'Avril';
        if(month === 4) month = 'Mai';
        if(month === 5) month = 'Juin';
        if(month === 6) month = 'Juillet';
        if(month === 7) month = 'Août';
        if(month === 8) month = 'Septembre';
        if(month === 9) month = 'Octobre';
        if(month === 10) month = 'Novembre';
        if(month === 11) month = 'Decembre';

        return month + ' ' + year
    }

    static splitString(str){
        return str.split(';')
    }
    componentWillUnmount(){
        // Globals.Canvas3d.state.self.bindEvents()
    }

    componentWillMount(){
        document.body.classList.add('light-mode')
    }

    componentDidMount(){
        this.initMyComponent()
        // Globals.Canvas3d.state.self.unbindEvents()
    }

    initMyComponent(){
        this.setState({
            isLoaded: false,
            slider: null,
            images: [],
            imagesLoaded: false,
            work: null
        })
        this.getWorkSingle()
    }

    componentDidUpdate(prevProps){
        let current = this.props.location
        let prev = prevProps.location

        if(current.pathname !== prev.pathname){
            this.initMyComponent()
        }
    }

    getWorkSingle = () => {


        const href = this.props.match.params.workHref

        if(Store['workSingle-' + href]){
            this.setState({
                work: Store['workSingle-' + href],
                isLoaded: true
            })
        } else {
            fetch(Constants.API_HOST + 'getWorkSingle.php?name=' + href)
            .then(data => data.json())
            .then(data => {
                if(data.code === 200){
                    this.setState({
                        work: data.data,
                        isLoaded: true
                    })
                    Store['workSingle-' + href] = data.data
                } else {
                    document.location.href = '/'
                }
                
            })
        }
       
    }

    render(){
        const ready = this.state.isLoaded
        const href = this.props.match.params.workHref
        const work = this.state.work
        let imagesForSlider = this.state.isLoaded === true ? this.state.work.images : null


        return(
            <CustomizedScrollbar 
                passedProps={{className: 'page'}}
                dispatchEvent={false}
            >
                <div className="workSingle">
                {ready && (
                    <Helmet>
                        <title>{work.title} | Keny Zachelin — Développeur full-stack</title>
                    </Helmet>)
                }
                    <div className="single-body">
                <div className="work-title anim-fade">
                    <div className="anim-fade-inner">
                        {ready && <h1>{(work.title || '').toUpperCase()}</h1>}
                    </div>
                </div>
                <div className="work-pitch anim-fade">
                    <div className="anim-fade-inner">
                        <p>{ready && work.pitch}</p>
                    </div>
                </div>
                
                <div className="work-body">
                    <div className="work-info anim-fade">
                        <div className="anim-fade-inner">
                            <div className="work-info-container">
                                <h3 className="title">Date</h3>
                                <p className="list-item">{ready && WorkSingle.getDate(new Date(work.created_at))}</p>
                            </div>
                            {
                                ready && work.role ? <div className="work-info-container">
                                <h3 className="title">Rôle</h3>
                                <p className="list-item">{work.role}</p>
                            </div> : ''
                            }
                            <div className="work-info-container">
                                <h3 className="title">Outils</h3>
                                <div className="outils-list">
                                    {ready && WorkSingle.splitString(work.outils).map((item, idx) => {
                                        return(<p key={'outils-' + work.id_name + '-' + idx} className="list-item">{item}</p>)
                                    })}
                                </div>
                                
                            </div>
                            {
                                ready && work.team ? <div className="work-info-container">
                                <h3 className="title">Equipe</h3>
                                <div className="outils-list">
                                    {WorkSingle.splitString(work.team).map((item, idx) => {
                                        return(<p key={'team-' + work.id_name + '-' + idx} className="list-item">{item}</p>)
                                    })}
                                </div>
                            </div> : ''
                            }
                        </div>   
                    </div>
                    <div className="work-description anim-fade">
                        <div className="anim-fade-inner">
                            <p>{ready && work.description}</p>
                        </div>
                    </div>
                </div>
                <div className="work-link anim-fade">
                    <div className="anim-fade-inner">
                        <a 
                            className="discoverBtn" 
                            href={ready ? work.link : ''}
                            {...Cursor.dispatchedEvents()}
                        >
                            <span className="text">Découvrir le projet</span>
                            <span className="arrow"></span>
                        </a>
                    </div>
                </div>
                <div className="work-images anim-fade">
                    <div className="anim-fade-inner">
                        <WorkSingleSlider 
                            hrefid={href} 
                            images={imagesForSlider}
                        />
                        {/* {ready ? <WorkSingleSlider hrefid={href} images={this.state.work.images}/> : (
                            <div className="loading">
                                <div 
                                    style={{
                                        width: '10rem',
                                        height: '10rem',
                                    }} 
                                    className="spinner-border"
                                ></div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            <footer className="work-footer anim-fade">
                <div className="anim-fade-inner">
                    <div className="work-footer-ctn">
                    {
                            ready && work.neightbours.map((x, idx, arr) => {

                                const classNameSuffix = x.isPrev ? '' : 'next'
                                const text = x.isPrev ? 'Précédent' : 'Suivant'

                                return(
                                    <Link 
                                        key={href + '-link-' + idx} 
                                        to={'/projets/' + x.id_name} 
                                        className={"part " + classNameSuffix}
                                        style={arr.length === 1 ? {width: '100%'} : {}}
                                        {...Cursor.dispatchedEvents()}
                                    >
                                        <span className="name">{x.title}</span>
                                        <span className="direction">{text}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </footer>
                </div>
            </CustomizedScrollbar>
        )
 
    }
}