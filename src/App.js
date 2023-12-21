import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {  Delta, Sum, numberWithSpaces, renderTableHeader } from './assets/Functions';
import './Styles/global.css'
let Data = {
  cash: [54314, 81569, 62111, 40815, 65650, 84227, 31674],
  onlineCash: [93299, 50625, 51642, 68920, 40245, 76494, 21919],
  creditCard: [22136, 67948, 98097, 8297, 48544, 63916, 39614],
  guests: [13, 212, 331, 41, 52, 64, 71],
  bills:[4,12,51,32,12,5,23],
  checkRem:[123,412,125,543,124,144,876],
  accountRem:[421,4142,1241,1143,1424,144,76]
};
let Average=(arr1,arr2,i)=>{return Math.floor(arr1[i]/arr2[i])}
const currentDate=5

const ChartComponent = () => {
  
  const [chartOptions, setChartOptions] = useState({
    title: {text: '',},
    legend: {enabled: false,},
    xAxis: {title: {text: '',},
    lineColor: 'transparent',
    labels: {enabled: false,},
    tickLength: 0,
    tickWidth: 0,
    minorTickLength: 0,
    lineColor: 'transparent',
    minorGridLineColor: 'transparent',
    minorTickColor: 'transparent',},
    yAxis: {title: {text: '',}, lineColor: 'transparent', 
    labels: {enabled: false,},
    gridLineWidth: 0,
    tickLength: 0,
    tickWidth: 0,
    minorTickLength: 0,
    lineColor: 'transparent',
    minorGridLineColor: 'transparent',
    minorTickColor: 'transparent',
    categories: Data.cash},
    series: [{name: '',data: Data.guests,
    marker: {
      symbol: 'circle', 
      radius: 5,       
    fillColor: 'blue',
  }},],
  });

  const updateChart = (data) => {
    const newChartOptions = {
      ...chartOptions,
      title: { text: '' },
      legend: {enabled: false,},
      xAxis: {title: { text: '' , gridLineWidth: 0}},
      yAxis: {title: { text: '' },categories: data.map(String)},
      series: [{ name: '', data:data,   marker: {
        symbol: 'circle',
        radius: 5,
        fillColor: 'blue', 
      },}],
    };
    setChartOptions(newChartOptions);
  };
  let totalRevenue=Data.cash.map(function(value, index){ return value + Data.onlineCash[index]+Data.creditCard[index] })
  
  useEffect(() => {}, [chartOptions]);
  return (
    <div className='container'>
      <table >
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>
        <tr onClick={() => updateChart(totalRevenue)}>
            <td className='title'>{'Выручка,руб'}</td>
            <td className='today'>{numberWithSpaces(totalRevenue[currentDate])}</td>
            <td >{totalRevenue[currentDate-1]}</td>
            <td className={`${Delta(totalRevenue[currentDate],totalRevenue[currentDate-1])>0?'green':'red'}`}>{numberWithSpaces(Delta(totalRevenue[currentDate],totalRevenue[currentDate-1]))}</td>
            <td >{numberWithSpaces(Sum(totalRevenue))}</td>
        </tr>          
        </tbody>
      </table >
      <div style={{width:'75%'}}><HighchartsReact highcharts={Highcharts} options={chartOptions}/></div>
      <table style={{width:'75%'}}>
        <tbody>
          <tr onClick={() => updateChart(Data.cash)}>
            <td >{'Наличные, руб'}</td>
            <td className='today'>{Data.cash[currentDate]}</td>
            <td >{Data.cash[currentDate-1]}</td>
            <td className={`${Data.cash[currentDate]-Data.cash[currentDate-1]>0?'green':'red'}`}>
              {Data.cash[currentDate]-Data.cash[currentDate-1]}
            </td>
            <td >{(Data.cash.reduce((arr,i)=>arr+=i))}</td>
          </tr>
          <tr onClick={() => updateChart(Data.creditCard)}>
            <td >{'Безналичный расчет, руб'}</td>
            <td className='today'>{Data.creditCard[currentDate]}</td>
            <td >{Data.creditCard[currentDate-1]}</td>
            <td className={`${Data.creditCard[currentDate]-Data.creditCard[currentDate-1]>0?'green':'red'}`}>
              {Data.creditCard[currentDate]-Data.creditCard[currentDate-1]}
            </td>
            <td >{(Data.creditCard.reduce((arr,i)=>arr+=i))}</td>
          </tr>    
          <tr onClick={() => updateChart(Data.onlineCash)}>
            <td >{'Кредитная карта, руб'}</td>
            <td className='today'>{Data.onlineCash[currentDate]}</td>
            <td >{Data.onlineCash[currentDate-1]}</td>
            <td className={`${Data.onlineCash[currentDate]-Data.onlineCash[currentDate-1]>0?'green':'red'}`}>
              {Data.onlineCash[currentDate]-Data.onlineCash[currentDate-1]}
            </td>
            <td >{(Data.creditCard.reduce((arr,i)=>arr+=i))}</td>
          </tr>             

          <tr onClick={() => updateChart(Data.checkRem)}>
            <td >`Удаление из чека <br/>{"(после оплаты),руб"}
            </td>
            <td className='today'>{Data.checkRem[currentDate]}</td>
            <td >{Data.checkRem[currentDate-1]}</td>
            <td className={`${Data.checkRem[currentDate]-Data.checkRem[currentDate-1]>0?'green':'red'}`}>
              {`${Math.floor((Data.checkRem[currentDate]-Data.checkRem[currentDate-1])/Data.checkRem[currentDate-1]*100)}%`}
            </td>
            <td >{(Data.checkRem.reduce((arr,i)=>arr+=i))}</td>
          </tr>          
          <tr onClick={() => updateChart(Data.accountRem)}>
            <td >`Удаление из счета <br/>{"(до оплаты),руб"}
            </td>
            <td className='today'>{Data.accountRem[currentDate]}</td>
            <td >{Data.accountRem[currentDate-1]}</td>
            <td className={`${Data.accountRem[currentDate]-Data.accountRem[currentDate-1]>0?'green':'red'}`}>
              {`${Math.floor((Data.accountRem[currentDate]-Data.accountRem[currentDate-1])/Data.accountRem[currentDate-1]*100)}%`}
            </td>
            <td >{(Data.accountRem.reduce((arr,i)=>arr+=i))}</td>
          </tr>          
          <tr onClick={() => updateChart(Data.bills)}>
            <td >{'Количество чеков'}</td>
            <td className='today'>{Data.bills[currentDate]}</td>
            <td >{Data.bills[currentDate-1]}</td>
            <td className={`${Data.bills[currentDate]-Data.bills[currentDate-1]>0?'green':'red'}`}>
              {Data.bills[currentDate]-Data.bills[currentDate-1]}
            </td>
            <td >{(Data.bills.reduce((arr,i)=>arr+=i))}</td>
          </tr>             
          <tr onClick={() => updateChart(Data.guests)}>
            <td >{'Количество гостей'}</td>
            <td className='today'>64</td>
            <td >52</td>
            <td className={`${64-52>0?'green':'red'}`}>
              {64-52}
            </td>
            <td >784</td>
          </tr>             
        </tbody>
      </table>
    </div>
  );
};

export default ChartComponent;
