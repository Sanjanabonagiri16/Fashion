const express = require('express');
const router = express.Router();
const axios = require('axios');

// Fetch nearby services
router.get('/services', async (req, res) => {
    const { lat, lng, type } = req.query;
    try {
        const response = await axios.get('https://api.ola.com/v1/nearby', {
            params: { lat, lng, type },
            headers: { 'Authorization': `Bearer your_ola_api_key` }
        });
        res.json(response.data.services);
    } catch (error) {
        res.status(500).send('Error fetching nearby services');
    }
});

module.exports = router;