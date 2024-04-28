import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Form, FormGroup, Input, Button, Label } from 'reactstrap'
import './style.css'
import { User } from '../types/interfaces'
import { useAppDispatch } from '../redux/store'
import { loginUser } from '../redux/actions/authActions'

type LoginUser = Pick<User, 'username' | 'password'>

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [userData, setUserData] = useState<LoginUser>({
    username: '',
    password: '',
  })

  /**
   * Handle the form change event.
   * Info will be stored in the userData object.
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Handle the form submit event.
   * Dispatch the loginUser action which emits a login event to the server.
   * @param e
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(loginUser(userData, navigate))
  }

  return (
    <div
      className="vh-100 vw-100 overflow-hidden d-flex justify-content-center"
      style={{ backgroundColor: 'rgba(71, 82, 196)' }}>
      <Card className="px-3 py-2 m-auto rounded-1" style={{ backgroundColor: 'rgba(49,51,56)' }} inverse>
        <CardBody className="text-center">
          <CardTitle tag="h4" className="fw-bold mb-3" style={{ color: 'rgba(242,243,245)' }}>
            Welcome Back!
          </CardTitle>
          <CardSubtitle tag="h6" className="mx-2" style={{ color: 'rgba(148,153,159)' }}>
            Nice to see you again!
          </CardSubtitle>
        </CardBody>

        <CardBody className="pt-1">
          <CardText>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username" className="fw-bolder" style={{ color: 'rgba(160,164,171)', fontSize: '12px' }}>
                  Username<span className="ps-1 text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  className="mb-3 rounded-1 input-text-color"
                  style={{ backgroundColor: 'rgba(30,31,34)', border: 'none', width: '396px', outline: 'none' }}
                  value={userData.username}
                  onChange={handleChange}
                  required
                />

                <Label for="password" className="fw-bolder" style={{ color: 'rgba(160,164,171)', fontSize: '12px' }}>
                  Password<span className="ps-1 text-danger">*</span>
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  className="rounded-1 input-text-color"
                  style={{ backgroundColor: 'rgba(30,31,34)', border: 'none', outline: 'none' }}
                  value={userData.password}
                  onChange={handleChange}
                  required
                />

                <a
                  href="/forgotpassword"
                  style={{ color: 'rgba(9,147,217)', textDecoration: 'none', fontSize: '14px' }}>
                  Forgot Password?
                </a>
              </FormGroup>

              <Button
                type="submit"
                className="mt-1 py-2 rounded-1"
                style={{ backgroundColor: 'rgba(71,82,196)', fontSize: '16px', border: 'none', width: '100%' }}>
                Login
              </Button>

              <p className="mt-1" style={{ color: 'rgba(148,155,164)', fontSize: '14px' }}>
                Need a new account?
                <a href="/register" className="ps-1" style={{ color: 'rgba(9,147,217)', textDecoration: 'none' }}>
                  Register
                </a>
              </p>
            </Form>
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Login
