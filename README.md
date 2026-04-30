# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



Customer Management Dashboard
A full-stack web application to add, view, and delete customers using React + Node.js + Express.

Features

Add a new customer with Name, Email, Phone Number
View all customers in a table with alternating row colours
Delete any customer with a red Delete button + confirm dialog
Client-side form validation
In-memory backend storage (resets on server restart)
Responsive layout — works on mobile and desktop


Project Structure
customer-mgmt/
├── backend/
│   ├── server.js          ← Express REST API (all 3 routes)
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         ← Top navigation bar
    │   │   ├── CustomerForm.jsx   ← Add customer form
    │   │   └── CustomerTable.jsx  ← Customer list table
    │   ├── App.js                 ← Root — state + fetch + delete logic
    │   ├── App.css                ← Global styles
    │   └── index.js               ← React entry point
    └── package.json

API Endpoints
MethodEndpointDescriptionResponseGET/customersGet all customers[{ id, name, email, phone }]POST/customersAdd a new customer{ id, name, email, phone }DELETE/customers/:idDelete a customer by UUID{ message }
POST /customers — Request Body
json{
  "name":  "Priya Sharma",
  "email": "priya@example.com",
  "phone": "9876543210"
}

Setup & Running
1. Backend
bashcd backend
npm install
npm start          # runs on http://localhost:5000
# or for auto-reload:
npm run dev
2. Frontend
bashcd frontend
npm install
npm start          # runs on http://localhost:3000
Open http://localhost:3000 in your browser. The frontend calls the backend at http://localhost:5000.

Assumptions

No database — data is stored in a JavaScript array and resets on server restart.
Both servers must be running simultaneously.
CORS is enabled on the backend so the React dev server can call it.
uuid is used to generate unique IDs for each customer.
#