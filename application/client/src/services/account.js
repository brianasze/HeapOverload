import axios from "axios"

class AccountDataService {
    login(data) {
        return axios.post('http://34.125.134.2:5000/api/user/login', data)
    }

    register(data) {
        return axios.post('http://34.125.134.2:5000/api/user/signup', data)
    }
}

export default new AccountDataService()