import Contact from "@/models/Contact";
import connectDB from "@/utils/connectDB";
import { isValidObjectId } from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { _id } = req.query;

  if (isValidObjectId(_id)) {
    if (req.method == "GET") {
      const contact = await Contact.findById(_id);
      if (contact) {
        res.json(contact);
      } else {
        res.json({ message: "contact not found" });
      }
    } else if (req.method == "DELETE") {
      const result = await Contact.findByIdAndDelete(_id);
      if (result) {
        res.status(200).json({ message: "contact deleted succsessfully" });
      } else {
        res.status(404).json({ message: "contact not found" });
      }
    } else if(req.method == "PUT") {
        await Contact.findByIdAndUpdate(_id, req.body)
        res.json({message: "contact update successfully"})
    }
  } else {
    res.json({ message: "object is not valid" });
  }
}
