import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import NewAuthorPage from "../../components/newAuthorPage/NewAuthorPage";
import "./styles.css";

const Home = (props) => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>
      <BlogList />
      <NewAuthorPage />
    </Container>
  );
};

export default Home;
