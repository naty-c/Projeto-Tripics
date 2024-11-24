import fs from "fs";
import generateDescriptionWithGemini from "../services/geminiService.js";
import {getAllTrips, getTripById, createTrip, updateTrip, deleteTrip} from "../models/tripsModel.js";

export async function listTrips(req, res) {
    const trips = await getAllTrips();
    res.status(200).json(trips);
}

export async function listTripById(req, res) {
    const id = req.params.id;

    try {
        const trip = await getTripById(id);

        if (!trip) {
            return res.status(404).json({ "Error": "Trip not found!" });
        }
        res.status(200).json(trip);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition failed!"});
    }
}

export async function addNewTrip(req, res) {
    const newTrip = req.body;

    try {
        const tripCreated = await createTrip(newTrip);
        res.status(200).json(tripCreated);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition failed!"});
    }
}

export async function uploadImage(req, res) {
    const newTrip = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const tripCreated = await createTrip(newTrip);
        const imageUpdated = `uploads/${tripCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imageUpdated)
        res.status(200).json(tripCreated);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition failed!"});
    }
}

export async function updateTripById(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const trip = {
            imgUrl: urlImage,
            description: description,
            alt: req.body.alt
        }

        const tripCreated = await updateTrip(id, trip);
        res.status(200).json(tripCreated);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition failed!"});
    }
}

export async function deleteTripById(req, res) {
    const id = req.params.id;

    try {
        await deleteTrip(id);
        res.status(200).json({ message: "Trip successfully deleted!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition failed!"});
    }
}