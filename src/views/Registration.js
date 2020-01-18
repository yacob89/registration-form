import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Grid,
  Form,
  Button,
  Dimmer,
  Label
} from "semantic-ui-react";
import {
  evenDateOptions,
  oddDateOptions,
  februaryDateOptions,
  februaryKabisatDateOptions,
  monthsOptions,
  yearOptions,
  phoneValidator
} from "../utils/Options";
import axios from "axios";
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

  // UI Control State
  const [dimmerActive, setDimmerActive] = useState(false);
  const [loginDimmerActive, setLoginDimmerActive] = useState(false);
  const [dateOptionSelect, setDateOptionSelect] = useState(oddDateOptions);
  const [loginButtonVisible, setLoginButtonVisible] = useState("none");

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
      // eslint-disable-next-line
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

    if (
      !errorPhoneNumber &&
      !errorFirstName &&
      !errorLastName &&
      !errorEmail &&
      phoneNumber !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      email !== ""
    ) {
      //postRegistration();
      checkAvailableEmail();
    }
  };

  const postRegistration = () => {
    let dateString = year + "-" + month + "-" + date;
    axios
      .post(
        "http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/users",
        {
          phone_number: phoneNumber,
          first_name: firstName,
          last_name: lastName,
          birth_date: dateString,
          gender: gender,
          email: email
        }
      )
      .then(res => {
        console.log("Response from server: ", res);
        setDimmerActive(false);
        setLoginDimmerActive(true);
        setLoginButtonVisible("inline-block");
      })
      .catch(error => {
        console.log("Error: ", error);
        setDimmerActive(false);
      });
  };

  const checkAvailableEmail = () => {
    setDimmerActive(true);
    axios
      .get(
        "http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/emails"
      )
      .then(res => {
        let emails = res.data.values;
        let emailRows = [];
        let i;
        for (i = 0; i < emails.length; i++) {
          emailRows.push(emails[i].email);
        }
        if (emailRows.includes(email)) {
          setErrorEmail({
            content:
              "Email '" +
              email +
              "' is already exist. Enter another email address",
            pointing: "below"
          });
          setDimmerActive(false);
        } else {
          checkAvailablePhoneNumber();
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        setDimmerActive(false);
      });
  };

  const checkAvailablePhoneNumber = () => {
    axios
      .get(
        "http://mitraisserver-env.tecyp2skhk.us-east-2.elasticbeanstalk.com/mobiles"
      )
      .then(res => {
        let mobiles = res.data.values;
        let mobileRows = [];
        let i;
        for (i = 0; i < mobiles.length; i++) {
          mobileRows.push(mobiles[i].phone_number);
        }
        if (mobileRows.includes(phoneNumber)) {
          setErrorPhoneNumber({
            content:
              "Phone number '" +
              phoneNumber +
              "' is already exist. Enter another phone number",
            pointing: "below"
          });
          setDimmerActive(false);
        } else {
          postRegistration();
        }
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  return (
    <div style={{ marginLeft: "15%", marginRight: "15%", marginTop: "5%" }}>
      <Segment>
        <Dimmer active={loginDimmerActive}>
          <Label color={"purple"}>Registration Completed!</Label>
        </Dimmer>
        <Header as="h2">Registration</Header>
        <Form>
          <Dimmer active={dimmerActive}>
            <Label color={"purple"}>Loading...</Label>
          </Dimmer>
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
          <br />
          <Button fluid color="purple" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
        <br />
      </Segment>
      <Segment style={{ display: loginButtonVisible, width: "100%" }}>
        <Button as={Link} to="/login" fluid color="purple">
          Login
        </Button>
      </Segment>
    </div>
  );
}

export default Registration;
