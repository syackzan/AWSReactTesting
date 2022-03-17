import React, { useState, useContext } from 'react';

import { AccountContext } from './Account';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { authenticate } = useContext(AccountContext);

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const resp = await authenticate(username, password);
            console.log('Logged in!', resp);
            window.location.reload();
        } catch(e){
            console.error('Failed to login', e);
        } 

    }

    return (
        <>
            <div className="container">
                <h1>Login</h1>
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
                        Login
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login;