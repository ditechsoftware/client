import {useEffect, useState} from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("")
  const [wage, setWage] = useState(0)
  const [newWage, setNewWage] = useState(0)
  const [employees ,setEmployees] = useState([])
  const addEployee = () => {
    Axios.post('http://localhost:3002/create', 
    {name: name, age: age, country: country,
       position: position, wage: wage}).then(() => {
         setEmployees([...employees, {name: name, age: age, country: country,
          position: position, wage: wage}])
       })
  }

  const updateWage = (id) => {
    Axios.put('http://localhost:3002/update',{
      newWage: newWage,
      id: id
    }).then((res) => {
     setEmployees(employees.map((val) => {
       return val.id === id ? {
          id: val.id,
          name: val.name,
          age: val.age,
          country: val.country,
          position: val.position,
          wage: newWage,
       }: val
     }))
    })
  }

const deleteEmployees = (id) => {
  Axios.delete(`http://localhost:3002/delete/${id}`).then((res) => {
   
  })
}
  useEffect(()=>{
    Axios.get('http://localhost:3002/employees')
    .then((res)=>{
      setEmployees(res.data)
    })
  },[employees])
  // const getEmployees = () => {
  //   Axios.get('http://localhost:3002/employees')
  //   .then((res)=>{
  //     setEmployees(res.data)
  //   })

  // }

  
  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input type="text" onChange={(e)=> {setName(e.target.value)}} required/>
        <label>Age:</label>
        <input type="number" onChange={(e)=> {setAge(e.target.value)}}/>
        <label>Country:</label>
        <input type="text" onChange={(e)=> {setCountry(e.target.value)}}/>
        <label>Position:</label>
        <input type="text" onChange={(e)=> {setPosition(e.target.value)}}/>
        <label>Wage (per year):</label>
        <input type="number" onChange={(e)=> {setWage(e.target.value)}}/>
        <button onClick={addEployee}>Add Employees</button>
      </div>
      <div className='line'></div>
      <div className='employee'>
        <button className='show-btn'>Show Employees</button>
        
            {employees.map((val,key) =>{
              return (
              
                  <div className='epm relative'>
                    <h4>Name: {val.name}</h4>
                    <h4>Age: {val.age}</h4>
                    <h4>Country: {val.country}</h4>
                    <h4>Position: {val.position}</h4>
                    <h4>Wage: {val.wage}$</h4>
                    <div className='update-wage'>
                      <label>New wage: </label>
                      <input type='number' onChange={(e)=>{ setNewWage(e.target.value)}}/>
                      <button  onClick={()=> updateWage(val.id)} className='update-wage-btn'>Update</button>
                    </div>
                    <buton onClick={() => deleteEmployees(val.id)} className='delete-btn absolute'>X</buton>
                  </div>
              
              )
            })}
      
       
      </div>
    </div>
  );
}

export default App;
