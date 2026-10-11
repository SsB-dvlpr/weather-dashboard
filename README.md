<div align="center">

# 🌤️ Weather Dashboard

**Şehrini yaz, anlık havayı gör. Son aramaların hep elinin altında.**

[![Canlı Demo](https://img.shields.io/badge/Canlı_Demo-Aç-38bdf8?style=for-the-badge)](https://ssb-dvlpr.github.io/weather-dashboard/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

</div>

---



## 🚀 Canlı Demo

👉 **https://ssb-dvlpr.github.io/weather-dashboard/**

## ✨ Özellikler

- 🔎 Şehir adıyla anlık **sıcaklık** ve **rüzgâr hızı**
- 📍 API'nin bulduğu **gerçek yer adı ve ülke** gösterimi (yanlış eşleşmeyi kullanıcı görür)
- 🕘 Son **5 arama** geçmişi: tekrarsız, sayfa yenilense de kalır
- 👆 Geçmişteki şehre tıklayınca **tekrar arama**
- 🧹 **Geçmişi Temizle** butonu
- 🛡️ Hata yönetimi: boş giriş, şehir bulunamadı, sunucu hatası, internet yok
- ⏳ "Yükleniyor..." göstergesi ve arama sırasında **buton kilidi**
- 📱 Mobil uyumlu, koyu tema tasarım

## 🧠 Nasıl Çalışıyor?

```
Şehir adı ──► Geocoding API ──► enlem + boylam ──► Forecast API ──► sıcaklık + rüzgâr ──► ekran
                                                                                  └──► localStorage (geçmiş)
```

1. Kullanıcı şehir adını yazar.
2. Geocoding API şehrin koordinatını ve gerçek adını döndürür.
3. Bu koordinatla Forecast API'ye ikinci istek atılır (ikinci istek ilkine bağlıdır).
4. Gelen JSON'dan değerler seçilip `textContent` ile sayfaya yazılır.
5. Bulunan şehir `localStorage`'a kaydedilir (tekrarsız, en fazla 5 kayıt).

## 🛠️ Kullanılan Teknolojiler

| Alan       | Teknoloji                                                                             |
| ---------- | ------------------------------------------------------------------------------------- |
| Arayüz     | HTML, Tailwind CSS                                                                    |
| Mantık     | JavaScript (`fetch`, `async/await`, `try/catch/finally`)                              |
| Veri       | [Open-Meteo API](https://open-meteo.com/) (Geocoding + Forecast, anahtar gerektirmez) |
| Saklama    | `localStorage`                                                                        |
| Geliştirme | Vite                                                                                  |
| Yayın      | GitHub Actions + GitHub Pages                                                         |

## 📚 Öğrendiklerim

- Başka bir siteden `fetch` ile veri çekmeyi (API herkese açıksa çalışır) ve iki API'yi zincirlemeyi: ikinci istek, ilkinin sonucuna bağlı.
- JSON olarak gelen veriyi seçip HTML'de güvenli şekilde (`textContent`) göstermeyi.
- `localStorage` mantığını: diziyi `JSON.stringify` / `JSON.parse` ile saklamayı ve kayıt yokken `getItem`'in `null` döndürdüğünü (`|| []` ile çözüm).
- `try / catch / finally` ile hata yönetimini: internet yokken kullanıcıya mesaj göstermek, `finally` ile işlem bitince butonu tekrar açmak.
- `response.ok` ile sunucu hatalarını yakalamayı.
- Vite + Tailwind kurulumunu ve GitHub Actions ile otomatik deploy'u.

## 💻 Yerelde Çalıştırma

```bash
git clone https://github.com/SsB-dvlpr/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev
```

Üretim paketi için: `npm run build`

## 📁 Proje Yapısı

```
weather-dashboard/
├── .github/workflows/deploy.yml   # otomatik deploy
├── index.html                     # sayfa yapısı
├── script.js                      # uygulama mantığı
├── style.css                      # Tailwind girişi
├── vite.config.js                 # Vite + Tailwind + base ayarı
└── package.json
```

## 🔮 Sonraki Adımlar

- [ ] Nem ve yağış bilgisi
- [ ] Günlük tahmin (5 gün)
- [ ] Sıcaklık birimi seçimi (°C / °F)
- [ ] Konum izniyle otomatik şehir

---

<div align="center">

**SsB-dvlpr** tarafından yapıldı · Full-stack yolculuğunun Gün 55-56 projesi

</div>
