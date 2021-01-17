import { City } from '../../model/dto/city.model';
import { LocalAxios } from '../../config/api.config';
import { ApiResponseAdaptor } from './api-response.adaptor';
import { Injectable, iocInject } from '../context/decoration';
import { User } from '../../model/dto/user';

@Injectable()
export class LoginApi {
    apiResponseAdaptor = iocInject<ApiResponseAdaptor>(ApiResponseAdaptor);

    passwordLogin(username: string, password: string, captchaCode: string): Promise<User> {
        return this.apiResponseAdaptor.adapt<User>(LocalAxios.post('/v2/login', { username, password, captcha_code: captchaCode }));
    }

}
