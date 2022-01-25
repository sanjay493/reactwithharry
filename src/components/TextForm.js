import React,{useState} from 'react';


const TextForm = (props) => {
  const [text,setText]=useState('Enter text here')
  //text="new text"; //wrong way to change the state of text variable.
  //setText("new text"); //right way to change the state of text variable.

  
  const handleOnChange=(e)=>{
    //console.log('Text Field are changing')
    setText(e.target.value)
  }

  const handleUpClick=()=>{
    //console.log('Upper case Button Clicked')
    let newText=text.toUpperCase()
    setText(newText)
   
  }
  return <>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <label htmlFor="myBox" className="form-label">Example textarea</label>
            <textarea className="form-control" id="myBox" rows={3} value={text} onChange={handleOnChange}/>
        </div>
        <div className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</div>
  </>;
};

export default TextForm;
