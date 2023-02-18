/// https vanilla
const http = require('http');

const server = http.createServer((req, res) => {

  var KeepAliveAgent = require('keep-alive-agent');
  let agent = new KeepAliveAgent();

  server.listen(8080);

  if (req.method === 'POST') {
    console.log("Valid request method!");

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const reqparse = JSON.parse(body);
      // const text - type = reqparse.text - type;

      if (reqparse.text - type === 'JSON') {
        console.log("Valid request formatting!");
        res.end('{"text-type":"JSON", "valid":"true"}');
      }

    });

  }



  else {
    console.log("Invalid request method! We need a POST request, and not a " + req.method + " request!");
  }

});

