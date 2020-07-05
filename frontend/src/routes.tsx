import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CreateRestaurant from './pages/CreateRestaurant';
import ControlPanel from './pages/ControlPanel';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={ControlPanel} path="/restaurant" exact />
        </BrowserRouter>
    );
}

export default Routes;