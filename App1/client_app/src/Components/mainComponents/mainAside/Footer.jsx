import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <nav>
        <a href="#footer">Terms</a>
        <a href="#footer">Privacy policy</a>
        <a href="#footer">Cookies</a>
        <a href="#footer">Ads info</a>
        <div>
          <a
            href="#footer"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            <span style={{ marginRight: "5px" }}>More</span>
            <svg viewBox="0 0 24 24" className="footer-img">
              <g>
                <path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path>
              </g>
            </svg>
          </a>
        </div>
        <div>
          <span>&copy; 2019 Twitter, Inc.</span>
        </div>
      </nav>
    </div>
  );
};
export default Footer;
