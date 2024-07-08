
Step 1:
Unzip the file.
Step 2:
npm install 
Step 3: Put your credentials in the .env file.

PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
REFRESH_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HEL

Step 4: To generate 256-bit keys for JWT

node ./helpers/generate_key.js+

Step 5: Install Redis 

sudo apt-get install redis-server

Step 6: Run Redis Server (Linux Ubuntu)
redis-server

Step 7: Install MongoDB (Linux Ubuntu)

See https://docs.mongodb.com/manual/installation/ for more infos

Step 8: Run Mongo daemon
sudo service mongod start

Step 9: Start the API by
npm start