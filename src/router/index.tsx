import React, {useEffect} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {RouteConfig} from './route.config';
import Loadable from 'react-loadable';
import {Loading} from '../component/loading/loading';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {RouterProps} from '../model/props/router-props.interface';
import './route.scss';

const ROUTE_CONFIG: RouteConfig[] = [
    {
        name: 'login',
        path: '/login',
        exact: true,
        preload: true,
        component: Loadable({
            loader: () => import('../pages/login/login'),
            loading: Loading,
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

export default function RouterOutlet(props: RouterProps): JSX.Element {
    useEffect(() => {
        ROUTE_CONFIG.filter($config => $config.preload && $config.component.preload());
        console.log(props)
    }, []);

    return (
        <HashRouter>
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition
                        // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                        // 这里我改了官方demo的代码， 原来是设置成location.key， 这样的话每次点击同一个路由链接的时候都会渲染。
                        // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                        key={location?.pathname}
                        classNames="animated-router-forward"
                        // 动画时间设置为800ms，和css中的需要一致。
                        timeout={300}
                    >
                        <Switch location={location}>
                            {
                                ROUTE_CONFIG.map(($config, $key) => (
                                    <Route key={$key} exact={$config.exact} path={$config?.path}
                                           component={$config?.component}/>
                                ))
                            }
                            <Redirect exact from="/" to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}/>
        </HashRouter>
    )
}

