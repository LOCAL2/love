/**
 * การตั้งค่าหลักที่ต้องการให้แก้ไข
 */

// 1. ข้อมูลหน้าการ์ด (Card)
const CARD_TITLE = "Happy 1st Anniversary";
const CARD_GREETING = "ถึงที่รัก";
const CARD_IMAGE = [
  "https://i.postimg.cc/kMjLmsCS/Girl.png",
  "https://img2.pic.in.th/G2.jpg",
  "https://img2.pic.in.th/image42c483d945d76b13.png",
]; // ใส่ได้ทั้งรูปเดียว (string) หรือหลายรูป (Array ของ string)
const CAROUSEL_INTERVAL = 3; // ระยะเวลาเปลี่ยนรูป (หน่วยเป็นวินาที)

// 2. แสดงหัวใจใต้รูป (Heart)
const SHOW_HEART = false;
const HEART_CONTENT = "❤️"; // สามารถเปลี่ยนเป็นข้อความได้

// 3. ข้อความ (Message)
const MESSAGE_TEXT = "Happy our special day Thank you for being my smile and my safe place every single day. As time goes by, I just love you more and more, and I’m more sure than ever that I want you by my side for a long time. I promise to always take care of you, stay loyal to you, and hold your hand through everything. Let’s stay together for a very long time, just like we promised each other. I hope you’re always happy, Charm ❤️";
const MESSAGE_SPEED = 150;
const MESSAGE_FONT_SIZE = 14;
const MESSAGE_COLOR = "#000000";

// 4. ข้อมูลเพลง (Music)
const SONG_NAME = "คู่ชีวิต";
const ARTIST_NAME = "COCKTAIL";
const MUSIC_URL = "/song.mp3"; // แนะนำให้เอาเพลงไว้ใน folder /public
const MUSIC_THUMBNAIL = "https://i.scdn.co/image/ab67616d0000b2730a770590da24ef0f70fc0155";


/**
 * (ไม่ต้องแก้ไขส่วนนี้)
 */
export const config = {
  card: {
    title: CARD_TITLE,
    greeting: CARD_GREETING,
    image: CARD_IMAGE,
    carouselInterval: CAROUSEL_INTERVAL,
    heart: {
      show: SHOW_HEART,
      content: HEART_CONTENT,
    },
  },
  message: {
    text: MESSAGE_TEXT,
    speed: MESSAGE_SPEED,
    fontSize: MESSAGE_FONT_SIZE,
    color: MESSAGE_COLOR,
  },
  music: {
    title: SONG_NAME,
    artist: ARTIST_NAME,
    url: MUSIC_URL,
    thumbnail: MUSIC_THUMBNAIL,
  },
};
