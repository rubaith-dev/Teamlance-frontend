# Your Project Name
This is Frontend code for the teamlance frontend assessment Which will consume the api. Tech stack used in this project
- `React` - Frontend Library
- `NextJs` - Frontend Framework
- `React Context Api` - Frontend State Management
- `TailwindCSS` - CSS library
- `React-Query` - Data fetching and Caching
- `Axios` - Http Requests
- `React Hook Form` - Form Management
- 
## Features
- ##### `User authentication with cookie-based session management`
- ##### `Sign up and sign in functionality (Strict Focus on the security, every request goes through multiple validation)`
- ##### `Access control for authenticated users (Only signed in users can access their data)`
- ##### `Using cache system to not fetch products/data until the data requires updated server data`
- ##### `CRUD operations for managing products`
- ##### `Batch delete functionality for products`
- ##### `Product category management(Add and Delete)`
- ##### `Server-side rendering (SSR) for improved performance and prefetching data in the server side`
- ##### `Easy hydration and dyhydration management for better SSR and CSR Performance`

Test Cases for both back and frontend
User Registration:
- Test successful user registration.
- Test validation for required fields (username, password).
- Test validation for password strength and complexity.
- Test error handling for duplicate usernames.

User Login:
- Test successful user login.
- Test validation for required fields (username, password, confirm password).
- Test error handling for invalid credentials.
- Test that a user is redirected to the authenticated section after successful login.

User Authentication:
- Test that authenticated users can access protected routes/pages.
- Test that unauthenticated users are redirected to the login page when accessing protected routes/pages.
- Test that authenticated users cannot access the login page.
- Layout renders based on authentication

Product Management:
- Test adding a new product.
- Test editing an existing product.
- Test deleting a product.
- Test that only the owner of a product can edit or delete it.
- Test that only can view the list of users products.

Batch Delete Functionality:
- Test selecting multiple products and deleting them together.
- Test that only the owner of the products can perform batch delete.
- Test error handling for invalid selections.

Product Categories:
- Test adding a new category.
- Test deleting a category.
- Test that all users can view the list of categories.
- Test that a category is visible to all users once created.

Cookie-based Authentication:
- Test that a valid cookie is required for authenticated access.
- Test that an invalid or expired cookie redirects to the login page.
- Test that a new cookie is generated upon successful login.

Server-Side Rendering (SSR):
- Test that SSR is functioning correctly for protected routes/pages.
- Test that the initial state is properly hydrated on the client-side.

Error Handling:
- Test error handling for invalid requests or unexpected server responses.
- Test error messages and status codes.

Integration Testing:
- Test end-to-end user flows, such as registration, login, and performing actions on products.

#### `You will see a lots of small but crucial edge cases were also taken care of, if you test it thoroughly.`


## Some Important notes:
- #### `Before going into installation please make sure your backend runs on port 4000 `
- #### `your frontend should run on port 3000 if the port doesn't match, the application will break. `
- #### `As there is cookie based authentication system implemented only localhost:3000 can access the backend resources` 
- #### `If you open the frontend in different port, please make sure you change the port in below code in index.js of backend app.`
- #### `app.use(cors({origin: "http://localhost:{YourPortNumber}",credentials:true}));`

## Prerequisites
Before running the project, make sure you have the following installed:
- Node.js (version X.X.X)
- npm (version X.X.X) or Yarn (version X.X.X)

## Getting Started
Follow these instructions to get the project up and running on your local machine.

### 1. Clone the Repository
Clone this repository to your local machine using the following command: 
````git clone https://github.com/rubaith-dev/Teamlance-frontend.git````

### 2. Install Dependencies
Navigate to the project's root directory and install the required dependencies by running the following command:
```
cd teamlance-frontend / (Your local folder where project was cloned)
npm install / yarn
```

### 3. Set Up Environment Variables
Create a new file named `.env` in the project's root directory. Copy the following environment variable configuration into the `.env` file:
```
BASE_URL = "http://localhost:4000/api/v1"
```
`Make Sure your your backend runs on port 4000 if there is any change, change it here also.`

### 5. Start the Server
Start the backend server by running the following command:
`npm run dev/yarn dev`

### `The server will be running on http://localhost:3000.`
