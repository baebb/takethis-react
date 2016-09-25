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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
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
      let cleaned = results
        .filter((obj) => {
          return obj.ItemAttributes[0].PackageQuantity[0] == 1;
        })
        .map((obj) => {
        return {
          title: obj.ItemAttributes[0].Title[0],
          price: obj.ItemAttributes[0].ListPrice[0].Amount[0],
          brand: obj.ItemAttributes[0].Brand[0],
          features: obj.ItemAttributes[0].Feature,
          productPage: obj.DetailPageURL[0],
          imgLarge: obj.LargeImage ? obj.LargeImage[0].URL[0] : null,
          imgMedium: obj.MediumImage ? obj.MediumImage[0].URL[0] : null,
          imgSmall: obj.SmallImage ? obj.SmallImage[0].URL[0] : null,
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