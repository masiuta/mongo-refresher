const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri =
  'mongodb+srv://' +
  process.env.MONGODB_USER +
  ':' +
  process.env.MONGODB_PASSWORD +
  '@cluster0.jhvnwev.mongodb.net/products_test?retryWrites=true&w=majority';


const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  }

  const client = new MongoClient(uri);

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db()
    const result = await db.collection('products').insertOne(newProduct)
  } catch (error) {
    return res.json({message: 'Could not store data or trouble with connection'})
  } finally {
    await client.close();
  }
  


  res.json(newProduct)
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(uri);
  let products;

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db()
    products = await db.collection('products').find().toArray()
  } catch (error) {
    return res.json({message: 'Could not retrieve products'})
  } finally {
    await client.close();
  }
  res.json(products)
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
