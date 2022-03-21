import React from 'react';
import { Account } from '../Cognito/Account';
import Homepage from '../pages/Homepage';
import SignUp from '../Cognito/SignUp';
import Login from '../Cognito/Login';
import Status from '../Cognito/Status';
import Attributes from '../Cognito/Attributes';

import { Route } from 'react-router-dom';

const SongCompiler = () => {
    return (
        <Account>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route exact path='/signup'>
                <SignUp />
            </Route>
            <Route exact path='/settings'>
                <Attributes />
            </Route>
            <Route exact path='/homepage'>
                <Homepage />
                <Status />
            </Route>
        </Account>
    )
}

export default SongCompiler