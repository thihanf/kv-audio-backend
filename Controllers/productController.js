import Product from "../models/product.js";

export function addProduct(req, res) {
  console.log(req.user);
  // checks if the user has a token.
  if (req.user == null) {
    res.status(401).json({ message: "Please login and try again" });
    return;
  }
  //checks if the user is an admin
  if (req.user.role != "admin") {
    res
      .status(403)
      .json({ message: "you are not authorized to perform this action" });
    return;
  }

  const data = req.body;
  const newProduct = new Product(data);
  newProduct
    .save()
    .then(() => {
      res.json({ message: "Product added successfully" });
    }) // if a semicolon is put here it will stop the process
    .catch((error) => {
      res.status(500).json({ error: "Product addition failed" });
    });
}
