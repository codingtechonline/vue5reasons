<template>
  <div class="container">
    <div class="calculator">
      <div class="input-box text-input">
        <input
          type="number"
          v-model="state.baseCurrency"
          @keyup.prevent="
            (e) => {
              state.quoteCurrency = convertCurrency(
                formatCurrency(e.target.value),
                state.baseExchangeRate,
                state.quoteExchangeRate
              );
            }
          "
        />
      </div>
      <div class="input-box select-input">
        <span class="dropdown-button" @click="toggleBaseCurrencyRateList">
          {{ state.baseExchangeRate ? state.baseExchangeRate.name : "" }}
        </span>
        <div
          class="select-dropdown"
          :class="{ active: state.baseExchangeRateListVisible }"
          id="exchange-dropdown-from"
        >
          <ul>
            <li v-for="rate in exchangeRates" :key="rate.value">
              <span
                :class="{
                  selected: state.baseExchangeRate
                    ? state.baseExchangeRate.name === rate.name
                    : false,
                }"
                @click="
                  () => {
                    setBaseCurrencyRate(rate);
                  }
                "
                >{{ rate.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="equal-box">=</div>
      <div class="input-box text-input">
        <input
          type="number"
          v-model="state.quoteCurrency"
          @keyup.prevent="
            (e) => {
              state.baseCurrency = convertCurrency(
                formatCurrency(e.target.value),
                state.quoteExchangeRate,
                state.baseExchangeRate
              );
            }
          "
        />
      </div>
      <div class="input-box select-input">
        <span class="dropdown-button" @click="toggleQuoteCurrencyRateList">
          {{ state.quoteExchangeRate ? state.quoteExchangeRate.name : "" }}
        </span>
        <div
          class="select-dropdown"
          :class="{ active: state.quoteExchangeRateListVisible }"
          id="exchange-dropdown-to"
        >
          <ul>
            <li v-for="rate in exchangeRates" :key="rate.value">
              <span
                :class="{
                  selected: state.quoteExchangeRate
                    ? state.quoteExchangeRate.name === rate.name
                    : false,
                }"
                @click="
                  () => {
                    setQuoteCurrency(rate);
                  }
                "
                >{{ rate.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="conversion-text">
        {{ state.baseExchangeRate ? state.baseExchangeRate.name : "" }}
        to
        {{ state.quoteExchangeRate ? state.quoteExchangeRate.name : "" }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

export default {
  setup() {
    const state = reactive({
      baseCurrency: null,
      quoteCurrency: null,
      currencyValue: null,
      currencyUnit: null,
      baseExchangeRate: null,
      quoteExchangeRate: null,
      baseExchangeRateListVisible: false,
      quoteExchangeRateListVisible: false,
    });
    watch(
      () => state.baseExchangeRate,
      (baseExchangeRate) => {
        state.baseCurrency = convertCurrency(
          formatCurrency(state.quoteCurrency),
          state.quoteExchangeRate,
          baseExchangeRate
        );
      }
    );
    watch(
      () => state.quoteExchangeRate,
      (quoteExchangeRate) => {
        state.quoteCurrency = convertCurrency(
          formatCurrency(state.baseCurrency),
          state.baseExchangeRate,
          quoteExchangeRate
        );
      }
    );

    function formatCurrency(currency) {
      return parseFloat(currency).toFixed(2);
    }
    function convertCurrency(value, exchangeFrom, exchangeTo) {
      if (!value || !exchangeFrom || !exchangeTo) return null;

      return formatCurrency((value / exchangeFrom.value) * exchangeTo.value);
    }

    function toggleBaseCurrencyRateList() {
      state.baseExchangeRateListVisible = !state.baseExchangeRateListVisible;
    }

    function toggleQuoteCurrencyRateList() {
      state.quoteExchangeRateListVisible = !state.quoteExchangeRateListVisible;
    }
    function setQuoteCurrency(rate) {
      state.quoteExchangeRate = rate;
      toggleQuoteCurrencyRateList();
    }
    function setBaseCurrencyRate(rate) {
      state.baseExchangeRate = rate;
      toggleBaseCurrencyRateList();
    }
    async function getExchangeRates() {
      if (this.$store.state.exchangeRates.length === 0) {
        await this.$store.dispatch("getExchangeRates");
      }

      state.quoteExchangeRate = this.$store.state.exchangeRates.find(
        (r) => r.name === "EUR"
      );

      state.baseExchangeRate = this.$store.state.exchangeRates.find(
        (r) => r.name === "USD"
      );
      state.baseCurrency = 1;

      state.quoteCurrency = convertCurrency(
        formatCurrency(state.baseCurrency),
        state.baseExchangeRate,
        state.quoteExchangeRate
      );
    }

    return {
      state,
      getExchangeRates,
      toggleBaseCurrencyRateList,
      toggleQuoteCurrencyRateList,
      convertCurrency,
      formatCurrency,
      setQuoteCurrency,
      setBaseCurrencyRate,
    };
  },
  async mounted() {
    await this.getExchangeRates();
  },
  computed: {
    exchangeRates() {
      return this.$store.state.exchangeRates;
    },
  },
  name: "CurrencyCalculator",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
*:focus {
  outline: none;
}
.container {
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 100vh;
}
.calculator {
  display: grid;
  grid-template-columns:
    minmax(150px, 1fr)
    minmax(150px, 1fr)
    minmax(100px, 0.5fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr);
  gap: 10px;
}
.input-box {
  border: 3px solid rgba(18, 181, 201, 1);
  border-radius: 10px;
  padding: 1rem;

  display: block;
}
.text-input {
  width: auto;
  color: rgba(18, 181, 201, 1);
}
.select-input {
  position: relative;
  color: rgba(18, 181, 201, 1);
}
.dropdown-button {
  color: rgba(18, 181, 201, 1);
  height: 100%;
  width: 100%;
  background: transparent;
  border: 0 transparent solid;
  font-size: 5rem;
  cursor: pointer;
}
.select-dropdown {
  opacity: 0;
  background: lightgray;
  transition: all 0.7s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  padding-top: 10px;
  left: 0;
  top: 100%;
  height: 12rem;
  overflow: scroll;
}

.select-dropdown > ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 4px;
  grid-gap: 0.5rem;
}
.select-dropdown > ul > li > span {
  margin: 0 20;
  display: block;
  padding: 6px 8px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #343434;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.7s ease;
}
.select-dropdown > ul > li > span:hover {
  background-color: rgba(18, 181, 201, 1);
  color: #fff;
}

.select-dropdown > ul > li > span.selected {
  background-color: rgba(18, 181, 201, 1);
  color: #fff;
}

.option {
  display: none;
}
.select-item:hover {
  background-color: #f2f2f2;
}
.equal-box {
  display: grid;
  place-items: center;
  font-size: 5rem;
  padding: 1rem;
  color: rgba(18, 181, 201, 1);
}

.conversion-text {
  font-size: 1.5rem;
  grid-column: 1 / 6;
  color: rgba(18, 181, 201, 1);
}

.hidden {
  display: none;
}

input {
  background: transparent;
  border: none;
  height: 100%;
  width: 100%;
  color: rgba(18, 181, 201, 1);
  text-align: center;

  font-size: 5rem;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
}

label {
  display: block;
  font-weight: 500;
  font-size: 2rem;
  padding: 2rem 0 0.5rem;
}
.active {
  display: block;
  opacity: 1;
}
@media (max-width: 24em), (max-height: 24em) {
  .dropdown-button,
  .equal-box,
  input,
  label {
    font-size: 1rem;
  }
}
@media (max-width: 32em), (max-height: 24em) {
  .dropdown-button,
  .equal-box,
  input,
  label {
    font-size: 1.5rem;
  }
}
@media (max-width: 48em), (max-height: 32em) {
  .dropdown-button,
  .equal-box,
  input,
  label {
    font-size: 2rem;
  }
}

@media (max-width: 64em), (max-height: 48em) {
  .dropdown-button,
  .equal-box,
  input,
  label {
    font-size: 3rem;
  }
}

@media all and (max-width: 1024px) {
  .calculator {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  .conversion-text {
    grid-column: 1 / 1;
  }
}

.input-wrap {
  position: relative;
}
.input-wrap .input {
  position: absolute;
  width: 100%;
  left: 0;
}
.input-sizer {
  display: inline-grid;
  vertical-align: top;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border: solid 1px;
  padding: 0.25em 0.5em;
  margin: 5px;
}
.input-sizer::after,
.input-sizer input {
  width: auto;
  min-width: 1em;
  grid-area: 1 / 2;
  font: inherit;
  padding: 0.25em;
  margin: 0;
  resize: none;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
}
.input-sizer::after {
  content: attr(data-value) " ";
}
</style>
