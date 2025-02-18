import React, { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import MainSearch from "../mainsearch/MainSearch";
import Popural from "../trendingsearch/TrendingSearch";
import "./Hero.css";

const Hero = () => {
    const wrapRef = useRef(null);
    const [page, setPage] = useState(0);
  
    // useEffect(() => {
    //   const wrap = wrapRef.current;
    //   const containers = wrap.getElementsByClassName("container");
    //   const lastPage = containers.length - 1;
  
    //   const handleWheel = (e) => {
    //     e.preventDefault();
    //     let newPage = page;
    //     if (e.deltaY > 0) {
    //       newPage++;
    //     } else if (e.deltaY < 0) {
    //       newPage--;
    //     }
    //     if (newPage < 0) {
    //       newPage = 0;
    //     } else if (newPage > lastPage) {
    //       newPage = lastPage;
    //     }
    //     setPage(newPage);
    //     wrap.style.top = newPage * -100 + "vh";
    //   };
  
    //   window.addEventListener("wheel", handleWheel, { passive: false });
    //   return () => {
    //     window.removeEventListener("wheel", handleWheel);
    //   };
    // }, [page]);
  
    return (
      <div ref={wrapRef} className="wrap">
        <div className="hero">
            <Header/>
            <MainSearch/>
            <Popural/>
            
            <div className="hero_title">
                    <h1>이제 여행은</h1>
                    <h1>가까운 곳에서</h1>
                </div>
        </div>

      </div>
    );
  };
  
  export default Hero;