import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsurl, author, date ,source} = this.props;
    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'90%'}}>
                {source}
                <span class="visually-hidden">unread messages</span>
              </span>
            <h5 className="card-title">
              {title}
             
            </h5>
            <p className="card-text">
              <p class="card-text">
                <small class="text-muted">
                  By {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toUTCString()}
                </small>
              </p>
              {description}...
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
