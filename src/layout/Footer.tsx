import React from "react";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* 🌈 FOOTER */
        .footer {
          width: 100%;
          height: 55px;
          background: linear-gradient(135deg, #ffffff, #f5f7fb);
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px 0 90px;
          font-size: 13px;
          box-shadow: 0 -5px 15px rgba(0,0,0,0.08);
        }

        /* 📝 LEFT TEXT */
        .footer-left {
          color: #555;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* 🔗 RIGHT SECTION */
        .footer-right {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
          color: #444;
        }

        /* 🌟 LINK */
        .footer-right a {
          text-decoration: none;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          transition: 0.3s ease;
          position: relative;
        }

        /* ✨ UNDERLINE ANIMATION */
        .footer-right a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 2px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          transition: 0.3s ease;
        }

        .footer-right a:hover::after {
          width: 100%;
        }

        .footer-right a:hover {
          opacity: 0.8;
        }
      `}</style>

      <footer className="footer">

        {/* LEFT */}
        <div className="footer-left">
          © {year} All Rights Reserved
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          By:
          <a href="https://infraapex.com/" target="_blank" rel="noreferrer">
            Infra Apex Technology
          </a>
        </div>

      </footer>
    </>
  );
};

export default Footer;