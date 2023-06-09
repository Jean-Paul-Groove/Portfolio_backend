const db = require("../database");
const guestUser = db.guestUser;
const adminUser = db.adminUser;

exports.getAbout = async (req, res, next) => {
  try {
    const [result] = await guestUser.query("SELECT * FROM about");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateAbout = async (req, res, next) => {
  try {
    const { name, img, description } = req.body;
    await adminUser.query(
      "UPDATE about set name=?,img=?,description=? WHERE id=1",
      [name, img, description]
    );
    res.status(200).json({ message: "Introduction modifiée avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
