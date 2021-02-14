const Blog=require('../models/blog');
const Email=require('../models/email');
const nodemailer= require('nodemailer');
const nodeMailGun=require('nodemailer-mailgun-transport');
const ejs = require('ejs');

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

const form_create_post = async (req,res)=>{

    console.log(req.body);
    const newEmail= new Email(req.body);

//Making the default transporter a.k.a the thing thats gonna send the email
    /*
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
    */

//authentication needed for mailgun
    const auth={
        auth:{
            api_key:`${process.env.mailGunAPIKey}`,
            domain:'sandbox95f8f2c2fa0043758977d5cea517ac10.mailgun.org'
        }
    }

    //Transporter for the nodemail gun
   let transporter=nodemailer.createTransport(nodeMailGun(auth));

//Getting the template from the file then sending the data to the mail options
    const data = await ejs.renderFile(__dirname+'/emailTemplate.ejs');

    let mailOptions={
        from:req.body.email,
        to:'irolifesolutions@gmail.com',
        subject:`${req.body.email} : ${req.body.subject}`,
        text:req.body.message,
        html:data,

        //attachments:[
        //    {filename:'picture.JPG',path:'./picture'}
        //]
    }

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Email sent');
        }
    });
    
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