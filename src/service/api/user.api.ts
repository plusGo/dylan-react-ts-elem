import {LocalAxios} from '../../config/api.config';
import {ApiResponseAdaptor} from './api-response.adaptor';
import {User} from '../../model/dto/user';

export class UserApi {

    static getCurrentUser(): Promise<User> {
        return ApiResponseAdaptor.adapt<User>(LocalAxios.get('/user'))
    }

}
