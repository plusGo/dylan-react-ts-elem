import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './config/index';
import RouterOutlet from './router';
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'
import '../node_modules/ant-design-icons/dist/anticons.min.css';

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
