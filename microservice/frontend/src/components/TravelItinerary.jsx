import React, { useState } from 'react';
import MainNavbar from './MainNavbar'; // Assuming you have a Navbar component

function TravelItinerary() {
    const [itinerary, setItinerary] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // State to handle loading indicator
    const [form, setForm] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        interests: '',
        additional_notes: '',
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        const formData = new FormData();
        formData.append('destination', form.destination);
        formData.append('start_date', form.start_date);
        formData.append('end_date', form.end_date);
        formData.append('interests', form.interests);
        formData.append('additional_notes', form.additional_notes);

        try {
            const response = await fetch('http://127.0.0.1:5001/travel', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setItinerary(data.answer);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // End loading regardless of the outcome
        }
    };

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif", padding: '20px' }}>
            <MainNavbar/>
            <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2C3E50' }}>Plan Your Trip</h1>
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#ECF0F1', padding: '20px', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={form.destination}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Start Date</label>
                        <input
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>End Date</label>
                        <input
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Interests</label>
                        <input
                            type="text"
                            name="interests"
                            value={form.interests}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Additional Notes</label>
                        <textarea
                            name="additional_notes"
                            value={form.additional_notes}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc', minHeight: '100px' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#ffffff', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                {itinerary && (
                    <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h2>Your itinerary</h2>
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: itinerary }} />
                   
                        </div>
                )}
            </div>
        </div>
    );
}

export default TravelItinerary;
