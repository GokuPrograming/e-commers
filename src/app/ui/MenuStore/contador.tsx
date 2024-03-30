import React, { useState, useEffect } from 'react';

const Counter = ({ onCountChange }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        onCountChange(count);
    }, [count, onCountChange]);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button 
                onClick={decrement}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
            >
                -
            </button>
            <span className="text-xl font-semibold">{count}</span>
            <button 
                onClick={increment}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
            >
                +
            </button>
        </div>
    );
};

export default Counter;
