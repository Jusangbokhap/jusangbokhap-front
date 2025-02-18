import React, { useState } from "react";
import { format } from "date-fns";
import "./ReservationWidget.css";

const ReservationWidget = ({ pricePerNight }) => {
    const [checkin, setCheckin] = useState(new Date());
    const [checkout, setCheckout] = useState(new Date());
    const [guests, setGuests] = useState(1);

    const nights = Math.max(
        Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)), 1
    );

    const cleaningFee = 158654;
    const serviceFee = 457702;
    const tax = 418631;
    const totalPrice = pricePerNight * nights + cleaningFee + serviceFee + tax;

    return (
        <div className="reservation-widget">
            <h3><strong>₩{pricePerNight.toLocaleString()}</strong> /박</h3>

            <div className="date-picker">
                <div>
                    <label>체크인</label>
                    <input
                        type="date"
                        value={format(checkin, "yyyy-MM-dd")}
                        onChange={(e) => setCheckin(new Date(e.target.value))}
                    />
                </div>
                <div>
                    <label>체크아웃</label>
                    <input
                        type="date"
                        value={format(checkout, "yyyy-MM-dd")}
                        onChange={(e) => setCheckout(new Date(e.target.value))}
                    />
                </div>
            </div>

            <div className="guest-select">
                <label>인원</label>
                <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{`게스트 ${num}명`}</option>
                    ))}
                </select>
            </div>

            <button className="reserve-button">예약하기</button>

            <p className="disclaimer">예약 확정 전에는 요금이 청구되지 않습니다.</p>

            <hr />

            <div className="price-details">
                <p>₩{pricePerNight.toLocaleString()} x {nights}박 <span>₩{(pricePerNight * nights).toLocaleString()}</span></p>
                <p>청소비 <span>₩{cleaningFee.toLocaleString()}</span></p>
                <p>에어비앤비 서비스 수수료 <span>₩{serviceFee.toLocaleString()}</span></p>
                <p>세금 <span>₩{tax.toLocaleString()}</span></p>
            </div>

            <hr />

            <h3 className="total-price">총액 <span>₩{totalPrice.toLocaleString()}</span></h3>
        </div>
    );
};

export default ReservationWidget;
