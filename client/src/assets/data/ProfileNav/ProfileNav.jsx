import { BiComment, BiGift, BiHeart, BiUser } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { MdOutlineRestore } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
const profileNav = [
    {
        name:"My S-Cart Account",
        icon:<BiUser size={20}/>,
        href:"/profile/me",
    },
    {
        name:"Order",
        icon:<BsTruck size={20}/>,
        href:"/profile/orders",

    },
    {
        name:"Delivered",
        icon:<VscVerified size={20}/>,
        href:"/profile/deliveries",

    },
    {
        name:"Reviews",
        icon:<BiComment size={20}/>,
        href:"/profile/review",

    },
    {
        name:"Voucher",
        icon:<BiGift size={20}/>,
        href:"/profile/vouchers",
    },
    {
        name:"Saved Items",
        icon:<BiHeart size={20}/>,
        href:"/profile/saved"
    },
    {
        name:"Recently Viewed",
        icon:<MdOutlineRestore size={20}/>,
        href:"/profile/recent"
    }
]
export default profileNav