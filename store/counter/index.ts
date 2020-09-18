import {
    Getters, Mutations, Actions, Module, createMapper,
} from 'vuex-smart-module';

class CounterState {
    counter: number = 0;
}

class CounterGetters extends Getters<CounterState> {
    get doubleCounter() {
        return this.state.counter * 2;
    }

    get tripleCounter() {
        return this.doubleCounter + this.state.counter;
    }
}

class CounterMutations extends Mutations<CounterState> {
    INCREMENT(payload: number) {
        this.state.counter += payload;
    }
}

class CounterActions extends Actions<
    CounterState,
    CounterGetters,
    CounterMutations,
    CounterActions
> {
    actIncrement() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.commit('INCREMENT', 2);
                resolve();
            }, 1000);
        });
    }
}

export const counter = new Module({
    state: CounterState,
    getters: CounterGetters,
    mutations: CounterMutations,
    actions: CounterActions,
});
export const counterMapper = createMapper(counter);
