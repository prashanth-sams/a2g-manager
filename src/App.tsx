import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { slide as Menu } from 'react-burger-menu';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import Edit from './components/Edit/Edit';
import List from './components/List/List';

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
              <Link to={'/'} className="navbar-brand">Ask2God</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto" id="header">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link" id="home">
                      <i className="fa fa-home"/>
                      <span> Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/add'} className="nav-link" id="add">
                      <i className="fa fa-plus"/>
                      <span> Add</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/list'} className="nav-link" id="list">
                      <i className="fa fa-list"/>
                      <span> List</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path='/add' component={ Add } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/list' component={ List } />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
