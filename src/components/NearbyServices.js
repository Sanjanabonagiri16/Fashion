import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';

const NearbyServices = () => {
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState('');
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            if (location.lat && location.lng) {
                try {
                    const response = await axios.get('/api/nearby/services', {
                        params: { lat: location.lat, lng: location.lng, type: filter },
                        headers: { 'Authorization': `Bearer your_ola_api_key` }
                    });
                    setServices(response.data);
                } catch (err) {
                    setError('Failed to fetch nearby services');
                }
            }
        };
        fetchServices();
    }, [location, filter]);

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setLocation(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Nearby Services</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                        type="text"
                        name="lat"
                        placeholder="Enter latitude"
                        value={location.lat}
                        onChange={handleLocationChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        type="text"
                        name="lng"
                        placeholder="Enter longitude"
                        value={location.lng}
                        onChange={handleLocationChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filter</Form.Label>
                    <Form.Select onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="fabric_store">Fabric Stores</option>
                        <option value="tailor">Tailors</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={() => fetchServices()}>Search</Button>
            </Form>
            <ListGroup className="mt-4">
                {services.map(service => (
                    <ListGroup.Item key={service.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>{service.address}</Card.Text>
                                <Card.Text>Distance: {service.distance} km</Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default NearbyServices;