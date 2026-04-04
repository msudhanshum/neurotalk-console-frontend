import React from "react";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          width: 100%;
          height: 50px;
          background: #ffffff;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 90px;
          font-size: 12px;
        }

        .footer-left {
          color: #666;
          font-weight: 500;
        }

        .footer-right a {
          color: #f47c2c;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        .footer-right a:hover {
          text-decoration: underline;
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