import React from 'react';

export function StatsBoard({ stats }) {
    const getColor = (val) => {
        if (val > 60) return 'var(--success)';
        if (val > 30) return '#ffd54f'; // Warning yellow
        return 'var(--accent)'; // Danger red
    };

    return (
        <div className="card stats-board">
            <StatRow label="Hunger" value={stats.hunger} color={getColor(stats.hunger)} />
            <StatRow label="Happiness" value={stats.happiness} color={getColor(stats.happiness)} />
            <StatRow label="Energy" value={stats.energy} color={getColor(stats.energy)} />
        </div>
    );
}

function StatRow({ label, value, color }) {
    return (
        <div className="stat-row" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <strong>{label}</strong>
                <span>{Math.round(value)}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                    width: `${value}%`,
                    height: '100%',
                    background: color,
                    transition: 'width 0.5s ease, background-color 0.5s ease'
                }}></div>
            </div>
        </div>
    );
}
