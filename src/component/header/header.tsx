import React, {useEffect, useState} from 'react';
import './header.scss';
import {Icon} from 'antd-mobile';
import {Link, useHistory} from 'react-router-dom';
import {AuthService} from '../../service/auth/auth-service';
import {User} from '../../model/dto/user';
import {iocInject} from '../../service/context/decoration';

export interface HeaderPropsType {
    title?: string;
    logo?: JSX.Element;
    search?: JSX.Element;
    children?: JSX.Element;
    showBackBtn?: boolean;
    signinUp?: boolean;
}

export default function Header(props: HeaderPropsType): JSX.Element {
    const authService = iocInject<AuthService>(AuthService);
    const history = useHistory();
    const [userInfo, setUserInfo] = useState<User>();

    useEffect(() => {
        initUserInfo();
    }, []);

    const goBack = () => {
        history.goBack();
    };

    const initUserInfo = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            setUserInfo(user);
        }
    };

    return (
        <header id='head_top'>
            {props?.logo}
            {props?.search}
            {
                props?.showBackBtn ? (
                    <section onClick={goBack} className="head_goback">
                        <Icon type="left"/>
                    </section>
                ) : null
            }
            {
                props?.signinUp ? (
                    <Link className="head_login" to={userInfo ? '/profile' : 'login'}>
                        {userInfo ? <i className="ai-user"/> : <span className="login_span">登录|注册</span>}

                    </Link>
                ) : null
            }
            {
                props?.title ? (
                    <section className="title_head ellipsis">
                        <span className="title_text">{props?.title}</span>
                    </section>
                ) : null
            }
            {props?.children}
        </header>
    )
}
