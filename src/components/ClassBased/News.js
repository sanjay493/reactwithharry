import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';



export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:8,
        category:'general'
      }

      static propsTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string

      }
      
      constructor(){
        super()
        //console.log('i am constructor from News Componenet')
        this.state={
         articles:[],
         loading:false,
         page:1
          }
      }
     async updateNews(){
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7198450ec96349bea7dce10dc7d6a0d4&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData=await data.json()
        
        this.setState({
              articles:parseData.articles,
              totalResults:parseData.totalResults,
              loading:false
          })  

     }
     async componentDidMount(){
        this.updateNews(); 
      }


      handlePrevClick =async ()=>{
        this.setState({page:this.state.page-1});
        this.updateNews();
      }
       handleNextClick =async ()=>{
           this.setState({page:this.state.page+1})  
           this.updateNews();  
    }
  render() {
    //console.log('render')
    return (<div className='container my-3'>
        <h2 className='text-center' >NewsMonkey-Headlines</h2>
       {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return (<div className="col-md-4" key={element.url}>
          <NewsItem 
          title={element.title?element.title.slice(0,45):""} 
          description={element.description?element.description.slice(0,88):""} 
          imageUrl={element.urlToImage} 
          newsUrl={element.url}
          author={element.author}
          date={element.publishedAt}
          source={element.source.name} />
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
