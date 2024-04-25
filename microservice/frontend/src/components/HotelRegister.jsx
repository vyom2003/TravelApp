import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar';

function HotelRegister() {
    const navigate = useNavigate();

    const [city, setCity] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [radius, setRadius] = useState(5);
    const [radiusUnit, setRadiusUnit] = useState('KM');
    const [amenities, setAmenities] = useState([]);
    const [rating, setRating] = useState('');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle city code fetching
    const fetchCityCode = async () => {
        try {
            const response = await fetch('http://localhost:5004/find_city_code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cityName: city })
            });
            const data = await response.json();
            if (data.cityCode) {
                console.log('City code:', data.cityCode);
                setCityCode(data.cityCode);
            } else {
                setErrorMessage('City code not found');
            }
        } catch (error) {
            console.error('Error fetching city code:', error);
            setErrorMessage('Failed to fetch city code');
        }
    };

    // useEffect hook to fetch city code when city name changes
    useEffect(() => {
        if (city && !cityCode) {
            fetchCityCode();
        }
    }, [city]);

    // Function to handle hotel search
    const handleSearch = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                cityCode,
                radius,
                radiusUnit,
                amenities: amenities.join(','),
                rating
            }).toString();
            const response = await fetch(`http://localhost:5004/search_hotels?${queryParams}`);
            const result = await response.json();
            if (Array.isArray(result)) {
                setHotels(result);
                setErrorMessage('');
            } else {
                setErrorMessage('API did not return an array');
                setHotels([]);
            }
        } catch (error) {
            console.error('Error searching hotels:', error);
            setErrorMessage('Failed to search hotels');
            setHotels([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        setCityCode(''); // Clear city code when city changes
    };

    const handleCityCodeChange = (event) => {
        setCityCode(event.target.value);
        setCity(''); // Clear city name when city code is manually set
    };

    const handleAmenityChange = (event) => {
        const selectedAmenities = Array.from(event.target.selectedOptions, option => option.value);
        setAmenities(selectedAmenities);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    return (
        <>
            <MainNavbar />
            <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px',marginTop:"70px" }}>
                <h1 style={{ textAlign: 'center' }}>Hotel Search</h1>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="Enter city name"
                        style={{ width: '100%', padding: '8px', margin: '5px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <span> or </span>
                    <select
                        value={cityCode}
                        onChange={handleCityCodeChange}
                        style={{ width: '100%', padding: '8px', margin: '5px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="">Select a city code</option>
                        <option value="PAR">Paris (PAR)</option>
                        <option value="LON">London (LON)</option>
                        <option value="NYC">New York (NYC)</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="number"
                        value={radius}
                        onChange={e => setRadius(e.target.value)}
                        placeholder="Radius (KM)"
                        style={{ width: '100%', padding: '8px', margin: '5px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <select
                        value={radiusUnit}
                        onChange={e => setRadiusUnit(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '5px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="KM">Kilometer</option>
                        <option value="MILE">Mile</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <select multiple={true} value={amenities} onChange={handleAmenityChange} style={{ height: '100px', width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <option value="SWIMMING_POOL">Swimming Pool</option>
                        <option value="SPA">Spa</option>
                        <option value="FITNESS_CENTER">Fitness Center</option>
                        <option value="AIR_CONDITIONING">Air Conditioning</option>
                        <option value="RESTAURANT">Restaurant</option>
                        {/* Add more amenities as needed */}
                    </select>
                    <select
                        value={rating}
                        onChange={handleRatingChange}
                        style={{ width: '100%', padding: '8px', margin: '5px 0', display: 'inline-block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="">Select Rating</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>
                <button
                    onClick={handleSearch}
                    style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Search
                </button>
                {loading && <p>Loading...</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <div>
                    {hotels.map((hotel, index) => (
                        <div key={index}>
                            <h4>{hotel.name}</h4>

                            <button onClick={() => navigate(`/booking/${encodeURIComponent(hotel.name)}/${(hotel.rating) ? (hotel.rating) : 3}`)}>
                                Book this hotel
                            </button>
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HotelRegister;
