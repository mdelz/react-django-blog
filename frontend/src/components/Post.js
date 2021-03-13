import { Component } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Post.scss";

function MarkdownTextColumn(props) {
  return (
    <p className={"border-bottom col-md-" + props.cols}>
      <ReactMarkdown
        plugins={[gfm]}
        children={props.data.text}
        renderers={props.renderers}
      />
    </p>
  );
}

function ImageColumn(props) {
  return (
    <div className={"col-md-" + props.cols}>
      <img src={props.src} className="img-full" />
    </div>
  );
}

class Section extends Component {
  renderers = {
    image: ({ alt, src }) => {
      return <img alt={alt} src={src} className="img-inline" />;
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
            cols="12"
            data={this.props.section}
            renderers={this.renderers}
          />
        );
      case "Image":
        return <ImageColumn src={this.props.section.image} cols="12" />;
      default:
        return null;
    }
  }

  render() {
    return <div className="row p-3 Section">{this.renderContent()}</div>;
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    if ("slug" in this.props) {
      this.loadPost(this.props.slug);
    }
  }

  loadPost = (slug) => {
    this.setState({ post: null });
    axios
      .get("/api/v1/posts/" + slug)
      .then((res) => this.setState({ post: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.post == null) {
      return (
        <div className="container-fluid Post">
          <span className="fas fa-spinner" />
        </div>
      );
    }
    return (
      <div className="container-fluid Post mt-5 mb-5 p-5">
        <h1 className="mb-3 p-3 display-4">{this.state.post.title}</h1>
        {this.state.post.sections.map((section, i) => (
          <Section section={section} />
        ))}
      </div>
    );
  }
}

export default Post;
