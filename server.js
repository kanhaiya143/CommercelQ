const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs')

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  let rawdata = fs.readFileSync('store.json');
  let jsondata = JSON.parse(rawdata);
  
  res.send(jsondata.posts);
});

app.get('/authors', (req, res) => {

    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
      
    res.send(jsondata.authors);
});

app.get('/posts/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.posts) {
        if (jsondata.posts[i].id == id) {
          flag = 1;
          res.send(jsondata.posts[i]); 
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.get('/authors/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.authors) {
        if (jsondata.authors[i].id == id) {
          flag = 1;
          res.send(jsondata.authors[i]); 
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.post('/authors', (req, res) => {

    let store = {
        posts: [],
        authors: []
     };
    var id = req.body.id;
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var flag = 0;
    for (var i in jsondata.posts) {
        if (jsondata.posts[i].id == id) {
          flag = 1;
          break;    
        }
    }
    if(fs.readFileSync('store.json').length === 0 || flag == 1){
        res.send("ID already exits!")
        //empty store case
    }else{
        let rawdata = fs.readFileSync('store.json')
        store = JSON.parse(rawdata);
        let author = JSON.stringify(req.body)
        store.authors.push(JSON.parse(author)); //add some data
    
        fs.writeFileSync('store.json',JSON.stringify(store,null,4)); // write it back 
    }
});

app.post('/posts', (req, res) => {
    
    let store = {
        posts: [],
        authors: []
    };
    var id = req.body.id;
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var flag = 0;
    for (var i in jsondata.posts) {
        if (jsondata.posts[i].id == id) {
          flag = 1;
          break;    
        }
    }

    if(fs.readFileSync('store.json').length === 0 || flag == 1){
        //empty store case
        res.send("ID already exits!")
    }else{
        let rawdata = fs.readFileSync('store.json')
        store = JSON.parse(rawdata);
        let post = JSON.stringify(req.body)
        store.posts.push(JSON.parse(post)); //add some data
    
        fs.writeFileSync('store.json',JSON.stringify(store,null,4)); // write it back 
        //res.send(store);
    }
});


app.put('/posts/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.posts) {
        if (jsondata.posts[i].id == id) {
          flag = 1;
          jsondata.posts[i] = req.body;

          fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
          res.send("Updated!")
           
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.put('/authors/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.authors) {
        if (jsondata.authors[i].id == id) {
          flag = 1;
          jsondata.authors[i] = req.body;

          fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
          res.send("Updated!")
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.patch('/posts/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.posts) {
        if (jsondata.posts[i].id == id) {
          flag = 1;
          
          if(req.body.title !== undefined)
          jsondata.posts[i].title = req.body.title;

          if(req.body.author !== undefined)
          jsondata.posts[i].author = req.body.author;

          if(req.body.views !== undefined)
          jsondata.posts[i].views = req.body.views;

          if(req.body.reviews !== undefined)
          jsondata.posts[i].reviews = req.body.reviews;

          fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
          res.send("Patched!")
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.patch('/authors/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = req.params.id;
    var flag = 0;
    for (var i in jsondata.authors) {
        if (jsondata.authors[i].id == id) {
          flag = 1;
          
          if(req.body.first_name !== undefined)
          jsondata.authors[i].title = req.body.first_name;

          if(req.body.last_name !== undefined)
          jsondata.authors[i].author = req.body.last_name;

          if(req.body.posts !== undefined)
          jsondata.authors[i].views = req.body.posts;


          fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
          res.send("Patched!")
        }
    }
    if(flag == 0)
    res.send("Not Found!")
});

app.delete('/posts/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    const id = parseInt(req.params.id);
    var flag = 0;
    var filtered = jsondata.posts.filter(function(item) { 
        flag = 1;
        return item.id !== id;  
    });
    
    jsondata.posts = filtered;
    fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
    
    if(flag == 0)
    res.send("Not Found!")
    else
    res.send("Deleted!")
});

app.delete('/authors/:id', (req, res) => {
    let rawdata = fs.readFileSync('store.json');
    let jsondata = JSON.parse(rawdata);
    var id = parseInt(req.params.id);

    var flag = 0;
    var filtered = jsondata.authors.filter(function(item) { 
        flag = 1;
        return item.id !== id;  
    });

    jsondata.authors = filtered;
    fs.writeFileSync('store.json',JSON.stringify(jsondata,null,4));
    
    if(flag == 0)
    res.send("Not Found!")
    else
    res.send("Deleted!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});