const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const products = [
     {id: 1, name: 'TV', price: 4000}, 
     {id: 2, name: 'laptop', price: 3500},
     {id: 3, name: 'iPad', price: 3300}
];


app.get('/', (req, res) => {
    res.send('REST-API')
});

app.get('/products', (req, res) => {
    res.json(products)
});
app.post('/products', (req, res) => {
    const validation = {
        name: Joi.string().min(2).required(),
        price: Joi.number().required(),
        
    };
    const validationResult = Joi.validate(req.body, validation);

    if(validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message)
        return
    };
    const product = {
        id: products.length +1,
        name: req.body.name,
        price: req.body.price,
       
    };
    products.push(product)
    res.json(product)
})

app.put('/products/:id', (req, res) => {
    //Find the course with the given id
    const product = products.find(p => p.id === parseInt(req.params.id))

    //If not exist return 404
    if(!product) return res.status(404).send('The product you looking for was not found.')
        
    
    //validate
    const validation = {
        id: Joi.number().required(),
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
    }
    const validationResult = Joi.validate(req.body, validation)
    //If invalid return 400 bad request
    if(validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message)
        return
    }

    product.name = req.body.name
    product.price = req.body.price
    
    res.json(product)
})

app.delete('/products/:id', (req, res) => {
    //Find the course with given id
    const product = products.find(p => p.id === parseInt(req.params.id))
    //Not existing 404
    if(!product) return res.status(404).send('The product you looking for was not found.')
    
    // delete a course
    const index = products.indexOf(product)
    products.splice(index, 1)

    res.json(product)
})

app.listen(3001, 'localhost', () => console.log('Server is running at port 3001.'))