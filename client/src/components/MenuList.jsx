import { HiHome, HiUserGroup } from "react-icons/hi";
import { TbUserFilled, TbLogout2 } from "react-icons/tb";
import { BiSolidMessageSquareDetail, BiNetworkChart } from "react-icons/bi";
import { IoBookmarks } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaFile } from "react-icons/fa6";

const MenuList = [
  {
    id: 1,
    icon: <HiHome />,
    name: "Accueil",
  },
  {
    id: 2,
    icon: <TbUserFilled />,
    name: "Profil",
  },
  {
    id: 3,
    icon: <BiSolidMessageSquareDetail />,
    name: "Messagerie",
  },
  {
    id: 4,
    icon: <BiNetworkChart />,
    name: "Réseau",
  },
  {
    id: 5,
    icon: <HiUserGroup />,
    name: "Groupes",
  },
  {
    id: 6,
    icon: <IoBookmarks />,
    name: "Enregistrements",
  },
  {
    id: 7,
    icon: <IoMdSettings />,
    name: "Paramètres",
  },
  {
    id: 8,
    icon: <FaFile />,
    name: "Conditions générales",
  },
  {
    id: 9,
    icon: <TbLogout2 />,
    name: "Se déconnecter",
  },
];

export { MenuList };