
# API-BOX

API-BOX is a lightweight Node.js package that simplifies the process of creating RESTful APIs with pre-configured routes and database integration. It provides a set of pre-built routes for common CRUD operations (Create, Read, Update, Delete), making it easy for developers to set up APIs without writing repetitive code.


## Features

- Pre-configured routes for CRUD operations
- Database integration with customizable models
- Easy setup and integration with Express.js
- Error handling and validation support
- Middleware support for authentication and authorization (coming soon)


## Installation

Install api-box-dex with npm

```bash
  npm install api-box-dex
```
    
## Usage/Examples

### Setting up the Express app

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { api } = require('api-box-dex');
```

### Create an instance of the Express application:

```javascript
const app = express();
```

### Use middleware to parse request bodies:

```javascript
app.use(bodyParser.json());
```

### Using the API routes
#### Mount the API routes provided by API-BOX under the '/api' path:

```javascript
app.use('/api', api);
```

### Starting the server
#### Start the Express server:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```


## API Reference

### API-BOX provides the following pre-configured routes for CRUD operations:

#### Get all items

```http
  GET /api/items
```

#### Get item by ID

```http
  GET /api/items/:id
```

#### Create a new item

```http
  POST /api/items
```

#### Update an item by ID

```http
  PUT /api/items/:id
```

#### Delete an item by ID

```http
  DELETE /api/items/:id
```




## Contributing

Contributions are always welcome!

You can customize the behavior of API-BOX by extending the provided models or by adding middleware to the Express app.

