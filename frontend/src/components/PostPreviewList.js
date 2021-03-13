import { Component } from "react";
import { Link } from "wouter";
import Tag from "./Tag";
import axios from "axios";
import PropTypes from "prop-types";
import "./PostPreviewList.scss";

function PostPreviewContent(props) {
  return (
    <div className={"card-body " + props.className}>
      <div className="card-meta">
        {props.post.tags.map((tag, i) => (i < 4 ? <Tag label={tag} /> : null))}
        <small className="post-date float-right">
          {props.post.publish_date}
        </small>
      </div>
      <h5 className="card-title mt-1">{props.post.title}</h5>
      <p className="card-text">{props.post.preview}</p>
    </div>
  );
}

PostPreviewContent.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
};
PostPreviewContent.defaultProps = {
  className: "",
};

function PostPreview(props) {
  return (
    <div className="col-12 col-xl-6 p-3">
      <div className="card card-common">
        <Link href={"/posts/" + props.post.slug}>
          <a className="stretched-link">
            <div className="row no-gutters">
              <div className="card-img col-xl-4 col-sm-4 col-lg-2 col-3">
                <img src={props.post.thumbnail} alt="Thumbnail image" />
              </div>
              <PostPreviewContent
                post={props.post}
                className="position-static col-xl-8 col-sm-8 col-lg-10 col-9 p-3"
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

function PostPreviewPremium(props) {
  return (
    <div className="col-12 position-relative">
      <div className="card card-premium">
        <img
          src={props.post.banner}
          className="card-img"
          alt="Thumbnail image"
        />
        <Link href={"/posts/" + props.post.slug}>
          <a className="stretched-link">
            <div className="card-img-overlay">
              <PostPreviewContent post={props.post} />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

class PostPreviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/v1/posts/")
      .then((res) => this.setState({ posts: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="mt-3 PostPreviews">
        <div className="row">
          {this.state.posts.map((post, i) =>
            i > 0 ? (
              <PostPreview post={post} />
            ) : (
              <PostPreviewPremium post={post} />
            )
          )}
        </div>
      </div>
    );
  }
}

export default PostPreviewList;
