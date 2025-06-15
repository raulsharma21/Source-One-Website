import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* =========================================================================
   Project Brief Wizard Component - Modal Ready Version
   ========================================================================= */

interface ProjectBriefWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (answers: Record<string, any>, contactData: any) => void;
}

/** -------------------------------------------------------------------------
 * Question type definitions
 * --------------------------------------------------------------------- */
interface SingleQuestion {
  id: string;
  text: string;
  type: "single";
  options: string[];
}
interface NumberDateQuestion {
  id: string;
  text: string;
  type: "number" | "date";
  placeholder?: string;
}
interface RadioQuestion {
  id: string;
  text: string;
  type: "radio";
  options: string[];
}
interface TextQuestion {
  id: string;
  text: string;
  type: "text";
  placeholder?: string;
}

type Question = SingleQuestion | NumberDateQuestion | RadioQuestion | TextQuestion;

/** -------------------------------------------------------------------------
 * Survey content
 * --------------------------------------------------------------------- */

const QUESTIONS: Question[] = [
  {
    id: "productType",
    text: "What are you looking to import?",
    type: "single",
    options: [
      "Finished consumer product",
      "Custom component / part",
      "Packaging or label",
      "Exploring ideas",
    ],
  },
  {
    id: "journeyStage",
    text: "Where are you in the sourcing journey?",
    type: "single",
    options: [
      "Researching options",
      "Requesting quotes",
      "Sampling / prototyping",
      "Producing but facing issues",
      "Finding China Alternatives",
    ],
  },
  {
    id: "roadblock",
    text: "Biggest roadblock right now?",
    type: "single",
    options: [
      "Quality assurance",
      "Rising costs",
      "Slow lead‑times",
      "Regulatory / compliance",
      "Rising Tariffs",
    ],
  },
  {
    id: "productCategory",
    text: "Type in the product category / item you are looking to import",
    type: "text",
  },
];

/** -------------------------------------------------------------------------
 * Styled helper components
 * --------------------------------------------------------------------- */
const PRIMARY_BLUE = "#004A8F";
const BORDER_GRAY = "#E0E0E0";
const HOVER_BG = "#004A8F10"; // low‑opacity blue bg

const PrimaryBtn = ({ children, className = "", ...rest }: any) => (
  <Button
    {...rest}
    className={`w-full py-3 font-medium text-white ${className}`}
    style={{ backgroundColor: PRIMARY_BLUE }}
  >
    {children}
  </Button>
);

const OutlineBtn = ({ children, className = "", ...rest }: any) => (
  <Button
    {...rest}
    variant="outline"
    className={`w-full py-3 font-medium border-2 ${className}`}
    style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
  >
    {children}
  </Button>
);

function ChoiceButton({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full py-3 rounded font-medium transition-colors border-2"
      style={{ borderColor: BORDER_GRAY, backgroundColor: "#FFFFFF", color: "#000" }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = HOVER_BG;
        e.currentTarget.style.borderColor = PRIMARY_BLUE;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#FFFFFF";
        e.currentTarget.style.borderColor = BORDER_GRAY;
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = HOVER_BG;
        e.currentTarget.style.borderColor = PRIMARY_BLUE;
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = "#FFFFFF";
        e.currentTarget.style.borderColor = BORDER_GRAY;
      }}
    >
      {label}
    </button>
  );
}

function ChoiceList({ options, onSelect }: { options: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-4 w-full">
      {options.map((o) => (
        <ChoiceButton key={o} label={o} onSelect={() => onSelect(o)} />
      ))}
    </div>
  );
}

/** -------------------------------------------------------------------------
 * Main component
 * --------------------------------------------------------------------- */
export default function ProjectBriefWizard({ 
  isOpen, 
  onClose, 
  onSubmit 
}: ProjectBriefWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Don't render if not open
  if (!isOpen) return null;

  const total = QUESTIONS.length; // number of question screens
  const current = QUESTIONS[step] as Question | undefined;

  /** ------------------------------------------------------------
   * Navigation helpers
   * --------------------------------------------------------- */
  const next = () => setStep((s) => Math.min(s + 1, total));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const saveAnswer = (value: any) => setAnswers((prev) => ({ ...prev, [current!.id]: value }));

  const saveAndNext = (value: any) => {
    saveAnswer(value);
    next();
  };

  /** ------------------------------------------------------------
   * Contact screen (after questions)
   * --------------------------------------------------------- */
  if (step === total) {
    return (
      <Card className="w-full shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Where should we send your personalised PDF?
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const contactData = {
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              company: formData.get('company') as string
            };
            
            if (onSubmit) {
              onSubmit(answers, contactData);
            } else {
              // Default behavior
              alert("Submitted! (connect API endpoint)");
            }
            onClose();
          }}
        >
          <input 
            name="name"
            type="text" 
            placeholder="Name (optional)" 
            className="w-full border rounded px-3 py-2" 
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="company"
            type="text"
            placeholder="Company & role (optional)"
            className="w-full border rounded px-3 py-2"
          />
          <div className="space-y-3 pt-2">
            <PrimaryBtn type="submit">Email my PDF</PrimaryBtn>
            <OutlineBtn type="submit">Book 15‑min Consult & Email PDF</OutlineBtn>
          </div>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          We'll send your tailored Sourcing Snapshot within minutes. Check your inbox (and spam folder).
        </p>
        <div className="flex justify-between pt-6">
          <button className="text-sm underline" onClick={prev}>
            ← Back
          </button>
          <button className="text-sm underline text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
      </Card>
    );
  }

  /** ------------------------------------------------------------
   * Question screens
   * --------------------------------------------------------- */
  const progress = Math.round(((step + 1) / (total + 1)) * 100); // +1 for contact screen

  return (
    <Card className="w-full shadow-lg p-8">
      {/* progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          style={{ width: `${progress}%`, backgroundColor: PRIMARY_BLUE }}
          className="h-full transition-all"
        />
      </div>

      {/* question text */}
      <h2 className="text-xl font-semibold mb-6 text-black">{current!.text}</h2>

      {/* single‑select buttons & radio auto‑advance */}
      {((current!.type === "single") || (current!.type === "radio")) && (
        <ChoiceList options={(current as SingleQuestion | RadioQuestion).options} onSelect={saveAndNext} />
      )}

      {/* numeric input */}
      {current!.type === "number" && (
        <div className="space-y-4">
          <input
            type="number"
            placeholder={current.placeholder || ""}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => saveAnswer(e.target.value)}
          />
          <PrimaryBtn disabled={!answers[current.id]} onClick={next}>
            Next
          </PrimaryBtn>
        </div>
      )}

      {/* date input */}
      {current!.type === "date" && (
        <div className="space-y-4">
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => saveAnswer(e.target.value)}
          />
          <PrimaryBtn disabled={!answers[current.id]} onClick={next}>
            Next
          </PrimaryBtn>
        </div>
      )}

      {/* text input */}
      {current!.type === "text" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder={(current as TextQuestion).placeholder || ""}
            className="w-full border rounded px-3 py-2"
            value={answers[current.id] || ""}
            onChange={(e) => saveAnswer(e.target.value)}
          />
          <PrimaryBtn disabled={!answers[current.id]} onClick={next}>
            Next
          </PrimaryBtn>
        </div>
      )}

      {/* back button */}
      <div className="pt-6 flex justify-between">
        {step > 0 ? (
          <button className="text-sm underline" onClick={prev}>
            ← Back
          </button>
        ) : (
          <button className="text-sm underline text-red-500" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </Card>
  );
}