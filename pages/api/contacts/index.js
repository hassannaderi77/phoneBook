import Contact from "@/models/Contact";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  await connectDB();

  if (req.method == "GET") {
    let contacts = null;
    const { gen, search } = req.query;
    if (gen && search) {
      //  /api/contacts?gen=value&search=value
      if (gen == "male" || gen == "female") {
        contacts = await Contact.find({
          $and: [
            { gender: gen },
            { $or: [{ firstName: search }, { lastName: search }] },
          ],
        });
      } else {
        contacts = await Contact.find({
          $or: [{ firstName: search }, { lastName: search }],
        });
      }
    } else if (gen) {
      //  /api/contacts?gen=value
      if (gen == "male") {
        contacts = await Contact.find({ gender: "male" });
      } else if (gen == "female") {
        contacts = await Contact.find({ gender: "female" });
      } else {
        contacts = await Contact.find();
      }
    } else if (search) {
      //  /api/contacts?search=value
      contacts = await Contact.find({
        $or: [{ firstName: search }, { lastName: search }],
      });
    } else {
      //  /api/contacts
      contacts = await Contact.find();
    }
    res.json(contacts);
  } else if (req.method == "POST") {
    try {
      await Contact.create(req.body);
      res.status(201).json({ message: "new contact added to db" });
    } catch (error) {
      if (error.name == "ValidationError") {
        let errorMessage = "";
        Object.values(error.errors).map(
          (error) => (errorMessage += error.message + "\n")
        );
        return res.status(422).json({ message: errorMessage });
      }
      res.status(500).json({ message: "server error"})
    }
  } else {
    res.status(405).json({ message: "method not allowd" });
  }
}

// query string

// localhost:3000/api/contacts

// localhost:3000/api/contacts?key1=value1
// localhost:3000/api/contacts?gen=male { gen : 'male'}
// localhost:3000/api/contacts?gen=female

// localhost:3000/api/contacts?firstName=milad { firstName : 'milad'}

// localhost:3000/api/contacts?key1=value1&key2=value2
// localhost:3000/api/contacts?gen=male&search=bahrami
