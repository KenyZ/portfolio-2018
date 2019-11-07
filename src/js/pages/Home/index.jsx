import React from 'react'
import WorkList from './WorkList';
import { Helmet } from 'react-helmet'

export default class Home extends React.Component{
    render(){

        return(
            <div className="anim-home-fade page page-home route-home">
                <WorkList/>
                <Helmet>
                    <title>Keny Zachelin — Développeur full-stack</title>
                </Helmet>
            </div>
        )
    }
}