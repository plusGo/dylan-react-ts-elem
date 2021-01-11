import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent'

const loadHomePage = asyncComponent(import('../pages/home/home'));
const loadCityPage = asyncComponent(import('../pages/city/city'));

export default class RouterOutlet extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/home" component={loadHomePage}/>
                    <Route path="/city/:id" component={loadCityPage}/>
                    <Redirect exact from="/" to="/home"/>
                </Switch>
            </HashRouter>
        )
    }
}
