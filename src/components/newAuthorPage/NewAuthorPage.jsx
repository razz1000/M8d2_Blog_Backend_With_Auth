import React, { useState } from "react"
import { Container, Row, Form, Col, Button } from "react-bootstrap"

let NewAuthorPage = () => {
  
    let [formSubmitInfo, setFormSubmitInfo] = useState([])

    let onSubmitFunction = (event) => {
        event.preventDefault()
        setFormSubmitInfo(event.target.parentElement.querySelector(".input-field").value)
        console.log(event.target.parentElement.querySelector(".input-field").value) 
        
    }
  
  
    return ( 
        <Container>
            <Row>
        <Col>
        <h2>Create a new author profile!</h2>
        <Form onSubmit={onSubmitFunction}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Add your name" className="input-field" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Surname</Form.Label>
    <Form.Control type="text" placeholder="Add your Surname" className="input-field" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Date of Birth</Form.Label>
    <Form.Control type="text" placeholder="Add your date of birth" className="input-field" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Avatar link</Form.Label>
    <Form.Control type="text" placeholder="Add a link to an avatar you like" className="input-field" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="I am ok with recieving promotional emails after I have signed up." />
  </Form.Group>
  <Button variant="primary" type="submit"
  /* onSubmit={(event) => {
    event.preventDefault()
    console.log(event.target.parentElement.querySelector(".input-field").value)
  }} */>
    Submit
  </Button>
</Form>
        </Col>
        </Row>
        </Container>
    )
}

export default NewAuthorPage