
import TryCatch from "../middleware/TryCatch.js";
import { Attendance } from "../model/Attendance.js";

export const giveAttendance=TryCatch(async(req,res)=>{

  const { type } = req.body;
 console.log(type)
    const today = new Date().toISOString().split("T")[0];
    const userId = req.user.id; // from isAuth middleware
    
    // ✅ Find existing attendance document for user
    let attendance = await Attendance.findOne({ userId });
    // ✅ If no attendance record exists for user, create one
    if (!attendance) {
      attendance = new Attendance({ userId, details: [] });
    }

    // ✅ Find today's record inside the "details" array
    const todayRecord = attendance.details.find(d => d.date === today);

 if (type === "punch-in") {
      if (todayRecord && todayRecord.in_time) {
        return res.json({ message: "Already punched in today" });
      }

      const in_time = new Date().toLocaleTimeString();

      if (todayRecord) {
        todayRecord.in_time = in_time;
      } else {
        attendance.details.push({ date: today, in_time });
      }

      await attendance.save();
      return res.json({ message: "Punch In successful", in_time });
    }

 if (type === "punch-out") {
    console.log(" i am gggg")
    if (!todayRecord || !todayRecord.in_time) {
      return res.json({ message: "You must punch in first" });
    }

    if (todayRecord.out_time) {
      return res.json({ message: "Already punched out today" });
    }

    const out_time = new Date().toLocaleTimeString();
    const workedHours =
      (new Date(`1970/01/01 ${out_time}`) -
        new Date(`1970/01/01 ${todayRecord.in_time}`)) /
      (1000 * 60 * 60);

    todayRecord.out_time = out_time;
    todayRecord.worked_hours = workedHours.toFixed(2) + " hrs";

    await attendance.save();
    return res.json({
      message: "Punch Out successful",
      out_time,
      worked_hours: todayRecord.worked_hours,
    });
  }
})


export const getAttendance=TryCatch(async(req,res)=>{
  const today = new Date().toISOString().split("T")[0];
  const userId = req.user._id; // from isAuth middleware

  // ✅ Find user's attendance document
  const attendance = await Attendance.findOne({ userId });

  if (!attendance) {
    return res.json({
      punched_in: false,
      punched_out: false,
      in_time: null,
      out_time: null,
      worked_hours: null,
      message: "User has not punched IN today.",
    });
  }

  // ✅ Find today's record inside the details array
  const todayRecord = attendance.details.find(d => d.date === today);

  if (!todayRecord) {
    return res.json({
      punched_in: false,
      punched_out: false,
      in_time: null,
      out_time: null,
      worked_hours: null,
      message: "User has not punched IN today.",
    });
  }

  return res.json({
    punched_in: !!todayRecord.in_time,
    punched_out: !!todayRecord.out_time,
    in_time: todayRecord.in_time,
    out_time: todayRecord.out_time,
    worked_hours: todayRecord.worked_hours,
    name:req.user.name,
    message: "Status fetched successfully",
  });
})

export const getAllAttendand=TryCatch(async(req,res)=>{
  const userId = req.user.id;
  
  const attendance = await Attendance.findOne({ userId });
  console.log(attendance)
  if (!attendance) return res.json({ dates: [] });

  const dates = attendance.details.map(d => d.date); 
  console.log(dates)// array of strings like "2025-10-16"
  res.json({ dates });
})