import React, {useEffect, useState} from 'react';
import {Header} from '../../component/header/header';
import {Link} from 'react-router-dom';
import './home.scss';
import {CityApi} from '../../service/api/city.api';
import {City, CityGroup} from '../../model/dto/city.model';
import {Icon, Flex} from 'antd-mobile';
import {Consumer} from '../../service/context';
import {iocInject} from '../../service/context/decoration';


export default function HomePage(): JSX.Element {
    const cityApi = iocInject<CityApi>(CityApi);

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
        setGuessCity(await cityApi.getGuessCity());
    };

    const initHotCities = async () => {
        setHotCities(await cityApi.getHotCities());
    };

    const initCityGroup = async () => {
        setCityGroup(await cityApi.getCityGroup());
    };


    return (
        <div>
            <Consumer>{
                ({appTitle}) =>
                    <Header signinUp={true}
                            logo={<span onClick={reloadApplication} className="head_logo">{appTitle}</span>}/>
            }</Consumer>
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
                        )) : <Flex justify='center'><Icon type='loading' size='md'/></Flex>}
                </ul>
            </section>
        </div>
    )
}
