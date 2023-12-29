# Square Integration Sample Project

This project demonstrates a basic integration with Square's APIs, including creating customers, orders, and subscriptions using the Square SDK in a Node.js environment. It includes an HTML interface for card payments and a Node.js server setup.

## Features

- Initialize Square payments in a web application.
- Create a secure HTTPS server to serve the payments interface.
- Create customers, orders, and subscriptions using Square APIs.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- Square Developer account and credentials.
- SSL certificate files for HTTPS server (`key.pem` and `cert.pem`).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adanzweig/nodejs-square.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nodejs-square
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables in a `.env` file:
   ```
   ACCESS_TOKEN=[Your Square Access Token]
   LOCATION_ID=[Your Square Location ID]
   NONCE=[Payment Source ID]
   ```

### Usage

1. Start the server:
   ```bash
   node server.js
   ```

2. Open `https://localhost:8000` in your web browser to access the payment interface.

3. Use the scripts in `index.js` to interact with the Square API for creating customers, orders, and subscriptions.

## Structure

- `server.js`: Sets up an HTTPS server to serve the payment interface.
- `card.html`: HTML file with the payment interface.
- `index.js`: Contains functions to interact with Square's customers, orders, and subscriptions APIs.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open issues to suggest improvements or add new features.
