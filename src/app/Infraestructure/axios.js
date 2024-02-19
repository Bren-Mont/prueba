import axios from "axios";

const singleton = Symbol();
const singletonEnforcer = Symbol();

const location = {
    protocol: 'http:',
    host: '127.0.0.1:8000/',

}

class ApiService {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }

        console.log(`API Service for ${location.protocol}//${location.host}/`);

        this.session = axios.create({
            baseURL: `${location.protocol}//${location.host}/`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static get instance() {
        // Try to get an efficient singleton
        if (!this[singleton]) {
            this[singleton] = new ApiService(singletonEnforcer);
        }

        return this[singleton];
    }

    setToken = (token) => this.session.defaults.headers.common['Authorization'] = token;
    get = (...params) => this.session.get(...params);
    post = (...params) => this.session.post(...params);
    put = (...params) => this.session.put(...params);
    patch = (...params) => this.session.patch(...params);
    remove = (...params) => this.session.delete(...params);
}

export default ApiService.instance;