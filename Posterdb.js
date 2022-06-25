import { client } from './index.js';
import {ObjectId} from "mongodb";
export async function Posterput(pid, updateData) {
    return await client.db("socialmedia")
        .collection("Poster").updateOne({pid:pid  }, { $set: updateData });
}
export function Postdelete(pid) {
    return client.db("socialmedia")
        .collection("Poster").deleteOne({pid:pid   });
}
export async function Posterget(pid) {
    return await client.db("socialmedia")
        .collection("Poster").findOne({ pid:pid});
}
export async function Posterpost(data1) {
    return await client.db("socialmedia")
        .collection("Poster").insertOne(data1);
}

