// Import required modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// Define server hostname and port number
const hostname = '127.0.0.1';
const port = 3000;

// Define routes and their respective HTML pages
const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/shop': 'shop.html',
  '/app': 'app.html',
  '/support': 'support.html',
  '/login': 'login.html',
  '/admin': 'admin.html'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse requested URL and get the path name
  const pathname = url.parse(req.url).pathname;

  // Check if requested path name is a defined route
  if (routes[pathname]) {
    // Read HTML file for the requested route
    fs.readFile(routes[pathname], (err, data) => {
      if (err) {
        // Send 404 Not Found error if HTML file is not found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
      } else {
        // Send HTML page with navbar
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title>My Pirate Website</title>');
        res.write('<style>');
        res.write('nav { background-color: #1A1A1D; display: flex; justify-content: space-between; align-items: center; padding: 20px; }');
        res.write('nav a { color: #fff; text-decoration: none; padding: 10px; font-size: 20px; }');
        res.write('.logo { font-size: 30px; }');
        res.write('.login-btn { background-color: #fff; color: #1A1A1D; border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; }');
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<nav>');
        res.write('<div>');
        res.write('<a class="logo" href="/">Pirate Website</a>');
        res.write('<a href="/about">About</a>');
        res.write('<a href="/shop">Shop</a>');
        res.write('<a href="/app">App</a>');
        res.write('<a href="/support">Support</a>');
        res.write('</div>');
        res.write('<div>');
        res.write('<a class="login-btn" href="/login">Log In</a>');
        res.write('</div>');
        res.write('</nav>');
        res.write(data);
        res.write('</body>');
        res.write('</html>');
        res.end();
      }
    });
  } else {
    // Send 404 Not Found error if requested path name is not a defined route
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found');
  }
});

// Start server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
