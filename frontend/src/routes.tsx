import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateRestaurant from './pages/CreateRestaurant';
import ControlPanel from './pages/ControlPanel';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateRestaurant} path="/create-restaurant" />
            <Route component={ControlPanel} path="/control-panel" />
        </BrowserRouter>
    );
}

export default Routes;