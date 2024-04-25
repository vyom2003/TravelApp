import React, { useEffect } from 'react';

function FailurePage() {
    useEffect(() => {
        const redirect = setTimeout(() => {
            window.location.href = '/my-bookings';
        }, 5000);

        return () => clearTimeout(redirect);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Payment Failed</h1>
            <p>There was an error processing your payment.</p>
            <p>Redirecting to travel page...</p>
        </div>
    );
}

export default FailurePage;
