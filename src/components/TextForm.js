import React,{useState} from 'react';


const TextForm = (props) => {
  const [text,setText]=useState('Enter text here')
  const [myStyle,setMyStyle]=useState({text:'normal'})
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
  const handleLoClick=()=>{
    //console.log('Upper case Button Clicked')
    let newText=text.toLowerCase()
    setText(newText) 
  }

  const handleDelClick=()=>{
     setText("") 
  }

  const handleCopyClick =()=>{
    navigator.clipboard.writeText(text)
  }
  const handleCutClick =()=>{
    navigator.clipboard.cut(text)
  }
  const handlePasteClick =()=>{
    // const text1=[...text,setText(text)]
    // console.log(text1)
    // navigator.clipboard.readText(text1)
  }

  const handleRemoveExtraSpace =()=>{
    const text1=text.split(/[ ]+/)
    setText(text1.join(" "))
  }
  const handleReverseString=()=>{ 
    if (text==='')
    {alert("please first enter text in textbox");}
    else{
    let resultOfReverveString=text.split(' ').reverse().toString().replaceAll(',','');
    setText(resultOfReverveString);
    }
}
const ToBold = () => {
  
  setMyStyle({text:'bold'});
}
  return <>
  <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <label htmlFor="myBox" className="form-label">Example textarea</label>
            <textarea className="form-control" id="myBox" rows={3} value={text} onChange={handleOnChange} style={myStyle}/>
        </div>
        <div className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</div>
        <div className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</div>
        <div className="btn btn-primary mx-1" onClick={handleDelClick}>Clear Text</div>
        <div className="btn btn-primary mx-1" onClick={handleCutClick}>Cut Text</div>
        <div className="btn btn-primary mx-1" onClick={handleCopyClick}>Copy Text</div>
        <div className="btn btn-primary mx-1" onClick={handlePasteClick}>Paste Text</div>
        <div className="btn btn-primary mx-1" onClick={handleReverseString}>Reverse words</div>
        <div className="btn btn-primary mx-1" onClick={handleRemoveExtraSpace}>Remove Extra Space</div>
        <div className="btn btn-primary mx-1" onClick={ToBold}>Text Bold</div>

  </div> 
  <div className="container">
    <h2>Your text summery</h2>
    <p>{text.split(".").length} sentances.</p>
    <p>{text.split("").length} words and {text.length} charecters.</p>
    <p>{0.008*text.split("").length} minutes read</p>
    <h3>Preview</h3>
    <p>{text}</p>
  </div>
  </>;
};

export default TextForm;
