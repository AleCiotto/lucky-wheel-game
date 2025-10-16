import { CSSProperties, useRef, useState } from 'react';
import './wheel.scss';

type WheelProps = {
    disabled?: boolean
    onTransitionEnd: (points: number | null) => any
}

const sliceMap = [
    { label: '0 (500pt)', color: 'bg-blue-500', points: 500 },
    { label: '45 (200pt)', color: 'bg-yellow-500', points: 200 },
    { label: '90 (Bankrupt)', color: 'bg-green-500', points: null },
    { label: '135 (150pt)', color: 'bg-white', points: 150 },
    { label: '180 (1000pt)', color: 'bg-red', points: 1000 },
    { label: '225 (-250pt)', color: 'bg-orange', points: -250 },
    { label: '270 (0pt)', color: 'bg-blue', points: 0 },
    { label: '315 (250pt)', color: 'bg-white', points: 250 },
];

function Wheel({ onTransitionEnd, disabled }: WheelProps) {
    let [degrees, setDegrees] = useState(0);
    let [previousDegrees, setPreviousDegrees] = useState<number>(0);
    let wheelRef = useRef<HTMLDivElement>(null);

    const [isAnimating, setIsAnimating] = useState(false);

    const onAnimationEnd = () => {
        setIsAnimating(false);

        const selectedSlice = Math.floor(degrees % 720 / 45);
        const points = sliceMap[selectedSlice].points;
        console.log('Landed on slice', selectedSlice, 'with points', points);
        onTransitionEnd(points);
    };

    const onButtonClick = () => {
        const nextDegrees = Math.floor(Math.random() * 360);
        const floorNextDegrees = Math.floor(nextDegrees / 45) * 45 + 720;
        setPreviousDegrees(degrees % 720);
        setDegrees(floorNextDegrees);
        setIsAnimating(true);
    }

    return (
        <>
            <div className='relative w-96 h-96'>
                <span className='pointer'>▼</span>
                <div
                    ref={wheelRef}
                    className={`pie ${isAnimating ? 'spinning' : ''} w-full h-full bg-red-500`}
                    style={{
                        '--previousDegrees': `-${previousDegrees}deg`,
                        '--degrees': `-${degrees}deg`
                    } as CSSProperties}
                    onAnimationEnd={onAnimationEnd}
                >
                    {
                        sliceMap.map((slice, index) => (
                            <span
                                key={index}
                                className={`slice slice-${index + 1} ${slice.color} w-48`}
                                data-points={slice.points}
                            >
                                {slice.label}
                            </span>
                        ))
                    }
                </div>
            </div>
            <button disabled={disabled || isAnimating} className='mt-10 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={onButtonClick}>
                Spin the wheel
            </button>
        </>
    )
}

export default Wheel;
