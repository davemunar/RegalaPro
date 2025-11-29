import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import AddedToQuoteSuccessModal from './AddedToQuoteSuccessModal';
import FlyingBubble from './FlyingBubble';

interface AnimationContextType {
    triggerSuccessAnimation: (startRect: DOMRect) => void;
    registerHeaderButton: (element: HTMLElement | null) => void;
    isHeaderGlowing: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
    const [isBubbleAnimating, setIsBubbleAnimating] = useState(false);
    const [isHeaderGlowing, setIsHeaderGlowing] = useState(false);

    const headerButtonRef = useRef<HTMLElement | null>(null);

    const registerHeaderButton = (element: HTMLElement | null) => {
        headerButtonRef.current = element;
    };

    const triggerSuccessAnimation = (startRect: DOMRect) => {
        console.log('Triggering success animation from:', startRect);
        // Center of the starting element (e.g., the "Add" button)
        setStartPos({
            x: startRect.left + startRect.width / 2,
            y: startRect.top + startRect.height / 2
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Start bubble animation after modal closes
        if (startPos && headerButtonRef.current) {
            setIsBubbleAnimating(true);
        }
    };

    const handleBubbleComplete = () => {
        setIsBubbleAnimating(false);
        setStartPos(null);

        // Trigger header glow
        setIsHeaderGlowing(true);
        setTimeout(() => {
            setIsHeaderGlowing(false);
        }, 1000); // Glow duration
    };

    const getEndPos = () => {
        if (!headerButtonRef.current) return { x: 0, y: 0 };
        const rect = headerButtonRef.current.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    };

    return (
        <AnimationContext.Provider value={{ triggerSuccessAnimation, registerHeaderButton, isHeaderGlowing }}>
            {children}
            <AddedToQuoteSuccessModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
            {isBubbleAnimating && startPos && (
                <FlyingBubble
                    startPos={startPos}
                    endPos={getEndPos()}
                    onComplete={handleBubbleComplete}
                />
            )}
        </AnimationContext.Provider>
    );
};

export const useAnimation = (): AnimationContextType => {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error('useAnimation must be used within an AnimationProvider');
    }
    return context;
};
