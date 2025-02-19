import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { format, parseISO, addDays } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";
import "./MainSearch.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 

function useOutsideClick(ref, closeFunction) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeFunction();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, closeFunction]);
}

const MainSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedLocation, setSelectedLocation] = useState("");
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const handleLocationClick = () => {
        setIsLocationModalOpen((prev) => !prev);
    };

    const [businessName, setBusinessName] = useState("");
    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");
    const [eupmyeondong, setEupmyeondong] = useState("");
    const [detail, setDetail] = useState("");


    const queryParams = new URLSearchParams(location.search);
    const checkinParam = queryParams.get("checkin");
    const checkoutParam = queryParams.get("checkout");
    const sidoParam = queryParams.get("sido");
    const guestParam = queryParams.get("guests");

    const initialGuests = guestParam ? parseInt(guestParam, 10) : 1;
    const initialCheckin = checkinParam ? parseISO(checkinParam) : new Date();
    const initialCheckout = checkoutParam ? parseISO(checkoutParam) : addDays(new Date(), 1);


    useEffect(() => {
        // ✅ URL에서 가져온 guests 값을 adultCount에 반영
        if (guestParam) {
            setAdultCount(parseInt(guestParam, 10));
        }
    }, [guestParam]);

    useEffect(() => {
        if (checkinParam && checkoutParam) {
            setDateRange([
                {
                    startDate: parseISO(checkinParam), 
                    endDate: parseISO(checkoutParam),
                    key: "selection",
                },
            ]);
        }
    }, [checkinParam, checkoutParam]); 
    

    const regionList = [
        "서울특별시",
        "부산",
        "제주도",
        "속초",
        "강릉",
        "전주",
        "대구",
        "경주",
        "여수",
        "서귀포",
        "대전",
        "인천",
    ];

    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const toggleDateModal = () => {
        setIsDateModalOpen((prev) => !prev);
    };
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const handleSelectDate = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const checkinText = dateRange[0].startDate
        ? format(dateRange[0].startDate, "yyyy-MM-dd")
        : "날짜 추가";
    const checkoutText = dateRange[0].endDate
        ? format(dateRange[0].endDate, "yyyy-MM-dd")
        : "날짜 추가";

    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const toggleGuestModal = () => {
        setIsGuestModalOpen((prev) => !prev);
    };
    const closeGuestModal = () => {
        setIsGuestModalOpen(false);
    };

    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [petCount, setPetCount] = useState(0);

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

    const handleAddressConfirm = () => {
        const fullAddress = `${businessName} ${sido} ${sigungu} ${eupmyeondong} ${detail}`.trim();
        setSelectedLocation(fullAddress);
        setIsLocationModalOpen(false);
    };


    const handleRegionClick = (region) => {
        setSelectedLocation(region);
        setIsLocationModalOpen(false);
        setSido(region);
    };


    const totalGuests = adultCount + childCount + infantCount;
    const guestSubtitle =
        totalGuests > 1 || petCount > 0
            ? `게스트 ${totalGuests}명${petCount > 0 ? `, 반려동물 ${petCount}마리` : ""
            }`
            : "게스트 추가";

    const locationModalRef = useRef(null);
    const dateModalRef = useRef(null);
    const guestModalRef = useRef(null);

    useOutsideClick(locationModalRef, () => {
        if (isLocationModalOpen) setIsLocationModalOpen(false);
    });
    useOutsideClick(dateModalRef, () => {
        if (isDateModalOpen) setIsDateModalOpen(false);
    });
    useOutsideClick(guestModalRef, () => {
        if (isGuestModalOpen) setIsGuestModalOpen(false);
    });

    const handleSearch = () => {
        const params = {
            businessName: businessName,
            sido: sido,
            sigungu: sigungu,
            eupmyeondong: eupmyeondong,
            detail: detail,
            checkin: dateRange[0].startDate ? format(dateRange[0].startDate, "yyyy-MM-dd") : "",
            checkout: dateRange[0].endDate ? format(dateRange[0].endDate, "yyyy-MM-dd") : "",
            guests: totalGuests,
            type: "HOTEL",
        };
    
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                queryParams.append(key, value);
            }
        });
    
        navigate(`/accommodations?${queryParams.toString()}`);
    };
    
    return (
        <div id="main-search">
            <div className="container">
                <div className="search-container">
                    <div className="search-item" onClick={handleLocationClick}>
                        <div className="search-title">위치</div>
                        <div className="search-subtitle">
                        {selectedLocation ? selectedLocation : (sidoParam ? sidoParam : "어디로 여행가시나요?")}

                        </div>
                        {isLocationModalOpen && (
                            <div
                                ref={locationModalRef}
                                className="location-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="modal-region-title">대한민국</div>

                                <div className="modal-region-options">
                                    {regionList.map((region) => (
                                        <button
                                            key={region}
                                            onClick={() => handleRegionClick(region)}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>

                                <br></br>

                                <div className="modal-region-title">유연한 검색</div>
                                <div className="location-inputs">
                                    <input
                                        type="text"
                                        placeholder="상호명"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        placeholder="시도"
                                        value={sido}
                                        onChange={(e) => setSido(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        placeholder="시군구"
                                        value={sigungu}
                                        onChange={(e) => setSigungu(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="읍면동"
                                        value={eupmyeondong}
                                        onChange={(e) => setEupmyeondong(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="상세 주소"
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                    />
                                </div>
                                <div className="modal-region-buttons">
                                    <button onClick={handleAddressConfirm}>확인</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="search-item" onClick={toggleDateModal}>
                        <div className="search-title">체크인</div>
                        <div className="search-subtitle">{checkinText}</div>
                    </div>

                    <div className="search-item" onClick={toggleDateModal}>
                        <div className="search-title">체크아웃</div>
                        <div className="search-subtitle">{checkoutText}</div>
                    </div>

                    {isDateModalOpen && (
                        <div ref={dateModalRef} className="date-modal">
                            <DateRangePicker
                                editableDateInputs={true}
                                onChange={handleSelectDate}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                months={2}
                                direction="horizontal"
                            />
                            <div className="date-modal-buttons">
                                <button onClick={toggleDateModal}>적용</button>
                            </div>
                        </div>
                    )}

                    <div className="search-item" onClick={toggleGuestModal}>
                        <div className="search-title">여행자</div>
                        <div className="search-subtitle">{guestSubtitle}</div>

                        {isGuestModalOpen && (
                            <div ref={guestModalRef} className="guest-modal">
                                <div className="guest-item">
                                    <div className="guest-label">
                                        성인
                                        <span className="guest-age-info">13세 이상</span>
                                    </div>
                                    <div className="guest-control">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDecrement("adult");
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{adultCount}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleIncrement("adult");
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="guest-item">
                                    <div className="guest-label">
                                        어린이
                                        <span className="guest-age-info">2~12세</span>
                                    </div>
                                    <div className="guest-control">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDecrement("child");
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{childCount}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleIncrement("child");
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="guest-item">
                                    <div className="guest-label">
                                        유아
                                        <span className="guest-age-info">2세 미만</span>
                                    </div>
                                    <div className="guest-control">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDecrement("infant");
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{infantCount}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleIncrement("infant");
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="search-button" onClick={handleSearch}>
                        <svg fill="none" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M11 4a7 7 0 015.519 11.284l3.598 3.599a1 1 0 01-1.414 1.414l-3.599-3.598A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainSearch;
