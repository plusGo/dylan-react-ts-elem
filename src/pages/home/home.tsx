import React, {Fragment, useEffect, useState} from 'react';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import './home.scss';
import {CityApi} from '../../service/api/city.api';
import {City, CityGroup} from '../../model/dto/city.model';
import {Icon} from 'antd-mobile';


export default function HomePage(): JSX.Element {
    const [guessCity, setGuessCity] = useState<City>();
    const [hotCities, setHotCities] = useState<City[]>();
    const [cityGroup, setCityGroup] = useState<CityGroup>();

    useEffect(() => {
        initGuessCity();
        initHotCities();
        initCityGroup();
    }, []);

    const reloadApplication = () => {
        window.location.reload()
    };


    const initGuessCity = async () => {
        setGuessCity(await CityApi.getGuessCity());
    };

    const initHotCities = async () => {
        setHotCities(await CityApi.getHotCities());
    };

    const initCityGroup = async () => {
        setCityGroup(await CityApi.getCityGroup());
    };


    return (
        <Fragment>
            <Header signinUp={true} logo={<span onClick={reloadApplication} className="head_logo">ele.me</span>}/>
            <nav className="city_nav">
                <div className="city_tip">
                    <span>当前定位城市：</span>
                    <span>定位不准时，请在城市列表中选择</span>
                </div>
                <Link to={`/city/${guessCity?.id}`} className="guess_city">
                    <span>{guessCity?.name}</span>
                    <Icon className="arrow_right" type="right"/>
                </Link>
            </nav>
            <section id="hot_city_container">
                <h4 className="city_title">热门城市</h4>
                <ul className="citylistul clear">
                    {
                        hotCities ? hotCities?.map(($hotCity) =>
                            <li key={$hotCity?.id}>
                                <Link key={$hotCity?.id} to={`/city/${$hotCity?.id}`}>{$hotCity?.name}</Link>
                            </li>
                        ) : null
                    }
                </ul>
            </section>
            <section className="group_city_container">
                <ul className="letter_classify">
                    {cityGroup ? Object.keys(cityGroup)
                        .sort()
                        .map(($key, $index) => (
                            <li key={$key} className="letter_classify_li">
                                <h4 className="city_title">{$key}{$index === 0 ? <span>(按字母排序)</span> : null}</h4>
                                <ul className="groupcity_name_container citylistul clear">
                                    {cityGroup[$key].map($city => (
                                        <li className="ellipsis" key={$city?.id}>
                                            <Link key={$city?.id} to={`/city/${$city?.id}`}>{$city?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )) : null}
                </ul>
            </section>
        </Fragment>
    )
}
