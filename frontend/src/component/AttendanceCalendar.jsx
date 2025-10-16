import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { getAllAtendend} from "../api/api";

const AttendanceCalendar = () => {
  const [attendedDates, setAttendedDates] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAllAtendend();
        // data.dates is an array like ['2025-10-16']
        console.log(data)
        setAttendedDates(data.dates);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    };
    fetchAttendance();
    console.log("hiii",attendedDates)
  }, []);

  // Highlight attended days
  const tileClassName = ({ date, view }) => {
    console.log(date)
    console.log(view)
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      // if (attendedDates.includes(dateStr)) {
      //   return "bg-gray-800 text-white rounded";
      // }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-center text-2xl mb-4">Attendance Calendar</h2>
      <Calendar onChange={setValue} value={value} tileClassName={tileClassName} />
    </div>
  );
}

export default AttendanceCalendar