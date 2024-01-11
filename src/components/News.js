import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizaFirstLatter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hello I am constructor from news component");
    this.state = {
      articles: [], // Initialize articles as an empty array
      // articles: this.articles,
      loading: true,
      page: 1, // Initialize the page property
      category: "general",
      totalResults: 0,
    };
    document.title = `${this.capitalizaFirstLatter(
      this.props.category
    )}- NewsMonkey`;
  }
  async UpdateNews() {
    console.log("UpdateNewscmd");
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let pasrseddata = await data.json();
    console.log(pasrseddata);
    this.props.setProgress(50);

    this.setState({
      articles: pasrseddata.articles,
      totalResults: pasrseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    console.log("cmd");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let pasrseddata = await data.json();
    // console.log(pasrseddata);
    // this.setState({
    //   articles: pasrseddata.articles,
    //   totalResults: pasrseddata.totalResults,
    //   loading: false,
    // });
    this.UpdateNews();
  }
  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let pasrseddata = await data.json();
    // console.log(pasrseddata);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: pasrseddata.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });

    this.UpdateNews();
  };
  handleNextClick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57e1aed4cbb946be91d242fc02bf1400&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let pasrseddata = await data.json();
    //   console.log(pasrseddata);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: pasrseddata.articles,
    //     loading: false,
    //   });
    // }

    this.setState({ page: this.state.page + 1 });
    this.UpdateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1, loading: true });
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };
  

  render() {
    console.log("render");

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          NewsMonkey - Top {this.capitalizaFirstLatter(this.props.category)}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles &&
                this.state.articles.map((element,index) => {
                  return (
                    <div className="col-md-3" key={`${element.url}-${index}`}>
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
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      ></NewsItem>
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
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
        </div> */}
      </>
    );
  }
}

export default News;
