import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';
import {User} from '../../model/dto/user';
import {Injectable, iocInject} from '../context/decoration';

@Injectable()
export class UserApi {
    apiResponseAdaptor = iocInject<ApiResponseAdaptor>(ApiResponseAdaptor);

    getCurrentUser(): Promise<User> {
        return this.apiResponseAdaptor.adapt<User>(LocalAxios.get('/user'))
    }

}
