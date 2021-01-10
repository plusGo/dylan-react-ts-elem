import React from 'react';
import './header.scss';
import {Icon} from 'antd-mobile';

export interface HeaderPropsType {
    title?: string,
    logo?: JSX.Element,
    search?: JSX.Element,
    goBack?: boolean
}

export default function Header(props: HeaderPropsType): JSX.Element {
    // useEffect(() => {
    //     console.log(props);
    // }, [props.title])
    return (
        <header id='head_top'>
            {props?.logo}
            {props?.search}
            {
                props?.goBack ? (
                    <section className="head_goback">
                        <Icon type="left"/>
                    </section>
                ) : null
            }

            <div className="header-title">{props?.title}</div>
        </header>
    )
}
