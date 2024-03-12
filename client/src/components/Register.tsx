import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Container, Row, Col, Form, FormGroup, Input, Button, Label } from "reactstrap";
import "./style.css";
import { User } from "./utils/interfaces";
import { useAppDispatch } from "./utils/store";
import { registerUser } from "./utils/actions/authActions";

type RegisterUser = User & {
  emailAddress: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
};

/**
 * Register component.
 * This component is a form that allows users to create an account.
 * @constructor
 */
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterUser>({
      username: "",
      emailAddress: "",
      password: "",
      birthYear: "",
      birthMonth: "",
      birthDay: ""
  });
  // ReadOnly attribute can prevent browsers from auto-filling the form
  const [readOnly, setReadOnly] = useState<boolean>(true);

  /**
   * Handle the form change event.
   * Info will be stored in the userData object.
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setUserData({
          ...userData,
          [e.target.name]: e.target.value
      });
  };

  /**
   * Handle the form submit event.
   * Dispatch the registerUser action which emits a register event to the server.
   * @param e
   */
  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch(registerUser(userData, navigate));
  }

  // Create an array of years from 100 years ago to the current year
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 100; i++) {
      years.push(currentYear - i);
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="vh-100 vw-100 overflow-hidden d-flex justify-content-center" style={{ backgroundColor: "rgba(71, 82, 196)" }}>
      <Card className="px-3 py-2 m-auto rounded-1" style={{ backgroundColor: "rgba(49,51,56)" }} inverse>
        <CardBody className="text-center">
          <CardTitle tag="h4" className="fw-bold mb-3" style={{ color: "rgba(242,243,245)" }}>Create an Account</CardTitle>
        </CardBody>

        <CardBody className="pt-1">
          <CardText>
            <Form onSubmit={ handleSubmit }>
              <FormGroup>
                <Label for="emailAddress" className="fw-bolder" style={{ color: "rgba(160,164,171)", fontSize: "12px" }}>
                    Email Address<span className="ps-1 text-danger">*</span>
                </Label>
                <Input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  readOnly={ readOnly }
                  onFocus={ () => setReadOnly(false) }
                  className="mb-3 rounded-1 input-text-color"
                  style={{ backgroundColor: "rgba(30,31,34)", border: "none", width: "396px", outline: "none" }}
                  value={ userData.emailAddress }
                  onChange={ handleChange }
                  required
                />

                <Label for="username" className="fw-bolder" style={{ color: "rgba(160,164,171)", fontSize: "12px" }}>
                    Username<span className="ps-1 text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  readOnly={ readOnly }
                  onFocus={ () => setReadOnly(false) }
                  className="mb-3 rounded-1 input-text-color"
                  style={{ backgroundColor: "rgba(30,31,34)", border: "none", width: "396px", outline: "none" }}
                  value={ userData.username }
                  onChange={ handleChange }
                  required
                />

                <Label for="password" className="fw-bolder" style={{color: "rgba(160,164,171)", fontSize: "12px"}}>
                    Password<span className="ps-1 text-danger">*</span>
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  readOnly={ readOnly }
                  onFocus={ () => setReadOnly(false) }
                  className="rounded-1 mb-3 input-text-color"
                  style={{ backgroundColor: "rgba(30,31,34)", border: "none", outline: "none" }}
                  value={ userData.password }
                  onChange={ handleChange }
                  required
                />

                <Label
                  for="birthday"
                  className="fw-bolder"
                  style={{color: "rgba(160,164,171)", fontSize: "12px"}}
                >
                  Birthday<span className="ps-1 text-danger">*</span>
                </Label>

                <Container fluid>
                  <Row xs="3">
                    <Col className="ps-0 pe-1">
                      <Input
                        type="select"
                        name="birthYear"
                        id="birthYear"
                        title="Year"
                        readOnly={ readOnly }
                        onFocus={ () => setReadOnly(false) }
                        className="rounded-1 mb-2 input-text-color"
                        style={{ backgroundColor: "rgba(30,31,34)", border: "none" }}
                        value={ userData.birthYear }
                        onChange={ handleChange }
                        required
                      >
                        { years.map(year => (
                          <option key={ year } style={{ color: "rgba(117,122,129)" }}>{ year }</option>
                        )) }
                      </Input>
                    </Col>

                    <Col className="px-1">
                      <Input
                        type="select"
                        name="birthMonth"
                        id="birthMonth"
                        title="Month"
                        readOnly={ readOnly }
                        onFocus={ () => setReadOnly(false) }
                        className="rounded-1 mb-2 input-text-color"
                        style={{ backgroundColor: "rgba(30,31,34)", border: "none" }}
                        value={ userData.birthMonth }
                        onChange={ handleChange }
                        required
                      >
                        { months.map(month => (
                          <option key={ month } style={{ color: "rgba(117,122,129)" }}>{ month }</option>
                        )) }
                      </Input>
                    </Col>

                    <Col className="ps-1 pe-0">
                      <Input
                        type="select"
                        name="birthDay"
                        id="birthDay"
                        title="Day"
                        readOnly={ readOnly }
                        onFocus={ () => setReadOnly(false) }
                        className="rounded-1 mb-2 input-text-color"
                        style={{ backgroundColor: "rgba(30,31,34)", border: "none" }}
                        value={ userData.birthDay }
                        onChange={ handleChange }
                        required
                      >
                        { Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={ day } style={{ color: "rgba(117,122,129)" }}>{ day }</option>
                        )) }
                      </Input>
                    </Col>
                  </Row>
                </Container>
                </FormGroup>

                <Button type="submit" className="py-2 rounded-1" style={{ backgroundColor: "rgba(71,82,196)", fontSize: "16px", border: "none", width: "100%" }}>
                  Register
                </Button>

                <a href="/login" className="mt-1" style={{ color: "rgba(9,147,217)", textDecoration: "none", fontSize: "14px" }}>Already have an account?</a>
            </Form>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
