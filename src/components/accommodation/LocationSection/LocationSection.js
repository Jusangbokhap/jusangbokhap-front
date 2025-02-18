// LocationSection.js
import React from 'react';
import KakaoMap from '../KakaoMap';
import './LocationSection.css';

const LocationSection = ({ location, facilities }) => {
    return (
        <div className="location-section">
            <h2>위치</h2>
            <div className="map-container">
                <KakaoMap
                    latitude={location.latitude}
                    longitude={location.longitude}
                />
            </div>
            <div className="location-info">
                <h3>주변 편의시설</h3>
                <div className="facilities-grid">
                    {facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                            <span className="facility-icon">{facility.icon}</span>
                            <span>{facility.name}</span>
                            <span className="distance">{facility.distance}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocationSection;