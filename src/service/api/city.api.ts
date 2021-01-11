import {City, CityGroup} from '../../model/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';

export class CityApi {
    static getGuessCity(): Promise<City> {
        return ApiResponseAdaptor.adapt<City>(LocalAxios.get('/cities?type=guess'));
    }

    static getHotCities(): Promise<City[]> {
        return ApiResponseAdaptor.adapt<City[]>(LocalAxios.get('/cities?type=hot'));
    }

    static getCityGroup(): Promise<CityGroup> {
        return ApiResponseAdaptor.adapt<CityGroup>(LocalAxios.get('/cities?type=group'))
    }

    static getCityById(id:string):Promise<City>{
        return ApiResponseAdaptor.adapt<City>(LocalAxios.get(`/cities/${id}`))
    }

}
