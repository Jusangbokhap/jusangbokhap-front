import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilterBar.css";
import {
    faCampground, faTicketAlt, faMountain, faHouseChimney, faUmbrellaBeach,
    faDungeon, faSwimmingPool, faTree, faSnowflake, faBicycle, faFire, faHotel,
    faPlane
} from "@fortawesome/free-solid-svg-icons";

const filterOptions = [
    { id: 1, name: "캠핑장", icon: faCampground },
    { id: 2, name: "컬쳐 아이콘", icon: faTicketAlt },
    { id: 3, name: "최고의 전망", icon: faMountain },
    { id: 4, name: "한옥", icon: faHouseChimney },
    { id: 5, name: "해변 근처", icon: faUmbrellaBeach },
    { id: 6, name: "동굴", icon: faDungeon },
    { id: 7, name: "수영장", icon: faSwimmingPool },
    { id: 8, name: "국립공원", icon: faTree },
    { id: 9, name: "겨울 휴양지", icon: faSnowflake },
    { id: 10, name: "자전거 여행", icon: faBicycle },
    { id: 11, name: "불멍 캠핑", icon: faFire },
    { id: 12, name: "고급 호텔", icon: faHotel },
    { id: 13, name: "비행기 근처", icon: faPlane },
];

const FilterBar = ({ activeFilter, setActiveFilter }) => {
    return (
        <div className="filter-bar">
            {filterOptions.map((filter) => (
                <div
                    key={filter.id}
                    className={`filter-button ${activeFilter === filter.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter.id)}
                >
                    <FontAwesomeIcon icon={filter.icon} size="lg" />
                    <span>{filter.name}</span>
                </div>
            ))}
            {/* 우측 필터 버튼 */}
            <div className="filter-fixed">
                <span>⚙️ 필터</span>
            </div>
        </div>
    );
};

export default FilterBar;
