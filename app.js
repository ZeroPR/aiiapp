const $ = require('jquery');
const http = require('http');
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');

let apiNewsURL = "http://aii-wp-rfig081.c9users.io/api/list.json";
let apiEventURL = "";
let apiAcademico = "";

let data = "";

$('#close-btn').click((e)=>{
    e.preventDefault();
    ipcRenderer.send('close-btn-click');
});
$('#max-btn').click((e)=>{
    e.preventDefault();
    ipcRenderer.send('max-btn-click');
});
$('#min-btn').click((e)=>{
    e.preventDefault();
    ipcRenderer.send('min-btn-click');
});

function displayNews(data)
{
    let content = $('#content');
    content.empty();
    data.forEach(function(noticia) {
        content.append('<div class="card"><img class="card-image" src="'+ noticia.image_url +'" /><div class="card-content"><a href="'+noticia.news_url+'" target="_blank"><h5>'+noticia.title+'</h5></a></div></div>');
    });
}

$('#news').click((e)=>{
    e.preventDefault();
    

    http.get(apiNewsURL, (res) => {
    
    //If server not found
    if(res.statusCode == 404){
        data = fs.readFile('data/lastNews.json', (err)=>{
            if(err){
                console.log(err);
            }
        });
    }

    //Mientra envie data.
    res.on('data', (chunk)=>{
        data += chunk;
        //console.log(""+chunk);
    });
    
    console.log("News Click");
    //Cuendo termine el response.
    res.on('end', ()=>{
        console.log(data);
        data = JSON.parse(data);
        displayNews(data);
        fs.writeFile('data/lastNews.json');
    });
    
    });
})

$('#events').click((e)=>{
    e.preventDefault();
    console.log("Events Click");

    http.get(apiEventURL, (res) => {
    
    //Mientra envie data.
    res.on('data', (chunk)=>{
        data += chunk;
    });
    
    //Cuendo termine el response.
    res.once('end', ()=>{
        console.log(data);
        data = JSON.parse(data);
        displayEvents(data);
    });
    
    });
})

$('#academic').click((e)=>{
    e.preventDefault();
    console.log("Academico Click");

    http.get(apiAcademico, (res) => {
    
    //Mientra envie data.
    res.on('data', (chunk)=>{
        data += chunk;
    });
    
    //Cuendo termine el response.
    res.once('end', ()=>{
        console.log(data);
        data = JSON.parse(data);
        displayAcademic(data);
    });
    
    });
})