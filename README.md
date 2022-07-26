THE PROJECT APIs ARE BUILT IN NODE.JS AND MONGODB DATABASE.

STEPS TO RUN APIs:
1)CLONE THE REPOSITORY
2)RUN COMMAND "npm i" (this will install all the dependencies)
3)RUN COMMAND "npm start or npm run dev"

ALL THE DATA IS BEING SAVED ON MY MONGODB ATLAS CLOUD

1) Auth APIs
ROUTE FOR BUYER REGISTER AUTHENTICATION (POST)
/api/auth/buyer/register 

ROUTE FOR BUYER LOGIN AUTHENTICATION (POST)
/api/auth/buyer/login

ROUTE FOR SELLER REGISTER AUTHENTICATION (POST)
/api/auth/seller/register

ROUTE FOR SELLER LOGIN AUTHENTICATION (POST)
/api/auth/seller/login


2)APIs for buyers

a)Get a list of all sellers (GET)
/api/buyer/list-of-sellers

b)Get the catalog of a seller by seller_id (GET)
/api/buyer/seller-catalog/:seller_id

c)Send a list of items to create an order for seller with id = seller_id (POST)
/api/buyer/create-order/:seller_id 

3) APIs for sellers

a)Send a list of items to create a catalog for a seller (POST)
/api/seller/create-catalog

b)Retrieve the list of orders received by a seller (GET)
/api/seller/orders/:seller_id






