import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./TrendingSearch.css";

const API_URL = "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/search/rank";

const TrendingSearch = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [keywords, setKeywords] = useState([]);

    // API에서 인기 검색어 데이터를 가져오는 함수
    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
                const data = await response.json();
                setKeywords(data);
            } catch (error) {
                console.error("API 요청 오류:", error);
            }
        };

        fetchKeywords();

        // 데이터 갱신 (1분마다 업데이트)
        const interval = setInterval(() => {
            fetchKeywords();
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="popural-keyword">
            <div className="container">
                <div className="popural-container">
                    {/* 상단 헤더 (왼쪽: 제목, 오른쪽: 날짜/시간) */}
                    <div className="popural-header">
                        <h2 className="popural-title">🔥 실시간 인기 키워드</h2>
                        <div className="popural-date">{format(currentTime, "yyyy.MM.dd HH:mm")}</div>
                    </div>

                    <div className="popural-content">
                        {/* API 데이터 기반으로 동적으로 리스트 생성 */}
                        <ul className="popural-list">
                            {keywords.map((keyword, index) => (
                                <li key={index}>
                                    <span>{keyword.rank}</span> {keyword.keyword} ({keyword.count}회)
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingSearch;
