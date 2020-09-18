import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';

export type User = {
    name: string;
    password: string;
}

class AuthState {
    isLoggedIn: boolean = false;
    user1: User = {
        name: 'John',
        password: 'Doe',
    }
}

class AuthGetters extends Getters<AuthState> {
    get loginStatus() {
        return this.state.isLoggedIn ? "authorized" : 'not authorized'
    }
}

class AuthMutations extends Mutations<AuthState> {
    SET_LOGIN(payload: boolean) {
        this.state.isLoggedIn = payload;
    }
}

class AuthActions extends Actions<
    AuthState,
    AuthGetters,
    AuthMutations,
    AuthActions
> {
    check_login(payload: User) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.state.user1.name === payload.name && this.state.user1.password === payload.password) {
                    this.commit('SET_LOGIN', true);
                    resolve(`User is ${this.getters.loginStatus}`)
                } else {
                    this.commit('SET_LOGIN', false);
                    reject(new Error(`User is ${this.getters.loginStatus}`))
                }
            }, 1000)
        })
    }
}

export const auth = new Module({
    state: AuthState,
    getters: AuthGetters,
    mutations: AuthMutations,
    actions: AuthActions
})
export const authMapper = createMapper(auth)