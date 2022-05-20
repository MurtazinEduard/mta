import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
function Converter() {
    const [selectedCurrency, setSelectedCurrency] = useState("USD")
    const options = [{value: 'USD', name: 'ДОЛЛАР'}, {value: 'EUR', name: 'ЕВРО'}]
    const [currentCurrency, setCurrentCurrency] = useState({currency: 'USD', course: 0})
    async function getActualCurrency () {
        await axios.get(`https://api.apilayer.com/fixer/convert?to=RUB&from=${selectedCurrency}&amount=1&apikey=H9WCSqeXlQflVzqUSaJMa3yA1vVDsHzh`)
        .then(res => {
            setCurrentCurrency({currency:res.data.query.from, course: res.data.result})
        })
    }
  return (
    <div className="Converter">
      <h1 className='main-title'>КУРС ВАЛЮТ CCD</h1>
      <div className='choose'>
        <h4 className='secnd-title'>ВЫБЕРИТЕ ВАЛЮТУ</h4>
        <select 
            value={selectedCurrency} 
            className='my-input'
            onChange={e => setSelectedCurrency(e.target.value)}
            >
            {options.map(option => 
                <option value={option.value} key= {option.name}> 
                    {option.name}
                </option>)}
        </select>
        <button onClick={getActualCurrency} className='my-button'>Узнать курс</button>
      </div>
      <div className='course-table'>
        <div className='course-table__item'>{currentCurrency.currency}: {currentCurrency.course}Р</div>
      </div>
    </div>
  );
}

export default Converter;