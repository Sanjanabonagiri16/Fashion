import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ products: [], totalAmount: 0, measurements: {} });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/user/your_user_id');
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/orders', newOrder);
            setNewOrder({ products: [], totalAmount: 0, measurements: {} });
            const response = await axios.get('/api/orders/user/your_user_id');
            setOrders(response.data);
        } catch (err) {
            setError('Failed to place order');
        }
    };

    const handleMeasurementChange = (e) => {
        const { name, value } = e.target;
        setNewOrder(prevState => ({
            ...prevState,
            measurements: { ...prevState.measurements, [name]: value }
        }));
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Orders</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleOrderSubmit}>
                <h3>Measurements</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Shoulder</Form.Label>
                    <Form.Control type="number" name="shoulder" placeholder="Shoulder" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Front Length</Form.Label>
                    <Form.Control type="number" name="frontLength" placeholder="Front Length" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Back Length</Form.Label>
                    <Form.Control type="number" name="backLength" placeholder="Back Length" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Chest</Form.Label>
                    <Form.Control type="number" name="chest" placeholder="Chest" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Upper Chest</Form.Label>
                    <Form.Control type="number" name="upperChest" placeholder="Upper Chest" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Waist Fitting</Form.Label>
                    <Form.Control type="number" name="waistFitting" placeholder="Waist Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Armhole</Form.Label>
                    <Form.Control type="number" name="armhole" placeholder="Armhole" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Kamar Fitting</Form.Label>
                    <Form.Control type="number" name="kamarFitting" placeholder="Kamar Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hip</Form.Label>
                    <Form.Control type="number" name="hip" placeholder="Hip" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hand Length</Form.Label>
                    <Form.Control type="number" name="handLength" placeholder="Hand Length" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hand Fitting</Form.Label>
                    <Form.Control type="number" name="handFitting" placeholder="Hand Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Front Neck</Form.Label>
                    <Form.Control type="number" name="frontNeck" placeholder="Front Neck" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Back Neck</Form.Label>
                    <Form.Control type="number" name="backNeck" placeholder="Back Neck" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pant Length</Form.Label>
                    <Form.Control type="number" name="pantLength" placeholder="Pant Length" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pant Fitting</Form.Label>
                    <Form.Control type="number" name="pantFitting" placeholder="Pant Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pant Belt Fitting</Form.Label>
                    <Form.Control type="number" name="pantBeltFitting" placeholder="Pant Belt Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pant Hip Fitting</Form.Label>
                    <Form.Control type="number" name="pantHipFitting" placeholder="Pant Hip Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pant Bottom Fitting</Form.Label>
                    <Form.Control type="number" name="pantBottomFitting" placeholder="Pant Bottom Fitting" onChange={handleMeasurementChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Place Order
                </Button>
            </Form>
            <ListGroup className="mt-4">
                {orders.map(order => (
                    <ListGroup.Item key={order._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Order ID: {order._id}</Card.Title>
                                <Card.Text>Total Amount: ${order.totalAmount}</Card.Text>
                                <Card.Text>
                                    <h4>Products</h4>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product.productId._id}>
                                                {product.productId.name} - Quantity: {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <Card.Text>
                                    <h4>Measurements</h4>
                                    <p>Shoulder: {order.measurements.shoulder}</p>
                                    <p>Front Length: {order.measurements.frontLength}</p>
                                    <p>Back Length: {order.measurements.backLength}</p>
                                    <p>Chest: {order.measurements.chest}</p>
                                    <p>Upper Chest: {order.measurements.upperChest}</p>
                                    <p>Waist Fitting: {order.measurements.waistFitting}</p>
                                    <p>Armhole: {order.measurements.armhole}</p>
                                    <p>Kamar Fitting: {order.measurements.kamarFitting}</p>
                                    <p>Hip: {order.measurements.hip}</p>
                                    <p>Hand Length: {order.measurements.handLength}</p>
                                    <p>Hand Fitting: {order.measurements.handFitting}</p>
                                    <p>Front Neck: {order.measurements.frontNeck}</p>
                                    <p>Back Neck: {order.measurements.backNeck}</p>
                                    <p>Pant Length: {order.measurements.pantLength}</p>
                                    <p>Pant Fitting: {order.measurements.pantFitting}</p>
                                    <p>Pant Belt Fitting: {order.measurements.pantBeltFitting}</p>
                                    <p>Pant Hip Fitting: {order.measurements.pantHipFitting}</p>
                                    <p>Pant Bottom Fitting: {order.measurements.pantBottomFitting}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Orders;