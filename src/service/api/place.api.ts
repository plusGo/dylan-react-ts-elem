import {City} from '../../model/dto/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';
import {Place} from '../../model/dto/place';
import {Injectable, iocInject} from '../context/decoration';

@Injectable()
export class PlaceApi {
    apiResponseAdaptor = iocInject<ApiResponseAdaptor>(ApiResponseAdaptor);

    searchPlace(cityId: number, keyword: string): Promise<City[]> {
        return this.apiResponseAdaptor.adapt<Place[]>(LocalAxios.get('/pois', {
            params: {
                type: 'search',
                city_id: cityId,
                keyword: keyword
            }
        }))
    }

}
