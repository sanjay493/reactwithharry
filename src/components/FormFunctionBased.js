import React, { useState } from 'react';

const uid=new Date().getTime().toString()
 console.log(uid)
const FormFunctionBased = () => {
    const formElements=[
                
            {label:"Name",
            key:"name"
            },
            {label:"Phone Number",
            key:"phone"
        }
        ]
 const [formData,setFormData]=useState({})
 
 const handleChange =(key:string,value:string)=>{
    
    
    setFormData({...formData,...{[key]:value},uid})
 }

 const submitted=()=>{
     if(isFormInValid()){
         return
     }
     alert(JSON.stringify(formData))
}

const isFormInValid=()=>{
    let returnValue=false;
    formElements.forEach(formElement=>{
        if(formData[formElement.key]===undefined){
            alert(formElement.label + " is Missing")
            returnValue=true
        }
    })
    return returnValue;
}
  return (
  <div>
   <div className="container">
       <h2>Functional based Form Components</h2>
       <form>
           {formElements.map((formElement)=>{
               return (
                        <div className='form-floating mb-3' key={formElement.key}>   
                        <input 
                        className='form-control' 
                        id='floatingInput' 
                        value={formData[formElement.key]} 
                        onChange={(e)=>{e.preventDefault(); handleChange(formElement.key,e.target.value)}}
                        />
                        <label>{formElement.label}</label>
                        
                         </div>

               )
           })}
           <button className='btn btn-secondary' onClick={(e)=>{e.preventDefault(); submitted()}}>Submit</button>
       </form>
   </div>
  </div>
  );
};

export default FormFunctionBased;
