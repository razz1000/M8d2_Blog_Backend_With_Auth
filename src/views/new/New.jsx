import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";


const NewBlogPost = (props) => {
  
  const [formSubmitObject, setFormSubmitObject] = useState({
    category: "",
    title: "", 
    cover: "",
    content: "",
    readTime: {
      value: 1,
      unit: "minute"
    },
    author: {
      name: "",
      avatar: ""
    },
  });
  
  
  const handleChange = (propertyName, targetValue) => {
    setFormSubmitObject({
      ...formSubmitObject,
      [propertyName]: targetValue,
    });
  };
  
  const handleChange2 = (propertyName, targetValue) => {
    setFormSubmitObject({
      ...formSubmitObject,
      author: {
        ...formSubmitObject.author,
        [propertyName]: targetValue,
      },
    });
  };
  

  const handleChange3 = (propertyName, targetValue) => {
    setFormSubmitObject({
      ...formSubmitObject,
      readTime: {
        ...formSubmitObject.readTime,
        [propertyName]: targetValue,
      },
    });
  };
  



  let fetchData = async () => {
    let response = await fetch("http://localhost:3003/blogposts/", {
      method: "POST",
      body: JSON.stringify(formSubmitObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(response.ok) {
      console.log(response)
    }
  }



  let onSubmitFunction = (event) => {
    event.preventDefault()
    fetchData()
  }


  return (
    <Container className="new-blog-container">
      <Form className="mt-5"
        onSubmit={onSubmitFunction}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title"
          value={formSubmitObject.title}
          onChange={(event) => {
            handleChange("title", event.target.value)}} />

        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select"
          onChange={(event) => {
            handleChange("category", event.target.value)}}
            value={formSubmitObject.category}
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label>Blog content</Form.Label>
          <Form.Control as="textarea" rows={8}
          onChange={(event) => {
            handleChange("content", event.target.value)}}
            value={formSubmitObject.content} />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Cover (post a link, please) </Form.Label>
              <Form.Control size="lg" placeholder="Title"
                onChange={(event) => {
                  handleChange("cover", event.target.value)}}
                  value={formSubmitObject.cover}/>

          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Author Name </Form.Label>
              <Form.Control size="lg" placeholder="Title"
                onChange={(event) => {
                  handleChange2("name", event.target.value)}}
                  value={formSubmitObject.author.name}/>

          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Author Avatar (Post a link please) </Form.Label>
              <Form.Control size="lg" placeholder="Title"
                onChange={(event) => {
                  handleChange2("avatar", event.target.value)}}
                  value={formSubmitObject.author.avatar}/>
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Estimated Read time (In Minutes) </Form.Label>
              <Form.Control size="lg" placeholder="Title" type="number"
                onChange={(event) => {
                  handleChange3("value", event.target.value)}}
                  value={formSubmitObject.readTime.value}/>
          </Form.Group>


        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark"
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
