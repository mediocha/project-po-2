const express = require('express');
const app = express()
const path = require('path');
const router = express.Router();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);


app.get('/*', function(req, res){
    const fullPath = path.join(__dirname + '/public/index.html');
    console.log(" Fetching From.." + fullPath);
        res.sendFile(fullPath);
})

// router.get('/', function(req, res){
    
//     res.sendFile('index.html', { root: path.join("/app")});
// })




// app.use('/', router);
// app.listen(process.env.port || 3000);

console.log('Servidor ta rolando e vai descendo ate o chao');