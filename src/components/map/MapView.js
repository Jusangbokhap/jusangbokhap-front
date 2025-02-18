import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapView = () => {
  const navigate = useNavigate();
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAOMAP_KEY;

    // Kakao Maps API가 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsKakaoLoaded(true);
      });
      return;
    }

    // Kakao Maps API 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      console.log("✅ Kakao Maps API Loaded");
      window.kakao.maps.load(() => setIsKakaoLoaded(true));
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isKakaoLoaded || !window.kakao || !window.kakao.maps) {
      return;
    }

    const container = document.getElementById("map");
    if (!container) return;

    try {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
          level: 3,
        };

        new window.kakao.maps.Map(container, options);
      });
    } catch (error) {
      console.error("❌ Kakao Maps 생성 중 오류 발생:", error);
    }
  }, [isKakaoLoaded]);

  return (
    <div className="map-container">
      <div id="map" style={{ width: "100%", height: "100vh" }}>
        {!isKakaoLoaded && <p>🛠 지도 로딩 중...</p>}
      </div>

      {/* 목록 보기 버튼 */}
      <div>
        <button className="view-toggle-btn" onClick={() => navigate("/")}>
          <span>목록 보기</span>
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
            <path
              fill-rule="evenodd"
              d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapView;
