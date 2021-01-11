import React from 'react';
import './header.scss';
import {Icon} from 'antd-mobile';
import {useHistory} from 'react-router-dom';

export interface HeaderPropsType {
    title?: string;
    logo?: JSX.Element;
    search?: JSX.Element;
    children?: JSX.Element;
    goBack?: boolean;
    signinUp?: boolean;
}

export default function Header(props: HeaderPropsType): JSX.Element {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };


    return (
        <header id='head_top'>
            {props?.logo}
            {props?.search}
            {
                props?.goBack ? (
                    <section onClick={goBack} className="head_goback">
                        <Icon type="left"/>
                    </section>
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
