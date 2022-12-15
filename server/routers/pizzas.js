const { Router } = require("express");
const Pizza = require("../models/Pizza");
const router = Router();

router.post("/", (request, response) => {
  const newPizza = new Pizza(request.body);
  newPizza.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
