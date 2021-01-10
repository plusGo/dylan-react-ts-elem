import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './config/index';
import RouterOutlet from './router';
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'

const AppContext = React.createContext({});

const applicationRender = (RouteOutlet: any) => {
    ReactDOM.render(
        <AppContext.Provider value={{}}>
            <RouteOutlet/>
        </AppContext.Provider>
        ,
        document.getElementById('root')
    )
};

applicationRender(RouterOutlet);
