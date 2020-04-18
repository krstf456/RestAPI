const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}


]
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)
    
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    const course = {
        id: courses.length +1,
        name: req.body.name,

    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    let course = courses.find(c => c.id === parseInt(req.params.id))
    //If not exist return 404
    if(!course) return res.status(404).send('The course was not found.')
        
    
    //validate
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)
    //If invalid return 400 bad request
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    //update course
    course.name = req.body.name
    //return the 
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    //Look up the copurse
    let course = courses.find(c => c.id === parseInt(req.params.id))

    //Not existing, return 404
    if(!course) return res.status(404).send('The course was not found.')
        
    

    //delete
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    //return the same course
    res.send(course)
})


app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course was not found.')
         res.send(course)
})

//PORT
const port = process.env.PORT || 3002
app.listen(port, () => console.log(`Running on port ${port}.`))