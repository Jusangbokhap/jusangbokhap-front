import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import MainSearch from "../search/MainSearch";
import Popural from "../popural/Popural";
import MapView from "../map/MapView";
import "./Hero.css";

const Hero = () => {
  const wrapRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const wrap = wrapRef.current;
    const containers = wrap.getElementsByClassName("container");
    const lastPage = containers.length - 1;

    const handleWheel = (e) => {
      e.preventDefault();
      let newPage = page;
      if (e.deltaY > 0) {
        newPage++;
      } else if (e.deltaY < 0) {
        newPage--;
      }
      if (newPage < 0) {
        newPage = 0;
      } else if (newPage > lastPage) {
        newPage = lastPage;
      }
      setPage(newPage);
      wrap.style.top = newPage * -100 + "vh";
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [page]);

  return (
    <div ref={wrapRef} className="wrap">
      <div className="hero">
        <Header />
        <MainSearch />
        <Popural />

        <div className="hero_title">
          <h1>이제 여행은</h1>
          <h1>가까운 곳에서</h1>
        </div>
      </div>

      {/* 지도 표시하기 버튼 */}
      <div className="view-toggle-container">
        <button className="view-toggle-btn" onClick={() => navigate("/map")}>
          <span>지도 표시하기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              height: "16px",
              width: "16px",
              fill: "white",
              marginLeft: "8px", // 아이콘과 텍스트 간격 조정
            }}
          >
            <path d="M31.25 3.75a2.29 2.29 0 0 0-1.01-1.44A2.29 2.29 0 0 0 28.5 2L21 3.67l-10-2L2.5 3.56A2.29 2.29 0 0 0 .7 5.8v21.95a2.28 2.28 0 0 0 1.06 1.94A2.29 2.29 0 0 0 3.5 30L11 28.33l10 2 8.49-1.89a2.29 2.29 0 0 0 1.8-2.24V4.25a2.3 2.3 0 0 0-.06-.5zM12.5 25.98l-1.51-.3L9.5 26H9.5V4.66l1.51-.33 1.49.3v21.34zm10 1.36-1.51.33-1.49-.3V6.02l1.51.3L22.5 6h.01v21.34z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
