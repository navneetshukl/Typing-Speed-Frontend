// Format ISO date (2025-11-10T21:20:36Z) to "10 Nov 2025, 09:20 PM"
export const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Calculate accuracy = ((typedWords - errors) / typedWords) * 100
export const calculateAccuracy = (typedWords, totalErrors) => {
  if (!typedWords || typedWords === 0) return 0;

  const correct = typedWords - totalErrors;
  const accuracy = (correct / typedWords) * 100;

  return Math.max(0, accuracy.toFixed(2)); // avoid negative values
};

export const calculateCompletion = (typedWords, totalWords) => {
  if (!totalWords || totalWords === 0) return 0;

  return ((typedWords / totalWords) * 100).toFixed(2); // %
};

export const getAvatar = (seed) =>{
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
}

export const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short", // Nov
    day: "numeric", // 23
  });
};


export const transformChartData = (tests) => {
  return tests.map(test => {
    const accuracy =
      test.typedWords > 0
        ? Math.round(((test.typedWords - test.totalErrors) / test.typedWords) * 100)
        : 0;

    const consistency =
      test.totalWords > 0
        ? Math.round(((test.typedWords - test.totalErrors) / test.totalWords) * 100)
        : 0;

    return {
      date: formatDateShort(test.createdAt),
      wpm: test.wpm,
      accuracy,
      mistakes: test.totalErrors,
      consistency,
    };
  });
};

