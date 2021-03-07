//https://www.youtube.com/watch?v=pKd0Rpw7O48
//loading joi
const Joi = require('joi');         // this return Class
const express = require('express');
const app = express();

app.use(express.json());        //to enable to read body

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
]

app.get('/', (req, res) =>{
   res.send('hello world!!!');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

// /api/courses/1

/*app.get('/api/courses/:id', (req, res) =>{  //getting id sent
    res.send(req.params.id);
});*/

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id) )     // funkcija unutra find koja porvrava da li imamo taj kurs koji trazimo
    if(!course) // 404
        res.status(404).send('Course not found')
    res.send(course)

});

//POSTMAN CHROME

app.post('/api/courses', (req,res)=>{
    /*const schema = {                    //sema za validaciju inputa preko klase joi
        name: Joi.string().min(3).required()    //moga biti string i mora biti veci od 3 caraktera i obavezno je
    }
    const result = Joi.validate(req.body, schema);
    console.log(result)*/
    if(!req.body.name || req.body.name.left <3){    //VALIDACIJA UNOSA      // REPLACING VALIDATION LOGIC WITH JOI
        // 400 Bad request
    /*if(result.error){*/
        res.status(400).send('Bad request'/*result.error.details[0].message*/);
        return;
    }
    const course = {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course)        //kada ubacimo novi clan trebalo bi da obavesitimo koji smo ubacili
})

//asd a
app.put('/api/courses/:id', (req,res)=>{            //UPDATING
    // Look up the course
    // If not exist , return 404
    let course = courses.find(c => c.id === parseInt(req.params.id) )     // funkcija unutra find koja porvrava da li imamo taj kurs koji trazimo
    if(!course) // 404
    {
        res.status(404).send('Course not found')
        return;
    }

    // not valid input 400 - Bad request

    //const result = validateCourse(req.body)

    // odvajamo bojekat jer nam svuda treba samo result.error
    const { error } = validateCourse(req.body)      //result.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;

    // return updated course
    res.send(course)

})

//DELETE

app.delete('/api/courses/:id', (req, res)=>{
    //Look up the couse
    //404 if not exist
    let course = courses.find(c => c.id === parseInt(req.params.id) )     // funkcija unutra find koja porvrava da li imamo taj kurs koji trazimo
    if(!course) // 404
    {
        res.status(404).send('Course not found')
        return;
    }
    //delete

    const index = courses.indexOf(course);
    courses.splice(index, 1)        //remove one object at the index
    //return deletet couse
    res.send(course)
})

//extract validation logic into separate function

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course, schema);

}

/*app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.params);
});*/

/*app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.query);
});*/

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//https://www.youtube.com/watch?v=MxfxiR8TVNU
