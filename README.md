# 📊 iNews Data - Nielsen Rating Chatbot

Chatbot interactive untuk query Nielsen rating data dengan natural language. 

**Data Source:** Google Sheets API (real-time)  
**Hosting:** GitHub Pages (gratis, unlimited)  
**Domain:** `https://yourusername.github.io/inews-data`

---

## 🚀 **Get Started in 3 Steps**

1. **Setup Google Sheets & API** (15 min) → [Guide](GITHUB_PAGES_SETUP.md#part-1-setup-google-sheets-sumber-data)
2. **Upload to GitHub** (5 min) → [Guide](GITHUB_PAGES_SETUP.md#part-3-setup-github-repository)
3. **Enable Pages** (1 min) → [Guide](GITHUB_PAGES_SETUP.md#part-4-aktifkan-github-pages)

👉 **[QUICK START GUIDE](QUICK_START.md)** for TL;DR version

---

## ✨ Features

✅ Natural language chat interface  
✅ Real-time sync dari Google Sheets  
✅ Query parsing (share, ranking, TVR, bandingkan)  
✅ Private & secure (API key di browser)  
✅ Responsive design (desktop + mobile)  
✅ 100% GRATIS (GitHub Pages + Google Sheets)  

---

## 🚀 Deployment (GitHub Pages)

### **Complete Setup**
👉 [Follow GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for step-by-step guide

### **TL;DR (3 steps)**
1. Create Google Sheet + API key
2. Create GitHub repo `inews-data` → Upload 4 files
3. Settings → Pages → Deploy from main branch
4. Website live at `https://yourusername.github.io/inews-data` ✅

### **Data Setup**
- Buka website
- Click **"Setup Data"** button
- Input Sheet ID + API Key
- Click **"Test Connection"**
- Done! 🎉

---

## 📚 Documentation

Lihat `SETUP_GUIDE.md` untuk:
- Setup Google Sheets API
- Deploy ke Vercel
- Custom domain setup
- Troubleshooting

---

## 💻 Tech Stack

- **Frontend:** Vanilla JavaScript + HTML/CSS (no framework)
- **Database:** Google Sheets (via Sheets API v4)
- **Hosting:** GitHub Pages (free, static)
- **Storage:** Browser local storage (API keys)

---

## 📋 Query Examples

Chatbot support queries seperti:

```
"Berapa share inews kemarin?"
→ Share INEWS di tanggal kemarin adalah X%

"Ranking channel 04/01/2026?"
→ 1. RCTI: 6.8% | 2. SCTV: 15.2% | ...

"Bandingkan tvone vs inews"
→ TVONE: 2.03% | INEWS: 2.49%

"TVR semua channel"
→ [list TVR semua channel]
```

---

## 🔒 Security

- **API Key:** Disimpan di browser local storage (tidak di-transmit)
- **Google Sheets:** Private share dengan API key
- **CORS:** Dihandle Google Cloud
- **Data:** Tidak ada server-side storage (client-side only)

---

## 📱 Responsive

✅ Desktop (tested)  
✅ Tablet (tested)  
✅ Mobile (optimized)  

---

## 💰 Cost Breakdown

| Component | Cost | Notes |
|-----------|------|-------|
| Hosting (GitHub Pages) | **FREE** | Unlimited bandwidth |
| Domain | **FREE** | yourusername.github.io |
| Database (Google Sheets) | **FREE** | Unlimited storage |
| API (Google Cloud) | **FREE** | Free tier unlimited |
| **TOTAL** | **$0/year** | ✅ 100% gratis |

---

## 🛠️ Development

### Edit chatbot logic
File: `index.html` → Edit function `parseQuestion()` & `queryData()`

### Add custom styling
File: `index.html` → Edit `<style>` section

### Add new query types
File: `index.html` → Edit function `askQuestion()`

---

## 📊 Data Format

Expected format untuk Google Sheets atau CSV:

```
Year | Month | ISO Week | Date | Channel | TVR | Share
2026 | January | 1 | 04/01/2026 | INEWS | 0.27 | 2.49
2026 | January | 1 | 04/01/2026 | TVONE | 0.22 | 2.03
...
```

---

## 🆘 Troubleshooting

### API Key tidak work
1. Pastikan Google Sheets API di-enable (Google Cloud Console)
2. Pastikan Sheet di-share (public atau dengan service account)
3. Pastikan API key correct

### Data tidak muncul (file upload)
1. Format CSV/Excel harus sesuai (lihat Data Format di atas)
2. Coba CSV daripada Excel
3. Check browser console (F12) untuk error

### Domain tidak available
1. Cek apakah sudah di-register
2. Setup DNS ke Vercel (lihat docs)
3. Wait 24-48 jam untuk DNS propagation

---

## 📞 Support

- GitHub Issues: Report bugs
- Documentation: Lihat `SETUP_GUIDE.md`
- Email: contact@inews-data.app (coming soon)

---

## 📄 License

MIT License - Feel free to use & modify!

---

**Made with ❤️ for iNews Data Team**
