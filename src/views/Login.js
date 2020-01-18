import React, { useState } from "react";
import {
  Segment,
  Header,
  Form,
  Button,
  Accordion,
  Icon
} from "semantic-ui-react";
import ReactJson from 'react-json-view';
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./Registration.css";

function Login() {
  // Initial Value
  const [databaseContent, setDatabaseContent] = useState({});

  // UI Control State
  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  const getAllUsers = () => {
    axios
      .get(
        "http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/users"
      )
      .then(res => {
        setDatabaseContent(res.data);
      })
      .catch(err => {
        console.log("Error: ", err);
        setDatabaseContent(err);
      });
  };

  return (
    <div style={{marginLeft:"15%", marginRight: "15%", marginTop: "5%"}}>
      <Segment>
        <Header as="h2">Login Page</Header>
        <Form>
          <Form.Input
            fluid
            required
            placeholder="Mobile Number"
            id="form-input-mobile-number"
            name="phoneNumber"
          />

          <Form.Input
            fluid
            required
            placeholder="Email"
            name="email"
          />
          <br />
          <Button fluid color="purple">
            Login
          </Button>
        </Form>
        <br />
      </Segment>
      <Segment>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Developer Notes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            I assume the coding test end here based on pptx document given on email.
          </p>
          <Button fluid color="purple" onClick={getAllUsers}>
            Click to View Database Content
          </Button>
          <ReactJson src={databaseContent} />
        </Accordion.Content>
      </Accordion>
      </Segment>
    </div>
  );
}

export default Login;
