// ImageGallery.js
import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    return (
        <div className="image-gallery">
            <div className="gallery-grid">
                {/* 메인 큰 이미지 */}
                <div className="main-image">
                    <img src={images[0]} alt="Main" />
                </div>
                {/* 4개의 작은 이미지 */}
                <div className="sub-images">
                    {images.slice(1, 5).map((image, index) => (
                        <div key={index} className="sub-image">
                            <img src={image} alt={`Room ${index + 2}`} />
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="show-all-photos"
                onClick={() => setShowAllPhotos(true)}
            >
                모든 사진 보기
            </button>
        </div>
    );
};

export default ImageGallery;