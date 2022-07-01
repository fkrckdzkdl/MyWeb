var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; //array like {id:xxx}

    var title = queryData.id;
    if(title==null){title='WEB'}; //홈화면
    
    var pathname =url.parse(_url,true).pathname; //파라미터 부분을 제외한 url
    if(pathname=='/index.html') pathanme='/'; //index.html 요청시 홈화면이동

    // 파일리스트 받아오는
    var fs = require('fs');
    const fileFolder='./data/'
    var contentsList='<ol>';
    console.log(url.parse(_url,true).pathname);
    fs.readdir(fileFolder,(err,files)=>{
        files.forEach(file=>{
          console.log(file);
          contentsList=contentsList+`<li><a href="/?id=${file}">${file}</a></li>`
        });
        contentslist=contentsList+'</ol>';
    })

    if(pathname=='/'){
  fs.readFile(`data/${title}`,'utf-8',(err,description)=>{
          // 변수하나 선언하고 거기다가 받아온 파일의 내용도 담고 다 담고 해서 response.end()로 출력 !
          var templet=`
      <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${contentsList}
    <h2>${title}</h2>
    ${description}
  </body>
  </html>
      `;
    response.writeHead(200);  //200번 일때 응답
    response.end(templet); //여기 들어가는 값이 웹페이지에 출력되는구나 !
});
}else{
  response.writeHead(404);   //404일때 응답
  response.end('not found');
}
});
app.listen(3000);