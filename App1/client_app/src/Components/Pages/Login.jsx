import React from "react";
import { useAuth0 } from "./../../react-auth0-spa";
import { useDispatch } from 'react-redux'
import "./argon-welcome-page.css";
// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

import {
    Button,
    Card,
    Container,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

document.body.classList.add("bg-default");

const Login = () => {
    let dispatch = useDispatch();

    const { isAuthenticated, loginWithPopup, logout, getTokenSilently, user } = useAuth0();

    let user2 = {};

    const addUser = async () => {
        let token = '';
        if (user !== undefined && getTokenSilently !== undefined) {

            await getTokenSilently().then(e => token = e)

            await fetch('graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                      users {
                        addUser(token: "${token}")  
                      }
                    }`
                }),
            }).then(res => res.json())
                .then(res => user2 = res.users.addUser)
                .then(res => dispatch({ type: 'LOG_IN', loggedUser: user2 }))
        }
    }

    if (isAuthenticated) {
        addUser();
        console.log("auth0 user: ", user);
    }

    return (
        <>
            <div className="headerG bg-gradient-info py-7 py-lg-8">
                <div className="text-center">
                    <h1 className="text-white">Welcome!</h1>
                    <p className="text-lead text-light">
                        Use these awesome forms to login or create new account in
                        our socialmedia student project.
                    </p>
                </div>
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-default"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
            </div>
            {/* Page content */}
            <Container className="mt--8 pb-5">
            </Container>
            <div className="main-contentG">
                <Container>
                    <Col lg="6" md="8">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                    {!isAuthenticated && (
                                        <Button
                                            className="btn-neutral btn-icon"
                                            color="default"
                                            onClick={() => loginWithPopup({})}
                                        >
                                            <span className="btn-inner--icon">
                                                <img
                                                    alt="..."
                                                    src={require("./../github.svg")}
                                                />
                                            </span>
                                            <span className="btn-inner--text">Github</span>
                                        </Button>
                                    )}
                                    {!isAuthenticated && (
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        onClick={() => loginWithPopup({})}
                                    >
                                        <span className="btn-inner--icon">
                                            <img
                                                alt="..."
                                                src={require("./../google.svg")}
                                            />
                                        </span>
                                        <span className="btn-inner--text">Google</span>
                                    </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" autoComplete="new-email" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" autoComplete="new-password" />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin"
                                        >
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        {!isAuthenticated && (
                                        <Button onClick={() => loginWithPopup({})} className="my-4" color="primary" type="button">
                                            Sign in
                                        </Button>
                                        )}
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </Col>
                            <Col className="text-right" xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <small>Create new account</small>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        </>
    );
};


export default Login;

