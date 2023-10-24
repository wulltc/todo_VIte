const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const locallink  = "http://localhost:5173";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "todobd"
});

app.use(cors({
    origin: [{ locallink }],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json({}));

// Afficher toutes les taches
app.get("/api/getAlltache", async (req, res) => {
    const sqlGetTache = "SELECT * FROM tache ORDER BY idtache DESC";
    db.query(sqlGetTache, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

//inserer Une nouvelle tache
app.post("/api/postAddtache", async (req, res, next) => {
    const {titre, etattache} = req.body;
    const sqlInsertTache =
        "INSERT INTO tache (titre, etattache) VALUES (?, ?)";
    db.query(sqlInsertTache, [titre, etattache], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send({ result });
        next()
    });

});


// Modifier une tache
app.put("/api/putModifTache/:id", async (req, res, next) => {
    const id = req.params.id;
    const {etattache} = req.body;
    const sqlUpdateTache = "UPDATE tache SET etattache = ? WHERE idtache = " + id;
    db.query(sqlUpdateTache, [etattache, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
        next()
    });
});


//Supprimer une tache
app.delete("/api/delSupprTache/:idtache", async (req, res) => {
    const idtache = req.params.idtache;
    const sqlRemoveTache = "DELETE FROM tache WHERE idtache  = " + idtache;
    db.query(sqlRemoveTache, { idtache }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

app.listen(5000, () => {
    true ? console.log("serveur est actif au port 5000") : console.log('le serveur est innactif')
})