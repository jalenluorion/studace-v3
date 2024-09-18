import React from 'react';

const ColorCircle = ({ color }: { color: string }) => {
    return <div className={`h-6 w-6 rounded-full border-2 bg-${color}`}></div>;
};

export { ColorCircle };
