import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Community from './components/Community';
import NearbyServices from './components/NearbyServices';
import Products from './components/Products';
import Orders from './components/Orders';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/community" component={Community} />
                    <Route path="/nearby" component={NearbyServices} />
                    <Route path="/products" component={Products} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;