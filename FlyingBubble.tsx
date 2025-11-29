import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface FlyingBubbleProps {
    startPos: { x: number; y: number };
    endPos: { x: number; y: number };
    onComplete: () => void;
}

const FlyingBubble: React.FC<FlyingBubbleProps> = ({ startPos, endPos, onComplete }) => {
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'fixed',
        left: startPos.x,
        top: startPos.y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ef4444', // Red-500
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: '0 4px 6px rgba(239, 68, 68, 0.4)',
    });

    useEffect(() => {
        // Trigger animation in next frame
        requestAnimationFrame(() => {
            setStyle((prev) => ({
                ...prev,
                left: endPos.x,
                top: endPos.y,
                transform: 'translate(-50%, -50%) scale(0.5)', // Shrink as it arrives
                opacity: 0.5,
            }));
        });

        const timer = setTimeout(() => {
            onComplete();
        }, 800); // Match transition duration

        return () => clearTimeout(timer);
    }, [endPos, onComplete]);

    return ReactDOM.createPortal(<div style={style} />, document.body);
};

export default FlyingBubble;
