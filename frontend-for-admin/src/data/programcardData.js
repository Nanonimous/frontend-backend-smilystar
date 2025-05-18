// data/programsData.js
import { FaDrum, FaLanguage, FaBaby, FaMusic } from "react-icons/fa";
const p="http://localhost:3000/";
const programsData = [
  {
    title: "Bharatanatyam",
    icon: <FaDrum />,
    value: 17,
    description: "Classical Indian dance form from Tamil Nadu",
    attendance: 83.6,
    payment: 68,
    color: "red",
    path:`${p}bharatanatyam/students`,
  },
  {
    title: "Hindi",
    icon: <FaLanguage />,
    value: 8,
    description: "Language learning program for Hindi",
    attendance: 76.6,
    payment: 67,
    color: "blue",
     path:`${p}hindiclass/students`,
  },
  {
    title: "Daycare",
    icon: <FaBaby />,
    value: 15,
    description: "Full-day childcare and early education program",
    attendance: 80.9,
    payment: 70,
    color: "green",
    path:`${p}daycare/students`,
  },
  {
    title: "Carnatic",
    icon: <FaMusic />,
    value: 10,
    description: "Classical music tradition from South India",
    attendance: 79.4,
    payment: 68,
    color: "purple",
    path:`${p}carnatic/students`,
  },
  {
    title: "violin",
    icon: <FaDrum />,
    value: 17,
    description: "Classical Indian dance form from Tamil Nadu",
    attendance: 83.6,
    payment: 68,
    color: "red",
    path:`${p}violin/students`,
  },
  {
    title: "mridangam & tabla",
    icon: <FaDrum />,
    value: 17,
    description: "Classical Indian dance form from Tamil Nadu",
    attendance: 83.6,
    payment: 68,
    color: "red",
    path:`${p}tabla/students`,
  },
  {
    title: "piano",
    icon: <FaDrum />,
    value: 17,
    description: "Classical Indian dance form from Tamil Nadu",
    attendance: 83.6,
    payment: 68,
    color: "red",
    path:`${p}piano/students`,
  },


];

export default programsData;
