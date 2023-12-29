// Load environment variables from .env file
require('dotenv').config();
// Importing necessary modules from the Square SDK
const { Client, Environment } = require('square');

// Initializing the Square client with the environment and access token
const client = new Client({
    environment: Environment.Sandbox, // Using the sandbox environment for testing
    accessToken: process.env.ACCESS_TOKEN // Access token from environment variable
});

// Function to create a new customer in Square
async function createCustomer(name, lastname, email) {
    try {
        // API call to create a new customer
        const { result } = await client.customersApi.createCustomer({
            givenName: name,
            familyName: lastname,
            emailAddress: email
        });
        return result;
    } catch (error) {
        // Log any errors encountered
        console.error(error);
    }
}

// Function to create an order template
async function createOrderTemplate(quantity, name, price, currency) {
    try {
        // API call to create a new order
        const { result } = await client.ordersApi.createOrder({
            order: {
                locationId: process.env.LOCATION_ID, // Location ID from environment variable
                referenceId: '123466789', // Arbitrary reference ID
                state: 'DRAFT', // Order state
                lineItems: [{ // Details of the order item
                    quantity,
                    name,
                    basePriceMoney: {
                        amount: BigInt(price), // Price as BigInt
                        currency
                    }
                }]
            },
            idempotencyKey: '12345678123' // Idempotency key for safe retries
        });
        return result;
    } catch (error) {
        // Log any errors encountered
        console.error('error', error);
    }
}

// Function to create a subscription
async function createSubscription(customerId, orderId, planId) {
    try {
        // API call to create a new subscription
        const { result } = await client.subscriptionsApi.createSubscription({
            idempotencyKey: '12341234', // Idempotency key for safe retries
            locationId: process.env.LOCATION_ID, // Location ID from environment variable
            customerId, // Customer ID for the subscription
            sourceId: process.env.NONCE, // Payment source ID from environment variable
            planVariationId: planId, // ID of the plan variation
            phases: [{ // Phase details of the subscription
                ordinal: BigInt(0),
                orderTemplateId: orderId
            }]
        });
        return result;
    } catch (error) {
        // Log any errors encountered
        console.error('error', error);
    }
}

// Self-invoking async function to execute the operations
(async () => {
    // Create a customer
    const customer = await createCustomer('Ado', 'I am', 'codingwithado@gmail.com');
    console.log(customer);
    // Create an order template
    const order = await createOrderTemplate('1', 'Patreon', 100, 'USD');
    console.log(order);
    // Create a subscription
    const subscription = await createSubscription(customer.customer.id, order.order.id, '4XJNVK7WEDBYSKE3WE7MHPCU');
    console.log(subscription);
})();
