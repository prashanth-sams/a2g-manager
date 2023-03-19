import * as React from 'react';
import './App.css';
import './css/mobile.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import AddKeywords from './components/AddKeywords/AddKeywords';
import EditKeywords from './components/EditKeywords/EditKeywords';
import ListKeywords from './components/ListKeywords/ListKeywords';
import AddQuestion from './components/Question/AddQuestion/AddQuestion';
import EditQuestion from './components/Question/EditQuestion/EditQuestion';
import ListQuestion from './components/Question/ListQuestion/ListQuestion';
import PageNotFound from './components/PageNotFound/PageNotFound';
// import AddRevelation from './components/Revelation/AddRevelation/AddRevelation';
import AppProps from './interfaces/App/AppProps.interface';

interface AppState {
  lang: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      lang: 'en',
    };
  }

  public componentDidMount = () => {
    if (window.location.pathname.substring(1, 3) === '') {
      this.state = {
        lang: 'en'
      };
    } else {
      this.state = {
        lang: window.location.pathname.substring(1, 3)
      };
    }
  }

  public langSwitch = (e) => {    
    this.setState({
      lang: e.currentTarget.getAttribute('id')
    });
  }

  public render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} className="navbar-brand" id="home">A2G Manager</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto" id="header">
                  <li className="nav-item">
                    <Link to={'/add/keywords'} className="nav-link" id="add">
                      <i className="fa fa-plus"/>
                      <span style={{ fontSize: '0.87rem' }}> Keywords</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/${this.state.lang}/list/keywords`} className="nav-link" id="list">
                      <i className="fa fa-list"/>
                      <span style={{ fontSize: '0.87rem' }}> Keywords</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/${this.state.lang}/add/question`} className="nav-link" id="add">
                      <i className="fa fa-plus"/>
                      <span style={{ fontSize: '0.87rem' }}> Q&A</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/${this.state.lang}/list/question`} className="nav-link" id="list">
                      <i className="fa fa-list"/>
                      <span style={{ fontSize: '0.87rem' }}> Q&A</span>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to={'/add/revelation'} className="nav-link" id="add">
                      <i className="fa fa-plus"/>
                      <span style={{ fontSize: '0.87rem' }}> A.D</span>
                    </Link>
                  </li> */}
                  <li className="nav-item dropdown" id='lang-wrap'>
                    <a className="nav-link dropdown-toggle" href="" id="ln" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="flag-icon flag-icon-us"/> English</a>
                    <div className="dropdown-menu" aria-labelledby="ln" id='lang-drop'>
                        <a className="dropdown-item" onClick={this.langSwitch} href="/fr/list/question" id='fr'><span className="flag-icon flag-icon-fr"/>  French</a>
                        <a className="dropdown-item" onClick={this.langSwitch} href="/it/list/question" id='it'><span className="flag-icon flag-icon-it"/>  Italian</a>
                        <a className="dropdown-item" onClick={this.langSwitch} href="/ru/list/question" id='ru'><span className="flag-icon flag-icon-ru"/>  русский</a>
                        <a className="dropdown-item" onClick={this.langSwitch} href="/hi/list/question" id='hi'><span className="flag-icon flag-icon-in"/>  हिंदी</a>
                        <a className="dropdown-item" onClick={this.langSwitch} href="/ta/list/question" id='ta'><span className="flag-icon flag-icon-in"/>  தமிழ்</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/add/keywords' component={ AddKeywords } />
              <Route path='/en/edit/keywords/:id' component={ EditKeywords } />
              <Route path='/en/list/keywords' component={ ListKeywords } />
              <Route path='/en/add/question' component={ AddQuestion } />
              <Route path='/en/edit/question/:id' component={ EditQuestion } />
              <Route path='/en/list/question' component={ ListQuestion } />
              {/* <Route path='/add/revelation' component={ AddRevelation } /> */}
              <Route component={ PageNotFound } />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
