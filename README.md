# Pizza Order Transaction System
## Overview
This system will receive pizza order transactions from a chain with dozens of branches. It is based on the Lambda Architecture template and the microservices template. A simulator will generate transaction data for orders and branch opening/closing events. The data will be distributed to an Elasticsearch engine via a Kafka server and stored in a MongoDB database. A Node.js-based server will use the stored data to create a dashboard with summary indicators and graphs. Another Node.js-based server will use BigML services to build an association model.

## Technologies Used
* Kafka server (in the cloud)
* Elasticsearch (in a Docker container)
* MongoDB (in the cloud)
* Redis (in a Docker container)
* Node.js
* BigML

## System Components
### Simulator
The simulator will generate a pizza order with a tip and including the time of order, the branch location, and requested toppings. After a random time interval, the simulator will report that the order is complete. The simulator will be written in Javascript and Node.js

Transaction data will include at least the following data:
* Unique order ID number
* Unique branch ID number
* Branch name
* Region (North, Haifa, Center, Dan, South)
* Date and time of order
* Order status (in progress, completed)
* List of toppings for ordering pizza

### Kafka Server
The Kafka server will receive messages from the simulator and distribute them to the Elasticsearch engine and the MongoDB database.

### Elasticsearch (in a Docker container)
Elasticsearch will store the order data for searching in a date range.

### MongoDB (in the cloud)
MongoDB will store the transaction data for training purposes and will be retrieved using a cloud service such as BigML or AWS.

### Redis (in a Docker container)
Redis will save the status of key data as of this moment and will be displayed on the dashboard.

### Node.js-based Dashboard Server
This server will create a card-based dashboard with the following summary indicators:

* Total number of orders currently being processed
* Total number of orders processed on this day
* Number of branches currently open
* Average order processing time

And the following graphs:

* Distribution of orders by region on this day
* Distribution of orders on this day (on a timeline)
* Five branches with the shortest processing time on this day
* Five pizza toppings the most requested on this day

### Node.js-based Association Model Server
This server will use BigML services to build an association model.

## Updating the Dashboard
Redis will keep the status of all the data displayed in the dashboard and will update using the WS protocol.
