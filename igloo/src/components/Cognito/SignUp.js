import React, { useState, useContext } from 'react';

import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from '../Cognito/Account';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserPool from './UserPool';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { getSession } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(username, password, [], null, (err, data) => {
            if(err){console.error(err)};
            console.log(data);
        })

        getSession().then(({ user }) => {

            const attributes = [
                new CognitoUserAttribute({ Name: 'custom:Id', Value: uuid()})
            ];

            console.log(attributes);

            user.updateAttributes(attributes, (err, result) => {
                if(err) console.error(err);
                console.log(result);
            });
        })
        
    }

    return (
        <div className="centerIt">
            <div className="container">
            <div className="d-flex align-items-center flex-column">
                    <h1><u>Song Compiler</u></h1>
                    <h2>Sign Up</h2>
                </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
            <Link to="/" className="d-flex justify-content-end navStyle">Login</Link>
        </div>
    )
}

export default SignUp;