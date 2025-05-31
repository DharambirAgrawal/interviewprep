export const APP_NAME = "PrepAI"; // A name suitable for AI interview preparation

export const ABOUT =
  "PrepAI is your ultimate companion for AI and Machine Learning interview preparation. Practice coding, theory, system design, and real-world case studies crafted by industry experts.";

export const DEVELOPER = {
  name: "DevInnovators",
  link: "https://yourportfolio.dev", // Replace with your actual developer link
};

export const navigation = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "Practice",
    link: "#practice",
  },
  {
    name: "Topics",
    link: "#topics",
  },
  {
    name: "Mock Interviews",
    link: "#mock-interviews",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export const LANGUAGES = [
  {
    id: 11,
    name: "Bosque (latest)",
  },
  {
    id: 3,
    name: "C3 (latest)",
  },
  {
    id: 1,
    name: "C (Clang 10.0.1)",
  },
  {
    id: 2,
    name: "C++ (Clang 10.0.1)",
  },
  {
    id: 13,
    name: "C (Clang 9.0.1)",
  },
  {
    id: 14,
    name: "C++ (Clang 9.0.1)",
  },
  {
    id: 22,
    name: "C# (Mono 6.12.0.122)",
  },
  {
    id: 21,
    name: "C# (.NET Core SDK 3.1.406)",
  },
  {
    id: 29,
    name: "C# (.NET Core SDK 7.0.400)",
  },
  {
    id: 30,
    name: "C# (.NET Core SDK 8.0.302)",
  },
  {
    id: 15,
    name: "C++ Test (Clang 10.0.1, Google Test 1.8.1)",
  },
  {
    id: 12,
    name: "C++ Test (GCC 8.4.0, Google Test 1.8.1)",
  },
  {
    id: 23,
    name: "C# Test (.NET Core SDK 3.1.406, NUnit 3.12.0)",
  },
  {
    id: 24,
    name: "F# (.NET Core SDK 3.1.406)",
  },
  {
    id: 4,
    name: "Java (OpenJDK 14.0.1)",
  },
  {
    id: 5,
    name: "Java Test (OpenJDK 14.0.1, JUnit Platform Console Standalone 1.6.2)",
  },
  {
    id: 6,
    name: "MPI (OpenRTE 3.1.3) with C (GCC 8.4.0)",
  },
  {
    id: 7,
    name: "MPI (OpenRTE 3.1.3) with C++ (GCC 8.4.0)",
  },
  {
    id: 8,
    name: "MPI (OpenRTE 3.1.3) with Python (3.7.7)",
  },
  {
    id: 89,
    name: "Multi-file program",
  },
  {
    id: 9,
    name: "Nim (stable)",
  },
  {
    id: 26,
    name: "Python 2.7 (PyPy 7.3.12)",
  },
  {
    id: 28,
    name: "Python 3.10 (PyPy 7.3.12)",
  },
  {
    id: 27,
    name: "Python 3.9 (PyPy 7.3.12)",
  },
  {
    id: 25,
    name: "Python for ML (3.11.2)",
  },
  {
    id: 31,
    name: "Python for ML (3.12.5)",
  },
  {
    id: 32,
    name: "Python for ML (3.13.2)",
  },
  {
    id: 10,
    name: "Python for ML (3.7.7)",
  },
  {
    id: 20,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
  },
];

export const LANGUAGE_CONFIG = {
  1: { monaco: "c", extension: "c" }, // C (Clang 10.0.1)
  2: { monaco: "cpp", extension: "cpp" }, // C++ (Clang 10.0.1)
  3: { monaco: "c", extension: "c3" }, // C3 (latest)
  4: { monaco: "java", extension: "java" }, // Java (OpenJDK 14.0.1)
  5: { monaco: "java", extension: "java" }, // Java Test
  6: { monaco: "c", extension: "c" }, // MPI with C
  7: { monaco: "cpp", extension: "cpp" }, // MPI with C++
  8: { monaco: "python", extension: "py" }, // MPI with Python
  9: { monaco: "nim", extension: "nim" }, // Nim
  10: { monaco: "python", extension: "py" }, // Python for ML (3.7.7)
  11: { monaco: "javascript", extension: "bosque" }, // Bosque (no direct Monaco support)
  12: { monaco: "cpp", extension: "cpp" }, // C++ Test (GCC)
  13: { monaco: "c", extension: "c" }, // C (Clang 9.0.1)
  14: { monaco: "cpp", extension: "cpp" }, // C++ (Clang 9.0.1)
  15: { monaco: "cpp", extension: "cpp" }, // C++ Test (Clang)
  20: { monaco: "vb", extension: "vb" }, // Visual Basic.Net
  21: { monaco: "csharp", extension: "cs" }, // C# (.NET Core SDK 3.1.406)
  22: { monaco: "csharp", extension: "cs" }, // C# (Mono)
  23: { monaco: "csharp", extension: "cs" }, // C# Test
  24: { monaco: "fsharp", extension: "fs" }, // F#
  25: { monaco: "python", extension: "py" }, // Python for ML (3.11.2)
  26: { monaco: "python", extension: "py" }, // Python 2.7 (PyPy)
  27: { monaco: "python", extension: "py" }, // Python 3.9 (PyPy)
  28: { monaco: "python", extension: "py" }, // Python 3.10 (PyPy)
  29: { monaco: "csharp", extension: "cs" }, // C# (.NET Core SDK 7.0.400)
  30: { monaco: "csharp", extension: "cs" }, // C# (.NET Core SDK 8.0.302)
  31: { monaco: "python", extension: "py" }, // Python for ML (3.12.5)
  32: { monaco: "python", extension: "py" }, // Python for ML (3.13.2)
  89: { monaco: "plaintext", extension: "txt" }, // Multi-file program
};
