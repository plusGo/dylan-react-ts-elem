import {City} from '../../model/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';

export class PlaceApi {

    static searchPlace(cityId: number, keyword: string): Promise<City[]> {
        return ApiResponseAdaptor.adapt<City[]>(LocalAxios.get('/pois', {
            params: {
                type: 'search',
                city_id: cityId,
                keyword: keyword
            }
        }))
    }

}
