import { HiOutlineMenuAlt4 } from "react-icons/hi"
import "../Profile/profile.css"
import { useState } from "react";
import AccountNav from "./AccountNav";
import AccountForm from "./AccountForm";
const AccountMain = () => {
    const [showProfileNav, setShowProfileNav] = useState(false);
  return (
    <>
    <div onClick={() => setShowProfileNav((prev) => !prev)} className="inline-block lg:hidden">
      <HiOutlineMenuAlt4 size={20} />
    </div>

    <div
      className="profile-container"
    >
    <AccountNav showProfileNav={showProfileNav}/>
      <AccountForm/>
    </div>
  </>
  )
}

export default AccountMain
