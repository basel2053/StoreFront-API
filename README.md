# Storefront Backend Project

## Getting Started

# Scripts

->yarn ,for installing packages

->yarn prettier ,for formatting

->yarn lint ,for linting

->yarn jasmine ,for testing

->yarn build ,for reseting testing database and comple typescript

->yarn test ,for migrating up the testing database and testing endpoints and models then reseting the testing database

->yarn watch ,for watching the server

->yarn start ,for starting the server (javascript)

->yarn m-up ,for migrating up the tables of the database

->yarn m-down ,for migrating down all tables of the database

->yarn md-test ,for migrating down all tables of the testing database

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Endpoints

THE SERVER IS USING PORT--> 3000

GET--> '/' , for hello world response

<!-- Products ENDPOINTS -->

GET--> '/products' , to get all products (Index)

GET--> '/products?category' , to get all products based on category (Filter) , example '/products?category=food'

GET--> '/products/:id' , to get a product by its id (Show) , example '/products/1'

POST--> '/products' , to create a product (Create) , require 3 body values name, price, and category. also a token need to be provided to be able to create a product it can be provided through the body or authorization header

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- USERS ENDPOINTS -->

GET--> '/users' , to get all users (Index) , a token need to be provided through body or authorization header

GET--> '/users/:id' , to get a user by id (Show) , a token contains same user id need to be provided in order to view the user, so a specefic user cant view other users information , exmaple '/users/1'

POST--> '/users' , to create a new user (Create) , a token is given once a user is created, require 3 body values firstname , lastname, and password

POST--> '/login' , to signin (authenticate), a token is given once a user sign in , require 2 body values firstname, and password

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- ORDERS ENDPOINTS -->

GET--> '/orders' , to get all orders (Index)

GET--> '/orders/:id' , to get an order by id (Show) , example '/orders/2'

GET--> '/users/:id/orders' , to get a user active order , a token need to be provided of the same user id to be able to access the active order, token can be provided through body or authorization header , example '/users/1/orders'

GET--> '/users/:id/completedorders' , to get a user completed orders , a token need to be provided of the same user id to be able to access the user completed orders, token can be provided through body or authorization header , example '/users/1/completedorders'

POST --> '/orders/:id/products' , to add products to an order and getting order products (cart) , a token need to be provided to make sure the user is adding products to an order that he owns, token can be provided through body or authorization header , require 2 body values quantity, and productId , example '/orders/1/products/'

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Data Shapes

### There are 4 Tables total

1- products--> ( id:number , name:string , price:number , category:string )

2- users--> ( id:number , firstname:string , lastname:string , password:string )

3- orders--> ( id:number , status:string , user_id:number [Foregin Key to users table] )

4- order_products--> ( id:number , order_id:number [Foregin Key to orders table], product_id:number [Foregin Key to products table], quantity:number)

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# JWT functions

1- utilities/signToken.ts --> used for signing a token once a user login or sign up

2- middleware/verifyToken.ts --> verify if a token is sent

3- middleware/authToken.ts --> make sure token user is authorized through the id

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Models

1- Product (Index, Show, Create [Token Required], Filter)
2- User (Index [Token Required],Show [Token of the same user Required] , Create [Gives a Token], Authenticate [Gives a Token])
3- Orders (Index, Show, addProducts[Token of user who owns the order Required], userOrder [Token Required of same user id], userCompletedOrders [Token Required of same user id])

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Unit Testing

1- tests/models --> contains all models crud testing

2- tests/routes --> contains all endpoint testing

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Other Files

1- app.ts --> main file or server file

2- database.ts --> contains the database configuration

3- .env --> contains all the environment variables

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

# Database Setup

Port--> default port (5432)

Using the psql shell to create database user and our database

1- CREATE DATABASE adventure; to create our dev database

2- CREATE DATABASE adventure_test; to create our testing database

3- CREATE USER magical_user WITH PASSWORD 'password123'; creating a database user

4- \c adventure connecting to dev database

5- GRANT ALL PRIVILEGES ON DATABASE adventure to magical_user; giving our user premissions on the database

6- \c adventure_test connecting to testing database

7- GRANT ALL PRIVILEGES ON DATABASE adventure_test to magical_user; giving our user premissions on the database

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->

### Used type (any) for client which contains Pool (database configuration)

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
