// src/pages/AccommodationDetailPage/index.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import './AccommodationDetailPage.css';

const AccommodationDetailPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guestCount, setGuestCount] = useState(1);
    const [mapError, setMapError] = useState(false);

    const accommodation = {
        title: "강남역 도보 5분거리의 깔끔한 원룸",
        price: 120000,
        maxGuests: 4,
        location: {
            address: "서울특별시 강남구 역삼동 123-456",
            coordinates: {
                lat: 37.498095,
                lng: 127.027610
            }
        },
        images: [
            "https://picsum.photos/800/600",
            "https://picsum.photos/801/600",
            "https://picsum.photos/802/600",
            "https://picsum.photos/803/600"
        ],
        facilities: [
            { name: "편의점", count: 3, distance: "100m 이내" },
            { name: "지하철역", count: 2, distance: "500m 이내" },
            { name: "버스정류장", count: 4, distance: "200m 이내" },
            { name: "카페", count: 6, distance: "300m 이내" }
        ]
    };

    const calculateNights = () => {
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const totalPrice = accommodation.price * calculateNights();

    const MapComponent = () => {
        if (mapError) {
            return (
                <div style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#f8f8f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                }}>
                    <p>지도를 불러올 수 없습니다.</p>
                </div>
            );
        }

        return (
            <Map
                center={{
                    lat: accommodation.location.coordinates.lat,
                    lng: accommodation.location.coordinates.lng
                }}
                style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '8px'
                }}
                level={3}
            >
                <MapMarker
                    position={{
                        lat: accommodation.location.coordinates.lat,
                        lng: accommodation.location.coordinates.lng
                    }}
                />
            </Map>
        );
    };

    useEffect(() => {
        // 카카오맵 로드 확인
        if (!window.kakao) {
            setMapError(true);
        }
    }, []);

    return (
        <div className="accommodation-detail-page">
            <header>
                <h1>{accommodation.title}</h1>
            </header>

            <div className="content-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
                <div className="main-content">
                    {/* 이미지 그리드 */}
                    <div className="image-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        {accommodation.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`숙소 이미지 ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '12px'
                                }}
                            />
                        ))}
                    </div>

                    {/* 주변 시설 섹션 */}
                    <div className="facilities-section" style={{
                        marginBottom: '24px',
                        padding: '24px',
                        border: '1px solid #ddd',
                        borderRadius: '12px'
                    }}>
                        <h2 style={{ marginBottom: '16px' }}>주변 시설</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px'
                        }}>
                            {accommodation.facilities.map((facility, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '16px',
                                        backgroundColor: '#f8f8f8',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <h3 style={{ marginBottom: '8px' }}>{facility.name}</h3>
                                    <p style={{ color: '#666' }}>
                                        {facility.count}개 • {facility.distance}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 위치 정보 섹션 */}
                    <div className="location-section" style={{
                        marginBottom: '24px',
                        padding: '24px',
                        border: '1px solid #ddd',
                        borderRadius: '12px'
                    }}>
                        <h2 style={{ marginBottom: '16px' }}>위치</h2>
                        <p style={{ marginBottom: '16px' }}>{accommodation.location.address}</p>
                        <MapComponent />
                    </div>
                </div>

                <div className="sidebar">
                    <div className="booking-section" style={{
                        position: 'sticky',
                        top: '24px',
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '24px'
                    }}>
                        <h2 style={{ marginBottom: '16px' }}>
                            ₩{accommodation.price.toLocaleString()}/박
                        </h2>

                        {/* 날짜 선택 */}
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ marginBottom: '8px' }}>날짜 선택</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                    dateFormat="yyyy/MM/dd"
                                    className="date-picker"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="yyyy/MM/dd"
                                    className="date-picker"
                                />
                            </div>
                        </div>

                        {/* 인원 선택 */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ marginBottom: '8px' }}>인원 (최대 {accommodation.maxGuests}명)</div>
                            <select
                                value={guestCount}
                                onChange={(e) => setGuestCount(Number(e.target.value))}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            >
                                {[...Array(accommodation.maxGuests)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}명
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 가격 정보 */}
                        <div style={{
                            marginBottom: '24px',
                            padding: '16px',
                            backgroundColor: '#f8f8f8',
                            borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>₩{accommodation.price.toLocaleString()} x {calculateNights()}박</span>
                                <span>₩{totalPrice.toLocaleString()}</span>
                            </div>
                            <div style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>
                                <strong>총 합계: ₩{totalPrice.toLocaleString()}</strong>
                            </div>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: '#FF385C',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            예약하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetailPage;