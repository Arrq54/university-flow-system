import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("API running");
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
