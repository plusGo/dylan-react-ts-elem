import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {RouteConfig} from './route.config';
import Loadable from 'react-loadable';
import {Loading} from '../component/loading/loading';

const ROUTE_CONFIG: RouteConfig[] = [
    {
        name: 'login',
        path: '/login',
        exact: true,
        component: Loadable({
            loader: () => import('../pages/login/login'),
            loading: Loading
        })
    },
    {
        name: 'home',
        path: '/home',
        exact: true,
        component: Loadable({
            loader: () => import('../pages/home/home'),
            loading: Loading
        })
    }, {
        name: 'city',
        path: '/city/:id',
        exact: false,
        component: Loadable({
            loader: () => import('../pages/city/city'),
            loading: Loading
        })
    }
];

export default class RouterOutlet extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    {
                        ROUTE_CONFIG.map(($config, $key) => (
                            <Route key={$key} exact={$config.exact} path={$config?.path}
                                   component={$config?.component}/>
                        ))
                    }
                    <Redirect exact from="/" to="/home"/>
                </Switch>
            </HashRouter>
        )
    }
}
