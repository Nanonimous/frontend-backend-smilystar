// data/programsData.js
import { FaDrum, FaLanguage, FaBaby, FaMusic } from "react-icons/fa";

const programsData = [
  {
    title: "Bharatanatyam",
    icon: <FaDrum />,
    value: 17,
    description: "Classical Indian dance form from Tamil Nadu",
    attendance: 83.6,
    payment: 68,
    color: "red",
  },
  {
    title: "Hindi",
    icon: <FaLanguage />,
    value: 8,
    description: "Language learning program for Hindi",
    attendance: 76.6,
    payment: 67,
    color: "blue",
  },
  {
    title: "Daycare",
    icon: <FaBaby />,
    value: 15,
    description: "Full-day childcare and early education program",
    attendance: 80.9,
    payment: 70,
    color: "green",
  },
  {
    title: "Carnatic",
    icon: <FaMusic />,
    value: 10,
    description: "Classical music tradition from South India",
    attendance: 79.4,
    payment: 68,
    color: "purple",
  },
];

export default programsData;
