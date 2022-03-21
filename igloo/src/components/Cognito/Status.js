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

    const logoutRedirect = async () => {
        
        await logout();

        window.location.assign('/')
    }


    return (
        <div>
            {status ? (
                <div>
                    <button onClick={logoutRedirect}>Logout</button>
                </div>
            ) : 'Please Log In Below'}
        </div>
    )
}

export default Status
