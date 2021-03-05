import React from "react";
import { Link, Route, Switch } from "wouter";
import { Post, PostList } from "./components/Post";
import "./App.scss";

const examplePosts = [
  {
    id: 3,
    title: "Example post",
    slug: "example",
    publish_date: "2021-03-05",
    preview: "Some example text",
    thumbnail:
      "http://127.0.0.1:8000/media/posts/thumbnails/codecode-270_2mK8M9X.png",
    banner:
      "http://127.0.0.1:8000/media/posts/banner/codecode-1080_fT2hW4R.png",
    tags: ["JavaScript"],
  },
  {
    id: 2,
    title: "Building a React.js Blog with Django Backend",
    slug: "react-django-blog",
    publish_date: "2021-03-04",
    preview:
      "At work we moved from to React.js for our web-frontends. I was always more focussed on the backend part of the stack, but I wanted to stay up to date with the technology we use, that is why I decided to write this blog using React.",
    thumbnail: null,
    banner: null,
    tags: ["Django", "JavaScript", "Python", "React"],
  },
];

const examplePost = {
  id: 2,
  title: "Building a React.js Blog with Django Backend",
  keywords: "React.js, Django, Blog",
  slug: "react-django-blog",
  updated: "2021-03-05T00:50:42.580812Z",
  publish_date: "2021-03-05",
  banner: null,
  post_category: "Programming",
  tags: ["Django", "JavaScript", "Python", "React"],
  sections: [
    {
      id: 1,
      order: 1,
      type: "Text",
      image: null,
      video: "",
      text:
        "## The Beginning\r\n\r\nHere at the start I'll introduce you into why I wrote this blog website in React.js with a Django backend [Google](https://google.com).",
    },
    {
      id: 1,
      order: 2,
      type: "Text",
      image: null,
      video: "",
      text:
        "## The more in-depth look\r\n\r\nIn the second section I'll go deeper into how I did the implementataion `some inline code`.\r\n\r\n``` python\ndef function():\n    pass\n```",
    },
  ],
};

function Navigation(props) {
  return (
    <ul className="nav justify-content-start">
      <li class="nav-item">
        <Link href="/">
          <a class="nav-link">News</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link href="/categories">
          <a class="nav-link">Categories</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link href="/about">
          <a class="nav-link">About</a>
        </Link>
      </li>
      <li class="nav-item">
        <Link href="/posts/example">
          <a class="nav-link">Example</a>
        </Link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          href="#"
          tabindex="-1"
          aria-disabled="true"
        >
          Login
        </a>
      </li>
    </ul>
  );
}

function Content(props) {
  return (
    <div className="row">
      <div className="col-sm-6 col-md-2"></div>
      <div className="col-sm-12 col-md-8">
        <Switch>
          <Route path="/about">
            <div>
              <h1>About Page Placeholder</h1>
            </div>
          </Route>
          <Route path="/posts/example">
            <Post post={examplePost} />
          </Route>
          {/* <Route path="/posts/:slug">
            {(params) => <Post slug={params.slug} />}
          </Route> */}
          <Route path="/">
            <PostList />
          </Route>
        </Switch>
      </div>
      <div className="col-sm-6 col-md-2"></div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Navigation />
      <div className="container-fluid">
        <Content />
      </div>
    </div>
  );
}

export default App;
