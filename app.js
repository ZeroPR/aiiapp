const $ = require('jquery');
const http = require('http');
const ipcRenderer = require('electron').ipcRenderer;

let apiURL = "http://aii-wp-rfig081.c9users.io/api/list.json";
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
        content.append('<div class="card"><img class="card-image" src="'+ noticia.image_url +'" /><div class="card-content"><h5>'+noticia.title+'</h5></div></div>');
    });
}

$('#news').click((e)=>{
    e.preventDefault();
    console.log("News Click");
    http.get(apiURL, (res) => {
    
    //Mientra envie data.
    res.on('data', (chunk)=>{
        data += chunk;
    });
    
    //Cuendo termine el response.
    res.once('end', ()=>{
        console.log(data);
        data = JSON.parse(data);
        displayNews(data);
    });
    
    });
})