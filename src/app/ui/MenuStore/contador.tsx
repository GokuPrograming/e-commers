import React, { useState } from 'react';

type CounterProps = {
    onCountChange: (count: number) => void;
    //onResetCount: () => void;

};

const Counter: React.FC<CounterProps> = ({ onCountChange}) => {
    const [count, setCount] = useState<number>(1);
 
    const ResetCount = () => {
        setCount(1);
        //  onReset();
    };

    return (
       <></>
    );
};

export default Counter;
