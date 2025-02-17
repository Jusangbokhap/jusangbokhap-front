import React, { useState } from "react";
import "./GuestPicker.css";

const GuestPicker = () => {
  // 모달 열림/닫힘 상태
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  // 인원 상태
  const [adultCount, setAdultCount] = useState(1);   // 성인 (기본 1명)
  const [childCount, setChildCount] = useState(0);   // 어린이
  const [infantCount, setInfantCount] = useState(0); // 유아
  const [petCount, setPetCount] = useState(0);       // 반려동물

  // 모달 토글
  const toggleGuestModal = () => {
    setIsGuestModalOpen((prev) => !prev);
  };

  // 증감 핸들러
  const handleIncrement = (type) => {
    switch (type) {
      case "adult":
        setAdultCount(adultCount + 1);
        break;
      case "child":
        setChildCount(childCount + 1);
        break;
      case "infant":
        setInfantCount(infantCount + 1);
        break;
      case "pet":
        setPetCount(petCount + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case "adult":
        // 성인은 최소 1명
        setAdultCount(Math.max(1, adultCount - 1));
        break;
      case "child":
        setChildCount(Math.max(0, childCount - 1));
        break;
      case "infant":
        setInfantCount(Math.max(0, infantCount - 1));
        break;
      case "pet":
        setPetCount(Math.max(0, petCount - 1));
        break;
      default:
        break;
    }
  };

  // 게스트 요약 문구 (예: "성인 2, 어린이 1" 등)
  const guestSummary = `게스트 ${
    adultCount + childCount + infantCount
  }명${petCount > 0 ? `, 반려동물 ${petCount}마리` : ""}`;

  return (
    <div className="guest-picker">
      {/* 여행자 영역 */}
      <div className="search-item" onClick={toggleGuestModal}>
        <div className="search-title">여행자</div>
        <div className="search-subtitle">{guestSummary}</div>
      </div>

      {/* 모달 */}
      {isGuestModalOpen && (
        <div className="guest-modal">
          {/* 성인 */}
          <div className="guest-item">
            <div className="guest-label">
              성인
              <span className="guest-age-info">13세 이상</span>
            </div>
            <div className="guest-control">
              <button onClick={() => handleDecrement("adult")}>-</button>
              <span>{adultCount}</span>
              <button onClick={() => handleIncrement("adult")}>+</button>
            </div>
          </div>

          {/* 어린이 */}
          <div className="guest-item">
            <div className="guest-label">
              어린이
              <span className="guest-age-info">2~12세</span>
            </div>
            <div className="guest-control">
              <button onClick={() => handleDecrement("child")}>-</button>
              <span>{childCount}</span>
              <button onClick={() => handleIncrement("child")}>+</button>
            </div>
          </div>

          {/* 유아 */}
          <div className="guest-item">
            <div className="guest-label">
              유아
              <span className="guest-age-info">2세 미만</span>
            </div>
            <div className="guest-control">
              <button onClick={() => handleDecrement("infant")}>-</button>
              <span>{infantCount}</span>
              <button onClick={() => handleIncrement("infant")}>+</button>
            </div>
          </div>

          {/* 반려동물 */}
          <div className="guest-item">
            <div className="guest-label">반려동물</div>
            <div className="guest-control">
              <button onClick={() => handleDecrement("pet")}>-</button>
              <span>{petCount}</span>
              <button onClick={() => handleIncrement("pet")}>+</button>
            </div>
          </div>

          {/* 모달 바깥 클릭 닫기 버튼 or 적용 버튼 */}
          <div className="guest-modal-buttons">
            <button onClick={toggleGuestModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestPicker;
