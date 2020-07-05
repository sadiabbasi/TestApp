//Constructors are defined below this section
var express = require('express');
var router = express.Router();

//controllers are defined below this line.
const userController = require("./controller/user");
const availabilityController = require("./controller/availability");
const sellerController = require("./controller/seller");
// Middleware are defined below this line
const { authenticate } = require("./middleware/authenticate");

// Define API routes
router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.post("/availability", authenticate, availabilityController.setAvailability)
router.get("/availability", authenticate, availabilityController.getAvailability)
router.put("/availability", authenticate, availabilityController.updateAvailabilityStatus);
router.get("/sellerListing", authenticate, sellerController.sellerListing);
router.post("/bookAppointment",authenticate, sellerController.bookAppointment);
router.get("/appointments", authenticate, sellerController.appointments)
router.put("/appointments", authenticate, sellerController.updateAppointmentStatus)
router.post("/selectedSlots",authenticate, sellerController.selectedSlots)
module.exports = router;