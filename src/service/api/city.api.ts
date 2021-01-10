import {City} from '../../model/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';

export class CityApi {
    public static getGuessCity(): Promise<City> {
        return ApiResponseAdaptor.adapt<City>(LocalAxios.get('/cities?type=guess'));
    }
}
