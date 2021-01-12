import React, {ReactNode, useEffect, useState} from 'react';
import './city.scss';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import {City} from '../../model/city.model';
import {CityApi} from '../../service/api/city.api';
import {PlaceApi} from '../../service/api/place.api';
import {Place} from '../../model/place';
import {RouterProps} from '../../model/props/router-props.interface';


export default function CityPage(props: RouterProps): ReactNode {
    const [currentCity, setCurrentCity] = useState<City>();
    const [placeList, setPlaceList] = useState<Place[]>([]);
    const [searchWord, setSearchWord] = useState<string>('');

    const [historyTitle, setHistoryTitle] = useState<boolean>();
    const [placeHistory, setPlaceHistory] = useState<any[]>();


    const initCurrentCity = async (id: string) => {
        setCurrentCity(await CityApi.getCityById(id));
    };

    const searchPlace = async () => {
        if (currentCity && currentCity.id) {
            setPlaceList(await PlaceApi.searchPlace(currentCity.id, searchWord));
        }
    };

    const clearAll = () => {
        setPlaceList([]);
    };

    const nextPage = (place: Place) => {
        props.history.push({pathName: '/msite', query: {geohash: place.geohash}})
    };

    useEffect(() => {
        initCurrentCity(props.match.params.id);
    }, [props.match]);

    useEffect(() => {
        console.log(props);
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
            {
                historyTitle ? <header className="pois_search_history">搜索历史</header> : null
            }
            <ul className="getpois_ul">
                {
                    placeList?.map($place => (
                        <li onClick={() => nextPage($place)} key={$place.geohash}>
                            <h4 className="pois_name ellipsis">{$place.name}</h4>
                            <p className="pois_address ellipsis">{$place.address}</p>
                        </li>
                    ))
                }
            </ul>
            {(historyTitle && placeList.length) ?
                <footer onClick={clearAll} className="clear_all_history">清空所有</footer> : null}
            {(placeList.length) ? <div className="search_none_place">很抱歉！无搜索结果</div> : null}


        </div>
    )
}
