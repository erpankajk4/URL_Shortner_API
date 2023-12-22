# URL Shortener API
This is a URL shortener API allows users to shorten lengthy URLs and provides a secure way to access the original URLs using shortened versions.

## Deployment Link on railway
https://urlshortnerapi-production.up.railway.app/

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB connection string (update .env file)
- Dependencies installed (`npm install`)

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Update the `.env` file with your MongoDB connection string.

### Starting the Server

Run the server using `npm start`.

## Usage

### API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in to get authentication token.
- **POST /url/shorten**: Shorten a URL (requires authentication).
- **GET /url/:shortURL**: Redirect to the original URL.
- **GET /url/allShortenURLs**: Redirect to the original URL (requires authentication).

## Key Functionalities

### Authentication
- **Register**: Create a user account with a unique username and password.
- **Login**: Authenticate and receive a JWT token for accessing protected endpoints.
- **Logout**: End the user session.

### URL Shortening
- **Shorten URL**: Generates a short URL for a given original URL.
- **Redirect**: Redirects from a short URL to the original URL.

### Libraries and Packages
This project utilizes several key libraries and packages:

- **Express**: Fast, minimalist web framework for Node.js.
- **express-session**: Middleware for managing sessions in Express.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Passport**: Authentication middleware for Node.js.
- **passport-jwt**: Passport strategy for authenticating with JSON Web Tokens (JWT).
- **passport-local**: Passport strategy for authenticating with a username and password.
- **bcryptjs**: Library for hashing passwords.
- **shortid**: Library for generating short, unique IDs.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **body-parser**: Middleware for parsing incoming request bodies.
- **dotenv**: Loads environment variables from a `.env` file.

### Implementation Details
This API uses an MVC (Model-View-Controller) pattern:
- **Controllers**: Handle logic for authentication (`authController.js`) and URL operations (`urlController.js`).
- **Models**: Define schemas for users (`User.js`) and URLs (`URL.js`).
- **Routes**: Define API endpoints in `authRoutes.js` and `urlRoutes.js`.
- **Configuration**: Passport for authentication (`passport.js`) and Mongoose for database connection (`mongoose.js`).
- **Utilities**: `shorten.js` generates short URLs.

### Testing with Postman
#### Register User
- **Endpoint**: `POST /auth/register`
- **Body**: `{ "username": "your_username", "password": "your_password" }`
- **Description**: Register a new user.

#### Login User
- **Endpoint**: `POST /auth/login`
- **Body**: `{ "username": "your_username", "password": "your_password" }`
- **Description**: Obtain JWT token for authentication.
Note: Copy this JWT token for authentication

#### Shorten URL
- **Endpoint**: `POST /url/shorten`
- **Headers**: `Authorization: Bearer <your_token>`
- **Auth**: `Select Type - JWT Bearer`
- **Body**: `{ "originalUrl": "your_original_url" }`
- **Description**: Shorten a URL.

#### Redirect to Original URL
- **Endpoint**: `GET /url/:shortURL`
- **Description**: Redirects to the original URL associated with the short URL.

#### All Shorten URL
- **Endpoint**: `GET /url/allShortenURLs`
- **Headers**: `Authorization: Bearer <your_token>`
- **Auth**: `Select Type - JWT Bearer`
- **Description**: Fetch all urls shorten by user.

### Example
1. Register a user.
2. Login to obtain the JWT token.
3. Use the token in the headers for the `Shorten URL` endpoint.
4. Access the shortened URL using `Redirect to Original URL` endpoint.
5. Access all the shortened URL's using `All Shorten URL` endpoint.

### Notes
- Ensure environment variables (database connection, JWT & Express session secret) are correctly set in the `.env` file.
- Replace placeholders (`your_username`, `your_password`, `your_original_url`) with actual values.
- Refer to the API routes and their associated functionalities described above.

## Project Structure (MVC Pattern)
- controllers
  - authController.js
  - urlController.js
- models
  - User.js
  - URL.js
- routes
  - authRoutes.js
  - urlRoutes.js
- config
  - passport.js
  - mongoose.js
- utils
  - shorten.js
- index.js.js (entry point)
