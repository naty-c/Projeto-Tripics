import express from "express";
import multer from "multer";
import cors from "cors";
import { listTrips, listTripById, addNewTrip, uploadImage, updateTripById, deleteTripById } from "../controllers/tripsController.js";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const upload = multer({dest:"./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption));

    app.get("/trips", listTrips);
    app.get("/trips/:id", listTripById);
    app.post("/trips", addNewTrip);
    app.post("/upload", upload.single("image"), uploadImage);
    app.put("/upload/:id", updateTripById);
    app.delete("/trips/:id", deleteTripById);
}

export default routes;