const express = require('express');

//express app
const app = express();
const morgan=require('morgan');
const mongoose=require('mongoose');
require('dotenv').config();
const Blog=require('./models/blog');
const { render } = require('ejs');
const formRoutes=require('./routes/formRoutes.js');

//CONNECT TO MONGODB

mongoose.connect(process.env.dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{app.listen(3000);})
.catch((err)=>console.log(err));


//register view engine
    //app.set('views','./myviews');
app.set('view engine','ejs');


//listen for requests
    //app.listen(3000);


// middleware and static files
    app.use(express.static('./public'));
//Data parsing configuration
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


    
app.use('/form',formRoutes);

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



//redirects

app.get('/spellz',(req,res)=>{
   res.redirect('/spells')
});

//404- NEEDS TO BE AT THE BOTTOM
app.use((req,res)=>{
    res.status(404).render('Error',{title:'Error 404'});
});