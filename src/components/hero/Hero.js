import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import MainSearch from "../mainsearch/MainSearch";
import Popural from "../trendingsearch/TrendingSearch";
import MapView from "../map/MapView";
import ViewToggleButton from "../viewtogglebutton/ViewToggleButton";
import "./Hero.css";

const Hero = () => {
  const wrapRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const navigate = useNavigate();

  const toggleView = () => {
    setIsMapVisible((prev) => !prev);
  };

  return (
    <div ref={wrapRef} className="wrap">
      <Header isMapVisible={isMapVisible} />

      {isMapVisible ? (
        <MapView />
      ) : (
        <div className="hero">
          <MainSearch />
          <Popural />
          <div className="hero_title">
            <h1>이제 여행은</h1>
            <h1>가까운 곳에서</h1>
          </div>
        </div>
      )}

      {/* ✅ 버튼 컴포넌트 사용 */}
      <ViewToggleButton isMapVisible={isMapVisible} toggleView={toggleView} />
    </div>
  );
};

export default Hero;
