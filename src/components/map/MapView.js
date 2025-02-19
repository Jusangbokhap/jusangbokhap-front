import React, { useEffect, useState, useRef } from "react";
import "./MapView.css";

const MapView = () => {
  const [map, setMap] = useState(null);
  const [accommodations, setAccommodations] = useState([]); // 숙소 데이터 저장
  const activePopupOverlayRef = useRef(null);

  const dummyAccommodations = [
    {
      id: 1,
      title: "서울 강남 숙소",
      latitude: 37.498,
      longitude: 127.027,
      price: 148353,
      image:
        "https://a0.muscache.com/im/pictures/439de884-1265-4d22-9df5-46757053b337.jpg?im_w=720&im_format=avif",
      address: "서울특별시 강남구 역삼동 144-17번지 201호",
      accommodationType: "HOTEL",
    },
    {
      id: 2,
      title: "홍대 스테이",
      latitude: 37.556,
      longitude: 126.923,
      price: 62890,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-49676256/original/346eb304-91c7-4d9b-b78a-1ee1f445507e.jpeg?im_w=720&im_format=avif",
      address: "서울특별시 마포구 홍대입구 57-9번지 302호",
      accommodationType: "GUESTHOUSE",
    },
    {
      id: 3,
      title: "이태원 하우스",
      latitude: 37.534,
      longitude: 126.994,
      price: 308118,
      image:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1005524787030880312/original/ba9611c6-30bb-4708-9dff-cce62c927c25.jpeg?im_w=720&im_format=avif",
      address: "서울특별시 용산구 이태원로 112-3번지",
      accommodationType: "VILLA",
    },
    {
      id: 4,
      title: "웨스틴조선 부산",
      latitude: 35.155843,
      longitude: 129.153882,
      price: 326700,
      image:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1005524787030880312/original/ba9611c6-30bb-4708-9dff-cce62c927c25.jpeg?im_w=720&im_format=avif",
      address: "부산 해운대구 동백로 67",
      accommodationType: "HOTEL",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(36.6665, 126.978),
          level: 13,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);

        // ✅ 초기 마커 표시 (더미 데이터)
        displayMarkers(newMap, dummyAccommodations);

        // ✅ 지도 이동/확대 시 숙소 검색 실행
        window.kakao.maps.event.addListener(newMap, "dragend", () =>
          searchAccommodations(newMap)
        );
        window.kakao.maps.event.addListener(newMap, "zoom_changed", () =>
          searchAccommodations(newMap)
        );

        // ✅ 최초 실행 시 숙소 검색
        searchAccommodations(newMap);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // ✅ 숙소 검색 API 호출
  const searchAccommodations = (mapInstance) => {
    if (!mapInstance) return;

    const center = mapInstance.getCenter();
    const level = mapInstance.getLevel();
    const radius = getRadiusByLevel(level);

    console.log(
      `📍 검색 중심 좌표: ${center.getLat()}, ${center.getLng()} | 반경: ${radius}m`
    );

    const AWS_ENDPOINT =
      "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/accommodations/search/coordinate";

    const params = new URLSearchParams({
      latitude: center.getLat(),
      longitude: center.getLng(),
      radius: radius,
    });

    // GET 요청에서 쿼리 파라미터 사용
    fetch(`${AWS_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("숙소 검색 결과:", data);
        setAccommodations(data);
        displayMarkers(mapInstance, data);
      })
      .catch((err) => console.error("숙소 검색 실패", err));

    // ✅ 테스트용: 더미 데이터로 마커 업데이트
    setAccommodations(dummyAccommodations);
    displayMarkers(mapInstance, dummyAccommodations);
  };

  // ✅ 지도 레벨에 따른 반경 계산
  const getRadiusByLevel = (level) => {
    const levelRadiusMap = {
      1: 200,
      2: 500,
      3: 1000,
      4: 2000,
      5: 4000,
      6: 8000,
      7: 16000,
      8: 32000,
    };
    return levelRadiusMap[level] || 5000; // 기본값 5km
  };

  // ✅ 숙소 마커 표시 함수
  const displayMarkers = (mapInstance, data) => {
    if (!mapInstance) return;

    data.forEach((accommodation) => {
      const formattedPrice = accommodation.price.toLocaleString();
      const content = document.createElement("div");
      content.className = "overlay-label";
      content.innerHTML = `₩${formattedPrice}`;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(
          accommodation.latitude,
          accommodation.longitude
        ),
        map: mapInstance,
        content: content,
      });
      overlay.setMap(mapInstance);

      // ✅ 팝업 (클릭 시 표시)
      const popupContent = document.createElement("div");
      popupContent.className = "custom-popup";
      popupContent.innerHTML = `
      <div class="popup-content">
        <button class="popup-close-btn">✕</button>
        <img src="${accommodation.image}" alt="숙소 이미지" />
        <div class="popup-info">
          <div class="popup-title">${accommodation.title}</div>
          <div class="popup-address">${accommodation.address}</div>
          <div class="popup-type">${accommodation.accommodationType}</div>
          <div class="popup-price">
            <span class="price-value">₩${formattedPrice}</span>
            <span class="price-unit"> /박</span>
          </div>
        </div>
      </div>
    `;

      const popupOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(
          accommodation.latitude,
          accommodation.longitude
        ),
        content: popupContent,
        longitudeAnchor: -0.1,
        zIndex: 3,
      });

      // ✅ 마커 클릭 시 팝업 표시 (이벤트 추가)
      content.addEventListener("click", function (event) {
        event.stopPropagation(); // 다른 클릭 이벤트 방지
        if (activePopupOverlayRef.current) {
          activePopupOverlayRef.current.setMap(null);
          activePopupOverlayRef.current = null;
        }
        popupOverlay.setMap(mapInstance);
        activePopupOverlayRef.current = popupOverlay;
      });

      // ✅ 팝업 닫기 버튼 클릭 시 숨기기
      // / ✅ 팝업 닫기 버튼 클릭 시 숨기기
      popupContent
        .querySelector(".popup-close-btn")
        .addEventListener("click", function (event) {
          event.stopPropagation(); // 지도 클릭 이벤트 방지
          popupOverlay.setMap(null);
          activePopupOverlayRef.current = null;
        });

      // ✅ 지도 클릭 시 모든 팝업 닫기
      window.kakao.maps.event.addListener(mapInstance, "click", () => {
        if (activePopupOverlayRef.current) {
          activePopupOverlayRef.current.setMap(null);
          activePopupOverlayRef.current = null;
        }
      });
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ width: "100%", height: "100vh" }}>
        {!map && <p>🛠 지도 로딩 중...</p>}
      </div>
    </div>
  );
};

export default MapView;
