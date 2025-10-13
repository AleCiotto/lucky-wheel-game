import { useEffect, useRef, useState } from 'react';
import './wheel.module.scss';

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
    let [previousDegrees, setPreviousDegrees] = useState<number | null>(null);
    let wheelRef = useRef<HTMLDivElement>(null);
    let animation: Animation;

    useEffect(() => {
        if (disabled || (degrees === 0 && previousDegrees === null)) return;

        const floorDegrees = Math.floor(degrees / 45) * 45 + 720;
        // const previousDegreesToSave = Math.floor(floorDegrees % 360);

        const selectedSlice = Math.floor(degrees / 45);
        const points = sliceMap[selectedSlice].points;
        console.log('Landed on slice', selectedSlice, 'with points', points);

        wheelRef.current?.addEventListener('finish', onTransitionEnd(points), { once: true });

        animation = wheelRef.current!.animate([
            { transform: `rotate(-${previousDegrees}deg)` },
            { transform: `rotate(-${floorDegrees}deg)` }
        ], {
            duration: 4000,
            direction: 'normal',
            easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
            fill: 'forwards',
            iterations: 1,
            id: 'wheel',
        });

        setPreviousDegrees(floorDegrees % 360);
    }, [degrees]);

    return (
        <>
            <div className='relative w-96 h-96'>
                <span className='pointer'>▼</span>
                <div
                    ref={wheelRef}
                    className={`pie w-full h-full bg-red-500`}
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

                    {/* <span className="slice slice-1 bg-blue-500" data-points="500">1</span>
                <span className="slice slice-2 bg-yellow-500" data-points="200">2</span>
                <span className="slice slice-3 bg-green-500" data-points="NaN">3</span>
                <span className="slice slice-4 bg-white" data-points="150">4</span>
                <span className="slice slice-5 bg-white" data-points="1000">5</span>
                <span className="slice slice-6 bg-white" data-points="-200">6</span>
                <span className="slice slice-7 bg-white" data-points="0">7</span>
                <span className="slice slice-8 bg-white" data-points="250">8</span> */}
                </div>
            </div>
            <button disabled={disabled} className='mt-10 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={() => {
                setDegrees(Math.floor(Math.random() * 360));
            }}>
                Click me
            </button>
        </>
    )
}

export default Wheel;
