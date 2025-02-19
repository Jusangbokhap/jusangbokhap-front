import React from "react";

const ViewToggleButton = ({ isMapVisible, toggleView }) => {
  return (
    <div className="view-toggle-container">
      <button className="view-toggle-btn" onClick={toggleView}>
        <span>{isMapVisible ? "목록 보기" : "지도 표시하기"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={isMapVisible ? "0 0 17 17" : "0 0 32 32"}
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: "16px",
            width: "16px",
            fill: "white",
            marginLeft: "8px",
          }}
        >
          {isMapVisible ? (
            <path
              fillRule="evenodd"
              d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"
            ></path>
          ) : (
            <path d="M31.25 3.75a2.29 2.29 0 0 0-1.01-1.44A2.29 2.29 0 0 0 28.5 2L21 3.67l-10-2L2.5 3.56A2.29 2.29 0 0 0 .7 5.8v21.95a2.28 2.28 0 0 0 1.06 1.94A2.29 2.29 0 0 0 3.5 30L11 28.33l10 2 8.49-1.89a2.29 2.29 0 0 0 1.8-2.24V4.25a2.3 2.3 0 0 0-.06-.5zM12.5 25.98l-1.51-.3L9.5 26H9.5V4.66l1.51-.33 1.49.3v21.34zm10 1.36-1.51.33-1.49-.3V6.02l1.51.3L22.5 6h.01v21.34z"></path>
          )}
        </svg>
      </button>
    </div>
  );
};

export default ViewToggleButton;
