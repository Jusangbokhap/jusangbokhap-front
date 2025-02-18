// ReservationCard.js
import React, { useState } from 'react';
import './ReservationCard.css';

const ReservationCard = ({ price, rating, reviewCount }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guestCount, setGuestCount] = useState(1);

    return (
        <div className="reservation-card">
            <div className="price-info">
                <span className="price">₩{price.toLocaleString()}</span>
                <span className="per-night">/박</span>
            </div>

            <div className="date-picker-container">
                <div className="check-in">
                    <label>체크인</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>
                <div className="check-out">
                    <label>체크아웃</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>
            </div>

            <div className="guest-selector">
                <label>인원</label>
                <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                >
                    {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}명</option>
                    ))}
                </select>
            </div>

            <button className="reserve-button">
                예약하기
            </button>

            <div className="total-price">
                총 요금: ₩{price.toLocaleString()}
            </div>
        </div>
    );
};

export default ReservationCard;