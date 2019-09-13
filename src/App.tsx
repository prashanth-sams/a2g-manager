import * as React from 'react';
import './App.css';
// import { BrowserRouter as Link, Router, Switch, Route  } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { slide as Menu } from 'react-burger-menu';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import Edit from './components/Edit/Edit';
import List from './components/List/List';

// function handleClick() {
//   console.log('aasd')
// }

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ask2God Manager</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Router>
          <div className="container">
            <Menu width={ '60%' }>
              <a id="resp-home" className="menu-item" href="/">
                <i className="fa fa-home"/>
                <span> Home</span>
              </a>
              <a id="resp-create" className="menu-item" href="/create">
                <i className="fa fa-plus"/>
                <span> Add verse</span>
              </a>
              <a id="resp-index" className="menu-item" href="/index">
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
                    <Link to={'/create'} className="nav-link" id="create">
                      <i className="fa fa-plus"/>
                      <span> Add</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/index'} className="nav-link" id="index">
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
              <Route path='/create' component={ Add } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ List } />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
