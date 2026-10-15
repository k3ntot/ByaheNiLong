# Byahe ni Long — Mobile-First NFC Digital Business Card & Travel Blog

Isang mobile-first personal travel and adventure digital business card para sa **Byahe ni Long**. Dinisenyo ito para sa instant access kapag tinap ang NFC card sa isang smartphone.

---

## 🌟 Mga Tampok (Features)

- **Mobile-First (~390px Optimized):** Perpektong sukat sa screen ng smartphone (iPhone, Android) nang walang unnecessary zooming o pagkasira ng layout, responsive din sa tablet at desktop.
- **Nature-Inspired Aesthetic:** Mayamang color palette na hango sa kabundukan at karagatan (*Forest Green, Warm Beige, Off-White, Earthy Terracotta*).
- **Hero Section (Official Brand Banner):**
  - Opisyal na Brand Image (`main banner.jpg`) na nagpapanatili ng 1:1 natural square proportions nang walang crop o stretching.
  - Brand name: *Byahe ni Long*
  - Tagline: *"Mga Lakad, Tanawin, at Kwentong Baon."*
  - Panimula: *"Tara, samahan ako sa pag-explore ng mga lugar..."*
  - Dalawang prominent buttons: **Explore My Adventures** (nag-iiscroll sa gallery) at **Follow on Facebook** (nagbubukas ng Facebook page).
- **About Section ("Kilala si Long"):** Malinis at palakaibigang pagpapakilala sa creator na madaling i-edit.
- **Travel Gallery ("Mga Napuntahan"):**
  - Gumagamit ng 12 tunay na litrato na naka-kategorya ayon sa filenames:
    - **Siargao:** Maasin River, Cloud 9 Boardwalk, Coconut Viewpoint
    - **Balabac:** Onuk Island Sandbar, Crystal Waters, Overwater Haven
    - **Calaguas:** Mahabang Buhangin Coast, Calaguas Hilltop, Island Hopping Cruise
    - **Taipei:** Tiaoshi Coastal Stop, Yehliu Geopark, Remains of the 13 Levels
  - Interactive Filter Tabs: *Lahat, Siargao, Balabac, Calaguas, Taipei*
  - Interactive Lightbox Viewer na may Next/Previous navigation, touch swipe sa mobile, at keyboard arrow support.
- **Facebook Section ("Sundan ang Byahe"):**
  - Highlighted card para sa opisyal na Facebook page: [https://www.facebook.com/ByaheNiLong](https://www.facebook.com/ByaheNiLong).
- **Contact Section ("May Tanong? Tara, Usap!"):**
  - Numerong **0956 092 9225**.
  - **Call Now** (`tel:09560929225`) at **Send SMS** (`sms:09560929225`).
  - **Copy Number** button na may animated confirmation toast.
  - **I-save sa Phone Contacts (.vcf):** Dynamic vCard download para sa 1-tap phone contact saving!
- **Reusable Future Social Media Component:** Nakahanda ang layout para sa Instagram, TikTok, YouTube. Awtomatikong nakatago kung blangko ang link.
- **NFC Quick-Action Bottom Dock:** Palaging abot ng hinlalaki ang Facebook, tawag, at text sa mobile.

---

## 📁 Folder Structure

```text
ByaheNiLong/
├── index.html              # Main mobile-first landing page
├── css/
│   └── styles.css          # Nature-inspired theme & mobile-first styling
├── js/
│   ├── config.js           # Sentralisadong file para sa brand, gallery, at contacts
│   └── app.js              # Interaktibong filtering, lightbox, vCard, at copy actions
├── assets/
│   └── images/             # Mga tunay na litrato ng Byahe ni Long
│       ├── main banner.jpg # Opisyal na brand/profile hero banner
│       ├── balabac1.jpg, balabac2.jpg, balabac3.jpg
│       ├── calaguas1.jpg, calaguas2.jpg, calaguas3.jpg
│       ├── siargao1.jpg, siargao2.jpg, siargao3.jpg
│       └── taepei1.jpg, taepe2.jpg, taepei3.jpg
├── server.js               # Preview server (Node.js)
├── package.json
└── README.md
```

---

## ✏️ Paano Baguhin ang Content (`js/config.js`)

Hindi mo kailangang galawin ang HTML o CSS kapag magdadagdag ka ng pictures o babaguhin ang impormasyon. Buksan lamang ang [js/config.js](file:///c:/Users/bejen/Desktop/ByaheNiLong/js/config.js):

### 1. Pagdagdag o Pagpalit ng Larawan sa Gallery
Ilagay ang bagong larawan sa loob ng `assets/images/`, at i-update ang array sa `js/config.js`:
```javascript
gallery: [
  {
    id: "siargao-1",
    category: "siargao",
    destination: "Siargao",
    title: "Maasin River",
    caption: "Siargao",
    image: "assets/images/siargao1.jpg",
    tag: "River & Palms",
  },
  // Magdagdag pa ng iba...
]
```

### 2. Pagdagdag ng Iba pang Social Media (Instagram, TikTok, YouTube)
Nakahanda na ang disenyo! Ilagay lamang ang tamang URL sa `socials` array:
```javascript
{
  id: "instagram",
  name: "Instagram",
  handle: "@byahenilong",
  url: "https://www.instagram.com/byahenilong", // Ilagay ang link dito
  isPrimary: false,
}
```
*Tandaan: Kapag walang URL (blangko `""`), awtomatiko itong itatago upang hindi lumabas na sira.*

### 3. Pagpalit ng Numero o Tagline
Palitan lamang ang:
```javascript
contact: {
  phoneDisplay: "0956 092 9225",
  phoneTel: "+639560929225",
  phoneSms: "09560929225",
}
```

---

## 📲 Paano Gamitin sa NFC Card

1. I-deploy o i-host ang website (hal. sa **GitHub Pages**, **Vercel**, **Cloudflare Pages**, o sariling domain tulad ng `byahenilong.com`).
2. Gamitin ang libreng mobile app tulad ng **NFC Tools** (iOS / Android).
3. Piliin ang **Write** &rarr; **Add a record** &rarr; **URL / URI**.
4. I-paste ang link ng iyong website.
5. I-tap ang NFC card sa likod ng iyong phone para i-save.
6. Handa na! Sa tuwing itatap ang card sa telepono ng kahit sino, bubukas agad ang iyong digital business card.

---

## 🚀 Pagsusuri at Pagpapatakbo sa Local Computer

```bash
npm start
```
Buksan sa browser: `http://localhost:3000`.
