import React, { useState } from "react";
import { Segment, Header, Grid, Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Registration.css";

function Registration() {
  // Initial Value
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");

  // Submitted Value
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const [submittedLastName, setSubmittedLastName] = useState("");
  const [submittedGender, setSubmittedGender] = useState("");

  const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" }
  ];

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "phoneNumber":
        setPhoneNumber(value);
        return;
      case "firstName":
        setFirstName(value);
        return;
      case "lastName":
        setLastName(value);
        return;
        case "gender":
            setGender(value);
            return;
      default:
        return;
    }
  };

  return (
    <div>
      <Segment>
        <Header as="h2">Registration</Header>
        <Form>
          <Form.Input
            error={{
              content: "Please enter a valid Indonesian phone number",
              pointing: "below"
            }}
            fluid
            required
            placeholder="Mobile Number"
            id="form-input-mobile-number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <Form.Input
            error={{
              content: "Please enter your first name",
              pointing: "below"
            }}
            fluid
            required
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <Form.Input
            error={{
              content: "Please enter your last name",
              pointing: "below"
            }}
            fluid
            required
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
          <br />
          <Grid columns={3}>
            <label>Date of Birth</label>
            <Grid.Row>
              <Grid.Column>
                <Form.Select options={options} placeholder="Month" error />
              </Grid.Column>
              <Grid.Column>
                <Form.Select options={options} placeholder="Date" error />
              </Grid.Column>
              <Grid.Column>
                <Form.Select options={options} placeholder="Year" error />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <Form.Group inline>
            <Form.Radio
              label="Male"
              value="male"
              name="gender"
              checked={gender === "male"}
              onChange={() => {
                setGender("male");
              }}
            />
            <Form.Radio
              label="Female"
              value="female"
              name="gender"
              checked={gender === "female"}
              onChange={() => {
                setGender("female");
              }}
            />
          </Form.Group>

          <Form.Button>Register</Form.Button>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ phoneNumber, firstName, lastName, gender }, null, 4)}</pre>
      </Segment>
    </div>
  );
}

export default Registration;
