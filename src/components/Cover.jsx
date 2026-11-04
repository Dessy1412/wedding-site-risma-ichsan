import "../styles/cover.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cover({ audioRef }) {
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [isOpening, setIsOpening] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to") || "Tamu Undangan";

    if (name) {
      setGuestName(decodeURIComponent(name));
    }
  }, []);

  const handleOpen = () => {
    setIsOpening(true);

    if (audioRef?.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Gagal memutar audio:", err);
      });
    }

    setTimeout(() => {
      const encodedName = encodeURIComponent(guestName);
      navigate(`/detailundangan?to=${encodedName}`);
    }, 800);
  };

  return (
    <section className={`cover-container ${isOpening ? "fade-out" : ""}`}>
      <div className="cover-header">
        <p className="cover-subtitle">THE WEDDING OF</p>
        <h1 className="cover-names">Risma & Ikhsan</h1>
      </div>

      <div className="cover-envelope-wrapper">
        <img
          src="/images/cover.webp"
          alt="Cover Amplop Undangan"
          className="cover-image"
          onClick={handleOpen}
        />
        <span className="cover-instruction">
          Ketuk amplop untuk membuka undangan...
        </span>
      </div>

      <div className="cover-guest-section">
        <p className="cover-guest-salutation">
          Kepada Yth.
          <br />
          Bapak/Ibu/Saudara/i
        </p>
        <h3 className="cover-guest-name">{guestName}</h3>
        <p className="cover-note">
          *Mohon maaf jika ada kesalahan dalam penulisan nama & gelar*
        </p>
      </div>
    </section>
  );
}
