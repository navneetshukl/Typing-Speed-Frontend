import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RotateCcw,
  Play,
  Zap,
  Target,
  Timer,
  AlertCircle,
  Trophy,
  Keyboard,
} from "lucide-react";

const TypingTestUI = () => {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState(0);
  const [errorPercentage, setErrorPercentage] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Static UI data for display
  const sampleText = "Navneet Shukla is Good Boy.";
  const isActive = true;
  const isMobile = false;

  const CountdownTimer = () => {
    useEffect(() => {
      if (timeLeft === 0) {
        handleSubmit();
        return;
      }
      if (isCompleted) return;
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // 2. Access the environment variable (Best Practice in Vite)
    const BASE_URL = import.meta.env.VITE_API_URL;

    // 3. Construct the request body
    const reqData = {
      wpm: wpm,
      totalErrors: errors,
      typedWords: currentIndex + 1,
      totalWords: sampleText.length,
      totalTime: 60,
      timeTakenByUser: 60 - timeLeft,
    };

    try {
      // 4. Use template literals for cleaner URL construction
      const url = `${BASE_URL}/typing`;

      const { data } = await axios.post(url, reqData);

      // 5. Use console.log for success
      console.log(`✅ Success: Data sent. Response: ${JSON.stringify(data)}`);
    } catch (error) {
      // 6. Use console.error for clear error logging
      console.error(
        "❌ Error sending data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const startTyping = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    const newInput = event.target.value;
    setUserInput(newInput);

    let newErrors = errors;

    if (newInput[currentIndex] !== sampleText[currentIndex]) {
      newErrors = errors + 1;
      setErrors(newErrors);
    }

    const totalCharactersTyped = currentIndex + 1;
    const calculatedErrorPercentage =
      totalCharactersTyped > 0
        ? Math.round((newErrors / totalCharactersTyped) * 100)
        : 0;

    // Calculate accuracy percentage
    const correctCharacters = totalCharactersTyped - newErrors;
    const calculatedAccuracy =
      totalCharactersTyped > 0
        ? Math.round((correctCharacters / totalCharactersTyped) * 100)
        : 100;

    // Calculate progress percentage
    const calculatedProgress = Math.round(
      (totalCharactersTyped / sampleText.length) * 100
    );

    setErrorPercentage(calculatedErrorPercentage);
    setAccuracy(calculatedAccuracy);
    setProgressPercentage(calculatedProgress);
    setCurrentIndex(currentIndex + 1);
    setWpm(Math.floor((currentIndex + 1 - errors) / (60 - timeLeft)) * 60);

    if (currentIndex >= sampleText.length - 1) {
      setIsCompleted(true);
      setDisabled(true);
      setTimeLeft(timeLeft);
      return;
    }
  };

  CountdownTimer();

  const disableBackspaceKey = (e) => {
    if (e.key === "Backspace" || disabled) {
      e.preventDefault();
      return;
    }
  };

  const reset = () => {
    console.log("Reset button is clicked");
    handleSubmit();
    setUserInput("");
    setCurrentIndex(0);
    setIsCompleted(false);
    setDisabled(false);
    setErrors(0);
    setAccuracy(0);
    setErrorPercentage(0);
    setProgressPercentage(0);
    setWpm(0);
    setTimeLeft(60);
  };

  // Render text with color coding (UI only)
  const renderText = () => {
    return sampleText.split("").map((char, index) => {
      let className = "text-slate-400";

      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = "text-emerald-600 bg-emerald-50";
        } else {
          className = "text-red-500 bg-red-50";
        }
      } else if (index === currentIndex) {
        className =
          "text-slate-900 bg-gradient-to-r from-blue-400 to-purple-500 text-white";
      }

      return (
        <span
          key={index}
          className={`${className} transition-all duration-150 ease-in-out rounded-sm px-0.5 py-0.5 ${
            isMobile ? "text-sm" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-4 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-10 md:left-40 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-6 w-full max-w-6xl mx-auto min-h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-2 md:mb-4 flex-shrink-0">
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
            <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Keyboard className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TypeMaster Pro
            </h1>
          </div>
          <p className="text-slate-300 text-xs md:text-sm">
            Master your typing skills with real-time feedback
          </p>
          <div className="flex items-center justify-center gap-1 mt-1 md:mt-2 flex-wrap">
            {isActive && (
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-slate-300 text-xs">
                <Timer className="w-3 h-3 md:w-4 md:h-4" />
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            )}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 mb-2 md:mb-4 w-full flex-shrink-0">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">
                  {wpm}
                </div>
                <div className="text-slate-400 text-xs font-medium">WPM</div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((wpm / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Target className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">
                  {accuracy}%
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  Accuracy
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">
                  {errorPercentage}%
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  Error Rate
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div
                className="bg-gradient-to-r from-red-400 to-pink-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${errorPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 backdrop-blur-xl border border-slate-600 rounded-md md:rounded-lg p-1 md:p-2 shadow transition-all duration-300 w-full">
            <div className="flex items-center justify-between mb-1">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
              <div className="text-right">
                <div className="text-base md:text-xl font-bold text-white">
                  {errors}
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  Total Errors
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((errors / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Typing Area */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-xl border border-slate-600 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-6 mb-2 md:mb-4 w-full flex-grow flex flex-col">
          {/* Progress Bar */}
          <div className="mb-2 md:mb-3 w-full flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-medium text-xs md:text-sm">
                Progress
              </span>
              <span className="text-slate-300 font-medium text-xs md:text-sm">
                {currentIndex}/{sampleText.length}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 md:h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Text Display */}
          <div className="bg-slate-900/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-2 md:mb-3 backdrop-blur border border-slate-600 overflow-hidden flex-grow">
            <div
              className={`leading-relaxed font-mono tracking-wide h-full text-justify ${
                isMobile ? "text-base" : "text-lg"
              } break-words whitespace-pre-wrap overflow-wrap-anywhere w-full`}
            >
              {renderText()}
            </div>
          </div>

          {/* Input Area */}
          <div className="relative w-full flex-shrink-0">
            <textarea
              value={userInput}
              placeholder="Click here and start typing..."
              className="w-full p-3 md:p-4 bg-slate-900/50 border-2 border-slate-600 rounded-lg md:rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none resize-none h-28 md:h-32 font-mono text-base text-white placeholder-slate-400 transition-all duration-200 backdrop-blur box-border"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onChange={startTyping}
              onKeyDown={disableBackspaceKey}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-1 md:gap-2 justify-center mb-2 md:mb-4 w-full flex-shrink-0">
          <button
            className="group flex items-center gap-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg transition-all duration-300 font-semibold shadow border border-slate-500 text-xs w-full md:w-auto justify-center"
            onClick={reset}
          >
            <RotateCcw
              size={12}
              className="md:w-3 md:h-3 group-hover:rotate-12 transition-transform duration-300"
            />
            Reset Test
          </button>

          <button className="group flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg transition-all duration-300 font-semibold shadow text-xs w-full md:w-auto justify-center">
            <Play
              size={12}
              className="md:w-3 md:h-3 group-hover:scale-110 transition-transform duration-200"
            />
            New Challenge
          </button>
        </div>

        {/* Completion Celebration (hidden in this static version) */}
        {isCompleted && (
          <div className="bg-gradient-to-br from-green-900/90 to-emerald-800/90 backdrop-blur-xl border-2 border-green-400 rounded-lg md:rounded-xl p-2 md:p-3 text-center shadow-lg md:shadow-xl mb-2 md:mb-4 w-full flex-shrink-0">
            <div className="flex justify-center mb-1 md:mb-2">
              <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Trophy className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>
            <h2 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">
              🎉 Fantastic Work!
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1 md:mb-2">
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">
                  Final Speed
                </div>
                <div className="text-sm md:text-base font-bold text-white">
                  {wpm} WPM
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">
                  Accuracy
                </div>
                <div className="text-sm md:text-base font-bold text-white">
                  {accuracy}%
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Errors</div>
                <div className="text-sm md:text-base font-bold text-white">
                  {errors}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-1 md:p-1 backdrop-blur">
                <div className="text-slate-400 font-medium text-xs">Time</div>
                <div className="text-sm md:text-base font-bold text-white">
                  {60 - timeLeft}s
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTestUI;
