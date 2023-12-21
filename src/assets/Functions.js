export const Aver=(cash,guests,date)=>{return (Math.floor((cash[date]/guests[date])))}
export const prevAver=(cash,guests,date)=>{return (Math.floor((cash[date-1]/guests[date-1])))}
export const Sum=(cash)=>{return (cash.reduce((arr,i)=>arr+=i))}
export const Delta=(Current,Prev)=>{return (Current-Prev)}

export function numberWithSpaces(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");}
export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function TableForm(money,guest,currentDate,updateChart,title){
    let delta=Delta(Aver(money,guest,currentDate),prevAver(money,guest,currentDate))
    return(        
    <tr onClick={() => updateChart(money)}>
        <td className="title">{title}</td>
        <td className='today'>{numberWithSpaces(Aver(money,guest,currentDate))}</td>
        <td >{numberWithSpaces(prevAver(money,guest,currentDate))}</td>
        <td className={`${delta>0?'green':'red'}`}>{numberWithSpaces(delta)}</td>
        <td >{numberWithSpaces(Sum(money))}</td>
    </tr>)}
export  const renderTableHeader = () => {let header = ['Показатель','Текущий день','Вчера','Итого (неделя)'];return header.map((key, index) => <th key={index} colSpan={index===2?2:0}>{key}</th>);};
export const renderTableData = (data) => {
    return data.map((item, index) => {
      const { item: itemName, value1, value2, value3 } = item;
      return (
        <tr key={index}>
          <td>{itemName}</td>
          <td>{value1}</td>
          <td >{value2}</td>
          <td>{value3}</td>
        </tr>
      );
    });
  };

 