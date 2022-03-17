import React from 'react';
import { Account } from '../Cognito/Account';
import Homepage from '../pages/Homepage';
import SignUp from '../Cognito/SignUp';
import Login from '../Cognito/Login';
import Status from '../Cognito/Status';
import Attributes from '../Cognito/Attributes';

const SongCompiler = () => {
    return (
        <Account>
            <Status />
            <SignUp />
            <Login />
            <Attributes />
            <Homepage />
        </Account>
    )
}

export default SongCompiler