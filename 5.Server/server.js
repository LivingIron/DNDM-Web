const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server=http.createServer((req,res) => {
    //console.log(req.url,req.method);

    //lodash
    const num= _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');

    });

    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type','text/html');
    let path= './views/';

    switch(req.url){
        case '/':
                 path+='Home.html';
                 res.statusCode=200;
                 break;

        case '/spells':
            path+='Spells.html';
            res.statusCode=200;
            break;

        case '/monsters':
            path+='Monsters.html';
            res.statusCode=200;
            break;

        case '/monsterz':
            res.statusCode=301;
            res.setHeader('Location','/monsters')
            break;

        case '/equipment':
            path+='Equipment.html';
            res.statusCode=200;
            break;

        default: 
            path+='Home.html';
            res.statusCode=404;
            break;
    }


    //send htmo file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            //res.write(data);
            res.end(data);
        }
    });

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
});