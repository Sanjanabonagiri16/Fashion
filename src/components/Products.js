import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Alert } from 'react-bootstrap';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [material, setMaterial] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = material ? `/api/products/material/${material}` : type ? `/api/products/type/${type}` : category ? `/api/products/category/${category}` : '/api/products';
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };
        fetchProducts();
    }, [category, type, material]);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Products</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Row className="mb-4">
                    <Col md={4}>
                        <Form.Select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="Kurthi">Kurthi</option>
                            <option value="Frocks">Frocks</option>
                            <option value="Skirt">Skirt</option>
                            <option value="Pant">Pant</option>
                            <option value="Shalwar Suit">Shalwar Suit</option>
                            <option value="Blouses">Blouses</option>
                            <option value="Lehenga">Lehenga</option>
                            <option value="Ghagra">Ghagra</option>
                            <option value="Embroidery">Embroidery</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            <option value="">All Types</option>
                            <option value="Long Kurti">Long Kurti</option>
                            <option value="Short Kurti">Short Kurti</option>
                            <option value="Anarkali Kurti">Anarkali Kurti</option>
                            <option value="Long Frock">Long Frock</option>
                            <option value="Short Frock">Short Frock</option>
                            <option value="Umbrella Frock">Umbrella Frock</option>
                            <option value="Cindrella Frock">Cindrella Frock</option>
                            <option value="Aari Work">Aari Work</option>
                            <option value="Zardosi Work">Zardosi Work</option>
                            <option value="Machine Embroidery">Machine Embroidery</option>
                            <option value="Computer Embroidery">Computer Embroidery</option>
                            <option value="Kroshya Work">Kroshya Work</option>
                            <option value="Woolen Embroidery">Woolen Embroidery</option>
                            <option value="Needle Work">Needle Work</option>
                            <option value="Beads Works">Beads Works</option>
                            <option value="Umbrella Pant">Umbrella Pant</option>
                            <option value="Tulip Pant">Tulip Pant</option>
                            <option value="Dhoti Pant">Dhoti Pant</option>
                            <option value="Patiyala Pant">Patiyala Pant</option>
                            <option value="Shalwar">Shalwar</option>
                            <option value="Cigarette Pant">Cigarette Pant</option>
                            <option value="Palazzo Pant">Palazzo Pant</option>
                            <option value="Regular Sleeve">Regular Sleeve</option>
                            <option value="T-Shirt Sleeve">T-Shirt Sleeve</option>
                            <option value="Leg-of-Mutton Sleeve">Leg-of-Mutton Sleeve</option>
                            <option value="Juliet Sleeve">Juliet Sleeve</option>
                            <option value="Balloon Sleeve">Balloon Sleeve</option>
                            <option value="Slit Sleeve">Slit Sleeve</option>
                            <option value="Cap Sleeve">Cap Sleeve</option>
                            <option value="Lantern Sleeve">Lantern Sleeve</option>
                            <option value="Cape Sleeve">Cape Sleeve</option>
                            <option value="Puff Sleeve">Puff Sleeve</option>
                            <option value="Dolman Sleeve">Dolman Sleeve</option>
                            <option value="Bell Sleeve">Bell Sleeve</option>
                            <option value="Butterfly Sleeve">Butterfly Sleeve</option>
                            <option value="Flutter Sleeve">Flutter Sleeve</option>
                            <option value="Bishop Sleeve">Bishop Sleeve</option>
                            <option value="Kimono Sleeve">Kimono Sleeve</option>
                            <option value="Bracelet Sleeve">Bracelet Sleeve</option>
                            <option value="Frill Sleeve">Frill Sleeve</option>
                            <option value="Pagoda Sleeve">Pagoda Sleeve</option>
                            <option value="Peasant Sleeve">Peasant Sleeve</option>
                            <option value="Petal Sleeve">Petal Sleeve</option>
                            <option value="Mameluke Sleeve">Mameluke Sleeve</option>
                            <option value="Hanging Sleeve">Hanging Sleeve</option>
                            <option value="Elbow Patched Sleeve">Elbow Patched Sleeve</option>
                            <option value="Off-shoulder Sleeve">Off-shoulder Sleeve</option>
                            <option value="Cold-shoulder Sleeve">Cold-shoulder Sleeve</option>
                            <option value="Draped Sleeve">Draped Sleeve</option>
                            <option value="Fleece Sleeve">Fleece Sleeve</option>
                            <option value="Smocked Sleeve">Smocked Sleeve</option>
                            <option value="Origami Sleeve">Origami Sleeve</option>
                            <option value="Boat Neck Blouse">Boat Neck Blouse</option>
                            <option value="Backless Blouse">Backless Blouse</option>
                            <option value="High Neck Blouse">High Neck Blouse</option>
                            <option value="Knotted Blouse">Knotted Blouse</option>
                            <option value="Classic Blouse">Classic Blouse</option>
                            <option value="Mirror Blouse">Mirror Blouse</option>
                            <option value="Off-shoulder Blouse">Off-shoulder Blouse</option>
                            <option value="Shirt Style Blouse">Shirt Style Blouse</option>
                            <option value="Jeweled Neck Blouse">Jeweled Neck Blouse</option>
                            <option value="Maggam Blouse Designs">Maggam Blouse Designs</option>
                            <option value="Peplum Blouse">Peplum Blouse</option>
                            <option value="Asymmetrical Blouse">Asymmetrical Blouse</option>
                            <option value="Corset Blouse">Corset Blouse</option>
                            <option value="Halter Neck Blouse">Halter Neck Blouse</option>
                            <option value="Jacket Blouse">Jacket Blouse</option>
                            <option value="Ladder Back Blouse">Ladder Back Blouse</option>
                            <option value="Potli Button Saree Blouse">Potli Button Saree Blouse</option>
                            <option value="Aari Work Blouse">Aari Work Blouse</option>
                            <option value="Bell Sleeve Blouse Design">Bell Sleeve Blouse Design</option>
                            <option value="Cap Sleeves Blouse">Cap Sleeves Blouse</option>
                            <option value="Chinese Collar Blouse">Chinese Collar Blouse</option>
                            <option value="Classic Round Neck">Classic Round Neck</option>
                            <option value="Floral Blouse Design">Floral Blouse Design</option>
                            <option value="Net Blouse Design">Net Blouse Design</option>
                            <option value="Cross Blouse">Cross Blouse</option>
                            <option value="Straight Blouse">Straight Blouse</option>
                            <option value="Four Dot Blouse">Four Dot Blouse</option>
                            <option value="Katori">Katori</option>
                            <option value="Prince Cut">Prince Cut</option>
                            <option value="Double Prince Cut">Double Prince Cut</option>
                            <option value="Sabyasachi">Sabyasachi</option>
                            <option value="Four Dot with Belt">Four Dot with Belt</option>
                            <option value="Prince Cut with Belt">Prince Cut with Belt</option>
                            <option value="One Dot Centre Point">One Dot Centre Point</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Select onChange={(e) => setMaterial(e.target.value)}>
                            <option value="">All Materials</option>
                            <option value="Satin">Satin</option>
                            <option value="Rayon">Rayon</option>
                            <option value="Silk">Silk</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Linen">Linen</option>
                            <option value="Net">Net</option>
                            <option value="Georgette">Georgette</option>
                            <option value="Nylon">Nylon</option>
                            <option value="Velvet">Velvet</option>
                            <option value="Crepe">Crepe</option>
                            <option value="Organza">Organza</option>
                            <option value="Tissue">Tissue</option>
                            <option value="Chiffon">Chiffon</option>
                            <option value="Crushed Cloth">Crushed Cloth</option>
                            <option value="Woolen">Woolen</option>
                            <option value="Banian">Banian</option>
                            <option value="Bombay Dye">Bombay Dye</option>
                            <option value="Khadi">Khadi</option>
                            <option value="Ikkat">Ikkat</option>
                            <option value="Cancan">Cancan</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <Row>
                {products.map(product => (
                    <Col md={4} key={product._id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Category: {product.category}</Card.Text>
                                <Card.Text>Type: {product.type}</Card.Text>
                                <Card.Text>Material: {product.material}</Card.Text>
                                <Card.Text>Price: ${product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;