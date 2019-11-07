import React from 'react'
import {
  BrowserRouter, 
  Route, 
  Switch,
} from 'react-router-dom'
import {
  TransitionGroup, 
  CSSTransition
} from 'react-transition-group'
import Home from './pages/Home'
import About from './pages/About/'
import WorkSingle from './pages/WorkSingle'
import Navbar from './components/Navbar'
import Canvas3d from './components/Canvas3D'
import '../assets/style/style.scss'
import Globals from './helpers/Globals'
import ScrollToTop from './components/ScrollToTop';
import TransitionManager from './components/TransitionManager';
import NotFound from './pages/NotFound/NotFound';
import Loader from './components/Loader/Loader'
import Cursor from './components/Cursor/Cursor';
import Utils from './helpers/Utils';

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div id="App">
            <Navbar/>
            <Loader/>
            {!Utils.isMobile() && <Cursor/>}
            <Route render={({location}) => {
              return(
                <div className="uselessWrapper">
                  <Canvas3d ref={(el) => Globals.Canvas3d = el}/>
                  <div className="router-wrapper">
                    <ScrollToTop>
                      <TransitionManager location={location}>
                        <TransitionGroup>
                          <CSSTransition
                            key={location.key}
                            classNames={'page'}
                            timeout={2500}
                            appear={true}
                          >
                            <Switch location={location}>
                                <Route path="/" component={Home} exact/>
                                <Route path="/àpropos" component={About}/>
                                <Route path="/projets/:workHref" component={WorkSingle}/>
                                {/** When no match */}
                                <Route component={NotFound}/>
                            </Switch>
                          </CSSTransition>
                      </TransitionGroup>
                      </TransitionManager>
                    </ScrollToTop>
                    
                  </div>
                </div>
              )
            }}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
