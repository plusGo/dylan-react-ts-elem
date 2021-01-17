import {City, CityGroup} from '../../model/dto/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';
import {Injectable, iocInject} from '../context/decoration';

@Injectable()
export class CityApi {
    apiResponseAdaptor = iocInject<ApiResponseAdaptor>(ApiResponseAdaptor);

    getGuessCity(): Promise<City> {
        return this.apiResponseAdaptor.adapt<City>(LocalAxios.get('/cities?type=guess'));
    }

    getHotCities(): Promise<City[]> {
        return this.apiResponseAdaptor.adapt<City[]>(LocalAxios.get('/cities?type=hot'));
    }

    getCityGroup(): Promise<CityGroup> {
        return this.apiResponseAdaptor.adapt<CityGroup>(LocalAxios.get('/cities?type=group'))
    }

    getCityById(id: string): Promise<City> {
        return this.apiResponseAdaptor.adapt<City>(LocalAxios.get(`/cities/${id}`))
    }

    searchPlace(cityId: number, keyword: string): Promise<City[]> {
        return this.apiResponseAdaptor.adapt<City[]>(LocalAxios.get('/cities', {
            params: {
                type: 'search',
                city_id: cityId,
                keyword: keyword
            }
        }))
    }
}
