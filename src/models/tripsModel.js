import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToDatabase from "../config/dbConfig.js";

const connection = await connectToDatabase(process.env.STRING_CONNECTION);

export async function getAllTrips() {
    const db = connection.db("tripics");
    const collection = db.collection("trips");
    return collection.find().toArray();
}

export async function getTripById(id) {
    const db = connection.db("tripics");
    const collection = db.collection("trips");
    const objId = ObjectId.createFromHexString(id);
    return collection.findOne({_id: objId});
}

export async function createTrip(newTrip) {
    const db = connection.db("tripics");
    const collection = db.collection("trips");
    return collection.insertOne(newTrip);
}

export async function updateTrip(id, newTrip) {
    const db = connection.db("tripics");
    const collection = db.collection("trips");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objId)}, {$set:newTrip});
}

export async function deleteTrip(id) {
    const db = connection.db("tripics");
    const collection = db.collection("trips");
    const objId = ObjectId.createFromHexString(id);
    return collection.deleteOne({_id: objId});
}