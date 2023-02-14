import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../style/Loginstyle.css";

const API_KEY = process.env.REACT_APP_APIKEY;
const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
      })
        .then(function (response) {
          const request_token = response.data.request_token;
          console.log(request_token);
          axios({
            method: "post",
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
            data: {
              username: values.username,
              password: values.password,
              request_token: request_token,
            },
          })
            .then(function (response) {
              console.log(response.data);
              axios({
                method: "post",
                url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                data: {
                  request_token: request_token,
                },
              })
                .then(function (response) {
                  const session_id = response.data.session_id;
                  console.log(session_id);
                  if (session_id) {
                    localStorage.setItem("SID", session_id);
                    navigate("/home");
                    alert(
                      `Berhasil login sebagai: ${values.username} dengan session id: ${session_id}`
                    );
                  }
                  setIsLoading(false);
                })
                .catch(function (error) {
                  alert(error.message);
                  setIsLoading(false);
                });
            })
            .catch(function (error) {
              alert(error.message);
              setIsLoading(false);
            });
        })
        .catch(function (error) {
          alert(error.message);
          setIsLoading(false);
        });
    },
  });

  console.log(formik);
  return (
    <>
      <div className="log">
        <h2>You need to login first to watch movies !!!</h2>
        <div className="form-box">
          <h1>Login Form</h1>
          <div className="form-box1">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="Label">Username</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <Form.Text className="error-text">
                  {formik.touched.username && formik.errors.username}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="Label">Password</Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Form.Text className="error-text">
                  {formik.touched.password && formik.errors.password}
                </Form.Text>
              </Form.Group>
              <Button
                className="btn btn-light submit-btn"
                disabled={!formik.isValid || isLoading}
                type="submit"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
