import React, { useEffect, useReducer } from 'react';
import { Header } from '../../component/header/header';
import { iocInject } from '../../service/context/decoration';
import { CityApi } from '../../service/api/city.api';
import { PlaceApi } from '../../service/api/place.api';
import { AuthService } from '../../service/auth/auth-service';
import { Button, Flex, Icon, InputItem, List, Switch, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import { CaptchaApi } from '../../service/api/captcha.api';
import { Link, RouterProps } from 'react-router-dom';
import { LoginApi } from '../../service/api/login.api';

import './login.scss';

export interface LoginPageState {
    showPassword?: boolean, // 是否显示密码
    userAccount?: string, //用户名
    passWord?: string, //密码
    captchaCodeImg?: string, //验证码地址
    codeNumber?: string, //验证码
}

export interface LoginPageAction {
    type: 'setValue' | 'getCaptchaCode' | 'doLogin',
    payload?: any,
}


const reducer = (state: LoginPageState, action: LoginPageAction): LoginPageState => {
    if (action.type === 'setValue') {
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }
    if (action.type === 'getCaptchaCode') {
        iocInject<CaptchaApi>(CaptchaApi).getCaptcha().then(data => {
            action.payload.dispatch({ type: 'setValue', payload: { key: 'captchaCodeImg', value: data.code } })
        });
    }
    return state;
};

export default function LoginPage(props: RouterProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, {});
    const [authService, loginApi] = iocInject<[AuthService, LoginApi]>([AuthService, LoginApi]);

    useEffect(() => {
        dispatch({ type: 'getCaptchaCode', payload: { dispatch } })
        authService.isLogin().then(isLogin => {
            if (isLogin) {
                props.history.goBack();
            }
        })
    }, []);

    const doLogin = async () => {
        if (!state.userAccount) {
            Toast.fail('请输入手机号/邮箱/用户名');
            return;
        }
        if (!state.passWord) {
            Toast.fail('请输入密码');
            return;
        }
        if (!state.codeNumber) {
            Toast.fail('请输入验证码');
            return;
        }
        try {
            const user = await loginApi.passwordLogin(state?.userAccount, state?.passWord, state?.codeNumber);

            if (user) {
                authService.setCurrentUser(user);
                props.history.goBack();
            }
        } catch (e) {
            Toast.fail(e.message);
            dispatch({ type: 'getCaptchaCode', payload: { dispatch } });
        }
    }

    return (<div className="loginContainer">
        <Header title="密码登录" showBackBtn={true} />
        <form className="loginForm">
            <List>
                <InputItem clear={true} placeholder="账号"
                    onChange={e => dispatch({
                        type: 'setValue',
                        payload: { key: 'userAccount', value: e }
                    })} />
                <InputItem clear={true} type={state?.showPassword ? 'text' : 'password'}
                    extra={<Switch checked={state?.showPassword} onChange={$checked => dispatch({
                        type: 'setValue', payload: { key: 'showPassword', value: $checked }
                    })} />} placeholder="密码" onChange={e => dispatch({
                        type: 'setValue',
                        payload: { key: 'passWord', value: e }
                    })} />
                <InputItem clear={true} extra={
                    <div className="img_change_img" >
                        {state?.captchaCodeImg ? <img src={state?.captchaCodeImg} /> : <Icon type="loading" />}
                        <div className="change_img" onClick={() => dispatch({ type: 'getCaptchaCode', payload: { dispatch } })}>
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                    </div>
                } placeholder="验证码"
                    maxLength={4}
                    onChange={e => dispatch({
                        type: 'setValue',
                        payload: { key: 'codeNumber', value: e }
                    })} />
            </List>
        </form>
        <p className="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
        <p className="login_tips">注册过的用户可凭账号密码登录</p>
        <WingBlank>
            <Button onClick={doLogin} type="primary">登录</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
            <Flex justify="end">
                <Link to="/forget">修改密码</Link>
            </Flex>
        </WingBlank>
    </div>
    )
}
