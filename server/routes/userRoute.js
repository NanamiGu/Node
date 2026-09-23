const express = require('express');
const router = express.Router();
const { createUser, getUsers ,getUserByEmail,getUserById ,updateUser ,deleteUser} = require("../controllrs/userController");

router.post("/",createUser);
router.get("/",getUsers); 
router.get("/by-email", getUserByEmail);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;