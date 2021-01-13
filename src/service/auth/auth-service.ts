import {User} from '../../model/dto/user';
import {UserApi} from '../api/user.api';

export class AuthService {
    private static CURRENT_USER: User;

    static isLogin(): Promise<boolean> {
        return AuthService.getCurrentUser()
            .then(user => !!user);
    }

    static setCurrentUser(user: User): void {
        AuthService.CURRENT_USER = user;
    }

    static async getCurrentUser(): Promise<User | null> {
        return new Promise(((resolve, reject) => {
            if (AuthService.CURRENT_USER) {
                resolve(AuthService.CURRENT_USER);
            } else {
                UserApi.getCurrentUser()
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
