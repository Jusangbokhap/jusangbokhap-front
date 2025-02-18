import React, { useState } from "react";
import Header from "../header/Header";
import "./Accommodations.css";
import MainSearch from "../mainsearch/MainSearch";
import FilterBar from "../filter/Filterbar";

const accommodationsData = [
    {
        id: 1,
        title: "오스트레일리아 Luskintyre",
        location: "정원 및 강 전망",
        date: "3월 2일~7일",
        rating: 4.95,
        price: "₩220,004 /박",
        image: "images/back.png"
    },
    {
        id: 2,
        title: "미국 캘리포니아 Half Moon Bay",
        location: "해변 및 바다 전망",
        date: "2월 23일~28일",
        rating: 4.96,
        price: "₩528,381 /박",
        image: "images/back.png"
    },
    {
        id: 3,
        title: "독일 Gyhum",
        location: "한적한 시골",
        date: "3월 23일~28일",
        rating: 4.92,
        price: "₩235,880 /박",
        image: "images/back.png"
    },
    {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"
    },
    {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"
    },
    {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"
    },
    {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"
    },
    {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"

    }, {
        id: 4,
        title: "남아프리카 Wellington",
        location: "13,650km 거리",
        date: "3월 2일~7일",
        rating: 4.96,
        price: "₩140,926 /박",
        image: "images/back.png"
    }
];

const Accommodations = () => {

    const [activeFilter, setActiveFilter] = useState(null);

    return (
        <div id="accommodations">
            {/* 상단 헤더 */}
            <div className="list-header">
                <Header />
            </div>

            {/* 검색 바 */}
            <div className="search-bar">
                <MainSearch />
            </div>


            <div className="container">
                {/* 필터 바 추가 */}
                <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />


                {/* 숙소 리스트 */}
                <div className="container">
                    <div className="accommodation-list">
                        {accommodationsData.map((item) => (
                            <div key={item.id} className="accommodation-card">
                                <img src={item.image} alt={item.title} className="accommodation-image" />
                                <div className="accommodation-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.location}</p>
                                    <p>{item.date}</p>
                                    <p>⭐ {item.rating}</p>
                                    <p className="accommodation-price">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="floating-map-button">
                    지도 검색
                </button>

            </div>

        </div>
    );
}

export default Accommodations;
