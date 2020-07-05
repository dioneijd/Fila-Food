import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CreateRestaurant from './pages/CreateRestaurant';
import ControlPanel from './pages/ControlPanel';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={ControlPanel} path="/" exact />
            <Route component={CreateRestaurant} path="/create-restaurant" />
        </BrowserRouter>
    );
}

export default Routes;