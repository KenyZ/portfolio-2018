import React from 'react'
import './loader.scss'
import { TweenLite, Power1, CSSPlugin} from 'gsap/all';

const plugin = [CSSPlugin]

class Loader extends React.Component{

    componentDidMount(){
        let progressValue = this.progressValue
        let progressValueText = this.progressValueText
        let loader = this.loader
        
        TweenLite.to(progressValue, 4, {
            css: {
                width: '100%',
            },
            ease: Power1.easeOut,
            onUpdate(){
                let progress = Math.floor(this.progress() * 100)
                progressValueText.innerText = progress + '%'
            },
            onComplete(){
                loader.classList.add('ready')
            }
        })

    }

    render(){
        return(
            <div ref={el => this.loader = el} className="loader">
                <div className="welcome">
                    <div className="lines">
                        <p>Je m'appelle Keny Zachelin</p>
                        <p>Je suis développeur full-stack</p>
                        <p>Bienvenue sur mon portfolio</p>
                    </div>
                </div>
                <div className="progress">
                    <div 
                        ref={el => this.progressValue = el} 
                        id="progressValue" 
                        className="progress-inner"
                    >
                        <small ref={el => this.progressValueText = el}>0%</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loader