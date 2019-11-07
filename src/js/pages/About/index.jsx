import React from 'react'
import './about.scss'
import CustomizedScrollbar from '../../components/CustomizedScrollbar'
import Cursor from '../../components/Cursor/Cursor'
import { Helmet } from 'react-helmet'

const stack = [
    {
        title: 'Front-end',
        list: ['ReactJS & VueJS', 'WebGL (ThreeJS)', 'Bootstrap']
    },
    {
        title: 'Back-end',
        list: ['NodeJS (Express)', 'Symfony']
    },
    {
        title: 'Workflow',
        list: ['Git', 'Webpack', 'NPM']
    },                         
    {
        title: 'UI / UX Design',
        list: ['Adobe Illustrator', 'Adobe Photoshop', 'InVision']
    },
    {
        title: 'Templating',
        list: ['Twig', 'Pug', 'EJS']
    },
    {
        title: 'Également',
        list: ['React Native', 'POO', 'MVC']
    }
]

const fivethings = [
    {
        src: '/medias/fivethings/debuggeur.mp4',
        strong: 'Débuggeur',
        desc: "J'aime résoudre des casse-têtes et des problèmes de logique.",
        alt: ""
    },
    {
        src: '/medias/fivethings/perfectionniste.mp4',
        strong: 'Solutionneur',
        desc: "Je cherche toujours à trouver la meilleur solution à un problème.",
        alt: ""
    },
    {
        src: '/medias/fivethings/debrouillard.mp4',
        strong: 'Débrouillard',
        desc: "Je sais être autonome et les documentations d'API ne me font pas peur.",
        alt: ""
    },
    {
        src: '/medias/fivethings/creatif.mp4',
        strong: 'Créatif',
        desc: "J'aime lier l'agréable à l'utile.",
        alt: ""
    },
    {
        src: '/medias/fivethings/curieux.mp4',
        strong: 'Curieux',
        desc: "Je veux savoir comment fonctionne le web à tous ses niveaux.",
        alt: ""

    }
]

const myLinks = [
    {text: 'CV PDF', href: '/CV_Keny_Zachelin.pdf'},
    {text: 'Email', href: 'mailto:zkeny@outlook.fr'},
    {text: 'LinkedIn', href: 'https://www.linkedin.com/in/kenyzachelin'},
    {text: 'Codepen', href: 'https://codepen.io/kazed972'},
    {text: 'Github', href: 'https://github.com/KenyZ'},
]


export default class About extends React.Component{
    render(){
        return(
            
            <CustomizedScrollbar 
                passedProps={{className: 'page'}}  
                dispatchEvent={true}
            >
            <Helmet>
                <title>Keny Zachelin — Développeur full-stack</title>
            </Helmet>
                <div className="page-about">
                <div className="single-body">
                    <div className="about-top">
                        <div className="about-title anim-fade">
                            <div className="anim-fade-inner">
                                <p>Bonjour !<br/>Je m'appelle Keny Zachelin<br/>et je suis développeur full-stack</p>
                            </div>
                        </div>
                        <div className="about-hello anim-fade">
                            <div className="anim-fade-inner">
                                <p>Je suis un étudiant de 19 ans souhaitant travailler dans la création de produits et de solutions digitaux. Fortement attiré par la créativité et l’innovation. De nature curieuse avec l’envie constante d’apprendre de nouvelles choses.<br/>Dans le cadre de ma formation Bachelor web à HETIC je suis à la recherche d'une alternance de 12 mois à partir du 2 septembre au sein d’une agence digitale à Paris.</p>
                            </div>
                        </div> 
                    </div>
                     
                    {/* <div className="title-ctn anim-fade_">
                        <div className="anim-fade-inner_">
                            <h2>Compétences</h2>
                        </div>
                    </div> */}
                    <div className="about-skills">
                        {
                            stack.map((stackItem, idx) => {
                                return (
                                <div key={'aboutSkills-' + idx} className="anim-fade skill-container">
                                    <div className="anim-fade-inner">
                                        <h4 className="skill-title">
                                            {/* <span className="trait"></span> */}
                                            <span className="text">{stackItem.title}</span>
                                        </h4>
                                        {stackItem.list.map((listItem, i) => {
                                            return (
                                                <p key={'aboutSkillsItem-' + i}className="stack-item">{listItem}</p>
                                            )
                                        })}
                                    </div>
                                </div>)
                            })
                        }
                    </div>

                    <div className="about-fthings">
                        {
                            fivethings.map((thing, idx) => {

                                const offsetValue = 1 + Math.random() * 2
                                const offset = idx % 2 === 0 ? {right: offsetValue + 'vw'} : {left: offsetValue + 'vw'}

                                return(
                                    <div key={'fthings-' + idx} className="anim-fade-inner fthings-container">
                                        <div 
                                            className="gifContainer anim-fade-fix1"
                                            style={offset}
                                        >
                                            <div className="left">
                                                <small>{idx + 1}</small>
                                            </div>
                                            <div className="right">
                                                <video 
                                                    src={thing.src}
                                                    autoPlay={true} 
                                                    loop={true}
                                                    muted={true}
                                                    playinline={true.toString()}
                                                    ></video>
                                                <p><strong>{thing.strong}</strong> - {thing.desc}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="about-links anim-fade">
                        <div className="anim-fade-inner">
                            {
                                myLinks.map((link, idx) => {
                                    return(
                                        <a 
                                            key={'myLinkItem-' + idx} className="link-item" 
                                            href={link.href}
                                            {...Cursor.dispatchedEvents()}
                                            target='_blank'
                                        >{link.text}</a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            </CustomizedScrollbar>
        )
    }
}