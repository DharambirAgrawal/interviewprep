// "use client";
// import { useState } from "react";
// import Editor from "@monaco-editor/react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { X, Download, Trash2 } from "lucide-react";

// type LanguageOption =
//   | "cpp"
//   | "python"
//   | "javascript"
//   | "java"
//   | "go"
//   | "typescript"
//   | "ruby"
//   | "csharp"
//   | "bash";

// interface CodeEditorProps {
//   setIsCodeEditorOpen: (isOpen: boolean) => void;
// }

// export default function CodeEditor({ setIsCodeEditorOpen }: CodeEditorProps) {
//   const [code, setCode] = useState<string>("// Write your code here");
//   const [language, setLanguage] = useState<LanguageOption>("cpp");
//   const [output, setOutput] = useState<string>("");
//   const [stdin, setStdin] = useState<string>("");

//   const handleRun = async () => {
//     try {
//       const response = await fetch("/api/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ language, code, stdin }),
//       });

//       const data = await response.json();
//       setOutput(data.output || data.error || "No output");
//     } catch (error) {
//       setOutput("Error executing code. Please try again.");
//     }
//   };

//   const handleClear = () => {
//     setCode("");
//     setOutput("");
//     setStdin("");
//   };

//   const handleDownload = () => {
//     const fileExtension = {
//       cpp: "cpp",
//       python: "py",
//       javascript: "js",
//       java: "java",
//       go: "go",
//       typescript: "ts",
//       ruby: "rb",
//       csharp: "cs",
//       bash: "sh",
//     }[language];

//     const blob = new Blob([code], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `code.${fileExtension}`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-900 z-50 border-l border-gray-700 flex flex-col text-gray-200">
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
//         <div className="flex items-center gap-4">
//           <Select
//             value={language}
//             onValueChange={(value) => setLanguage(value as LanguageOption)}
//           >
//             <SelectTrigger className="w-[160px] bg-gray-700 text-gray-200 border border-gray-600">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 text-gray-200">
//               <SelectItem value="cpp">C++</SelectItem>
//               <SelectItem value="python">Python</SelectItem>
//               <SelectItem value="javascript">JavaScript</SelectItem>
//               <SelectItem value="java">Java</SelectItem>
//               <SelectItem value="go">Go</SelectItem>
//               <SelectItem value="typescript">TypeScript</SelectItem>
//               <SelectItem value="ruby">Ruby</SelectItem>
//               <SelectItem value="csharp">C#</SelectItem>
//               <SelectItem value="bash">Bash</SelectItem>
//             </SelectContent>
//           </Select>

//           <Button
//             onClick={handleRun}
//             className="bg-green-600 hover:bg-green-700"
//           >
//             Run Code
//           </Button>

//           <Button
//             onClick={handleClear}
//             variant="ghost"
//             className="text-red-500 hover:text-red-600"
//             title="Clear Code"
//           >
//             <Trash2 className="w-5 h-5" />
//           </Button>

//           <Button
//             onClick={handleDownload}
//             variant="ghost"
//             className="text-blue-400 hover:text-blue-500"
//             title="Download Code"
//           >
//             <Download className="w-5 h-5" />
//           </Button>
//         </div>

//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setIsCodeEditorOpen(false)}
//           className="text-gray-400 hover:text-gray-200"
//           title="Close Editor"
//         >
//           <X className="w-5 h-5" />
//         </Button>
//       </div>

//       <div className="flex-grow overflow-hidden flex flex-col">
//         <Editor
//           height="60%"
//           language={language === "csharp" ? "csharp" : language} // Monaco supports csharp
//           value={code}
//           onChange={(value) => setCode(value || "")}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             scrollBeyondLastLine: false,
//             fontSize: 14,
//             wordWrap: "on",
//             automaticLayout: true,
//           }}
//         />

//         <div className="p-2 bg-gray-800 border-t border-gray-700 flex flex-col gap-1">
//           <label htmlFor="stdin" className="text-xs font-medium text-gray-400">
//             Standard Input (stdin)
//           </label>
//           <textarea
//             id="stdin"
//             value={stdin}
//             onChange={(e) => setStdin(e.target.value)}
//             rows={2}
//             className="w-full resize-none rounded bg-gray-900 border border-gray-600 text-gray-200 p-2 font-mono text-sm placeholder-gray-500"
//             placeholder="Enter input for your program here"
//           />
//         </div>

