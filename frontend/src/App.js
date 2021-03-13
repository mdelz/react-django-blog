import React from "react";
import { Link, Route, Switch } from "wouter";
import Post from "./components/Post";
import PostPreviewList from "./components/PostPreviewList";
import "./App.scss";

function Navigation(props) {
  return (
    <nav class="navbar navbar-expand-xl navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Blog Name
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
      </div>
    </nav>
  );
}

function Content(props) {
  return (
    <div className="container">
      <div className="row">
        <Switch>
          <Route path="/about">
            <div>
              <h1>About Page Placeholder</h1>
            </div>
          </Route>
          <Route path="/posts/:slug">
            {(params) => <Post slug={params.slug} key={params.slug} />}
          </Route>
          <Route path="/">
            <PostPreviewList />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
