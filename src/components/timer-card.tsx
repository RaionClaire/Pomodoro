import '../index.css';
import { useState, useEffect } from 'react';

type TimerState = 'work' | 'rest';

function Timer() {
  const [state, setState] = useState<TimerState>('work');
  const [workMinutes, setWorkMinutes] = useState(25);
  const [restMinutes, setRestMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(state === 'work' ? workMinutes * 60 : restMinutes * 60);
    setIsRunning(false);
  }, [state, workMinutes, restMinutes]);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(state === 'work' ? workMinutes * 60 : restMinutes * 60);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full border-2 border-green-200">
          <h1 className="text-2xl font-bold text-center mb-4 text-green-800">
            Pomodoro Timer
          </h1>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setState('work')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                state === 'work'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setState('rest')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                state === 'rest'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Rest
            </button>
          </div>

          <div className="text-center mb-4 bg-green-50 rounded-lg py-4 px-3 border border-green-200">
            <div className="text-4xl font-bold mb-1 text-green-600">
              {formatTime(timeLeft)}
            </div>
            <p className="text-green-700 text-xs font-medium">
              {state === 'work' ? 'Focus Time' : 'Break Time'}
            </p>
          </div>

          <div className="mb-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-green-800 mb-1">
                Work (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Number(e.target.value))}
                className="w-full px-2 py-1 text-sm border border-green-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-green-800 mb-1">
                Rest (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={restMinutes}
                onChange={(e) => setRestMinutes(Number(e.target.value))}
                className="w-full px-2 py-1 text-sm border border-green-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 py-2 px-4 rounded-lg font-medium text-sm text-white transition-all bg-green-600 hover:bg-green-700 shadow-sm"
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-4 rounded-lg font-medium text-sm bg-green-800 text-white hover:bg-green-900 transition-all shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;