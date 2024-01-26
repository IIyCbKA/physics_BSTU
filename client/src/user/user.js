import {$host} from '../Routes'

class User{
    constructor() {
        this._mail = ''
        this._isAuth = false
        this._bearer = ''
    }

    async auth(mail, password) {
        const searchData = {
            mail: mail,
            password: password,
        }
        console.log('Поиск пользователя', searchData);

        try {
            const response = await $host.post(
                '/api/login',
                searchData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
            if (response.data.result === true){
                user._mail = mail
                user._isAuth = true
            }
            console.log('Пользователь', user._mail, 'авторизован', user._isAuth)
            console.log('Ответ сервера', response.data);
        } catch(err) {
            console.log(err)
        }
    }
}

const user = new User()

export {user, User}
