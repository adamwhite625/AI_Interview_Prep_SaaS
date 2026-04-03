"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import Select from "@/components/ClientSelect"; 
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const roleOptions = [
  { value: "ML Engineer", label: "Machine Learning Engineer" },
  { value: "AI Researcher", label: "AI Researcher" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "MLOps Engineer", label: "MLOps Engineer" },
  { value: "Computer Vision Engineer", label: "Computer Vision Engineer" },
  { value: "NLP Engineer", label: "NLP Engineer" },
  { value: "AI Product Manager", label: "AI Product Manager" },
];

const experienceLevelOptions = [
  { value: "Entry", label: "Entry Level (0–2 năm)" },
  { value: "Mid", label: "Mid Level (2–5 năm)" },
  { value: "Senior", label: "Senior (5–10 năm)" },
  { value: "Lead", label: "Lead / Principal (10+ năm)" },
];

const skillsOptions = [
  { value: "Python", label: "Python" },
  { value: "TensorFlow", label: "TensorFlow" },
  { value: "PyTorch", label: "PyTorch" },
  { value: "Scikit-learn", label: "Scikit-learn" },
  { value: "Deep Learning", label: "Deep Learning" },
  { value: "NLP", label: "NLP" },
  { value: "Computer Vision", label: "Computer Vision" },
  { value: "MLOps", label: "MLOps" },
  { value: "AWS", label: "AWS" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
];

export default function InterviewPrepForm() {
  const { getToken } = useAuth();

  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState<any>(null);
  const [experienceLevel, setExperienceLevel] = useState<any>(null);
  const [technicalSkills, setTechnicalSkills] = useState<any[]>([]);
  const [projectsSummary, setProjectsSummary] = useState("");

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setOutput("");
    setLoading(true);
  
    const jwt = await getToken();
    if (!jwt) {
      setOutput("Vui lòng đăng nhập để tiếp tục");
      setLoading(false);
      return;
    }
  
    let buffer = "";
    const controller = new AbortController();
  
    await fetchEventSource("/api/interview", {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        full_name: fullName,
        target_role: targetRole?.value,
        experience_level: experienceLevel?.value,
        technical_skills: technicalSkills.map((s) => s.value),
        projects_summary: projectsSummary,
      }),
      onmessage(ev) {
        const parsed = JSON.parse(ev.data);
        buffer += parsed.chunk;
        setOutput(buffer);
      },
      onclose() {
        setLoading(false);
      },
      onerror(err) {
        console.error(err);
        controller.abort();
        setLoading(false);
      },
    });
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold">
            🎯 AI Interview Prep
          </h2>
    
          <input
            type="text"
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded p-3"
            required
          />
    
          <Select
            placeholder="Vị trí mục tiêu"
            options={roleOptions}
            value={targetRole}
            onChange={setTargetRole}
          />
    
          <Select
            placeholder="Level kinh nghiệm"
            options={experienceLevelOptions}
            value={experienceLevel}
            onChange={setExperienceLevel}
          />
    
          <Select
            isMulti
            placeholder="Kỹ năng kỹ thuật"
            options={skillsOptions}
            value={technicalSkills}
            onChange={(v) => setTechnicalSkills(v as any[])}
          />
    
          <textarea
            placeholder="Tóm tắt dự án đã làm"
            value={projectsSummary}
            onChange={(e) => setProjectsSummary(e.target.value)}
            className="w-full border rounded p-3 h-32"
            required
          />
    
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Đang tạo..." : "🚀 Tạo kế hoạch phỏng vấn"}
          </button>
        </form>
    
        {output && (
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-3" {...props} />,
                  li: ({node, ...props}) => <li className="mb-2" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
                }}
              >
                {output}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );  
}