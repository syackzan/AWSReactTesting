import React, { useEffect, useContext, useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from '../Cognito/Account';

const Attributes = () => {
    const [id, setId] = useState('');

    const { getSession } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({ user }) => {

            const attributes = [
                new CognitoUserAttribute({ Name: 'custom:Id', Value: id})
            ];

            console.log(attributes);

            user.updateAttributes(attributes, (err, result) => {
                if(err) console.error(err);
                console.log(result);
            });
        })

    }

    return (
        <div className="container">
            <h3>Update your plan</h3>
            <form onSubmit={onSubmit}>
                <input value={id} onChange={(event) => setId(event.target.value)} />
                <button type='submit'>Change Plan</button>
            </form>
        </div>
    )
}

export default Attributes;