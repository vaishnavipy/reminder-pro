
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [input,setInput] = useState({reminder:"",date:""})

  const [reminderArr,setReminderArr] = useState([])

  const d  = new Date();

  function handleChange(e){
    const {name,value} = e.target;

    setInput(prevState => ({...prevState,[name]:value}) );
    console.log(e.target.value)
  }

  function handleClick(){
   if(input.reminder && input.date){
      setReminderArr(prevState => [...prevState,input])
      setInput({reminder:"",date:""})
   }
  }

  useEffect(()=>{
    if(reminderArr.length > JSON.parse(localStorage.remainderArr).length){

      localStorage.setItem("remainderArr",JSON.stringify (reminderArr))
      console.log(JSON.parse(localStorage.remainderArr),"ji")
    }


  },[reminderArr])

  useEffect(()=>{
    if(localStorage.remainderArr){
      setReminderArr(JSON.parse( localStorage.remainderArr) )
    }
  },[])

 

  function clearAllRemainders(){
    setReminderArr([])
    localStorage.setItem("remainderArr",JSON.stringify ([]))
  }

  function clearRemainder(e){
    let id = e.currentTarget.id;

    setReminderArr(prevState => prevState.filter((obj,index) => index != id))
    localStorage.setItem("remainderArr",JSON.stringify (reminderArr.filter((obj,index) => index != id)))
  }

  function calculateDays(thisdate){
console.log(thisdate)
    const date_diff = Math.floor((  new Date(thisdate).getTime() - d.getTime() )/ (1000 * 3600 * 24));

    return date_diff;

  }
  
  function getMinDate(){
    let month; let tempdate;
    if(Number(d.getMonth()+1) <10){
      month = `0${d.getMonth()+1}`
    }else{
      month = `${d.getMonth()+1}`
    }
    if(Number(d.getDate()) < 10){
      tempdate = `0${d.getDate()}`
    }else{
      tempdate = `${d.getDate()}`
    }

    return `${d.getFullYear()}-${month}-${tempdate}`
  }

  const reminders = reminderArr.map((obj,i) => <div key={i} className="remainder"><div><p>{obj.reminder}</p><p>in { calculateDays(obj.date)} days</p></div><span className="delete" onClick={clearRemainder} id={i}>X</span></div>)

  return (
    <div  className="main-container">
      <h1>Reminder Pro</h1>
      <form className="input-div">
        <input  type="text" placeholder="Buy a gallon of milk" name="reminder" value={input.reminder} onChange ={handleChange} required/>
        <input type="date" name="date" value={input.date} min={getMinDate()} onChange={handleChange} required/>
        <button className="reminder-btn" onClick={handleClick}>Add Reminder</button>
      </form>
      {reminderArr.length !== 0 ?  <div className="remainders-container"> {reminders} </div> : "" }
     
      <button onClick={clearAllRemainders} className="clear">Clear Reminders</button>
    </div>
  );
}

export default App;
