import React, {useEffect, useState} from 'react';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import './home.scss';
import {CityApi} from '../../service/api/city.api';
import {City} from '../../model/city.model';
import {Icon} from 'antd-mobile';


export default function Home(): JSX.Element {
    function reloadApplication(): void {
        window.location.reload()
    }

    const [guessCity, setGuessCity] = useState<City>();

    const initGuessCity = async () => {
        const guessCity = await CityApi.getGuessCity();
        setGuessCity(guessCity);
    };

    useEffect(() => {
        initGuessCity();
    }, []);

    return (
        <div>
            <Header logo={<span onClick={reloadApplication} className="head_logo">ele.me</span>}/>
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

                </ul>
            </section>
        </div>
    )
}
