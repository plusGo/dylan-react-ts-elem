import {City} from '../../model/dto/city.model';
import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';
import {Injectable, iocInject} from '../context/decoration';

@Injectable()
export class CaptchaApi {
    apiResponseAdaptor = iocInject<ApiResponseAdaptor>(ApiResponseAdaptor);

    getCaptcha(): Promise<any> {
        return this.apiResponseAdaptor.adapt<City>(LocalAxios.post('/v1/captchas', {}));
    }

}
