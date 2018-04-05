import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './containers/partials/Header';
import Home from './containers/Home';
import HomeTypes from './containers/HomeTypes';
import AboutGame from './containers/AboutGame';
import AboutUs from './containers/AboutUs';
import Questions from './components/Questions';
import Login from './components/partials/Login';
import Footer from './containers/partials/Footer';
import history from './history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export const MainRoutes = () => {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route path="/login" component={Login} />
            <Header/>
              <Route path="/" exact component={Home}/>
              <Route path="/hometypes" component={HomeTypes} />
              <Route path="/questions" component={Questions} />
              <Route path="/about-game" component={AboutGame} />
              <Route path="/about-us" component={AboutUs} />
            <Footer/>
          </div>
        </Router>
      </Provider>
    </div>
  );
}
