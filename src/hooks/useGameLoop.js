import { useState, useEffect, useCallback } from 'react';

const MAX_STAT = 100;
const MIN_STAT = 0;
const DECAY_RATE = 2; // Amount to decrease every tick
const MOOD_THRESHOLD = 40; // Below this, penguin is sad

export function useGameLoop() {
  const [stats, setStats] = useState({
    hunger: 80, // Start mostly full
    happiness: 80, // Start happy
    energy: 100, // Start fully rested
  });

  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isSleeping, setIsSleeping] = useState(false);

  // Interaction handlers
  const feed = useCallback(() => {
    if (isSleeping) return; // Can't eat while sleeping
    setStats(prev => ({
      ...prev,
      hunger: Math.min(prev.hunger + 20, MAX_STAT),
      energy: Math.max(prev.energy - 5, MIN_STAT) // Eating takes a bit of energy?
    }));
    setLastInteraction(Date.now());
  }, [isSleeping]);

  const play = useCallback(() => {
    if (isSleeping) return;
    setStats(prev => ({
      ...prev,
      happiness: Math.min(prev.happiness + 20, MAX_STAT),
      hunger: Math.max(prev.hunger - 10, MIN_STAT), // Playing makes you hungry
      energy: Math.max(prev.energy - 15, MIN_STAT) // Playing tires you out
    }));
    setLastInteraction(Date.now());
  }, [isSleeping]);

  const toggleSleep = useCallback(() => {
    setIsSleeping(prev => !prev);
  }, []);

  // Game Loop
  useEffect(() => {
    const tickRate = isSleeping ? 1000 : 3000; // Recover faster while sleeping, decay slower while awake
    
    const interval = setInterval(() => {
      setStats(prev => {
        let newStats = { ...prev };

        if (isSleeping) {
          // Recover energy, get hungry slowly
          newStats.energy = Math.min(prev.energy + 5, MAX_STAT);
          newStats.hunger = Math.max(prev.hunger - 1, MIN_STAT);
          // Happiness doesn't change much while sleeping
        } else {
          // Decay all stats
          newStats.hunger = Math.max(prev.hunger - DECAY_RATE, MIN_STAT);
          newStats.happiness = Math.max(prev.happiness - DECAY_RATE, MIN_STAT);
          newStats.energy = Math.max(prev.energy - (DECAY_RATE / 2), MIN_STAT);
        }

        // Wake up if fully rested? Optional.
        // if (isSleeping && newStats.energy >= 100) setIsSleeping(false);

        return newStats;
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [isSleeping]);

  // Derived State
  const mood = isSleeping 
    ? 'sleeping'
    : (stats.hunger < MOOD_THRESHOLD || stats.happiness < MOOD_THRESHOLD || stats.energy < 20) 
      ? 'sad' 
      : 'happy';

  return {
    stats,
    mood,
    isSleeping,
    actions: { feed, play, toggleSleep }
  };
}
