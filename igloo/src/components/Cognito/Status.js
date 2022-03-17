import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from './Account';

const Status = () => {

    const [status, setStatus] = useState(false);
    const [username, setUsername] = useState('');

    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session:', session)
                setStatus(true);
                setUsername(session.email)
            })
            .catch(e => {
                console.log('No Sessions')
            })
    }, []);

    return (
        <div>
            {status ? (
                <div>
                    <h3>{username}, Logged In!</h3>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : 'Please Log In Below'}
        </div>
    )
}

export default Status
