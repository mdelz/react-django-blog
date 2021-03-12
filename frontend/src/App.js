import React from "react";
import { Link, Route, Switch } from "wouter";
import Post from "./components/Post";
import PostPreviewList from "./components/PostPreviewList";
import "./App.scss";

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
          <Route path="/posts/:slug">
            {(params) => <Post slug={params.slug} />}
          </Route>
          <Route path="/">
            <PostPreviewList />
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
