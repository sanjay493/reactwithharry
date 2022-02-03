// import TextForm from "./components/TextForm";
// import Header from "./components/Header";
// import About from "./components/About";
// import { useState } from "react";
// import Alert from "./components/Alert";
// import {Routes,Route} from 'react-router-dom'

// function App() {
  // const [mode,setMode]=useState('light')
  // const [alert,setAlert]=useState(null)

  // const showAlert=(message,type)=>{
  //    setAlert({
  //      msg:message,
  //      type:type
  //    })
  //    setTimeout(()=>{
  //      setAlert(null)
  //      },1500)
  // }
// const removeBodyClasses=()=>{
// document.body.classList.remove('bg-light')
// document.body.classList.remove('bg-dark')
// document.body.classList.remove('bg-warning')
// document.body.classList.remove('bg-danger')
// document.body.classList.remove('bg-success')
// }

  // const toggleMode =(cls)=>{
  //   removeBodyClasses()
  //  // console.log(cls)
  //   document.body.classList.add('bg-'+cls)
  //   if(mode==='dark'){
  //     setMode('light')
  //     document.body.style.backgroundColor='white'
  //     showAlert('Light Mode has been Enabled',"success")
  //     //document.title='Text Utility-Light Mode'
  //   }else{
  //     setMode('dark')
  //     document.body.style.backgroundColor='#042743'
  //     showAlert('Dark Mode has been Enabled',"success")
  //     //document.title='Text Utility-Dark Mode'
  //   }
  // }
//   return (
//     <>
//     {/* <Header  mode={mode} toggleMode={toggleMode}/>
//     <Alert alert={alert}/>
//     <div className="container">
     
//     <Routes>
//         <Route path="/" element={ <TextForm heading="Enter the Text to Analyse" mode={mode} showAlert={showAlert}/> } />
//         <Route path="/about" element={ <About mode={mode}/> } />
        
//       </Routes>
      
//     </div> */}
    
     
//     </>
//   );
// }

// export default App;


// 
import React,{useEffect,useState} from 'react';
import Navbar from './components/functionBased/Navbar';
import News from './components/functionBased/News';
import {Routes,Route} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

 const App =()=> {
  const pageSize=20
  const apikey=process.env.REACT_APP_NEWS_API
  
const [progress,setProgress]=useState(0)

  
useEffect(()=>{
  setProgress({progress:progress})
},[])
 
    return(
      <>
      <Navbar />
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}        
      />
      <Routes>
      
        <Route path="/sport" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='sport'/> } />
        <Route path="/" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='general'/> } />
        <Route path="/general" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='general'/> } />
        <Route path="/entertainment" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='entertainment'/> } />
        <Route path="/business" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='business'/> } />
        <Route path="/health" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='health'/> } />
        <Route path="/technology" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='technology'/> } />
        <Route path="/science" element={ <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} counrty="in" category='science'/> } />
      </Routes>
      </>
    )
  
}

export default App