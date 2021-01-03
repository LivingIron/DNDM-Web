const Blog=require('../models/blog');
const Email=require('../models/email');

const form_index = (req,res) => {
    Email.find()
    .then((result)=>{
        res.render('Form',{title:'Forms',emails:result});
    })
    .catch((err)=>{
        console.log(err);
    })
}

const form_details=(req,res)=>{
    const id=req.params.id;
    console.log(id);

    Email.findById(id)
    .then((result)=>{
        res.render('Details',{email:result,title:'Email Details'});
    })
    .catch((err)=>{
        console.log(err);
    })
}


const form_create_get=(req,res)=>{
     //const blogs=[
    //    {title:'Yoshi finds eggs',snippet:'Lorem ipsum'},
    //    {title:'Mario finds the stars',snippet:'Lorem dicksum'},
    //    {title:'How to defeat your mom',snippet:'Kappa'}
    //];


    res.render('FormCreate',{title:'Send Form'});
}

const form_create_post=(req,res)=>{
    console.log(req.body);
    const newEmail= new Email(req.body);

    newEmail.save()
    .then((result)=>{
        res.redirect('/form');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const form_create_delete=(req,res)=>{
    const id=req.params.id;
    console.log(id);

    Email.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect:'/form'});
    })
    .catch(err=>{
        console.log(err);
    });

}

module.exports={
    form_index,
    form_details,
    form_create_get,
    form_create_post,
    form_create_delete
}