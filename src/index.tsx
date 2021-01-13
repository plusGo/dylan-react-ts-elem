import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './config/index';
import RouterOutlet from './router';
import 'antd-mobile/dist/antd-mobile.css'; // or 'antd-mobile/dist/antd-mobile.less'
import '../node_modules/ant-design-icons/dist/anticons.min.css';

export const Context = createContext({appTitle: ''});

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;

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
