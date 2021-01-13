import {User} from '../../model/dto/user';
import {UserApi} from '../api/user.api';
import {iocInject, Injectable} from '../context/decoration';

@Injectable()
export class AuthService {
    private static CURRENT_USER: User;
    private userApi = iocInject<UserApi>(UserApi);

    isLogin(): Promise<boolean> {
        return this.getCurrentUser()
            .then(user => !!user);
    }

    setCurrentUser(user: User): void {
        AuthService.CURRENT_USER = user;
    }

    async getCurrentUser(): Promise<User | null> {
        return new Promise(((resolve, reject) => {
            if (AuthService.CURRENT_USER) {
                resolve(AuthService.CURRENT_USER);
            } else {
                this.userApi.getCurrentUser()
                    .then($user => {
                        resolve($user);
                        AuthService.CURRENT_USER = $user;
                    })
                    .catch(() => {
                        reject(null)
                    });
            }
        }));
    }
}
