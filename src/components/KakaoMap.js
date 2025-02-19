import React, { useEffect, useState } from "react";

const KakaoMap = ({ latitude, longitude }) => {
    const REST_API_KEY = "6d3f1c129a728a61a263955c21cbdfcb"; // ✅ 카카오 API 키

    const [locationInfo, setLocationInfo] = useState({
        region1: "",
        region2: "",
        region3: "",
    });

    useEffect(() => {
        // ✅ 중복 로드 방지 (이미 존재하는 경우 스크립트 로드 안 함)
        const existingScript = document.getElementById("kakao-map-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "kakao-map-script";
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${REST_API_KEY}&autoload=false&libraries=services`;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(() => {
                    initMap();
                });
            };
        } else {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    initMap();
                });
            }
        }

        return () => {
            // ✅ 컴포넌트 언마운트 시 정리
            const mapContainer = document.getElementById("kakao-map");
            if (mapContainer) mapContainer.innerHTML = "";
        };
    }, [latitude, longitude]);

    // ✅ 행정구역 정보 요청 함수 (헤더 포함)
    const callRegionCodeAPI = async (x, y) => {
        const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${REST_API_KEY}`,
                    "KA": "sdk/1.0.0 os/javascript lang/ko-KR device/web",
                },
            });

            const data = await response.json();
            if (data?.documents?.length > 0) {
                const { region_1depth_name, region_2depth_name, region_3depth_name } = data.documents[0];

                setLocationInfo({
                    region1: region_1depth_name,
                    region2: region_2depth_name,
                    region3: region_3depth_name,
                });
            }
        } catch (error) {
            console.error("카카오 API 요청 오류:", error);
        }
    };

    const initMap = () => {
        if (!window.kakao || !window.kakao.maps) return;

        const container = document.getElementById("kakao-map");
        const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3, // 확대 수준
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(latitude, longitude),
        });

        marker.setMap(map);

        // 🔹 마커 클릭 시 행정구역 정보 요청
        window.kakao.maps.event.addListener(marker, "click", function () {
            callRegionCodeAPI(longitude, latitude);
        });

        // 🔹 초기 좌표로 행정구역 정보 요청
        callRegionCodeAPI(longitude, latitude);
    };

    return (
        <div>
            <div id="kakao-map" className="map-container" style={{ width: "100%", height: "400px", borderRadius: "10px" }}></div>
            <div className="location-info">
                <strong>{locationInfo.region1} {locationInfo.region2} {locationInfo.region3}</strong>
            </div>
        </div>
    );
};

export default KakaoMap;
