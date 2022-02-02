import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



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
      capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase()+string.slice(1);
      }
      constructor(props){
        super(props)
        //console.log('i am constructor from News Componenet')
        this.state={
         articles:[],
         loading:true,
         page:1,
         totalResults:0
          }
      document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
      }
     async updateNews(){
       this.props.setProgress(10);
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
       this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData=await data.json()
        this.props.setProgress(70);
        this.setState({
              articles:parseData.articles,
              totalResults:parseData.totalResults,
              loading:false
          })  
      this.props.setProgress(100)
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


    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        
        let data = await fetch(url);
        let parseData=await data.json()
        
        this.setState({
              articles:this.state.articles.concat(parseData.articles),
              totalResults:parseData.totalResults,
            
          }) 
      };
  render() {
    //console.log('render')
    return (<>
        <h2 className='text-center' >NewsMonkey- from {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
       {this.state.loading && <Spinner />}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
            <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
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
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>  
          <button disabled={this.state.page+1>(Math.ceil(this.state.totalResults/this.props.pageSize))} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  
        </div> */}
    </>);
  }
}
