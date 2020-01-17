import React, { useState } from "react";
import { Segment, Header, Grid, Form, Button, Dimmer } from "semantic-ui-react";
import {
  evenDateOptions,
  oddDateOptions,
  februaryDateOptions,
  februaryKabisatDateOptions,
  monthsOptions,
  yearOptions,
  phoneValidator
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

  //Error Message default is 'false' --> No Error Message
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  // Submitted Value
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const [submittedLastName, setSubmittedLastName] = useState("");
  const [submittedGender, setSubmittedGender] = useState("");
  const [submittedDate, setSubmittedDate] = useState("1");
  const [submittedMonth, setSubmittedMonth] = useState("January");
  const [submittedYear, setSubmittedYear] = useState("1970");
  const [submittedEmail, setSubmittedEmail] = useState("");

  // UI Control State
  const [dimmerActive, setDimmerActive] = useState(false);
  const [dateOptionSelect, setDateOptionSelect] = useState(oddDateOptions);

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "phoneNumber":
        setPhoneNumber(value);
        /* let phonePrefix = value.substring(0, 4);
        if (phoneValidator.includes(phonePrefix)) {
          setErrorPhoneNumber(false);
        } else {
          setErrorPhoneNumber({
            content: "Please enter a valid Indonesian phone number",
            pointing: "below"
          });
        } */
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
        handleMonthChange(value);
        return;
      case "date":
        setDate(value);
        return;
      case "year":
        setYear(value);
        handleYearChange(value);
        return;
      case "email":
        setEmail(value);
        return;
      default:
        return;
    }
  };

  const handleMonthChange = monthValue => {
    let yearValue = parseInt(year);
    let yearReminder = yearValue % 4;
    let oddDateMonths = [1, 3, 5, 8, 10, 12];
    let evenDateMonths = [4, 6, 7, 9, 11];
    if (yearValue !== 2 && oddDateMonths.includes(parseInt(monthValue))) {
      setDateOptionSelect(oddDateOptions);
    } else if (
      yearValue !== 2 &&
      evenDateMonths.includes(parseInt(monthValue))
    ) {
      setDateOptionSelect(evenDateOptions);
    }
    if (parseInt(monthValue) === 2 && yearReminder === 0) {
      setDateOptionSelect(februaryKabisatDateOptions);
    }
    if (parseInt(monthValue) === 2 && yearReminder !== 0) {
      setDateOptionSelect(februaryDateOptions);
    }
  };

  const handleYearChange = value => {
    let yearValue = parseInt(value);
    let yearReminder = yearValue % 4;
    let monthValue = parseInt(month);
    let oddDateMonths = [1, 3, 5, 8, 10, 12];
    let evenDateMonths = [4, 6, 7, 9, 11];
    if (yearValue === 2 && yearReminder === 0) {
      setDateOptionSelect(februaryKabisatDateOptions);
    }
    if (yearValue === 2 && yearReminder !== 0) {
      setDateOptionSelect(februaryDateOptions);
    }
    if (yearValue !== 2 && oddDateMonths.includes(parseInt(monthValue))) {
      setDateOptionSelect(oddDateOptions);
    } else if (
      yearValue !== 2 &&
      evenDateMonths.includes(parseInt(monthValue))
    ) {
      setDateOptionSelect(evenDateOptions);
    }
    if (parseInt(monthValue) === 2 && yearReminder === 0) {
      setDateOptionSelect(februaryKabisatDateOptions);
    }
    if (parseInt(monthValue) === 2 && yearReminder !== 0) {
      setDateOptionSelect(februaryDateOptions);
    }
  };

  const handleSubmit = () => {
    // Phone Number Validator
    let phonePrefix = phoneNumber.substring(0, 4);
    if (phoneNumber === "") {
      setErrorPhoneNumber({
        content: "Phone number is required",
        pointing: "below"
      });
    } else {
      if (phoneValidator.includes(phonePrefix)) {
        setErrorPhoneNumber(false);
      } else {
        setErrorPhoneNumber({
          content: "Please enter a valid Indonesian phone number",
          pointing: "below"
        });
      }
    }

    // First Name Validator
    if (firstName === "") {
      setErrorFirstName({
        content: "First name is required",
        pointing: "below"
      });
    } else {
      setErrorFirstName(false);
    }

    // Last Name Validator
    if (lastName === "") {
      setErrorLastName({
        content: "Last name is required",
        pointing: "below"
      });
    } else {
      setErrorLastName(false);
    }

    // Email Validator
    if (email === "") {
      setErrorEmail({
        content: "Email is required",
        pointing: "below"
      });
    } else {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validEmail = re.test(String(email).toLowerCase());
      console.log("Valid email = ", validEmail);
      if (validEmail === false) {
        setErrorEmail({
          content: "Please enter a valid email address",
          pointing: "below"
        });
      } else {
        setErrorEmail(false);
      }
    }
  };

  return (
    <div>
      <Segment>
        <Header as="h2">Registration</Header>
        <Form>
          <Dimmer active={dimmerActive} />
          <Form.Input
            error={errorPhoneNumber}
            fluid
            required
            placeholder="Mobile Number"
            id="form-input-mobile-number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <Form.Input
            error={errorFirstName}
            fluid
            required
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <Form.Input
            error={errorLastName}
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
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  name="date"
                  options={dateOptionSelect}
                  placeholder="Date"
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Select
                  name="year"
                  options={yearOptions}
                  placeholder="Year"
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
            error={errorEmail}
            fluid
            required
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </Form>
        <br />
        <Button onClick={handleSubmit}>Register</Button>
        <br />
        <strong>onChange:</strong>
        <pre>
          {JSON.stringify(
            {
              phoneNumber,
              firstName,
              lastName,
              gender,
              month,
              date,
              year,
              email
            },
            null,
            8
          )}
        </pre>
      </Segment>
    </div>
  );
}

export default Registration;
