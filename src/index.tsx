import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './config/index';
import RouterOutlet from './router';
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'
import '../node_modules/ant-design-icons/dist/anticons.min.css';
import {Provider} from './service/context';


const applicationRender = (RouteOutlet: any) => {
    ReactDOM.render(
        <Provider value={{appTitle: '饿了吗'}}>
            <RouteOutlet/>
        </Provider>
        ,
        document.getElementById('root')
    )
};

applicationRender(RouterOutlet);
