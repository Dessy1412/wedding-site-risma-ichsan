import { useEffect, useState, useRef } from "react";
import "../styles/detailundangan.css";
import { addRSVP, listenRSVP } from "../services/rsvpService";
import {
  FaMusic,
  FaPause,
  FaInstagram,
  FaClock,
  FaMapMarkerAlt,
  FaGift,
  FaCopy,
  FaMoneyCheckAlt,
  FaWhatsapp,
} from "react-icons/fa";

export default function DetailUndangan() {
  const audioRef = useRef(null);
  const [showGift, setShowGift] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [status, setStatus] = useState("");
  const [wishes, setWishes] = useState([]);
  // Efek animasi muncul perlahan saat section digulir ke layar
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".detail-undangan-wrapper section",
    );

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((sec) => {
      observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        observer.unobserve(sec);
      });
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay dicegah browser:", err);
          setIsPlaying(false);
        });
    }
  }, []);
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          setIsPlaying(false);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama.trim() || !ucapan.trim() || !status) {
      alert("Nama, ucapan, dan konfirmasi kehadiran wajib diisi.");
      return;
    }

    try {
      await addRSVP({
        nama: nama.trim(),
        ucapan: ucapan.trim(),
        status,
      });

      setNama("");
      setUcapan("");
      setStatus("");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = listenRSVP((data) => {
      setWishes(data);
    });

    return () => unsubscribe();
  }, []);

  const handleShowGift = () => {
    setShowGift(true);
    setHideBtn(true);
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2027-01-09T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Berhasil disalin ke clipboard!");
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef || !audioRef.current) return;

      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay dicegah oleh browser:", err);
            setIsPlaying(false);
          });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [audioRef]);

  return (
    <div className="detail-undangan-wrapper">
      {/* music */}
      <audio ref={audioRef} src="/images/music.mp3" loop />
      <button onClick={toggleMusic} className="music-btn">
        {isPlaying ? <FaPause /> : <FaMusic />}
      </button>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-wrapper">
          <img
            src="/images/bghero.webp"
            alt="Hero Background Undangan"
            className="hero-image"
          />
          <div className="hero-content">
            <div className="hero-names-box">
              <p className="hero-subtitle">THE WEDDING OF</p>
              <h1 className="hero-bride">Risma</h1>
              <span className="hero-ampersand">&</span>
              <h1 className="hero-groom">Ikhsan</h1>
            </div>
            <div className="hero-date-box">
              <span className="hero-date-day">09</span>
              <span className="hero-date-month">Januari</span>
              <span className="hero-date-year">2027</span>
            </div>
            <div className="hero-initials">
              <span>RI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ayat Section */}
      <section className="quran-container">
        <div className="quran-wrapper">
          <img
            src="/images/bgquran.webp"
            alt="Quran Background"
            className="quran-image"
          />
          <div className="quran-content">
            <div className="quran-initials">RI</div>
            <p className="quran-text">
              &quot;Dan di antara tanda-tanda (kebesaran)-Nyalah ialah Dia
              menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
              kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan
              di antaramu rasa kasih dan sayang.&quot;
            </p>
            <p className="quran-source">Q.S Ar-Rum : 21</p>
          </div>
        </div>
      </section>

      {/* Bride Groom Section */}
      <section className="bg-section-container">
        <div className="bg-header-box">
          <h2 className="bg-main-title">Bride & Groom</h2>
          <p className="bg-opening-text">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
            <br />
            Maha Suci Allah yang telah menciptakan makhluk-Nya
            berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi
            pernikahan kami.
          </p>
        </div>
        <div className="bg-card-wrapper">
          <img
            src="/images/bgbride.webp"
            alt="Bride and Groom Background"
            className="bg-card-image"
          />
          <div className="bg-card-content">
            <div className="bg-person-block bride-block">
              <h3 className="bg-person-name">Risma Indriyani, S. Pd.</h3>
              <p className="bg-person-parent">
                Anak Kedua dari
                <br />
                Bapak Rosadi & Ibu Maimunah (Alm)
              </p>
              <a
                href="https://www.instagram.com/rismaindriiyanii/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ig-button"
              >
                <FaInstagram className="icon" />
                @rismaindriiyanii
              </a>
            </div>
            <div className="bg-ampersand">&</div>
            <div className="bg-person-block groom-block">
              <h3 className="bg-person-name">Muhamad Ichsan, S.P.</h3>
              <p className="bg-person-parent">
                Anak Kedua dari
                <br />
                Bapak. H. Ahmad Mufti, S.Pd. & Ibu Hj. Aminah, S.Pd
              </p>
              <a
                href="https://www.instagram.com/isan_alfatih/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ig-button"
              >
                <FaInstagram className="icon" />
                @isan_alfatih
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Save The Date */}
      <section className="std-container">
        <h2 className="std-main-title">Save The Date</h2>
        <div className="std-countdown-wrapper">
          <img
            src="/images/countdown.webp"
            alt="Countdown Frame"
            className="std-countdown-image"
          />
          <div className="std-countdown-content">
            <div className="std-timer-row">
              <div className="std-time-box">
                <span className="std-number">{timeLeft.days}</span>
                <span className="std-label">DAYS</span>
              </div>
              <span className="std-colon">:</span>
              <div className="std-time-box">
                <span className="std-number">{timeLeft.hours}</span>
                <span className="std-label">HOURS</span>
              </div>
              <span className="std-colon">:</span>
              <div className="std-time-box">
                <span className="std-number">{timeLeft.minutes}</span>
                <span className="std-label">MINS</span>
              </div>
              <span className="std-colon">:</span>
              <div className="std-time-box">
                <span className="std-number">{timeLeft.seconds}</span>
                <span className="std-label">SECS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Section  */}
        <div className="std-event-card">
          <div className="std-card-inner-border">
            <div className="std-event-section">
              <h3 className="std-event-title">AKAD NIKAH</h3>
              <p className="std-event-day">Sabtu, 09 Januari 2027</p>
              <p className="std-event-time">
                <FaClock className="std-time-icon" />
                <span>Pukul: 08.00 WIB</span>
              </p>
            </div>
            <div className="std-divider-line"></div>
            <div className="std-event-section">
              <h3 className="std-event-title">RESEPSI</h3>
              <p className="std-event-day">Sabtu, 09 Januari 2027</p>
              <p className="std-event-time">
                {" "}
                <FaClock className="std-time-icon" />
                <span>Pukul:10.00 WIB - Selesai</span>
              </p>
            </div>
            <div className="std-divider-line"></div>
            <div className="std-location-box">
              <p className="std-loc-title">Lokasi Acara</p>
              <p className="std-loc-name">Avia Scientific Islamic School</p>
              <p className="std-loc-address">
                Jl. Mandor No.1, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat
                16438
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="std-maps-btn"
            >
              <FaMapMarkerAlt />
              Buka Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Wedding gift */}
      <section className="wg-container">
        <div className="wg-hero-wrapper">
          <img
            src="/images/weddinggift.webp"
            alt="Wedding Gift Curtain"
            className="wg-hero-image"
          />
          <div className="wg-hero-content">
            <h2 className="wg-main-title">Wedding Gift</h2>
            <p className="wg-description">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi
              kado secara cashless.
            </p>
            <button
              className={`wg-toggle-btn ${hideBtn ? "fade-out" : ""}`}
              onClick={handleShowGift}
            >
              <FaMoneyCheckAlt className="icon" /> Klik Disini
            </button>
          </div>
        </div>

        {showGift && (
          <div className="wg-cards-container">
            <div className="wg-card">
              <div className="wg-card-header">
                <div className="wg-card-left">
                  <p className="wg-bank-name">Mandiri</p>
                  <p className="wg-acc-number">1570007467773</p>
                  <p className="wg-acc-name">a.n. Muhamad Ichsan</p>
                </div>
                <div className="wg-card-right">
                  <img
                    src="/images/mandirilogo.png"
                    alt="bank"
                    className="wg-bank-logo"
                  />
                </div>
              </div>
              <button
                className="wg-copy-btn"
                onClick={() => copyText("1570007467773")}
              >
                <FaCopy className="icon" /> Salin Rekening
              </button>
            </div>
            <div className="wg-card">
              <div className="wg-card-header">
                <div className="wg-card-left">
                  <p className="wg-bank-name">BRI</p>
                  <p className="wg-acc-number">480401038758532</p>
                  <p className="wg-acc-name">a.n. Risma Indriyani</p>
                </div>
                <div className="wg-card-right">
                  <img
                    src="/images/brilogo.png"
                    alt="bank"
                    className="wg-bank-logo"
                  />
                </div>
              </div>
              <button
                className="wg-copy-btn"
                onClick={() => copyText("480401038758532")}
              >
                <FaCopy className="icon" /> Salin Rekening
              </button>
            </div>
            <div className="wg-card wg-address-card">
              <div className="wg-card-header">
                <div className="wg-card-left">
                  <p className="wg-bank-name">Kirim Kado</p>
                  <p className="wg-acc-name">a.n. Muhamad Ichsan</p>
                  <p className="wg-phone">+6285813903109</p>
                  <p className="wg-address">
                    Gg Laskar, Kel. Bojong Pondok Terong, Kec. Cipayung, Depok
                  </p>
                </div>
                <div className="wg-card-right">
                  <FaGift className="wg-gift-icon" />
                </div>
              </div>
              <button
                className="wg-copy-btn"
                onClick={() =>
                  copyText(
                    "Gg Laskar, Kel. Bojong Pondok Terong, Kec. Cipayung, Depok",
                  )
                }
              >
                <FaCopy className="icon" /> Salin Alamat
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RSVP Section */}
      <section className="rsvp-container">
        <div className="rsvp-top-row">
          <div className="rsvp-image-wrapper">
            <img
              src="/images/rsvp.webp"
              alt="RSVP Envelope"
              className="rsvp-envelope-img"
            />
          </div>
          <div className="rsvp-header-text">
            <h2 className="rsvp-title">Wishes</h2>
            <p className="rsvp-subtitle">
              Berikan doa dan ucapan terbaik untuk kami.
            </p>
          </div>
        </div>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-input-group">
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="rsvp-input-name"
            />
          </div>
          <div className="rsvp-input-group">
            <textarea
              placeholder="Bagikan ucapan terbaik Anda..."
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
              required
              rows="4"
              className="rsvp-textarea-msg"
            ></textarea>
          </div>
          <p className="rsvp-label-status">Konfirmasi Kehadiran</p>
          <div className="rsvp-status-buttons">
            <button
              type="button"
              className={`rsvp-status-btn ${status === "Hadir" ? "active-hadir" : ""}`}
              onClick={() => setStatus("Hadir")}
            >
              Hadir
            </button>
            <button
              type="button"
              className={`rsvp-status-btn ${status === "Tidak Hadir" ? "active-tidakhadir" : ""}`}
              onClick={() => setStatus("Tidak Hadir")}
            >
              Tidak Hadir
            </button>
          </div>
          <button type="submit" className="rsvp-submit-btn">
            Kirim Ucapan
          </button>
        </form>
        <div className="rsvp-wishes-scroll-container">
          <div className="rsvp-wishes-list">
            {wishes.length === 0 ? (
              <p className="rsvp-empty-text">
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            ) : (
              wishes.map((wish, index) => (
                <div key={wish.id || index} className="rsvp-wish-card">
                  <div className="rsvp-wish-header">
                    <h4 className="rsvp-wish-name">{wish.nama}</h4>
                    <span
                      className={`rsvp-badge ${
                        wish.status === "Hadir"
                          ? "badge-hadir"
                          : "badge-tidakhadir"
                      }`}
                    >
                      {wish.status}
                    </span>
                  </div>
                  <p className="rsvp-wish-msg">{wish.ucapan}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="closing-container">
        <div className="closing-bg-wrapper">
          <img
            src="/images/closingbg1.webp"
            alt="Closing Background"
            className="closing-bg-image"
          />
          <div className="closing-content">
            <h2 className="closing-title">Terima Kasih</h2>
            <p className="closing-desc">
              Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
              kami.
            </p>
            <p className="closing-salam">
              Wassalamu’alaikum warahmatullahi wabarakatuh
            </p>
            <div className="closing-family">
              <p className="closing-label">Kami yang berbahagia</p>
              <h3 className="closing-names">Risma & Ikhsan</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="footer-section">
        <p className="footer-made">Specially made by</p>
        <h2 className="footer-brand">
          Dessy.<span>FYD</span>
        </h2>
        <p className="footer-contact">
          {" "}
          Specially crafted to bring your dream invitation into reality.
        </p>
        <div className="footer-socials">
          <a
            href="https://www.instagram.com/dessyfitriyanid/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/6285921656715"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaWhatsapp />
          </a>
        </div>
      </section>
    </div>
  );
}
