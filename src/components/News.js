import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:8,
    category:"general"
  }
  static propTypes  = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
  }
  constructor() {
    super();
    console.log("Hello I am constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1, // Initialize the page property
      category:"general"
    };
  }
  async componentDidMount() {
    console.log("cmd");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pasrseddata = await data.json();
    console.log(pasrseddata);
    this.setState({
      articles: pasrseddata.articles,
      totalResults: pasrseddata.totalResults,
      loading: false,
    });
  }
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pasrseddata = await data.json();
    console.log(pasrseddata);
    this.setState({
      page: this.state.page - 1,
      articles: pasrseddata.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let pasrseddata = await data.json();
      console.log(pasrseddata);
      this.setState({
        page: this.state.page + 1,
        articles: pasrseddata.articles,
        loading: false,
      });
    }
  };

  render() {
    console.log("render");

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'40px 0px;'}}>Top Headlines </h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 8) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    articles="todo"
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://ichef.bbci.co.uk/news/1024/branded_news/F091/production/_131558516_uawstrike_reuters.jpg"
                    }
                    newsurl={element.url}
                  ></NewsItem>
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            &rarr; Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
