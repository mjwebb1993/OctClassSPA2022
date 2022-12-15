// 'Import' the Express module instead of http
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const pizzas = require("./routers/pizzas");

dotenv.config();

// Initialize the Express application
const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});
app.get("/echo/:input", (request, response) => {
  const message = request.params.input;
  response.status(418).json({ echo: message });
});

app.get("/users/:id", (request, response) => {
  // express adds a "params" Object to requests
  const id = request.params.id;
  // handle GET request for post with an id of "id"
  response.send(JSON.stringify({ users_id: id }));
});

app.get("/weather/:city", (request, response) => {
  // express adds a "params" Object to requests
  const city = request.params.city;
  // handle GET request for post with an id of "id"
  response.send(
    JSON.stringify({ current: `The weather in ${city} is 73 degrees today.` })
  );
});

app.post("/add", (request, response) => {
  const num1 = request.body.numberOne;
  const num2 = request.body.numberTwo;
  const responseBody = {
    sum: num1 + num2
  };
  response.json(responseBody);
});

app.use("/pizzas", pizzas);

const PORT = process.env.PORT || 4040; // we use || to provide a default value

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
