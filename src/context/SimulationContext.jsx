import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [systemOn, setSystemOn] = useState(false);
  const [fan1On, setFan1On] = useState(false);
  const [fan2On, setFan2On] = useState(false);
  const [fan1Speed, setFan1Speed] = useState(0);
  const [fan2Speed, setFan2Speed] = useState(0);
  const [temperature, setTemperature] = useState(26);
  const [battery, setBattery] = useState(85);
  const [mode, setMode] = useState('auto'); // 'auto' | 'manual'
  const [targetTemp, setTargetTemp] = useState(26);
  const [manualFanSpeed, setManualFanSpeed] = useState(60);
  const [tempHistory, setTempHistory] = useState([]);
  const [batteryHistory, setBatteryHistory] = useState([]);
  const [activityLog, setActivityLog] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'System initialized. Ready to simulate.', type: 'info' },
  ]);

  const tickRef = useRef(0);
  const intervalRef = useRef(null);

  const addLog = useCallback((msg, type = 'info') => {
    setActivityLog(prev => [
      { time: new Date().toLocaleTimeString(), msg, type },
      ...prev.slice(0, 49),
    ]);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setSystemOn(false);
    setFan1On(false);
    setFan2On(false);
    setFan1Speed(0);
    setFan2Speed(0);
    setTemperature(26);
    setBattery(85);
    setMode('auto');
    setTargetTemp(26);
    setManualFanSpeed(60);
    setTempHistory([]);
    setBatteryHistory([]);
    tickRef.current = 0;
    addLog('Simulation reset to initial state.', 'warning');
  }, [addLog]);

  const toggleSystem = useCallback(() => {
    setSystemOn(prev => {
      const next = !prev;
      if (!next) {
        setFan1On(false);
        setFan2On(false);
        setFan1Speed(0);
        setFan2Speed(0);
        addLog('System powered OFF. All fans stopped.', 'warning');
      } else {
        addLog('System powered ON.', 'success');
      }
      return next;
    });
  }, [addLog]);

  const toggleFan1 = useCallback(() => {
    if (!systemOn) return;
    setFan1On(prev => {
      const next = !prev;
      addLog(`Fan 1 turned ${next ? 'ON' : 'OFF'}.`, next ? 'success' : 'warning');
      if (!next) setFan1Speed(0);
      return next;
    });
  }, [systemOn, addLog]);

  const toggleFan2 = useCallback(() => {
    if (!systemOn) return;
    setFan2On(prev => {
      const next = !prev;
      addLog(`Fan 2 turned ${next ? 'ON' : 'OFF'}.`, next ? 'success' : 'warning');
      if (!next) setFan2Speed(0);
      return next;
    });
  }, [systemOn, addLog]);

  // Main simulation tick
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;

      // Simulate temperature wave
      setTemperature(prev => {
        const wave = Math.sin(tick * 0.08) * 4 + Math.sin(tick * 0.15) * 2;
        const target = targetTemp + wave;
        const diff = target - prev;
        let next = prev + diff * 0.12;
        // Fans cooling effect
        const fanCooling = (fan1On ? 1.2 : 0) + (fan2On ? 1.2 : 0);
        next -= fanCooling * 0.08;
        next = Math.max(18, Math.min(45, next));
        return parseFloat(next.toFixed(1));
      });

      // Auto mode logic
      if (mode === 'auto' && systemOn) {
        setTemperature(curr => {
          if (curr > 30) {
            setFan1On(prev => { if (!prev) addLog('Auto mode: Fan 1 activated (temp > 30°C).', 'success'); return true; });
            setFan2On(prev => { if (!prev) addLog('Auto mode: Fan 2 activated (temp > 30°C).', 'success'); return true; });
          } else if (curr < 25) {
            setFan1On(prev => { if (prev) addLog('Auto mode: Fan 1 deactivated (temp < 25°C).', 'info'); return false; });
            setFan2On(prev => { if (prev) addLog('Auto mode: Fan 2 deactivated (temp < 25°C).', 'info'); return false; });
          }
          return curr;
        });
      }

      // Fan speed simulation
      setFan1On(f1 => {
        setFan1Speed(f1 ? (mode === 'manual' ? manualFanSpeed : Math.min(100, 40 + (temperature - 25) * 5)) : 0);
        return f1;
      });
      setFan2On(f2 => {
        setFan2Speed(f2 ? (mode === 'manual' ? manualFanSpeed : Math.min(100, 40 + (temperature - 25) * 5)) : 0);
        return f2;
      });

      // Battery drain
      setBattery(prev => {
        if (!systemOn) return prev;
        const drain = (fan1On ? 0.03 : 0) + (fan2On ? 0.03 : 0) + 0.005;
        return Math.max(0, parseFloat((prev - drain).toFixed(2)));
      });

      // History
      const now = new Date();
      const label = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;

      setTempHistory(prev => {
        const updated = [...prev, { time: label, temp: null }];
        // We'll capture actual temp via separate effect
        return updated.slice(-40);
      });

      setBatteryHistory(prev => {
        const updated = [...prev, { time: label, battery: null }];
        return updated.slice(-40);
      });

    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, systemOn, mode, targetTemp, manualFanSpeed, addLog]);

  // Sync history with actual values
  useEffect(() => {
    if (!isRunning) return;
    const now = new Date();
    const label = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    setTempHistory(prev => {
      if (prev.length === 0) return [{ time: label, temp: temperature }];
      const last = prev[prev.length - 1];
      if (last.temp === null) {
        return [...prev.slice(0,-1), { ...last, temp: temperature }];
      }
      return prev;
    });
    setBatteryHistory(prev => {
      if (prev.length === 0) return [{ time: label, battery }];
      const last = prev[prev.length - 1];
      if (last.battery === null) {
        return [...prev.slice(0,-1), { ...last, battery: battery }];
      }
      return prev;
    });
  }, [temperature, battery]);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    addLog('Simulation started. Monitoring active.', 'success');
  }, [addLog]);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    addLog('Simulation paused.', 'info');
  }, [addLog]);

  const getTempStatus = () => {
    if (temperature < 25) return { label: 'Normal', color: '#10b981', bg: 'bg-emerald-500/20 text-emerald-400' };
    if (temperature < 30) return { label: 'Warm', color: '#f59e0b', bg: 'bg-amber-500/20 text-amber-400' };
    return { label: 'Hot', color: '#ef4444', bg: 'bg-red-500/20 text-red-400' };
  };

  const getBatteryStatus = () => {
    if (battery > 60) return { label: 'Good', color: '#10b981' };
    if (battery > 20) return { label: 'Medium', color: '#f59e0b' };
    return { label: 'Low', color: '#ef4444' };
  };

  const value = {
    isRunning,
    systemOn,
    fan1On,
    fan2On,
    fan1Speed,
    fan2Speed,
    temperature,
    battery,
    mode,
    targetTemp,
    manualFanSpeed,
    tempHistory,
    batteryHistory,
    activityLog,
    startSimulation,
    stopSimulation,
    resetSimulation,
    toggleSystem,
    toggleFan1,
    toggleFan2,
    setMode,
    setTargetTemp,
    setManualFanSpeed,
    addLog,
    getTempStatus,
    getBatteryStatus,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider');
  return ctx;
}
