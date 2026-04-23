const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // อนุญาตให้นักเรียนทุกคนเชื่อมต่อมาที่เครื่องครูได้
app.use(express.json()); // อนุญาตให้รับข้อมูลแบบ JSON (สำคัญสำหรับระบบ Login)

// ข้อมูลตารางเรียน 5 วัน (สำหรับนักเรียนดึงไปโชว์ใน Lab 4)
const courses = [
    { id: 1, day: "จันทร์", subject: "การพัฒนาซอฟต์แวร์ด้วยเทคโนโลยี Front-End", time: "08:00 - 12:00", room: "Lab 1" },
    { id: 2, day: "อังคาร", subject: "ภาษาอังกฤษเพื่อการสื่อสาร", time: "13:00 - 15:00", room: "ห้อง 322" },
    { id: 3, day: "พุธ", subject: "คณิตศาสตร์คอมพิวเตอร์", time: "09:00 - 12:00", room: "ห้อง 214" },
    { id: 4, day: "พฤหัสบดี", subject: "เครือข่ายคอมพิวเตอร์พื้นฐาน", time: "13:00 - 17:00", room: "Lab 3" },
    { id: 5, day: "ศุกร์", subject: "กิจกรรมหน้าเสาธงและโฮมรูม", time: "07:45 - 08:30", room: "ลานกิจกรรม" },
    { id: 6, day: "ศุกร์", subject: "การเขียนโปรแกรมบนอุปกรณ์เคลื่อนที่", time: "09:00 - 12:00", room: "Lab 2" }
];

// --- 2. ข้อมูลผู้ใช้จำลอง (สำหรับระบบ Login POST) ---
const users = [
    { username: "admin", password: "123", name: "คุณครูผู้ควบคุมระบบ" },
    { username: "student", password: "456", name: "นศ. ทดสอบระบบ" }
];

// --- API Routes ---

// ดึงข้อมูลตารางเรียน (นักเรียนใช้ fetch GET)
app.get('/api/courses', (req, res) => {
    console.log("มีการร้องขอข้อมูลตารางเรียน");
    res.json(courses);
});

// ตรวจสอบการ Login (นักเรียนใช้ fetch POST)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`มีการพยายาม Login จาก: ${username}`);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // ถ้าเจอ User ตรงกับที่ส่งมา
        res.json({ 
            success: true, 
            message: "ยินดีต้อนรับเข้าสู่ระบบ", 
            name: user.name 
        });
    } else {
        // ถ้าไม่เจอ หรือรหัสผิด
        res.status(401).json({ 
            success: false, 
            message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!" 
        });
    }
});

// เริ่มต้น Server
app.listen(port, () => {
    console.log(`-----------------------------------------------`);
    console.log(`Backend Server is running!`);
    console.log(`1. ดูตารางเรียน: http://localhost:${port}/api/courses`);
    console.log(`2. IP เครื่องครูที่เด็กต้องใช้: [ระบุ IP เครื่องครูที่นี่]`);
    console.log(`-----------------------------------------------`);
});