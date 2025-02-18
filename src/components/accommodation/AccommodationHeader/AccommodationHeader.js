// AccommodationHeader.js
import React from 'react';
import './AccommodationHeader.css';

const AccommodationHeader = ({ title, rating }) => {
    return (
        <div className="accommodation-header">
            <h1>{title}</h1>
            <div className="header-actions">
                <div className="rating-info">
                    <span className="star-icon">★</span>
                    <span className="rating">{rating}</span>
                </div>
                <button className="share-button">
                    <span className="icon">공유하기</span>
                </button>
                <button className="save-button">
                    <span className="icon">저장</span>
                </button>
            </div>
        </div>
    );
};

export default AccommodationHeader;