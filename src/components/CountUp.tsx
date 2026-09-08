import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

const CountUp = ({ end, duration = 2000, suffix = "", prefix = "", className = "" }: CountUpProps) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const startTimeRef = useRef<number | null>(null);
    const hasAnimatedRef = useRef(false);

    const startAnimation = () => {
        const step = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (ease-out-expo)
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            const currentCount = Math.floor(easeOut(percentage) * end);
            setCount(currentCount);

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(step);
    };

    useEffect(() => {
        const el = elementRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimatedRef.current) {
                    hasAnimatedRef.current = true;
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );

        if (el) {
            observer.observe(el);
        }

        return () => {
            if (el) {
                observer.unobserve(el);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

export default CountUp;
