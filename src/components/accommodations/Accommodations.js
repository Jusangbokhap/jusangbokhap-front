import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import "./Accommodations.css";
import MainSearch from "../mainsearch/MainSearch";
import FilterBar from "../filter/Filterbar";

const API_BASE_URL = "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/accommodations/search";
const DEFAULT_IMAGE = "images/back.png"; // 기본 이미지 경로
const Accommodations = () => {
    const location = useLocation();
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccommodations = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}${location.search}`);
                if (!response.ok) throw new Error("데이터 불러오기 실패");
                const data = await response.json();
                setAccommodations(data);
                console.log(data);
            } catch (error) {
                console.error("API 요청 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, [location.search]);

    return (
        <div id="accommodations">
            <div className="list-header">
                <Header />
            </div>

            <div className="search-bar">
                <MainSearch />
            </div>

            <div className="container">
                <FilterBar />

                {loading ? (
                    <p>🔄 검색 결과를 불러오는 중...</p>
                ) : accommodations.length > 0 ? (
                    <div className="accommodation-list">
                        {accommodations.map((item) => (
                            <div key={item.id} className="accommodation-card">
                               <img 
                                    src={item.image ? item.image : DEFAULT_IMAGE} 
                                    alt={item.title} 
                                    className="accommodation-image" 
                                />
                                <div className="accommodation-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.location}</p>
                                    <p>{item.date}</p>
                                    <p>{item.address}</p>
                                    {/* <p>⭐ {item.rating}</p> */}
                                    <p className="accommodation-price">₩{item.totalPrice} / 박</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>❌ 검색 결과가 없습니다.</p>
                )}

                <button className="floating-map-button">지도 검색</button>
            </div>
        </div>
    );
};

export default Accommodations;
