    const express = require("express");

    const app = express();
    app.use(express.json());

    app.get("/movies", (req, res) => {
        res.json([
            { id: 1, title: "Inception", year: 2010 },
            { id: 2, title: "The Matrix", year: 1999 }
        ]);
    });

    app.post("/login", (req, res) => {
        const { username, password } = req.body;
        if(username === "Hao" && password === "123456") {
            return res.json({success: true, message: "Login successful" });
        } else {
            return res.json({success: false, message: "Invalid credentials" });
        }
    });

    app.get("/profile", (req, res) => {
        res.json({ message: "Profile endpoint" });
    });

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });