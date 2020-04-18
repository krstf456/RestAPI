const express = require('express')
const app = express()

const products = [
     {
        id: 1,
        name: 'TV',
        price: '4000'
     }, {
        id: 2,
        name: 'laptop',
        price: '5000'
     }, {
        id: 3,
        name: 'iPad',
        price: '3500'
     }
]

app.use(express.json())
app.use(express.static('public'))

app.get('/products', (req, res) => {
    res.json(products)
})



app.post('/products', (res, req) => {
    const product = {
        id: req.body.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(product)
    res.json(product)
})

app.put()

app.listen(3000, 'localhost', () => console.log('Server is running at port 3000.'))