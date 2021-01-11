import React, {ReactNode, useEffect, useState} from 'react';
import './city.scss';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import {City} from '../../model/city.model';
import {CityApi} from '../../service/api/city.api';


export default function CityPage(props: any): ReactNode {
    const [title, setTitle] = useState('hello,city');
    const [currentCity, setCurrentCity] = useState<City>();

    const initCurrentCity = async (id: string) => {
        setCurrentCity(await CityApi.getCityById(id));
    };

    useEffect(() => {
        initCurrentCity(props.match.params.id);
    }, [props.match]);

    return (<div>
        <Header goBack={true} title={currentCity?.name}>
            <Link to="/home" className="change_city">
            </Link>
        </Header>
    </div>)
}
