# BloodConnect Backend

BloodConnect is a backend application for managing blood donation and connection services. This project is built using Node.js, Express, and MongoDB, with JWT for authentication and authorization.

## Features

- **User Authentication and Authorization:** Secure login and signup using JWT.
- **RESTful API Endpoints:** Manage users, donors, and blood requests.
- **MongoDB Integration:** Efficient data storage and retrieval with Mongoose.
- **Password Security:** Secure password hashing using bcrypt.
- **Error Handling and Logging:** Robust error handling and meaningful logging for debugging.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for scalable data storage.
- **Mongoose**: ODM for MongoDB to simplify schema management.
- **JSON Web Tokens (JWT)**: For secure authentication and authorization.
- **bcrypt**: For secure password hashing.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **MongoDB** (v4 or later): [Download MongoDB](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js): For managing dependencies.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdulrafayoc/Blood-Connect-Backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BloodConnect
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```



## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate an existing user and generate a token.
- **GET /api/auth/profile**: Retrieve the authenticated user's profile.
- **PATCH /api/auth/profile**: Update the authenticated user's profile.

### Donors

- **GET /api/donors/donations**: Retrieve a list of donations made by the authenticated donor.
- **POST /api/donors/donations**: Record a new donation made by the authenticated donor.
- **GET /api/donors/eligibility**: Check the eligibility of the authenticated donor for making a donation.

### Recipients

- **GET /api/recipients/requests**: Retrieve a list of blood requests made by the authenticated recipient.
- **POST /api/recipients/requests**: Submit a new blood request as a recipient.
- **PATCH /api/recipients/requests/:id**: Update an existing blood request by ID.

### Blood Bank Staff

- **GET /api/blood-bank/inventory**: Retrieve the current blood inventory managed by the blood bank staff.
- **POST /api/blood-bank/inventory**: Add new inventory items to the blood bank's stock.
- **GET /api/blood-bank/requests**: Retrieve all blood requests managed by the blood bank.
- **PATCH /api/blood-bank/requests/:id**: Update the status of a blood request by ID.


## Folder Structure

```
BloodConnect/
├── controllers/     # Request handlers for different routes
├── models/          # MongoDB schemas
├── routes/          # API routes
├── middleware/      # Authentication and error-handling middleware
├── utils/           # Utility functions
├── .env             # Environment variables
├── server.js        # Main server file
└── README.md        # Documentation
```

## Development

To run the project in development mode with hot reloading, use:
```bash
npm run dev
```

## Contributing

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for tools and resources that made this project possible.
- Inspired by the mission to simplify and support blood donation processes.


