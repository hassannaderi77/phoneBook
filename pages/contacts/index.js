import ContactItem from "@/components/contact/contactItem"
import Contact from "@/models/Contact"
import connectDB from "@/utils/connectDB"
import styles from "@/styles/Contacts.module.css"
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


export default function Contacts({ contactsList }) {
   const [contacts, setContacts] = useState(contactsList)
   const [searchKey, setSearchKey] = useState("")
   const [searchGen, setSearchGen] = useState("")
   const router = useRouter()
   const {gen , search} = router.query

   useEffect(() => {
      gen ? setSearchGen(gen) : setSearchGen('')
      search ? setSearchKey(search) : setSearchKey('')
   } , [])

   const searchHandler = async () => {
      try {
         const res = await fetch(`/api/contacts?gen=${searchGen}&search=${searchKey}`)
         const data = await res.json()
         setContacts(data)
      } catch (error) {
         toast.error("server error")
      }
   }

   return (
      <>
         <Toaster position='top-right' />
         <div className={styles.searchContainer}>
            <input
               type='text'
               value={searchKey}
               onChange={(e) => setSearchKey(e.target.value)}
               placeholder='enter name or family'
            />
            <select value={searchGen} onChange={(e) => setSearchGen(e.target.value)}>
               <option value=''>all</option>
               <option value='male'>male</option>
               <option value='female'>female</option>
            </select>
            <button onClick={searchHandler}>search</button>
         </div>
         {contacts.length > 0 && (
            <>
               {contacts.map((contact) => (
                  <ContactItem
                     key={contact._id}
                     {...contact}
                     contacts={contacts}
                     setContacts={setContacts}
                  />
               ))}
            </>
         )}
         {contacts.length == 0 && <p className={styles.noAudience}>There is no audience</p>}
      </>
   )
}

export async function getServerSideProps(context) {
   await connectDB()
   let contacts = null
   const { gen, search } = context.query
   if (gen && search) {
      // /contacts?gen=value&search=value
      if (gen == "male" || gen == "female") {
         contacts = await Contact.find({
            $and: [{ gender: gen }, { $or: [{ firstName: search }, { lastName: search }] }]
         })
      } else {
         contacts = await Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
      }
   } else if (gen) {
      // /contacts?gen=value
      if (gen == "male") {
         contacts = await Contact.find({ gender: "male" })
      } else if (gen == "female") {
         contacts = await Contact.find({ gender: "female" })
      } else {
         contacts = await Contact.find()
      }
   } else if (search) {
      // contacts?search=value
      contacts = await Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
   } else {
      // /contacts
      contacts = await Contact.find()
   }

   return {
      props: { contactsList: JSON.parse(JSON.stringify(contacts)) }
   }
}

// localhost:port/contacts
