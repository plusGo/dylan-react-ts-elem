import React, {ReactNode, useEffect, useState} from 'react';
import './city.scss';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import {City} from '../../model/city.model';
import {CityApi} from '../../service/api/city.api';
import {PlaceApi} from '../../service/api/place.api';


export default function CityPage(props: any): ReactNode {
    const [currentCity, setCurrentCity] = useState<City>();
    const [searchWord, setSearchWord] = useState<string>('');

    const initCurrentCity = async (id: string) => {
        setCurrentCity(await CityApi.getCityById(id));
    };

    const searchPlace = async () => {
        if (currentCity && currentCity.id) {
            console.log(await PlaceApi.searchPlace(currentCity.id, searchWord));
        }
    };


    useEffect(() => {
        initCurrentCity(props.match.params.id);
    }, [props.match]);

    useEffect(() => {
        console.log(searchWord);
    }, [searchWord]);

    return (<div className="city_container">
            <Header goBack={true} title={currentCity?.name}>
                <Link to="/home" className="change_city">
                </Link>
            </Header>
            <form className="city_form" onSubmit={e => e.preventDefault()}>
                <div>
                    <input type="search" name="city" placeholder="输入学校、商务楼、地址" className="city_input input_style"
                           required
                           value={searchWord} onChange={e => setSearchWord(e.target.value)}/>
                </div>
                <div>
                    <input onClick={searchPlace} type="submit" name="submit" className="city_submit input_style"
                           value="提交"/>
                </div>
            </form>
        </div>
    )
}
