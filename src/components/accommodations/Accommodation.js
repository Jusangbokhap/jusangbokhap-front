import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import "./Accommodation.css";
import MainSearch from "../mainsearch/MainSearch";
import ReservationWidget from "../reservation/ReservationWidget";
import KakaoMap from '../KakaoMap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStore,
    faBed,
    faPills,
    faHospital,
    faBaby,
    faGraduationCap,
    faSchool,
    faGasPump,
    faLandmark,
    faUniversity,
    faCar,
    faTheaterMasks,
    faSubway,
    faHome,
    faUtensils,
    faShoppingCart,
    faCoffee,
    faBinoculars,
} from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/host/accommodations/";
const API_FACILITY_URL = "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/facility/";

const DEFAULT_IMAGE = "/images/back.png";

// 시설 아이콘 매핑
const facilityIcons = {
    "편의점": faStore,
    "숙박": faBed,
    "약국": faPills,
    "병원": faHospital,
    "어린이집, 유치원": faBaby,
    "학원": faGraduationCap,
    "학교": faSchool,
    "주유소, 충전소": faGasPump,
    "공공기관": faLandmark,
    "은행": faUniversity,
    "주차장": faCar,
    "문화시설": faTheaterMasks,
    "지하철역": faSubway,
    "중개업소": faHome,
    "음식점": faUtensils,
    "대형마트": faShoppingCart,
    "카페": faCoffee,
    "관광명소": faBinoculars,
};

const Accommodation = () => {
    const { id } = useParams();
    const [accommodation, setAccommodation] = useState(null);
    const [facilities, setFacilities] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingFacilities, setLoadingFacilities] = useState(true);

    useEffect(() => {
        const fetchAccommodation = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}${id}`);
                if (!response.ok) throw new Error("데이터 불러오기 실패");
                const data = await response.json();
                setAccommodation(data);

                fetchFacilities(id);
            } catch (error) {
                console.error("API 요청 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    const fetchFacilities = async (accommodationId) => {
        setLoadingFacilities(true);
        try {
            const response = await fetch(`${API_FACILITY_URL}${accommodationId}`);
            if (!response.ok) throw new Error("시설 데이터 불러오기 실패");
            const data = await response.json();
            setFacilities(data);
        } catch (error) {
            console.error("시설 API 요청 오류:", error);
        } finally {
            setLoadingFacilities(false);
        }
    };



    if (loading) return null;

    return (
        <div id="accommodation">
            <div className="list-header">
                <Header />
            </div>

            <div className="search-bar">
                <MainSearch />
            </div>

            <div className="ac-container">
                {loading ? (
                    <p className="search-result">🔄 숙소 정보를 불러오는 중...</p>
                ) : accommodation ? (
                    <div className="accommodation-detail">
                        <div className="accommodation-info">
                            <h2>{accommodation.businessName}</h2>
                            <img
                                src={accommodation.image || DEFAULT_IMAGE}
                                alt={accommodation.title}
                                className="accommodation-image"
                            />
                            <h2 className="accommodation-title">{accommodation.title}</h2>
                            <p className="accommodation-sub">
                                최대 인원 {accommodation.guests}명, {accommodation.accommodationType}
                            </p>
                            <hr />
                        </div>
                    </div>
                ) : (
                    <p className="search-result">❌ 해당 숙소를 찾을 수 없습니다.</p>
                )}

                <div className="facility-container">
                    <h3>🏠 숙소 주변 시설 (반경 2km)</h3>
                    {loadingFacilities ? (
                        <p className="search-result">🔄 시설 정보를 불러오는 중...</p>
                    ) : facilities ? (
                        <div className="facility-grid">
                            {Object.entries(facilities).map(([facilityName, count]) => (
                                <div key={facilityName} className="facility-item">
                                    <FontAwesomeIcon icon={facilityIcons[facilityName] || faHome} className="facility-icon" />
                                    <span>{facilityName} ({count}개)</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="search-result">❌ 시설 정보를 불러올 수 없습니다.</p>
                    )}
                </div>

                <hr className=""></hr>

                

                <div className="accommodation-detail">
                    <div className="accommodation-content">

                        <div className="ac-description">


                        <p className="ac-des">
                                {accommodation.description === "string" ? "숙소 설명이 없습니다." : accommodation.description}
                            </p>

                            <div className="map-container">
                                <KakaoMap latitude={accommodation.y} longitude={accommodation.x} />
                            </div>

                        </div>


                        <div className="reservation-container">
                            <ReservationWidget pricePerNight={accommodation.price} />
                        </div>
                    </div>
                </div>
                <button className="floating-map-button">지도 검색</button>
            </div>
        </div>
    );
};

export default Accommodation;
