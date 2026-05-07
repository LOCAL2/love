export const config = {
  // Title ของ Card
  cardTitle: "Happy Valentine Day",

  // (Greeting)
  cardGreeting: "ถึงที่รัก",

  // URL ของรูปภาพที่จะแสดงใน Card
  // cardImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpW_ge-xBntXK1_ugzkCiv3f3mrt5w0lFdLw&s",
  cardImage: "https://i.postimg.cc/kMjLmsCS/Girl.png",
  
  // ข้อความที่ต้องการให้พิมพ์ (Typing Effect)
  typingText: "สุขสันต์วันพิเศษของเรานะ ❤️ ขอบคุณที่เข้ามาเป็นความสุขเล็ก ๆ ในทุกวันของเรา อยู่ด้วยกันไปนาน ๆ แบบนี้นะ ไม่ว่าจะวันดีหรือวันแย่ เราจะอยู่ข้างเธอเสมอ ขอให้เธอมีแต่รอยยิ้ม มีความสุขมาก ๆ และไม่ว่าจะเกิดอะไรขึ้น อย่าลืมว่ายังมีเราคอยจับมืออยู่ตรงนี้นะ 💖",
  
  // ความเร็วในการพิมพ์ (ms) 1000ms = 1 second ต่อตัวอักษร
  typingDelay: 125,
  
  // ขนาดตัวอักษรของข้อความ (px)
  fontSize: 14,
  
  // สีของข้อความของ typingText
  textColor: "#000000",
  
  // แสดงหัวใจในกรอบรูปหรือไม่ (true = แสดง, false = ไม่แสดง)
  showHeart: true,
  // ข้อความหรือ Emoji ที่จะแสดงในตำแหน่งหัวใจ (กรณี showHeart เป็น true)
  heartContent: "❤️",
  // สามารถใส่ข้อความได้
  // heartContent: "Love",

  // ข้อมูลเพลง
  songName: "คู่ชีวิต",
  artistName: "COCKTAIL",
  // URL ของรูป Thumbnail เพลง (ถ้ามี)
  musicThumbnail: "https://i.scdn.co/image/ab67616d0000b2730a770590da24ef0f70fc0155",
  // ใส่ URL หรือ Path ของไฟล์เพลง (.mp3) ที่ต้องการเล่น
  // แนะนำให้นำไฟล์เพลง mp3 ไปใส่ในโฟลเดอร์ `public` แล้วตั้งชื่อว่า song.mp3
  musicUrl: "/song.mp3", // ไฟล์นี้อยู่ในโฟลเดอร์ public/song.mp3
};
