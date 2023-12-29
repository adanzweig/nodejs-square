// Import required modules: https, fs, and path
const https = require('https');
const fs = require('fs');
const path = require('path');

// Define the path to the HTML file
const htmlFilePath = path.join(__dirname,'card.html');

// Options for HTTPS server including SSL certificate and key
const options = {
    key: fs.readFileSync('key.pem'), // SSL key file
    cert: fs.readFileSync('cert.pem') // SSL certificate file
};

// Create an HTTPS server with specified options
https.createServer(options,(req,res)=>{
    // Handle requests to the root URL '/'
    if(req.url === '/'){
        // Read the HTML file
        fs.readFile(htmlFilePath,'utf-8',(err,html)=>{
            // Handle file reading errors
            if(err){
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }
            // Send the HTML file content in response
            res.writeHead(200);
            res.end(html);
        })
    }else{
        // Handle requests to URLs other than '/'
        res.writeHead(404);
        res.end('Invalid URL');
    }
}).listen(8000); // The server listens on port 8000

// Log to console when the server is running
console.log('Server running on port 8000');
