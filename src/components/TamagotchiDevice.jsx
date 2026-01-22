import React, { useState } from 'react';
import '../Device.css';
import { useGameLoop } from '../hooks/useGameLoop';
import { Penguin } from './Penguin';
import { StatsBoard } from './StatsBoard';

// Menu Options: 
// 0: Feed (Fish)
// 1: Play (Ball)
// 2: Sleep (Lights)
// 3: Stats (Scale)

const MENU_ITEMS = [
    { id: 'feed', icon: '🐟', label: 'Feed' },
    { id: 'play', icon: '🎾', label: 'Play' },
    { id: 'sleep', icon: '💡', label: 'Sleep' },
    { id: 'stats', icon: '⚖️', label: 'Stats' },
];

export function TamagotchiDevice() {
    const { stats, mood, isSleeping, actions } = useGameLoop();

    const [menuIndex, setMenuIndex] = useState(null); // null = no selection, walking freely
    const [showStats, setShowStats] = useState(false);

    // Button A: Select / Cycle
    const handleBtnA = () => {
        if (showStats) {
            setShowStats(false);
            return;
        }
        if (menuIndex === null) {
            setMenuIndex(0);
        } else {
            setMenuIndex((prev) => (prev + 1) % MENU_ITEMS.length);
        }
    };

    // Button B: Confirm
    const handleBtnB = () => {
        if (showStats) return; // B does nothing in stats view? or cycles pages?

        if (menuIndex !== null) {
            const selected = MENU_ITEMS[menuIndex];

            switch (selected.id) {
                case 'feed':
                    actions.feed();
                    break;
                case 'play':
                    actions.play();
                    break;
                case 'sleep':
                    actions.toggleSleep();
                    break;
                case 'stats':
                    setShowStats(true);
                    break;
            }
            // Reset menu after action (except maybe stats?)
            if (selected.id !== 'stats') {
                setMenuIndex(null);
            }
        }
    };

    // Button C: Cancel
    const handleBtnC = () => {
        setMenuIndex(null);
        setShowStats(false);
    };

    return (
        <div className="tamagotchi-device">
            <div className="screen-container">

                {/* Top Menu Icons */}
                <div className="menu-overlay">
                    {MENU_ITEMS.map((item, idx) => (
                        <span
                            key={item.id}
                            className={`menu-icon ${menuIndex === idx ? 'selected' : ''}`}
                        >
                            {item.icon}
                        </span>
                    ))}
                </div>

                {/* content */}
                {showStats ? (
                    <div className="stats-screen" style={{ width: '100%', padding: '10px', fontSize: '12px' }}>
                        <StatsBoard stats={stats} />
                    </div>
                ) : (
                    <div className="game-screen" style={{ transform: 'scale(0.7)' }}>
                        <Penguin mood={mood} isSleeping={isSleeping} />
                    </div>
                )}
            </div>

            {/* Button Row */}
            <div className="button-row">
                <div className="btn-wrapper">
                    <button className="tama-btn" onClick={handleBtnA}></button>
                    <span className="btn-label">A</span>
                </div>
                <div className="btn-wrapper">
                    <button className="tama-btn" onClick={handleBtnB}></button>
                    <span className="btn-label">B</span>
                </div>
                <div className="btn-wrapper">
                    <button className="tama-btn cancel" onClick={handleBtnC}></button>
                    <span className="btn-label">C</span>
                </div>
            </div>
        </div>
    );
}
