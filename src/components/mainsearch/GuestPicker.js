import React, { useState } from "react";
import "./GuestPicker.css";

const GuestPicker = () => {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [adultCount, setAdultCount] = useState(1); 
  const [childCount, setChildCount] = useState(0);  
  const [infantCount, setInfantCount] = useState(0); 

  const toggleGuestModal = () => {
    setIsGuestModalOpen((prev) => !prev);
  };

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
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case "adult":
        setAdultCount(Math.max(1, adultCount - 1));
        break;
      case "child":
        setChildCount(Math.max(0, childCount - 1));
        break;
      case "infant":
        setInfantCount(Math.max(0, infantCount - 1));
        break;
      default:
        break;
    }
  };

  const guestSummary = `게스트 ${
    adultCount + childCount + infantCount
  }명${petCount > 0 ? `, 반려동물 ${petCount}마리` : ""}`;

  return (
    <div className="guest-picker">
      <div className="search-item" onClick={toggleGuestModal}>
        <div className="search-title">여행자</div>
        <div className="search-subtitle">{guestSummary}</div>
      </div>

      {isGuestModalOpen && (
        <div className="guest-modal">
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


          <div className="guest-modal-buttons">
            <button onClick={toggleGuestModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestPicker;
