import { Component } from "react";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Post.scss";

function MarkdownTextColumn(props) {
  return (
    <p className={"col-md-" + props.textWidth}>
      <ReactMarkdown
        plugins={[gfm]}
        children={props.data.text}
        renderers={props.renderers}
      />
    </p>
  );
}

class Section extends Component {
  renderers = {
    image: ({ alt, src }) => {
      return <img alt={alt} src={src} />;
    },
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          children={value}
        />
      );
    },
  };

  renderContent() {
    switch (this.props.section.type) {
      case "Text":
        return (
          <MarkdownTextColumn
            textWidth="12"
            data={this.props.section}
            renderers={this.renderers}
          />
        );
      case "Image":
        return <img src={this.props.section.image} />;
      default:
        return null;
    }
  }

  render() {
    return <div className="row m-3">{this.renderContent()}</div>;
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
    };
  }

  componentDidMount() {
    if ("slug" in this.props) {
      this.loadPost(this.props.slug);
    }
  }

  loadPost = (slug) => {
    axios
      .get("/api/posts/" + slug)
      .then((res) => this.setState({ post: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.post == null) {
      return <span className="fas fa-spinner" />;
    }
    return (
      <div className="container-fluid Post">
        <h1 className="m-3 mb-5 p-3 display-5">{this.state.post.title}</h1>
        {this.state.post.sections.map((section, i) => (
          <Section section={section} />
        ))}
      </div>
    );
  }
}

function PostPreview(props) {
  return (
    <div className="col-6 p-3">
      <div className="card">
        <div className="row no-gutters position-relative">
          <img
            src={props.post.thumbnail}
            className="card-img-top col-5"
            alt="Thumbnail image"
          />
          <div className="card-body position-static col-7 p-3">
            <small className="text-muted card-text float-right">
              {props.post.publish_date}
            </small>
            <h5 className="card-title mt-3">
              <Link href={"/posts/" + props.post.slug}>
                <a className="stretched-link">{props.post.title}</a>
              </Link>
            </h5>
            <p className="card-text">{props.post.preview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostPreviewPremium(props) {
  return (
    <div className="card bg-dark text-white col-12">
      <Link href={"/posts/" + props.post.slug}>
        <a>
          <img
            src={props.post.banner}
            className="card-img"
            alt="Thumbnail image"
          />
          <div className="card-img-overlay">
            <h5 className="card-title">{props.post.title}/</h5>
            <p className="card-text">{props.post.preview}</p>
            <p className="card-text">
              <small className="text-muted">{props.post.publish_date}</small>
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}

class PostList extends Component {
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
      .get("/api/posts/")
      .then((res) => this.setState({ posts: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container-fluid m-3 PostPreviews">
        <div className="row">
          {this.state.posts.map(
            (post, i) => (
              <PostPreview post={post} />
            )
            //   i > 0 ? (
            //     <PostPreview post={post} />
            //   ) : (
            //     <PostPreviewPremium post={post} />
            //   )
          )}
        </div>
      </div>
    );
  }
}

export { Post, PostList };
