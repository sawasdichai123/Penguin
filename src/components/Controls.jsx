// import { Utensils, Gamepad2, Moon, Sun } from 'lucide-react';

export function Controls({ onFeed, onPlay, onToggleSleep, isSleeping }) {
    return (
        <div className="card flex-center controls">
            <button onClick={onFeed} disabled={isSleeping} className="control-btn feed" title="Feed">
                <div className="icon-wrapper">
                    <span style={{ fontSize: '24px' }}>🐟</span>
                </div>
                <span>Feed</span>
            </button>

            <button onClick={onPlay} disabled={isSleeping} className="control-btn play" title="Play">
                <div className="icon-wrapper">
                    <span style={{ fontSize: '24px' }}>🎮</span>
                </div>
                <span>Play</span>
            </button>

            <button onClick={onToggleSleep} className={`control-btn sleep ${isSleeping ? 'active' : ''}`} title="Sleep">
                <div className="icon-wrapper">
                    {isSleeping ? <span style={{ fontSize: '24px' }}>☀️</span> : <span style={{ fontSize: '24px' }}>🌙</span>}
                </div>
                <span>{isSleeping ? 'Wake Up' : 'Sleep'}</span>
            </button>
        </div>
    );
}

/* Add component-specific styles via style tag or css - keeping it simple with inline style object or assume index.css handles generic button classes.
   Let's add some specific styles to index.css or a new Controls.css later if needed. 
   For now, I'll rely on global button styles + inline/utility.
*/
