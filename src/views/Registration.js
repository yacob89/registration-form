import React, { useState } from "react";
import { Segment, Header, Grid, Form, Input, Button } from "semantic-ui-react";
import {
  evenDateOptions,
  oddDateOptions,
  februaryDateOptions,
  februaryKabisatDateOptions,
  monthsOptions,
  yearOptions
} from "../utils/Options";
import "semantic-ui-css/semantic.min.css";
import "./Registration.css";

function Registration() {
  // Initial Value
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [date, setDate] = useState("1");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("1970");
  const [email, setEmail] = useState("");

  // Submitted Value
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const [submittedLastName, setSubmittedLastName] = useState("");
  const [submittedGender, setSubmittedGender] = useState("");
  const [submittedDate, setSubmittedDate] = useState("1");
  const [submittedMonth, setSubmittedMonth] = useState("January");
  const [submittedYear, setSubmittedYear] = useState("1970");
  const [submittedEmail, setSubmittedEmail] = useState("");

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
      case "month":
        setMonth(value);
        return;
      case "date":
        setDate(value);
        return;
      case "year":
        setYear(value);
        return;
      case "email":
        setEmail(value);
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
                <Form.Select
                  name="month"
                  options={monthsOptions}
                  placeholder="Month"
                  error
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  name="date"
                  options={oddDateOptions}
                  placeholder="Date"
                  error
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  name="year"
                  options={yearOptions}
                  placeholder="Year"
                  error
                  onChange={handleChange}
                />
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

          <Form.Input
            error={{
              content: "Please enter your email",
              pointing: "below"
            }}
            fluid
            required
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <Form.Button>Register</Form.Button>
        </Form>
        <strong>onChange:</strong>
        <pre>
          {JSON.stringify(
            { phoneNumber, firstName, lastName, gender, month, date, year, email },
            null,
            8
          )}
        </pre>
      </Segment>
    </div>
  );
}

export default Registration;
