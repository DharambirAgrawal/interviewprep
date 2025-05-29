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
  const [output, setOutput] = useState<{
    stdout: string | null;
    stderr: string | null;
    status: { id: number; description: string } | null;
    time?: string;
    memory?: number;
    message?: string | null;
  } | null>(null);
  const [leftWidth, setLeftWidth] = useState(30); // % of total width
  const [editorHeight, setEditorHeight] = useState(60); // % of right panel height
  const [isLoading, setIsLoading] = useState(false);
  const dragging = useRef(false);
  const resizingOutput = useRef(false);

  const handleRun = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/service/code-compile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, code }),
        }
      );
      const data = await response.json();
      console.log(data);
      setOutput(
        data.data || {
          stdout: null,
          stderr: data.error || "No output",
          status: { id: 0, description: "Error" },
        }
      );
    } catch {
      setOutput({
        stdout: null,
        stderr: "Error executing code. Please try again.",
        status: { id: 0, description: "Error" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput(null);
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

  const handleOutputResize = (e: MouseEvent) => {
    if (!resizingOutput.current) return;

    // Calculate the new height based on mouse position relative to the container
    const container = document.querySelector(".code-editor-container");
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const relativeY = e.clientY - containerRect.top;
      const containerHeight = containerRect.height;

      // Convert to percentage of container height
      const newEditorHeight = (relativeY / containerHeight) * 100;

      // Constrain to reasonable values (20% to 80%)
      if (newEditorHeight >= 20 && newEditorHeight <= 80) {
        setEditorHeight(newEditorHeight);
      }
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      dragging.current = false;
      resizingOutput.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleOutputResize);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleOutputResize);
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
      <div className="flex flex-col flex-grow code-editor-container">
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
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Running...
                </div>
              ) : (
                "Run Code"
              )}
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
          height={`${editorHeight}%`}
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

        {/* Resizable divider between editor and output */}
        <div
          onMouseDown={() => (resizingOutput.current = true)}
          className="h-1 bg-gray-600 cursor-row-resize hover:bg-gray-500 flex items-center justify-center"
        >
          <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
        </div>

        <div
          className="border-t border-gray-700 bg-gray-900 flex flex-col overflow-hidden"
          style={{ height: `calc(100% - ${editorHeight}% - 5px)` }}
        >
          <div className="p-3 text-xs font-medium border-b border-gray-700 text-gray-400 flex justify-between items-center">
            <span>Output</span>
            {output && output.status && (
              <span
                className={
                  output.status.id === 3 ? "text-green-400" : "text-red-400"
                }
              >
                {output.status.description}
                {output.time && ` • ${output.time}s`}
                {output.memory && ` • ${Math.round(output.memory / 1024)} MB`}
              </span>
            )}
          </div>
          <div className="flex-grow bg-gray-900 p-3 overflow-auto max-h-full font-mono text-sm whitespace-pre-wrap">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                  Executing code...
                </div>
              </div>
            ) : output ? (
              <div>
                {output.stdout && (
                  <div className="text-green-400">{output.stdout}</div>
                )}
                {output.stderr && (
                  <div className="text-red-400">{output.stderr}</div>
                )}
                {output.message && output.status?.id !== 3 && (
                  <div className="text-yellow-400 mt-2">{output.message}</div>
                )}
                {!output.stdout && !output.stderr && !output.message && (
                  <span className="text-gray-400">No output</span>
                )}
              </div>
            ) : (
              <span className="text-gray-400">// Output will appear here</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
