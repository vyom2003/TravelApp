import React, { useEffect } from 'react';

function SuccessPage() {
    useEffect(() => {
        const redirect = setTimeout(() => {
            window.location.href = '/my-bookings';
        }, 5000);

        return () => clearTimeout(redirect);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Payment Successful</h1>
            <p>Your payment has been processed successfully.</p>
            <p>Redirecting to travel page...</p>
        </div>
    );
}

export default SuccessPage;
