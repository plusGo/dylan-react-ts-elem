import React, {ReactNode, useEffect, useState} from 'react';
import './city.scss';
import Header from '../../component/header/header';
import {Link} from 'react-router-dom';
import {City} from '../../model/city.model';
import {CityApi} from '../../service/api/city.api';
import {PlaceApi} from '../../service/api/place.api';
import {Place} from '../../model/place';
import {RouterProps} from '../../model/props/router-props.interface';
import {LocalStorageUtil} from '../../utils/local-storage.util';

const PLACE_HISTORY_KEY = 'place_history_key';
export default function CityPage(props: RouterProps): ReactNode {
    const [currentCity, setCurrentCity] = useState<City>();
    const [placeList, setPlaceList] = useState<Place[]>([]);
    const [searchWord, setSearchWord] = useState<string>('');

    const [historyTitle, setHistoryTitle] = useState<boolean>();


    const initCurrentCity = async (id: string) => {
        setCurrentCity(await CityApi.getCityById(id));
    };

    const searchPlace = async () => {
        if (currentCity && currentCity.id) {
            const places = await PlaceApi.searchPlace(currentCity.id, searchWord);
            setPlaceList(places);
            setHistoryTitle(false);
        }
    };

    const initPlaceHistory = () => {
        const placeHistory = LocalStorageUtil.getStore<Place[]>(PLACE_HISTORY_KEY);
        if (placeHistory) {
            setPlaceList(placeHistory);
            setHistoryTitle(true);
        }
    };

    const clearAll = () => {
        LocalStorageUtil.removeStore(PLACE_HISTORY_KEY);
        setPlaceList([]);
    };

    const nextPage = (place: Place) => {
        const placeHistory = LocalStorageUtil.getStore<Place[]>(PLACE_HISTORY_KEY) || [];
        LocalStorageUtil.setStore(PLACE_HISTORY_KEY, [...placeHistory?.filter($place => $place.geohash !== place.geohash), place]);
        props.history.push({pathName: '/msite', query: {geohash: place.geohash}})
    };

    useEffect(() => {
        initCurrentCity(props.match.params.id);
    }, [props.match]);

    useEffect(() => {
        initPlaceHistory();
    }, []);

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
                    <input autoComplete="off" onClick={searchPlace} type="submit" name="submit" className="city_submit input_style"
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
            {(placeList && placeList.length !== 0) ?
                <footer onClick={clearAll} className="clear_all_history">清空所有</footer> : null}
            {(!placeList || placeList.length === 0) ? <div className="search_none_place">很抱歉！无搜索结果</div> : null}


        </div>
    )
}
