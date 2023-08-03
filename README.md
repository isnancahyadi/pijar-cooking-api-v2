# Pijar Cooking API

This repository contains the source code for Pijar Cooking API, a backend application for managing cooking recipe data. It is built using Express.js, Node.js, PostgreSQL, Cloudinary, JSON Web Token (JWT), and password hashing.

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Related Project](#related-project)
- [Authors and Contact Info](#authors-and-contact-info)

## Introduction

Pijar Cooking API is an API designed to support cooking recipe applications. It provides endpoints to manage recipes, ingredients, cooking techniques, user accounts, and more. The API is secured using JSON Web Tokens for authentication and bcrypt for password hashing.

## Demo

Visit the link below for demo.

- :globe_with_meridians: [Pijar Cooking Webiste Demo](https://pijar-cooking-web-v3.vercel.app/)
- :link: [Pijar Cooking API Demo](https://pijar-cooking-api-v2-production.up.railway.app/)

## Technologies Used

The project is built using the following stack:

- Express.js: A fast and minimalist web framework for Node.js, used for building the API endpoints.
- Node.js: The JavaScript runtime that allows executing server-side code.
- PostgreSQL: A powerful open-source relational database for data storage.
- Cloudinary: A cloud-based service used to manage and store images.
- JSON Web Token (JWT): A standard for securely transmitting information between parties as a JSON object.
- bcrypt: A password hashing library to securely store user passwords.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/isnancahyadi/pijar-cooking-api-v2.git
cd pijar-cooking-api-v2
```

2. Install the required dependencies using npm:

```bash
npm install
```

## Configuration

Before running the application, you need to set up the configuration. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
PORT=your_port
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=your_postgres_host
DB_PORT=your_postgres_port
DB_NAME=your_postgres_database_name
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Endpoints

| Method     | Endpoint               | Description                     | Requirement   | Opt Params          |
| ---------- | ---------------------- | ------------------------------- | ------------- | ------------------- |
| **POST**   | /auth/register         | Create an account               |               |                     |
| **POST**   | /user                  | Create an profile account       |               |                     |
| **POST**   | /auth/login            | Login to aplication             |               |                     |
| **POST**   | /recipe                | Create a new recipe             | Authorization |                     |
| **GET**    | /user                  | Get detail user                 | Authorization |                     |
| **GET**    | /recipe                | Get all recipes                 |               | page, limit, search |
| **GET**    | /recipe/new            | Get all new recipes             |               | page                |
| **GET**    | /recipe/detail/:id     | Get detail recipe by ID         |               |                     |
| **GET**    | /recipe/my-recipe      | Get all my recipes              | Authorization | page                |
| **GET**    | /recipe/category       | Get all category name           |               |                     |
| **GET**    | /recipe/category/:slug | Get all recipes by category     |               |                     |
| **PATCH**  | /recipe/:id            | Update an existing recipe by ID | Authorization |                     |
| **PATCH**  | /recipe/image/:id      | Update an image recipe by ID    | Authorization |                     |
| **DELETE** | /recipe/:id            | Delete an existing recipe by ID | Authorization |                     |

If you want the details from this API, you can access the postman documentation below.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/16769588/2s9Xxwwts5)

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, clients need to include a valid JWT token in the `Authorization` header of the request. The token can be obtained by authenticating with the API using the appropriate credentials.

## Error Handling

The API handles errors gracefully and provides informative error responses. If an endpoint encounters an error, it will return an error response with the appropriate HTTP status code and an error message in the response body.

## Related Project

- :desktop_computer: [Pijar Cooking Website ver](https://github.com/isnancahyadi/pijar-cooking-web-v3)
- :iphone: [Pijar Cooking Mobile ver](https://github.com/isnancahyadi/pijar-cooking-mobile)

## Authors and Contact Info

For more information about this project or have any question or need help for development, feel free to contact me.

Isnan Arif Cahyadi

<div id="badges">
  <a href="https://www.linkedin.com/in/isnanarifcahyadi/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:isnan.arifc@gmail.com">
    <img src="https://img.shields.io/badge/GMail-red?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</div>