//         <div className="h-[30%] border-t border-gray-700 bg-gray-900 flex flex-col">
//           <div className="p-3 text-xs font-medium border-b border-gray-700 text-gray-400">
//             Output
//           </div>
//           <pre className="flex-grow bg-gray-900 text-green-400 p-3 overflow-auto font-mono text-sm whitespace-pre-wrap">
//             {output || "// Output will appear here"}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Download, Trash2 } from "lucide-react";

type LanguageOption =
  | "cpp"
  | "python"
  | "javascript"
  | "java"
  | "go"
  | "typescript"
  | "ruby"
  | "csharp"
  | "bash";

interface CodeEditorProps {
  setIsCodeEditorOpen: (isOpen: boolean) => void;
}

export default function CodeEditor({ setIsCodeEditorOpen }: CodeEditorProps) {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState<LanguageOption>("cpp");
  const [output, setOutput] = useState("");
  const [leftWidth, setLeftWidth] = useState(30); // % of total width
  const dragging = useRef(false);

  const handleRun = async () => {
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      setOutput(data.output || data.error || "No output");
    } catch {
      setOutput("Error executing code. Please try again.");
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
  };

  const handleDownload = () => {
    const fileExtension = {
      cpp: "cpp",
      python: "py",
      javascript: "js",
      java: "java",
      go: "go",
      typescript: "ts",
      ruby: "rb",
      csharp: "cs",
      bash: "sh",
    }[language];

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 15 && newLeftWidth < 60) setLeftWidth(newLeftWidth);
  };

  useEffect(() => {
    const handleMouseUp = () => (dragging.current = false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full z-50 w-[76%] flex bg-gray-950 text-gray-200 border-l border-gray-700">
      {/* Left: Questions Panel */}
      <div
        className="bg-gray-800 border-r border-gray-700 overflow-auto p-4"
        style={{ width: `${leftWidth}%` }}
      >
        <h2 className="text-lg font-semibold mb-4">Example Questions</h2>
        <ul className="space-y-2 text-sm">
          <li>🔹 Reverse a string in Python</li>
          <li>🔹 Implement bubble sort in C++</li>
          <li>🔹 Build a simple REST API in Go</li>
          <li>🔹 Calculate factorial recursively in JavaScript</li>
          <li>🔹 FizzBuzz in any language</li>
        </ul>
      </div>

      {/* Draggable Resizer */}
      <div
        onMouseDown={() => (dragging.current = true)}
        className="w-1 bg-gray-600 cursor-col-resize"
      />

      {/* Right: Code Editor */}
      <div className="flex flex-col flex-grow">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <div className="flex items-center gap-4">
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as LanguageOption)}
            >
              <SelectTrigger className="w-[160px] bg-gray-700 text-gray-200 border border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-200">
                {[
                  "cpp",
                  "python",
                  "javascript",
                  "java",
                  "go",
                  "typescript",
                  "ruby",
                  "csharp",
                  "bash",
                ].map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleRun}
              className="bg-green-600 hover:bg-green-700"
            >
              Run Code
            </Button>
            <Button
              onClick={handleClear}
              variant="ghost"
              className="text-red-500 hover:text-red-600"
              title="Clear Code"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleDownload}
              variant="ghost"
              className="text-blue-400 hover:text-blue-500"
              title="Download Code"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCodeEditorOpen(false)}
            className="text-gray-400 hover:text-gray-200"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Editor
          height="60%"
          language={language}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />

        <div className="h-[40%] border-t border-gray-700 bg-gray-900 flex flex-col">
          <div className="p-3 text-xs font-medium border-b border-gray-700 text-gray-400">
            Output
          </div>
          <pre className="flex-grow bg-gray-900 text-green-400 p-3 overflow-auto font-mono text-sm whitespace-pre-wrap">
            {output || "// Output will appear here"}
          </pre>
        </div>
      </div>
    </div>
  );
}
