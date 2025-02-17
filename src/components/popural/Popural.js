import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import "./Popural.css"
const Popural = () => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1초마다 업데이트
    return () => clearInterval(timer);
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
            {/* 왼쪽 리스트 */}
            <ul className="popural-list">
              <li><span>1</span> Goorm</li>
              <li><span>2</span> Java</li>
              <li><span>3</span> Spring</li>
              <li><span>4</span> React</li>
            </ul>
            {/* 오른쪽 리스트 */}
            <ul className="popural-list">
              <li><span>5</span> Goom</li>
              <li><span>6</span> Goom</li>
              <li><span>7</span> Goom</li>
              <li><span>8</span> Goom</li>
            </ul>

            <ul className="popural-list">
              <li><span>9</span> Goorm</li>
              <li><span>10</span> Goom</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popural;