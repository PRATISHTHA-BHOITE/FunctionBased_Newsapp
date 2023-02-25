import { React, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect } from 'react';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState([true])
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)



    const capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        let Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=
        ${props.pageSize}`;
        setLoading(true);
        let data = await fetch(Url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstletter(props.category)}- newsapp`
        updateNews();
    }, [])


    const fetchMoreData = async () => {

        let Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=$page}&pageSize=
        ${props.pageSize}`;
        setPage(page + 1)
        setLoading(true);
        let data = await fetch(Url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setLoading(false);
    }


    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News app - Top {capitalizeFirstletter(props.category)}  headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}

                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">


                    <div className="row">
                        {articles?.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : "null"} description={element.description ? element.description : "null"}
                                    imageUrl={element.urlToImage} newsUrl={element.url}
                                    author={element.author} date={element.publishedAt} source={element.source.name}
                                />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>


        </>
    )
}

News.propTypes = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}



export default News
