import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <button onClick={handleBackClick} className='border-2 px-5 py-2 mb-4 rounded-md bg-black text-customBlue font-semibold border-customBlue'>Back</button>
    );
};

export default BackButton;
