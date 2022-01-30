import React, { Component } from 'react';

export default class NewsItem extends Component {
  
  render() {
      let {title,description,imageUrl,newsUrl}=this.props
    return (<div className='my-3'>
        
        <div className="card" style={{width:'18rem'}}>
         <img src={imageUrl} alt="" className="card-img-top" />
         <div className="card-body">
             <h5 className="card-title">{title}...</h5>
             <p className="card-text">{description}...</p>
             <a href={newsUrl} rel='noreferrer' target='_blank' className='btn btn-primary'>Read More</a>
         </div>
        </div>
    </div>);
  }
}
