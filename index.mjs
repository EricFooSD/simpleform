import express from 'express';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import bindRoutes from './routes.mjs';

// Initialise Express instance
const app = express();
// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
// Expose the files stored in the distribution folder
app.use(express.static('dist'));
// Bind storage of files
app.use(express.static('uploads'));

// Bind route definitions to the Express application
bindRoutes(app);

// Expose keys in .env file
dotenv.config();

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
