import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./TrendingSearch.css";

const API_URL = "http://a32bb41c5ec06485180bf647c7ad01bc-1856292906.ap-northeast-2.elb.amazonaws.com/api/search/rank";

const groupByFour = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i += 4) {
        result.push(data.slice(i, i + 4));
    }
    return result;
};

const TrendingSearch = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
                let data = await response.json();
                data = data.slice(0, 10);
                setKeywords(data);
            } catch (error) {
                console.error("API 요청 오류:", error);
            }
        };

        fetchKeywords();

        const interval = setInterval(() => {
            fetchKeywords();
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const groupedKeywords = groupByFour(keywords); 

    return (
        <div id="popural-keyword">
            <div className="container">
                <div className="popural-container">
                    <div className="popural-header">
                        <h2 className="popural-title">🔥 실시간 인기 키워드</h2>
                        <div className="popural-date">{format(currentTime, "yyyy.MM.dd HH:mm")}</div>
                    </div>

                    <div className="popural-content">
                        {groupedKeywords.map((group, groupIndex) => (
                            <div key={groupIndex} className="popural-column">
                                {group.map((keyword, index) => (
                                    <div key={index} className={`popural-item rank-${keyword.rank}`}>
                                        <span className="popural-rank">{keyword.rank}</span>
                                        <span className="popural-keyword-text">{keyword.keyword}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingSearch;
