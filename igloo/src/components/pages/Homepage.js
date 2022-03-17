import React, { useState, useEffect }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { API } from 'aws-amplify'

const Homepage = () => {

    const [greeting, setGreeting] = useState(null);
    const [formState, setFormState] = useState({
        name: '',
        year: '',
        link: ''
    })
    const [songs, setSongs] = useState([]);

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

        try {

            const data = await API.post('iglooapi', '/greeting', {
                body: formState
            });
            window.location.reload();
            console.log(data);

        } catch (e) {
            console.log(e);
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

        fetchData();
        fetchSongs();

    }, [])

    const checkValues = () => {
        console.log(songs);
    }

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
                <h1>{greeting}</h1>
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