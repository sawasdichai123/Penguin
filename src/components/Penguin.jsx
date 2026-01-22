import './Penguin.css';
// import { Heart, Zzz } from 'lucide-react';

export function Penguin({ mood, isSleeping }) {
    return (
        <div className="penguin-container">
            {/* Status Icons */}
            <div className="status-icon">
                {isSleeping && <span className="icon-sleep" style={{ fontSize: '32px' }}>💤</span>}
                {mood === 'happy' && !isSleeping && <span className="icon-heart" style={{ fontSize: '32px', color: '#e57373' }}>❤️</span>}
            </div>

            <div className={`penguin ${mood} ${isSleeping ? 'sleeping' : ''}`}>
                <div className="penguin-body">
                    <div className="penguin-belly"></div>

                    <div className="face">
                        <div className="eye left">
                            {!isSleeping && <div className="pupil"></div>}
                        </div>
                        <div className="eye right">
                            {!isSleeping && <div className="pupil"></div>}
                        </div>
                        <div className="beak"></div>
                        <div className={`blush left ${mood === 'happy' ? 'visible' : ''}`}></div>
                        <div className={`blush right ${mood === 'happy' ? 'visible' : ''}`}></div>
                    </div>

                    <div className="wing left"></div>
                    <div className="wing right"></div>

                    <div className="foot left"></div>
                    <div className="foot right"></div>
                </div>
            </div>

            <div className="shadow"></div>
        </div>
    );
}
