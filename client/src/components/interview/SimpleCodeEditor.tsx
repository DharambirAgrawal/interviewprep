"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Settings } from "lucide-react";

interface SimpleCodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  readOnly?: boolean;
  height?: string;
}

const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript", monaco: "javascript" },
  { value: "python", label: "Python", monaco: "python" },
  { value: "java", label: "Java", monaco: "java" },
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "typescript", label: "TypeScript", monaco: "typescript" },
  { value: "go", label: "Go", monaco: "go" },
];

export const SimpleCodeEditor: React.FC<SimpleCodeEditorProps> = ({
  initialCode = "// Start coding here...",
  language = "javascript",
  onCodeChange,
  onLanguageChange,
  readOnly = false,
  height = "400px",
}) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
  };

  const getMonacoLanguage = (lang: string) => {
    const languageConfig = SUPPORTED_LANGUAGES.find((l) => l.value === lang);
    return languageConfig?.monaco || "javascript";
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-t-lg border">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            Code Editor
          </Badge>

          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={readOnly}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-t-0 rounded-b-lg overflow-hidden">
        <Editor
          height={height}
          language={getMonacoLanguage(selectedLanguage)}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 border border-t-0 rounded-b-sm text-xs text-gray-600 dark:text-gray-400">
        <span>
          Language:{" "}
          {SUPPORTED_LANGUAGES.find((l) => l.value === selectedLanguage)?.label}
        </span>
        <span>
          Lines: {code.split("\n").length} | Characters: {code.length}
        </span>
      </div>
    </div>
  );
};

export default SimpleCodeEditor;
