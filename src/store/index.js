import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      exchangeRates: [],
    };
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    },
    decrement(state, n) {
      state.count -= n;
    },
    setExchangeRates(state, rates) {
      state.exchangeRates = rates;
    },
  },
  actions: {
    getExchangeRates({ commit }) {
      return new Promise((resolve, reject) => {
        fetch("https://md-exchange-rates.herokuapp.com/latest?base=USD")
          .then(async (response) => {
            const results = await response.json();
            const rates = Object.keys(results.rates).map((key) => {
              return {
                name: key,
                value: results.rates[key],
              };
            });
            commit("setExchangeRates", rates);
            resolve();
          })
          .catch((e) => reject(e));
      });
    },
  },
});

export default store;
