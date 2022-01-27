import TextForm from "./components/TextForm";
import Header from "./components/Header";
import About from "./components/About";
import { useState } from "react";
import Alert from "./components/Alert";
import {Routes,Route} from 'react-router-dom'

function App() {
  const [mode,setMode]=useState('light')
  const [alert,setAlert]=useState(null)

  const showAlert=(message,type)=>{
     setAlert({
       msg:message,
       type:type
     })
     setTimeout(()=>{
       setAlert(null)
       },1500)
  }
  const toggleMode =()=>{
    if(mode==='dark'){
      setMode('light')
      document.body.style.backgroundColor='white'
      showAlert('Light Mode has been Enabled',"success")
      document.title='Text Utility-Light Mode'
    }else{
      setMode('dark')
      document.body.style.backgroundColor='gray'
      showAlert('Dark Mode has been Enabled',"success")
      document.title='Text Utility-Dark Mode'
    }
  }
  return (
    <>
    <Header  mode={mode} toggleMode={toggleMode}/>
    <Alert alert={alert}/>
    <div className="container">
     
    <Routes>
        <Route path="/" element={ <TextForm heading="Enter the Text to Analyse" mode={mode} showAlert={showAlert}/> } />
        <Route path="/about" element={ <About /> } />
        
      </Routes>
      <About />
    </div>
    
     
    </>
  );
}

export default App;
