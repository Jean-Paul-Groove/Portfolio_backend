const db = require("../database");
const guestUser = db.guestUser;
const adminUser = db.adminUser;

exports.getProjects = async (req, res, next) => {
  try {
    const result = await guestUser.query("SELECT * from projet");
    const projects = result[0];
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "Projets introuvable ..." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneProject = async (req, res, next) => {
  try {
    const projectID = req.params.id;
    const [result] = await adminUser.query(
      "SELECT * from projet WHERE id = ?",
      [projectID]
    );
    const project = result[0];
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Projet introuvable ..." });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { title, img, tags, url, description } = req.body;
    console.log(title, img, tags, url, description);
    await adminUser.query(
      "INSERT into projet (title,img,tags,url,description) values (?,?,?,?,?)",
      [title, img, tags, url, description]
    );
    res.status(201).json({ message: "Projet ajouté avec succès" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const projectID = req.params.id;
    const { title, img, tags, url, description } = req.body;
    await adminUser.query(
      "UPDATE projet set title= ?, img= ?,tags= ? , url=?, description=? WHERE id= ?",
      [title, img, tags, url, description, projectID]
    );
    res.status(200).json({ message: "Projet modifié avec succès" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const projectID = req.params.id;
    await adminUser.query("DELETE FROM projet WHERE id= ? LIMIT 1", [
      projectID,
    ]);
    res.status(200).json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
