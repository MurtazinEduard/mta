import "../App.css";
import React, { useState } from "react";
import axios from "axios";
function Converter() {
  const currencyCalculator = (currency) => {
    const rubles = (1 / currency).toFixed(2);
    return rubles;
  };
  const profitCalculator = () => {
    const myEUR = myMoney / eurMta;
    const myUSD = myMoney / usdMta;
    setProfitEUR({
      min: (myEUR * currency.EUR * 0.98 - myMoney).toFixed(),
      max: (myEUR * currency.EUR * 0.99 - myMoney).toFixed(),
    });
    setProfitUSD({
      min: (myUSD * currency.USD * 0.98 - myMoney).toFixed(),
      max: (myUSD * currency.USD * 0.99 - myMoney).toFixed(),
    });
  };
  const [currency, setCurrency] = useState({ EUR: 0, USD: 0 });
  const [myMoney, setMyMoney] = useState(undefined);
  const [eurMta, setEurMta] = useState(undefined);
  const [usdMta, setUsdMta] = useState(undefined);
  const [profitEUR, setProfitEUR] = useState({ min: 0, max: 0 });
  const [profitUSD, setProfitUSD] = useState({ min: 0, max: 0 });
  const [loading, setLoading] = useState(false);

  async function getActualCurrency() {
    setLoading(true);
    await axios
      .get(`https://api.apilayer.com/fixer/latest?symbols=EUR,USD&base=RUB`, {
        headers: { apikey: "A03Oz8E4HyTwgJpt2V3CMF078kxye31U" },
      })
      .then((res) => {
        setCurrency({
          EUR: currencyCalculator(res.data.rates.EUR),
          USD: currencyCalculator(res.data.rates.USD),
        });
        localStorage.setItem(
          "LASTCURRENCY",
          JSON.stringify({
            EUR: currencyCalculator(res.data.rates.EUR),
            USD: currencyCalculator(res.data.rates.USD),
          })
        );
        setLoading(false);
      });
  }

  React.useEffect(() => {
    const lastCur = localStorage.getItem("LASTCURRENCY");
    if (lastCur) {
      setCurrency(JSON.parse(lastCur));
    }
  }, []);

  return (
    <div className="Converter">
      <h1 className="main-title">КУРС ВАЛЮТ CCD</h1>
      <div className="choose">
        <button onClick={getActualCurrency} className="my-button">
          {loading ? "Загрузка" : "Узнать курс"}
        </button>
      </div>
      <div className="course-table">
        <div className="course-table__item">EUR: {currency.EUR}Р</div>
        <div className="course-table__item">USD: {currency.USD}Р</div>
      </div>
      <div className="calculator">
        <h2>Калькулятор</h2>
        <input
          onChange={(e) => setMyMoney(e.target.value)}
          value={myMoney}
          type="number"
          className="my-input"
          placeholder="На сколько рублей закупать валюты?"
        />
        <input
          onChange={(e) => setEurMta(e.target.value)}
          value={eurMta}
          type="number"
          className="my-input"
          placeholder="Курс слива в мта евро"
        />
        <input
          onChange={(e) => setUsdMta(e.target.value)}
          value={usdMta}
          type="number"
          className="my-input"
          placeholder="Курс слива в мта доллар"
        />

        
      </div>
      <button onClick={profitCalculator} className="my-button">
          Узнать прибыль
        </button>
      <div className="calc-table">
        <h3>ПРИБЫЛЬ В</h3>
        <div className="course-table__item">
          {eurMta ? (
            <span>
              EUR: <br />
              ОТ {profitEUR.min} Р<br />
              ДО {profitEUR.max} Р
            </span>
          ) : (
            <span>
              EUR: <br/>ОТ {0}Р <br/>ДО {0} Р
            </span>
          )}
        </div>
        <div className="course-table__item">
          {usdMta ? (
            <span>
              USD: <br />
              ОТ {profitUSD.min} Р <br />
              ДО {profitUSD.max} Р
            </span>
          ) : (
            <span>
              USD: <br />
              ОТ {0} Р <br />
              ДО {0} Р
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Converter;
