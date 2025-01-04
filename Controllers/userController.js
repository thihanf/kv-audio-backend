import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {
  const data = req.body;

  data.password = bcrypt.hashSync(data.password, 10); //encrypt the passsword(the entered value must be exact,a simple change will give an unique hash )

  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      res.json({ message: "User registered successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "User registration fail" });
    });
}

export function loginUser(req, res) {
  const data = req.body;

  User.findOne({
    email: data.email, // finds the value
  }).then((user) => {
    // the above value is asssigned to the user
    if (user == null) {
      res.status(404).json({ error: "User not found" });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        data.password,
        user.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          "kv-secret-89!" // password for encrypting(token)
        );
        // compares the password recently entered with the database which is currently hashed.
        res.json({ message: "Login succcessful", token: token });
      } else {
        res.status(401).json({ errror: "Login failed" });
      }
    }
  });
}
