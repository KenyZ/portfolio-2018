import React from 'react'
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class WorkSingleSlider extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            isLoaded: false,
            imagesData: []
        }
    }

    componentDidMount(){
    }
    
    componentDidUpdate(prevProps){
        if(this.props.images !== null && prevProps.images === null){
            this.loadImages()
        }
    }

    loadImages = () => {
        let images = this.props.images
        let id_name = this.props.hrefid
        let self = this

        images.map(({path, alt}) => {

            let src = '/medias/sliders/' + id_name + '/' + path + '.jpg'
            let img = new Image()
            img.onload = function(){
                self.setState({
                    imagesData: [
                        ...self.state.imagesData,
                        {
                            src,
                            alt: ''
                        }
                    ]
                })

                if(images.length === self.state.imagesData.length){
                    self.setState({isLoaded: true})
                }
            }
            img.src = src
            return true
        })

    }

    render(){
        
        if(this.state.isLoaded){
            const id_name = this.props.hrefid
            const settings = {
                dots: true,
                infinite: false
            }
            
            return(
                <Slider {...settings} id={'workSlider' + id_name} className="slider">
                    {
                        this.state.imagesData.map((img, idx) => {
                            return(
                                <div key={id_name + '-sliderItem' + idx} className="slider-item">
                                    <img src={img.src} alt={img.alt || 'rien'}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            )

        } else {
            return (
                <div className="loading">
                    <div 
                        style={{
                            width: '10rem',
                            height: '10rem',
                        }} 
                        className="spinner-border"
                    ></div>
                </div>
            )
        }    
    }
}