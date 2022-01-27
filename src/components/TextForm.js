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
    props.showAlert("Text has been converted in Uppercase",'success')
  }
  const handleLoClick=()=>{
    //console.log('Upper case Button Clicked')
    let newText=text.toLowerCase()
    setText(newText) 
    props.showAlert("Text has been converted in Lowercase",'success')
  }

  const handleDelClick=()=>{
     setText("") 
     props.showAlert("Text has been Deleted",'success')
  }

  const handleCopyClick =()=>{
    navigator.clipboard.writeText(text)
    props.showAlert("Text has been copied in clipboard",'success')
  }
  const handleCutClick =()=>{
    navigator.clipboard.cut(text)
    props.showAlert("Text has been cut in clipboard",'success')
  }
  const handlePasteClick =()=>{
    // const text1=[...text,setText(text)]
    // console.log(text1)
    // navigator.clipboard.readText(text1)
  }

  const handleRemoveExtraSpace =()=>{
    const text1=text.split(/[ ]+/)
    setText(text1.join(" "))
    props.showAlert("Extra spaces from Text has been removed",'success')
  }
  const handleReverseString=()=>{ 
    if (text==='')
    {alert("please first enter text in textbox");}
    else{
    let resultOfReverveString=text.split(' ').reverse().toString().replaceAll(',','');
    setText(resultOfReverveString);
    props.showAlert("Word of the Text has been reversed",'success')
    }
}

  return <>
  <div className="container" style={{color:props.mode==='dark'?'white':'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <label htmlFor="myBox" className="form-label">Example textarea</label>
            <textarea className="form-control" id="myBox" rows={3} value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='dark'?'gray':'light', color:props.mode==='dark'?'white':'black'}}/>
        </div>
        <div className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</div>
        <div className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</div>
        <div className="btn btn-primary mx-1 my-1" onClick={handleDelClick}>Clear Text</div>
        {/* <div className="btn btn-primary mx-1" onClick={handleCutClick}>Cut Text</div> */}
        <div className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy Text</div>
        <div className="btn btn-primary mx-1 my-1" onClick={handlePasteClick}>Paste Text</div>
        <div className="btn btn-primary mx-1 my-1" onClick={handleReverseString}>Reverse words</div>
        <div className="btn btn-primary mx-1 my-1" onClick={handleRemoveExtraSpace}>Remove Extra Space</div>
        

  </div> 
  <div className="container" style={{color:props.mode==='dark'?'white':'black'}}>
    <h2>Your text summery</h2>
    <p>{text.split(".").length} sentances.</p>
    <p>{text.split("").length} words and {text.length} charecters.</p>
    <p>{0.008*text.split("").length} minutes read</p>
    <h3>Preview</h3>
    <p>{(text.length>0?text:"Enter Some Text to Get Preview")}</p>
  </div>
  </>;
};

export default TextForm;
