import Link from "next/link";
import { MdAddBox } from "react-icons/md";
import { PiListNumbersBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {

   const { route } = useRouter()

  return (
    <div className={styles.navbar}>
      <div className={styles.menu}>
        <Link href="/contacts/add" className={route == "/contacts/add" ? styles.active : ""} >
          <MdAddBox /> Add Contact
        </Link>
        <Link href="/contacts" className={route == "/contacts" ? styles.active : ""} >
          <PiListNumbersBold /> Contatcts
        </Link>
        <Link href="/" className={route == "/" ? styles.active : ""} >
          <FaHome /> Home
        </Link>
      </div>
    </div>
  );
}
