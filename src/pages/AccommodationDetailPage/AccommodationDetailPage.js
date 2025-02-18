// src/pages/AccommodationDetailPage/AccommodationDetailPage.js
import React, { useState, useEffect } from 'react';
import AccommodationHeader from '../../components/accommodation/AccommodationHeader';
import ImageGallery from '../../components/accommodation/ImageGallery';
import AccommodationInfo from '../../components/accommodation/AccommodationInfo';
import ReservationCard from '../../components/accommodation/ReservationCard';
import LocationSection from '../../components/accommodation/LocationSection';

const AccommodationDetailPage = () => {
    // 임시 데이터로 시작
    const [accommodationData, setAccommodationData] = useState({
        id: 1,
        title: "테스트 숙소",
        price: 150000,
        rating: 4.5,
        images: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
            "https://example.com/image4.jpg",
            "https://example.com/image5.jpg",
        ],
        location: {
            latitude: 37.5665,
            longitude: 126.9780,
            address: "서울시 중구",
        },
        facilities: [
            { name: "편의점", distance: "100m" },
            { name: "지하철역", distance: "500m" },
        ]
    });

    return (
        <div className="accommodation-detail-page">
            <AccommodationHeader
                title={accommodationData.title}
                rating={accommodationData.rating}
            />

            <div className="content-wrapper">
                <div className="main-content">
                    <ImageGallery images={accommodationData.images} />
                    <AccommodationInfo accommodationData={accommodationData} />
                    <LocationSection
                        location={accommodationData.location}
                        facilities={accommodationData.facilities}
                    />
                </div>

                <div className="sidebar">
                    <ReservationCard
                        price={accommodationData.price}
                        rating={accommodationData.rating}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetailPage;