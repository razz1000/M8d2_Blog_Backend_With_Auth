import React, { useState } from "react"
import { Container, Row, Form, Col, Button } from "react-bootstrap"


let NewAuthorPage = () => {
    
    let [formSubmitInfo, setFormSubmitInfo] = useState({
        name: "",
        surname: "",
        email: "",
        date_of_birth: "",
        avatar: ""

    })

    let fetchData = async () => {
        let response = await fetch("http://localhost:3003/authors/", {
            method: "POST",
            body: JSON.stringify(formSubmitInfo),
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

    let handleChangeFunction = (propertyName, targetValue) => {
        setFormSubmitInfo({
            ...formSubmitInfo,
            [propertyName]: targetValue,
        })
    }
  
  
    return ( 
        <Container>
            <Row>
        <Col>
        <h2>Create a new author profile!</h2>
        <Form onSubmit={onSubmitFunction}>
           <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    value={formSubmitInfo.email}
                    onChange={(event) => {
                        handleChangeFunction("email", event.target.value)}}
                     />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
            </Form.Group>

    <Form.Group controlId="formBasicPassword">
             <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Add your name" className="input-field"
            onChange={(event) => {
                handleChangeFunction("name", event.target.value)}}
                value={formSubmitInfo.name} />
            </Form.Group>
          < Form.Group controlId="formBasicPassword">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Add your Surname" className="input-field"
                onChange={(event) => {
                    handleChangeFunction("surname", event.target.value)}}
                    value={formSubmitInfo.surname}
                />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="text" placeholder="Add your date of birth" className="input-field"
            onChange={(event) => {
                handleChangeFunction("date_of_birth", event.target.value)}}
                value={formSubmitInfo.date_of_birth} />
         </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Avatar link</Form.Label>
            <Form.Control type="text" placeholder="Add a link to an avatar you like" className="input-field"
            onChange={(event) => {
                handleChangeFunction("avatar", event.target.value)
            }} />
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