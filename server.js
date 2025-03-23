const http= require("http"); //  Import the http module to create a server
url=require("url");     //Import the file system module to read/write files
fs= require("fs");      //  Import the url module to parse incoming URLs


// Creates an HTTP server that listens for incoming requests.
http.createServer(function(request,response)  {
    // Get the requested URL from the client
    // request.url only gives the path (eg./documentation)
    let addr=request.url;

    // Parse the URL to extract the details..
    // Construct the full URL: request.headers.host contains the host and port (e.g., localhost:8080).
    //'http://' + request.headers.host creates a full base URL
    let q = new URL(addr, 'http://' + request.headers.host);

    // Initialize filePath variable to determine which file to serve
    let filePath = '';

     // Append request details to log.txt (logs every request made to the server)
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err); // Print error if file logging fails
        } else {
            console.log('Added to log.'); // Confirm successful logging
        }
    });

    // Check if the requested URL contains "documentation"
    if (q.pathname.includes('documentation')) {
        //__dirname is a built-in Node.js variable that represents the absolute path of the directory 
        // where the current script (server.js) is running:__dirname gives the absolute path of the script.
        // __dirname + '/documentation.html' creates a full file path to documentation.html.
        filePath = (__dirname + '/documentation.html'); // Serve documentation.html
    } else {
        filePath = 'index.html'; // Default to index.html for other requests
    }

    // Read the chosen file (either index.html or documentation.html)
    // Takes 2 arguments: 1.filePath (String) → The path to the file that needs to be read.
    // 2.A Callback Function → Handles the result once the file is read. Takes 2 parameters:-
    //err (Error Object) → If an error occurs while reading the file, this will contain details. Otherwise, it's null.
    //data (Buffer or String) → If the file is read successfully, this contains the file contents.

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If the file is not found or there's an error, send a 404 response
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 - File Not Found');
            return; //Stop execution here
        }
        
        // If the file is found, send a successful response with the file content
        // adds a header to the response that will be returned, along with the HTTP status code 200 for "OK"
        response.writeHead(200,{'Content-Type': 'text/html'} ) ;
        response.write(data);
        response.end(); // End the response
    });

}) .listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
}); // listens for a response on port 8080