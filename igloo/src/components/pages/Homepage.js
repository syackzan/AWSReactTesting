import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { API } from 'aws-amplify'
import { AccountContext } from '../Cognito/Account';

const Homepage = () => {

    const [status, setStatus] = useState(false);
    const [greeting, setGreeting] = useState(null);
    const [formState, setFormState] = useState({
        name: '',
        year: '',
        link: '',
        userId: '',
        singer: ''
    })
    const [username, setUsername] = useState('')

    const [songs, setSongs] = useState([]);

    const { getSession } = useContext(AccountContext);

    const handleChange = (event) => {
        event.preventDefault()

        const { value, name } = event.target

        setFormState({
            ...formState,
            [name]: value
        })

    }

    const submitSong = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {

            const data = await API.post('iglooapi', '/greeting', {
                body: formState
            });
            window.location.reload();
            console.log(data);

        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {

        async function fetchData() {
            const apiData = await API.get('iglooapi', '/greeting')
            setGreeting(apiData.message);
            return
        }

        async function fetchSongs() {
            const songData = await API.get('iglooapi', '/greeting/songs')
            setSongs(songData.data.Items)
        }



        getSession()
            .then(session => {
                console.log('Session:', session)
                setStatus(true);
                setUsername(session.email)
                setFormState({
                    ...formState,
                    userId: session.sub
                })
                console.log("Hello");

                const fetchIt = async () => {
                    console.log(session.sub);
                    const userSongsData = await API.get('iglooapi', `/greeting/${session.sub}`);
                    console.log(userSongsData);
                }

                fetchIt();


            })
            .catch(e => {
                console.log('No Sessions')
            })

        fetchData();
        fetchSongs();


    }, [])

    const deleteSong = async (id) => {
        console.log(`/greeting/${id}`);
        try {
            const deletedSong = await API.del('iglooapi', `/greeting/${id}`)
            console.log(deletedSong)
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="App">
            <header className="">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </header>
            <div className="container borderBottom marginBottom p-1">
                <h1>{greeting} for {username}</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Song Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter song name..."
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Singer</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter singers name..."
                            name="singer"
                            value={formState.singer}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Song Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="1991..."
                            name="year"
                            value={formState.year}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Youtube Link</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="youtube link..."
                            name="link"
                            value={formState.link}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={submitSong}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div className="container marginBottom">
                {songs.map((song, index) => (
                    <div className="cointainer-fluid" key={index}>
                        <div className="row">
                            <div className="col-3">
                                <p>{song.name.S}</p>
                            </div>
                            <div className="col-3">
                                <p>{song.year.S}</p>
                            </div>
                            <div className="col-3">
                                <a href={song.link.S}>Link</a>
                            </div>
                            <div className="col-3">
                                <button className="fitContent" onClick={() => deleteSong(song.id.S)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <button onClick={checkValues}>A</button> */}
            </div>
        </div>
    )
}

export default Homepage;