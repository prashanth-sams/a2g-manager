import * as React from 'react';
import './App.css';
import './css/mobile.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { slide as Menu } from 'react-burger-menu';
import Home from './components/Home/Home';
import AddKeywords from './components/AddKeywords/AddKeywords';
import EditKeywords from './components/EditKeywords/EditKeywords';
import ListKeywords from './components/ListKeywords/ListKeywords';

class App extends React.Component {
  public render() {
    return (
        <Router>
          <div className="container">
            <Menu width={ '60%' }>
              <a id="resp-home" className="menu-item" href="/">
                <i className="fa fa-home"/>
                <span> Home</span>
              </a>
              <a id="resp-add" className="menu-item" href="/add">
                <i className="fa fa-plus"/>
                <span> Add verse</span>
              </a>
              <a id="resp-list" className="menu-item" href="/list">
                <i className="fa fa-list"/>
                <span> List verse</span>
              </a>
            </Menu>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} className="navbar-brand" id="home">Ask2God</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto" id="header">
                  <li className="nav-item">
                    <Link to={'/add/keywords'} className="nav-link" id="add">
                      <i className="fa fa-plus"/>
                      <span style={{ fontSize: '0.9rem' }}> Add Search</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/list/keywords'} className="nav-link" id="list">
                      <i className="fa fa-list"/>
                      <span style={{ fontSize: '0.9rem' }}> List Search</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/add/keywords' component={ AddKeywords } />
              <Route path='/edit/keywords/:id' component={ EditKeywords } />
              <Route path='/list/keywords' component={ ListKeywords } />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
