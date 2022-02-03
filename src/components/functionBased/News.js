import React, { useState,useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=>{
  const [articles,setArticles] =useState([])
  const [loading,setLoading] =useState(true)
  const [page,setPage] =useState(1)
  const [totalResults,setTotalResults] =useState(0)
//       
     const capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase()+string.slice(1);
      }
     
     const updateNews =async()=>{
       props.setProgress(10);
        const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page}`;
        setLoading(true)
        let data = await fetch(url);
        console.log(data)
        props.setProgress(30);
        let parseData=await data.json()
        console.log(parseData)
        props.setProgress(70);
        setArticles(parseData.articles)
        setLoading(false)
        setTotalResults(parseData.totalResults)
        props.setProgress(100)
     }

     useEffect(()=>{
      document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`
       updateNews()
     },[])
     


      const handlePrevClick =async ()=>{
        setPage(page-1)
        updateNews();
      }
       const handleNextClick =async ()=>{
         setPage(page+1)
             updateNews();  
    }


    const fetchMoreData = async () => {
       
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page+1}`;
      setPage(page+1)
        let data = await fetch(url);
        let parseData=await data.json()
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
      };
  
    //console.log('render')
    return (<>
        <h2 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}} >NewsMonkey- from {capitalizeFirstLetter(props.category)} Headlines</h2>
       {loading && <Spinner />}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner />}
        >
            <div className="container">
        <div className="row">
        {articles.map((element)=>{
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
          <button disabled={page<=1} type='button' className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>  
          <button disabled={page+1>(Math.ceil(totalResults/props.pageSize))} type='button' className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>  
        </div> */}
    </>);
  
}

News.defaultProps = {
  country: 'in',
  pageSize:8,
  category:'general'
}

News.propsTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

}

export default News