import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export default class News extends Component {
   
      
      constructor(){
        super()
        //console.log('i am constructor from News Componenet')
        this.state={
         articles:[],
         loading:false,
         page:1
          }
      }

     async componentDidMount(){
         // console.log('cdm')
          let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=7198450ec96349bea7dce10dc7d6a0d4&pageSize=${this.props.pageSize}&page=1`;
          this.setState({loading:true})
          let data = await fetch(url);
          let parseData=await data.json()
          
          this.setState({
                articles:parseData.articles,
                totalResults:parseData.totalResults,
                loading:false
            })
      }


      handlePrevClick =async ()=>{
        //console.log('Prev')

        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=7198450ec96349bea7dce10dc7d6a0d4&pageSize=${this.props.pageSize}&page=${this.state.page-1}`;
        this.setState({loading:true})  
        let data = await fetch(url);
          let parseData=await data.json()
       
        this.setState({
            page:this.state.page-1,
            articles:parseData.articles,
            loading:false            
        })
      }
       handleNextClick =async ()=>{
        //    console.log(this.state.totalResults)
        //    console.log((this.state.totalResults/this.props.pageSize))
        //    console.log(this.state.page+1)
        //    console.log((this.state.page+1>=Math.ceil(this.state.totalResults/this.props.pageSize)))
           if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=7198450ec96349bea7dce10dc7d6a0d4&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parseData=await data.json()         
            this.setState({
                page:this.state.page+1,
                articles:parseData.articles,
                loading:false            
            })
           }
           //console.log(this.state.page)     
    }
  render() {
    //console.log('render')
    return (<div className='container my-3'>
        <h2 className='text-center'>NewsMonkey-Headlines</h2>
       {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return (<div className="col-md-4" key={element.url}>
          <NewsItem 
          title={element.title?element.title.slice(0,45):""} 
          description={element.description?element.description.slice(0,88):""} 
          imageUrl={element.urlToImage} 
          newsUrl={element.url}/>
      </div>)
      
        })}
           
            
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>  
          <button disabled={this.state.page+1>(Math.ceil(this.state.totalResults/this.props.pageSize))} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  
        </div>
    </div>);
  }
}
