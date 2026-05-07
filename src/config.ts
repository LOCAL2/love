/**
 * การตั้งค่าหลักที่ต้องการให้แก้ไข
 */

// 1. ข้อมูลหน้าการ์ด (Card)
const CARD_TITLE = "Happy 1st Anniversary";
const CARD_GREETING = "ถึงที่รัก";
const CARD_IMAGE = "https://i.postimg.cc/kMjLmsCS/Girl.png";

// 2. ข้อมูลหัวใจ (Heart)
const SHOW_HEART = false;
const HEART_CONTENT = "❤️";

// 3. ข้อความ (Message)
const MESSAGE_TEXT = "สุขสันต์วันพิเศษของเรานะ ❤️ ขอบคุณที่เข้ามาเป็นความสุขเล็ก ๆ ในทุกวันของเรา อยู่ด้วยกันไปนาน ๆ แบบนี้นะ ไม่ว่าจะวันดีหรือวันแย่ เราจะอยู่ข้างเธอเสมอ ขอให้เธอมีแต่รอยยิ้ม มีความสุขมาก ๆ และไม่ว่าจะเกิดอะไรขึ้น อย่าลืมว่ายังมีเราคอยจับมืออยู่ตรงนี้นะ 💖";
const MESSAGE_SPEED = 150;
const MESSAGE_FONT_SIZE = 14;
const MESSAGE_COLOR = "#000000";

// 4. ข้อมูลเพลง (Music)
const SONG_NAME = "คู่ชีวิต";
const ARTIST_NAME = "COCKTAIL";
const MUSIC_URL = "/song.mp3";
const MUSIC_THUMBNAIL = "https://i.scdn.co/image/ab67616d0000b2730a770590da24ef0f70fc0155";


/**
 * (ไม่ต้องแก้ไขส่วนนี้)
 */
export const config = {
  card: {
    title: CARD_TITLE,
    greeting: CARD_GREETING,
    image: CARD_IMAGE,
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
