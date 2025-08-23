import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Zap, Target, Timer, AlertCircle, Trophy, Keyboard } from 'lucide-react';

const TypingTest = () => {
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the process of creating instructions.",
    "Technology has revolutionized communication.",
    "Reading expands our knowledge and vocabulary.",
    "Cybersecurity is paramount for protection."
  ];

  const [currentText, setCurrentText] = useState(sampleTexts[0]);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Real-time WPM calculation and timer
  useEffect(() => {
    if (isActive && startTime && userInput.length > 0) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        const timeInMinutes = elapsed / 60;
        setTimeElapsed(Math.round(elapsed));
        
        const wordsTyped = userInput.trim().split(/\s+/).length;
        const calculatedWpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
        setWpm(calculatedWpm);
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, startTime, userInput]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Prevent typing beyond the text length
    if (value.length > currentText.length) return;
    
    // Start timer on first character
    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Calculate errors in real-time
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Calculate accuracy
    if (value.length > 0) {
      const acc = Math.round(((value.length - errorCount) / value.length) * 100);
      setAccuracy(acc);
    }

    // Check if completed
    if (value.length === currentText.length) {
      setIsCompleted(true);
      setIsActive(false);
      setEndTime(Date.now());
      
      // Final WPM calculation
      const finalTime = (Date.now() - startTime) / 1000 / 60;
      const finalWords = value.trim().split(/\s+/).length;
      setWpm(Math.round(finalWords / finalTime) || 0);
    }
  };

  // Reset function
  const resetTest = () => {
    setUserInput('');
    setCurrentIndex(0);
    setIsActive(false);
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setTimeElapsed(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Change text
  const changeText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setCurrentText(sampleTexts[randomIndex]);
    resetTest();
  };

  // Render text with color coding
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'text-slate-400';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = 'text-emerald-600 bg-emerald-50';
        } else {
          className = 'text-red-500 bg-red-50';
        }
      } else if (index === currentIndex) {
        className = 'text-slate-900 bg-gradient-to-r from-blue-400 to-purple-500 text-white';
      }
      
      return (
        <span 
          key={index} 
          className={`${className} transition-all duration-150 ease-in-out rounded-sm px-0.5 py-0.5 ${isMobile ? 'text-sm' : ''}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  const errorPercentage = userInput.length > 0 ? Math.round((errors / userInput.length) * 100) : 0;
  const progressPercentage = (currentIndex / currentText.length) * 100;

  // Performance level based on WPM
  const getPerformanceLevel = () => {
    if (wpm >= 80) return { level: 'Expert', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (wpm >= 60) return { level: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (wpm >= 40) return { level: 'Intermediate', color: 'text-green-600', bg: 'bg-green-50' };
    if (wpm >= 20) return { level: 'Beginner', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Novice', color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-4 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-10 md:left-40 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 p-4 md:p-6 w-full max-w-6xl mx-auto min-h-full flex flex-col">
        {/* Header - Made smaller */}
        <div className="text-center mb-2 md:mb-4 flex-shrink-0">
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
            <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Keyboard className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TypeMaster Pro
            </h1>
          </div>
          <p className="text-slate-300 text-xs md:text-sm">Master your typing skills with real-time feedback</p>
          <div className="flex items-center justify-center gap-1 mt-1 md:mt-2 flex-wrap">
            {isActive && (
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-slate-300 text-xs">
                <Timer className="w-3 h-3 md:w-4 md:h-4" />
                {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats Dashboard - Made smaller */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 mb-2 md:mb-4 w-full flex-shrink-0">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">{wpm}</div>
                <div className="text-slate-400 text-xs font-medium">WPM</div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full transition-all duration-500" 
                   style={{ width: `${Math.min((wpm / 100) * 100, 100)}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Target className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">{accuracy}%</div>
                <div className="text-slate-400 text-xs font-medium">Accuracy</div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full transition-all duration-500" 
                   style={{ width: `${accuracy}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">{errorPercentage}%</div>
                <div className="text-slate-400 text-xs font-medium">Error Rate</div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div className="bg-gradient-to-r from-red-400 to-pink-500 h-1 rounded-full transition-all duration-500" 
                   style={{ width: `${errorPercentage}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">{errors}</div>
                <div className="text-slate-400 text-xs font-medium">Total Errors</div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-1 rounded-full transition-all duration-500" 
                   style={{ width: `${Math.min((errors / 10) * 100, 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Main Typing Area - Made larger */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-xl border border-slate-600 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-6 mb-2 md:mb-4 w-full flex-grow flex flex-col">
          {/* Progress Bar */}
          <div className="mb-2 md:mb-3 w-full flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-medium text-xs md:text-sm">Progress</span>
              <span className="text-slate-300 font-medium text-xs md:text-sm">{currentIndex}/{currentText.length}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 md:h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-lg"
                   style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          {/* Text Display - Made larger */}
          <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-2 md:mb-3 backdrop-blur border border-slate-600 overflow-hidden flex-grow">
            <div className={`leading-relaxed font-mono tracking-wide h-full text-justify ${isMobile ? 'text-base' : 'text-lg'} break-words whitespace-pre-wrap overflow-wrap-anywhere w-full`}>
              {renderText()}
            </div>
          </div>

          {/* Input Area - Made larger */}
          <div className="relative w-full flex-shrink-0">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={isCompleted}
              placeholder={isCompleted ? "🎉 Test completed! Click reset to try again." : "Click here and start typing..."}
              className="w-full p-3 md:p-4 bg-slate-900/50 border-2 border-slate-600 rounded-lg md:rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none resize-none h-28 md:h-32 font-mono text-base text-white placeholder-slate-400 disabled:bg-slate-800 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur box-border"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {!isActive && userInput.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-slate-400 text-center">
                  <Keyboard className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 opacity-50" />
                  <p className="text-xs md:text-sm">Start typing to begin your test</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Buttons - Made smaller */}
        <div className="flex flex-wrap gap-1 md:gap-2 justify-center mb-2 md:mb-4 w-full flex-shrink-0">
          <button
            onClick={resetTest}
            className="group flex items-center gap-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg transition-all duration-300 font-semibold shadow border border-slate-500 text-xs w-full md:w-auto justify-center"
          >
            <RotateCcw size={12} className="md:w-3 md:h-3 group-hover:rotate-12 transition-transform duration-300" />
            Reset Test
          </button>
          
          <button
            onClick={changeText}
            className="group flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg transition-all duration-300 font-semibold shadow text-xs w-full md:w-auto justify-center"
          >
            <Play size={12} className="md:w-3 md:h-3 group-hover:scale-110 transition-transform duration-200" />
            New Challenge
          </button>
        </div>

        {/* Completion Celebration - Made smaller */}
        {isCompleted && (
          <div className="bg-gradient-to-br from-green-900/90 to-emerald-800/90 backdrop-blur-xl border-2 border-green-400 rounded-lg md:rounded-xl p-2 md:p-3 text-center shadow-lg md:shadow-xl mb-2 md:mb-4 w-full flex-shrink-0">
            <div className="flex justify-center mb-1 md:mb-2">
              <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Trophy className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>
            <h2 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">🎉 Fantastic Work!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1 md:mb-2">
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Final Speed</div>
                <div className="text-sm md:text-base font-bold text-white">{wpm} WPM</div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Accuracy</div>
                <div className="text-sm md:text-base font-bold text-white">{accuracy}%</div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Errors</div>
                <div className="text-sm md:text-base font-bold text-white">{errors}</div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Time</div>
                <div className="text-sm md:text-base font-bold text-white">{timeElapsed}s</div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full ${performance.bg} ${performance.color} font-bold text-xs inline-block`}>
              {performance.level} Level Achieved! 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;