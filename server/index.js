const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const axios = require('axios');
const amazon = require('amazon-product-api');

//amazon set up
const config = require('./config');
const client = amazon.createClient({
    awsId: config.amazonAccessKeyId,
    awsSecret: config.amazonSecretKey,
    awsTag: config.amazonAssociateId
});

//app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

//routes
app.post('/products', (req, res) => {
    client.itemSearch({
        keywords: req.body.keyword,
        searchIndex: req.body.category,
        responseGroup: 'ItemAttributes, Images'
    })
        .then((results) => {
            let cleaned = results.map((obj) => {
                return {
                    title: obj.ItemAttributes[0].Title[0],
                    price: obj.ItemAttributes[0].ListPrice[0].Amount,
                    brand: obj.ItemAttributes[0].Brand[0],
                    features: obj.ItemAttributes[0].Feature,
                    productPage: obj.DetailPageURL[0],
                    image: obj.LargeImage ? obj.LargeImage[0].URL[0] : null,
                    ASIN: obj.ASIN[0]
                }
            })
            res.json(cleaned);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});


//server setup
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Server listening on port:', PORT);
})