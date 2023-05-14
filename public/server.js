const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

// Initialize Firebase Admin SDK
admin.initializeApp();

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

// Define route handlers
app.get('*', (req, res) => {
  const pathname = req.path;

  if (routes[pathname]) {
    const filePath = `${__dirname}/public/${routes[pathname]}`;

    // Read HTML file for the requested route
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Send 404 Not Found error if HTML file is not found
        res.status(404).send('404 Not Found');
      } else {
        // Send HTML page with navbar
        const html = `
          <html>
            <head>
              <title>My Pirate Website</title>
              <style>
                nav { background-color: #1A1A1D; display: flex; justify-content: space-between; align-items: center; padding: 20px; }
                nav a { color: #fff; text-decoration: none; padding: 10px; font-size: 20px; }
                .logo { font-size: 30px; }
                .login-btn { background-color: #fff; color: #1A1A1D; border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; }
              </style>
            </head>
            <body>
              <nav>
                <div>
                  <a class="logo" href="/">Pirate Website</a>
                  <a href="/about">About</a>
                  <a href="/shop">Shop</a>
                  <a href="/app">App</a>
                  <a href="/support">Support</a>
                </div>
                <div>
                  <a class="login-btn" href="/login">Log In</a>
                </div>
              </nav>
              ${data}
            </body>
          </html>
        `;

        res.status(200).send(html);
      }
    });
  } else {
    // Send 404 Not Found error if requested path name is not a defined route
    res.status(404).send('404 Not Found');
  }
});

// Export the Express app as a Firebase Cloud Function
exports.app = functions.https.onRequest(app);
