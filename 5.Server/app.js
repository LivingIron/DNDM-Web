const express = require('express');


//express app
const app = express();
const morgan=require('morgan');
const mongoose=require('mongoose');
require('dotenv').config();
const Blog=require('./models/blog');
const Email=require('./models/email');
const { render } = require('ejs');

//CONNECT TO MONGODB
const dbURI="mongodb+srv://LivingIron:veganton123@cluster0.re0gw.mongodb.net/DNDM?retryWrites=true&w=majority";

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{app.listen(3000);})
.catch((err)=>console.log(err));



//register view engine
//app.set('views','./myviews');
app.set('view engine','ejs');


//listen for requests

    //app.listen(3000);


// middleware and static files
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
    //3rd party middlware
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
    /*
    app.get('/add-blog',(req,res)=>{
        const blog=new Blog({
            title:'newBlog',
            snippet:'about my new blog',
            body:'more about my new blog'
        });

        blog.save()
        .then((result)=>{res.send(result)})
        .catch((err)=>{console.log(err)});

    })

    app.get('/all-blogs',(req,res)=>{
        Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(res);
        })
    })

    app.get('/single-blog',(req,res)=>{
        Blog.findById('5fec9225f11fb916feb3f845')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    */
//next continues
    /*
    app.use((req,res,next)=>{
        console.log('new request made:');
        console.log('host:',req.hostname);
        console.log('path:',req.path);
        console.log('method:',req.method);
        next();
    });

    app.use((req,res,next)=>{
        console.log('in the next middleware!');
        next();
    });
    */

//=========================basic routes======================
app.get('/',(req,res)=>{
    //res.send('<p>hello</p>');
    res.render('Home',{title:'Home'});
    
});

app.get('/spells',(req,res)=>{
    res.render('Spells',{title:'Spells'});
});

app.get('/monsters',(req,res)=>{
    res.render('Monsters',{title:'Monsters'});
});


app.get('/equipment',(req,res)=>{
    res.render('Equipment',{title:'Equipment'});
});


//==============Form routes=====================


app.get('/form',(req,res)=>{

    Email.find()
    .then((result)=>{
        res.render('Form',{title:'Forms',emails:result});
    })
    .catch((err)=>{
        console.log(err);
    })

    
});

app.get('/form/create',(req,res)=>{
    //const blogs=[
    //    {title:'Yoshi finds eggs',snippet:'Lorem ipsum'},
    //    {title:'Mario finds the stars',snippet:'Lorem dicksum'},
    //    {title:'How to defeat your mom',snippet:'Kappa'}
    //];


    res.render('FormCreate',{title:'Send Form'});
});

app.get('/form/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    Email.findById(id)
    .then((result)=>{
        res.render('Details',{email:result,title:'Email Details'});
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.post('/form',(req,res)=>{
    console.log(req.body);
    const newEmail= new Email(req.body);

    newEmail.save()
    .then((result)=>{
        res.redirect('/form');
    })
    .catch((err)=>{
        console.log(err);
    })
});





//redirects

app.get('/spellz',(req,res)=>{
   res.redirect('/spells')
});

//404- NEEDS TO BE AT THE BOTTOM
app.use((req,res)=>{
    res.status(404).render('Error',{title:'Error 404'});
});