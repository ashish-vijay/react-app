var React = require('react');
var Popular = require('./Popular.js');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav.js');
var Compare = require('./Compare.js');
var Home = require('./Home.js');
var Result = require('./Result.js');

class App extends React.Component {
    render(){
      return(
        <Router>
          <div className='container'>
            <Nav />
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/compare/results' component={Result} />
            <Route exact path='/compare' component={Compare} />
            <Route path='/popular' component={Popular} />
            </Switch>
          </div>
        </Router>
      );
    };
};

module.exports = App;
