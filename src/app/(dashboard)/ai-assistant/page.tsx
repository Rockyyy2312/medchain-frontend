'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
    Send, Bot, User, Sparkles, RefreshCw, AlertCircle,
    FileText, CalendarDays, UserCircle2, ChevronDown, ChevronUp,
    Loader2, Zap, Shield, Brain, Activity, Pill, BookOpen,
    ShieldAlert, ClipboardList
} from 'lucide-react';
import { ragApi, RAGQueryResponse, SourceChunk, QuestionCategory } from '@/lib/api/rag';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: SourceChunk[];
    timestamp: Date;
    isError?: boolean;
    answerMode?: 'record_grounded' | 'general_medical';
    followUpQuestions?: string[];
}

const SUGGESTED_QUERIES = [
    "What are my recent medical records?",
    "When is my next appointment?",
    "What was the reason for my last visit?",
    "Show my confirmed appointments.",
    "What chronic conditions do I have active?",
    "Show me my current active prescriptions."
];

// ── Static Fallback Question Bank (7 Categories) ───────────────────────────────
const STATIC_CATEGORIES: QuestionCategory[] = [
    {
        category_name: "Patient Profile & Context",
        questions: [
            { id: 1, question_text: "What is my full name, age, sex, and preferred language for medical explanations?", requires_records: true, category: "Patient Profile & Context" },
            { id: 2, question_text: "What is my primary reason for using the MedChain system today?", requires_records: false, category: "Patient Profile & Context" },
            { id: 5, question_text: "Who is my primary care doctor or usual treating physician in the system?", requires_records: true, category: "Patient Profile & Context" },
            { id: 6, question_text: "Which specialists am I currently seeing, and for what conditions?", requires_records: true, category: "Patient Profile & Context" },
            { id: 8, question_text: "What is my emergency contact and my relationship to them?", requires_records: true, category: "Patient Profile & Context" },
            { id: 9, question_text: "What are my communication preferences, such as phone, email, or app notifications?", requires_records: true, category: "Patient Profile & Context" }
        ]
    },
    {
        category_name: "Symptoms & Chief Complaint",
        questions: [
            { id: 29, question_text: "What symptoms is the patient currently experiencing?", requires_records: false, category: "Symptoms & Chief Complaint" },
            { id: 30, question_text: "When did the current symptoms start?", requires_records: false, category: "Symptoms & Chief Complaint" },
            { id: 33, question_text: "How severe are the symptoms on a scale from 0 to 10?", requires_records: false, category: "Symptoms & Chief Complaint" },
            { id: 36, question_text: "What makes the symptoms better or worse?", requires_records: false, category: "Symptoms & Chief Complaint" },
            { id: 37, question_text: "Have I experienced these symptoms before in my record history?", requires_records: true, category: "Symptoms & Chief Complaint" },
            { id: 39, question_text: "What does a sudden onset of chest pain indicate?", requires_records: false, category: "Symptoms & Chief Complaint" }
        ]
    },
    {
        category_name: "Medical History & Conditions",
        questions: [
            { id: 57, question_text: "What are my currently active diagnoses and chronic conditions?", requires_records: true, category: "Medical History & Conditions" },
            { id: 58, question_text: "When was my diabetes or hypertension first diagnosed?", requires_records: true, category: "Medical History & Conditions" },
            { id: 60, question_text: "Do I have any documented surgeries or hospitalizations in my records?", requires_records: true, category: "Medical History & Conditions" },
            { id: 63, question_text: "How does high blood pressure damage arteries over time?", requires_records: false, category: "Medical History & Conditions" },
            { id: 68, question_text: "Are there any thyroid disorders noted in my health summary?", requires_records: true, category: "Medical History & Conditions" }
        ]
    },
    {
        category_name: "Medications & Allergies",
        questions: [
            { id: 86, question_text: "What medications am I currently prescribed, and what are their dosages?", requires_records: true, category: "Medications & Allergies" },
            { id: 87, question_text: "What are the instructions for taking my prescribed medications?", requires_records: true, category: "Medications & Allergies" },
            { id: 88, question_text: "How many refills do I have left for my active prescriptions?", requires_records: true, category: "Medications & Allergies" },
            { id: 90, question_text: "Are there any food or drug interactions I should avoid with my medications?", requires_records: true, category: "Medications & Allergies" },
            { id: 105, question_text: "Do I have any documented drug allergies in the system?", requires_records: true, category: "Medications & Allergies" },
            { id: 108, question_text: "Do my records show any food allergies, like nuts or shellfish?", requires_records: true, category: "Medications & Allergies" }
        ]
    },
    {
        category_name: "Lifestyle & Family History",
        questions: [
            { id: 115, question_text: "Does my medical history contain family details regarding heart disease?", requires_records: true, category: "Lifestyle & Family History" },
            { id: 116, question_text: "How does a family history of diabetes influence my personal risk?", requires_records: false, category: "Lifestyle & Family History" },
            { id: 125, question_text: "Are my dietary preferences or exercise habits listed in my profile?", requires_records: true, category: "Lifestyle & Family History" },
            { id: 131, question_text: "Do I have a list of recent vaccinations, like flu or COVID-19, in my profile?", requires_records: true, category: "Lifestyle & Family History" },
            { id: 136, question_text: "Is high blood pressure hereditary?", requires_records: false, category: "Lifestyle & Family History" }
        ]
    },
    {
        category_name: "Diagnostic Tests & Lab Results",
        questions: [
            { id: 143, question_text: "What are my most recent vital signs, like blood pressure and heart rate?", requires_records: true, category: "Diagnostic Tests & Lab Results" },
            { id: 144, question_text: "When was my last blood test, and what did it screen for?", requires_records: true, category: "Diagnostic Tests & Lab Results" },
            { id: 145, question_text: "What do my cholesterol test results mean (HDL vs LDL vs triglycerides)?", requires_records: true, category: "Diagnostic Tests & Lab Results" },
            { id: 146, question_text: "Are my blood glucose levels or HbA1c results in the system?", requires_records: true, category: "Diagnostic Tests & Lab Results" },
            { id: 148, question_text: "Do my records include any recent imaging reports, like X-rays or MRIs?", requires_records: true, category: "Diagnostic Tests & Lab Results" }
        ]
    },
    {
        category_name: "Access Security & AI Guidance",
        questions: [
            { id: 172, question_text: "Which doctors have active access grants to view my medical records?", requires_records: true, category: "Access Security & AI Guidance" },
            { id: 173, question_text: "Do I have any pending record access requests from clinicians?", requires_records: true, category: "Access Security & AI Guidance" },
            { id: 176, question_text: "Are my records stored securely on the blockchain, and what does that mean?", requires_records: false, category: "Access Security & AI Guidance" },
            { id: 182, question_text: "What answer format does the patient prefer: short summary, detailed explanation, checklist, timeline, or doctor-prep note?", requires_records: false, category: "Access Security & AI Guidance" },
            { id: 184, question_text: "Which retrieved records support the answer?", requires_records: true, category: "Access Security & AI Guidance" }
        ]
    }
];

// ── Source Badge ───────────────────────────────────────────────────────────────
function SourceBadge({ chunk }: { chunk: SourceChunk }) {
    const [expanded, setExpanded] = useState(false);

    let icon = <FileText className="w-3.5 h-3.5" />;
    let color = 'bg-blue-50 text-blue-700 border-blue-200';

    switch (chunk.source_type) {
        case 'profile':
            icon = <UserCircle2 className="w-3.5 h-3.5" />;
            color = 'bg-sky-50 text-sky-700 border-sky-200';
            break;
        case 'record':
            icon = <FileText className="w-3.5 h-3.5" />;
            color = 'bg-blue-50 text-blue-700 border-blue-200';
            break;
        case 'appointment':
            icon = <CalendarDays className="w-3.5 h-3.5" />;
            color = 'bg-indigo-50 text-indigo-700 border-indigo-200';
            break;
        case 'vital':
            icon = <Activity className="w-3.5 h-3.5" />;
            color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            break;
        case 'diagnosis':
            icon = <FileText className="w-3.5 h-3.5" />;
            color = 'bg-rose-50 text-rose-700 border-rose-200';
            break;
        case 'prescription':
            icon = <Pill className="w-3.5 h-3.5" />;
            color = 'bg-amber-50 text-amber-700 border-amber-200';
            break;
        case 'parsed_data':
            icon = <Sparkles className="w-3.5 h-3.5" />;
            color = 'bg-violet-50 text-violet-700 border-violet-200';
            break;
        case 'access_grant':
            icon = <Shield className="w-3.5 h-3.5" />;
            color = 'bg-teal-50 text-teal-700 border-teal-200';
            break;
        case 'access_request':
            icon = <ClipboardList className="w-3.5 h-3.5" />;
            color = 'bg-orange-50 text-orange-700 border-orange-200';
            break;
        default:
            icon = <FileText className="w-3.5 h-3.5" />;
            color = 'bg-slate-50 text-slate-700 border-slate-200';
    }

    return (
        <div className={`text-[11px] border rounded-xl overflow-hidden ${color}`}>
            <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 px-3 py-1.5 w-full text-left hover:brightness-95 transition-all"
            >
                {icon}
                <span className="font-bold capitalize">{chunk.source_type.replace('_', ' ')}</span>
                <span className="ml-auto text-[10px] font-medium opacity-60">
                    score: {chunk.score.toFixed(3)}
                </span>
                {expanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </button>
            {expanded && (
                <div className="px-3 pb-2 text-[11px] leading-relaxed font-medium opacity-80 border-t border-current/20">
                    {chunk.text.slice(0, 300)}{chunk.text.length > 300 ? '…' : ''}
                </div>
            )}
        </div>
    );
}

// ── Message Bubble ─────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user';
    const [showSources, setShowSources] = useState(false);

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom-2 duration-300`}>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                isUser 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gradient-to-br from-violet-500 to-purple-700 text-white'
            }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4.5 h-4.5" />}
            </div>

            {/* Bubble + Sources */}
            <div className={`max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed font-medium shadow-sm ${
                    isUser
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                        : message.isError
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
                }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Sources toggle */}
                {!isUser && message.sources && message.sources.length > 0 && (
                    <div className="w-full space-y-2">
                        <button
                            onClick={() => setShowSources(s => !s)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <Shield className="w-3 h-3" />
                            {showSources ? 'Hide' : 'Show'} {message.sources.length} source{message.sources.length !== 1 ? 's' : ''}
                        </button>
                        {showSources && (
                            <div className="space-y-1.5 w-full">
                                {message.sources.map((src, i) => (
                                    <SourceBadge key={i} chunk={src} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-slate-400 font-medium px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AIAssistantPage() {
    const [userRole,    setUserRole]    = useState<string | null>(null);
    const [messages,    setMessages]    = useState<Message[]>([]);
    const [input,       setInput]       = useState('');
    const [isLoading,   setIsLoading]   = useState(false);
    const [isReindexing, setIsReindexing] = useState(false);
    const [indexStatus, setIndexStatus] = useState<{ loaded: boolean; vectors: number } | null>(null);
    
    // Initialize questionBank with static 7 categories as fallback
    const [questionBank, setQuestionBank] = useState<QuestionCategory[]>(STATIC_CATEGORIES);
    const [selectedCategory, setSelectedCategory] = useState<string>("Patient Profile & Context");
    const [error,       setError]       = useState<string | null>(null);
    
    const bottomRef  = useRef<HTMLDivElement>(null);
    const inputRef   = useRef<HTMLTextAreaElement>(null);

    // ── Enforce Patient Role check and Fetch Question Bank ─────────────────────
    useEffect(() => {
        const role = localStorage.getItem('user_role') || 'PATIENT';
        setUserRole(role);

        if (role === 'PATIENT') {
            // Initial greeting
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: "👋 Hello! I'm **MedChain AI**, your personal health assistant.\n\nI can help you understand your medical records, appointment history, active prescriptions, and security access logs. I can also answer general healthcare questions.\n\nWhat would you like to discuss today?",
                timestamp: new Date(),
            }]);

            // Check index health
            ragApi.health().then(h => {
                setIndexStatus({ loaded: h.index_loaded, vectors: h.total_vectors });
            }).catch(() => setIndexStatus({ loaded: false, vectors: 0 }));

            // Load Question Bank (updates list with full 200 questions organized in 7 categories)
            ragApi.fetchQuestionBank().then(res => {
                if (res.categories && res.categories.length > 0) {
                    setQuestionBank(res.categories);
                    setSelectedCategory(res.categories[0].category_name);
                }
            }).catch(err => {
                console.warn('Backend question bank unavailable, using built-in questions:', err);
            });
        }
    }, []);

    // ── Auto scroll ─────────────────────────────────────────────────────────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // ── Send message ─────────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (text: string, category?: string) => {
        if (!text.trim() || isLoading) return;
        setError(null);

        const userMsg: Message = {
            id:        Date.now().toString(),
            role:      'user',
            content:   text.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const resp: RAGQueryResponse = await ragApi.query({ 
                query: text.trim(), 
                top_k: 5,
                question_category: category 
            });
            const assistantMsg: Message = {
                id:        (Date.now() + 1).toString(),
                role:      'assistant',
                content:   resp.answer,
                sources:   resp.sources,
                timestamp: new Date(),
                answerMode: resp.answer_mode,
                followUpQuestions: resp.follow_up_questions,
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (err: any) {
            const detail = err.message || 'Something went wrong';
            const errMsg: Message = {
                id:        (Date.now() + 1).toString(),
                role:      'assistant',
                content:   `⚠️ ${detail}\n\nIf this is your first time using MedChain AI, please build the index to load your knowledge base.`,
                timestamp: new Date(),
                isError:   true,
            };
            setMessages(prev => [...prev, errMsg]);
            setError(detail);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    // ── Reindex ─────────────────────────────────────────────────────────────────
    const handleReindex = async () => {
        setIsReindexing(true);
        setError(null);
        try {
            const result = await ragApi.reindex();
            setIndexStatus({ loaded: true, vectors: result.total_chunks });
            const sysMsg: Message = {
                id:        'reindex-' + Date.now(),
                role:      'assistant',
                content:   `✅ Knowledge base rebuilt successfully!\n${result.total_chunks} document chunks indexed from your medical files, vitals, prescriptions, diagnoses, access grants, and access requests.`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, sysMsg]);
        } catch (err: any) {
            setError(err.message || 'Reindex failed');
        } finally {
            setIsReindexing(false);
        }
    };

    // ── Key handler ──────────────────────────────────────────────────────────────
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    // ── Doctor Guard View ────────────────────────────────────────────────────────
    if (userRole === 'DOCTOR') {
        return (
            <div className="min-h-full bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h1>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        The MedChain AI Assistant is restricted to patient accounts only. Provider-facing summaries and analytics can be accessed through your doctor dashboard.
                    </p>
                    <button
                        onClick={() => window.location.href = '/dashboard/doctor'}
                        className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all active:scale-[0.98]"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (userRole === null) {
        return (
            <div className="min-h-full bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
            </div>
        );
    }

    // ── Patient Content View ─────────────────────────────────────────────────────
    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex flex-col pb-6">
            <div className="max-w-[1400px] mx-auto w-full p-6 flex flex-col gap-6 flex-1">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                            <Brain className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 leading-none">MedChain AI Assistant</h1>
                            <p className="text-[13px] text-slate-500 font-medium mt-0.5">Your personal health records guide & medical education tool</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Index status badge */}
                        {indexStatus !== null && (
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                                indexStatus.loaded 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${indexStatus.loaded ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
                                {indexStatus.loaded ? `${indexStatus.vectors} chunks indexed` : 'Index not built'}
                            </div>
                        )}

                        {/* Build Index */}
                        <button
                            onClick={handleReindex}
                            disabled={isReindexing}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-[12px] font-bold transition-all active:scale-95 shadow-sm"
                        >
                            {isReindexing 
                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> 
                                : <RefreshCw className="w-3.5 h-3.5" />
                            }
                            {isReindexing ? 'Building…' : 'Build Index'}
                        </button>
                    </div>
                </div>

                {/* Info banner for unbuilt index */}
                {indexStatus !== null && !indexStatus.loaded && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[13px] font-bold text-amber-800">Knowledge base not initialized</p>
                            <p className="text-[12px] text-amber-700 mt-0.5">
                                Click <strong>Build Index</strong> above to index your health records. This loads your history so you can query it.
                            </p>
                        </div>
                    </div>
                )}

                {/* Features list */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { icon: <Shield className="w-3 h-3" />,   label: 'Strict Security Guards'   },
                        { icon: <Zap className="w-3 h-3" />,      label: 'Dual-Mode Answering (Records + General)' },
                        { icon: <Sparkles className="w-3 h-3" />, label: '7 Structured Intake categories' },
                    ].map(p => (
                        <span key={p.label} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 shadow-sm">
                            {p.icon}{p.label}
                        </span>
                    ))}
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6 flex-1 items-stretch">
                    
                    {/* Left Pane: Question Browser */}
                    <div className="w-full lg:w-[380px] bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col shrink-0" style={{ maxHeight: '720px' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4.5 h-4.5 text-violet-600" />
                            <h2 className="text-base font-bold text-slate-900">Health Intake Categories</h2>
                        </div>
                        
                        <p className="text-[12px] text-slate-500 font-medium mb-4 leading-relaxed">
                            Click any question from the categories below to ask MedChain AI.
                        </p>

                        {/* Category Dropdown */}
                        <div className="mb-4">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Intake Category</label>
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-violet-400 transition-colors"
                                >
                                    {questionBank.map(cat => (
                                        <option key={cat.category_name} value={cat.category_name}>
                                            {cat.category_name} ({cat.questions.length} questions)
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scroll-smooth">
                            {questionBank.length === 0 ? (
                                <div className="flex items-center justify-center h-40 text-xs font-semibold text-slate-400">
                                    Loading questions...
                                </div>
                            ) : (
                                questionBank
                                    .find(cat => cat.category_name === selectedCategory)
                                    ?.questions.map(q => (
                                        <button
                                            key={q.id}
                                            onClick={() => sendMessage(q.question_text, q.category)}
                                            disabled={isLoading}
                                            className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 active:scale-[0.98] transition-all group flex gap-2.5"
                                        >
                                            <div className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center text-[10px] font-extrabold ${
                                                q.requires_records 
                                                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                    : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                            }`}>
                                                {q.id}
                                            </div>
                                            <div className="space-y-1 w-full">
                                                <p className="text-[12px] font-semibold text-slate-700 leading-normal group-hover:text-slate-900 transition-colors">
                                                    {q.question_text}
                                                </p>
                                                <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                                                    q.requires_records 
                                                        ? 'bg-blue-50 text-blue-600' 
                                                        : 'bg-indigo-50 text-indigo-600'
                                                }`}>
                                                    {q.requires_records ? 'Record Grounded' : 'General Medical'}
                                                </span>
                                            </div>
                                        </button>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Right Pane: Chat Window */}
                    <div className="flex-1 flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm" style={{ minHeight: '520px', maxHeight: '720px' }}>
                        
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/20">
                            {messages.map(msg => (
                                <div key={msg.id} className="space-y-3">
                                    <MessageBubble message={msg} />
                                    
                                    {/* Action items / Badges for assistant response */}
                                    {msg.role === 'assistant' && (
                                        <div className="pl-12 flex flex-col gap-3">
                                            {/* Answer Mode Badge */}
                                            {msg.answerMode && (
                                                <div className="flex items-center">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border shadow-sm ${
                                                        msg.answerMode === 'record_grounded'
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                            : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                                                    }`}>
                                                        {msg.answerMode === 'record_grounded' ? (
                                                            <>
                                                                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                                                                <span>Grounded in your MedChain Records</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                                                <span>General Medical Knowledge & Education</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Suggested follow-up questions */}
                                            {messages[messages.length - 1].id === msg.id && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                                                <div className="space-y-2 mt-1 animate-in fade-in duration-500">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Next Questions:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {msg.followUpQuestions.map((fq, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => sendMessage(fq)}
                                                                disabled={isLoading}
                                                                className="text-left text-[11px] font-bold text-violet-700 bg-violet-50/50 hover:bg-violet-100 border border-violet-100 hover:border-violet-200 rounded-full px-3.5 py-2 transition-all active:scale-[0.97] disabled:opacity-50"
                                                            >
                                                                {fq}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex gap-3 animate-in slide-in-from-bottom-2">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-white flex items-center justify-center shadow-sm shrink-0 mt-1">
                                        <Bot className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                            ))}
                                        </div>
                                        <span className="text-[13px] text-slate-500 font-medium ml-1">Analyzing health context…</span>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick starter queries */}
                        {messages.length <= 1 && (
                            <div className="px-6 py-4 border-t border-slate-100 bg-white">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Common Record Queries:</span>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTED_QUERIES.map(q => (
                                        <button
                                            key={q}
                                            onClick={() => sendMessage(q)}
                                            disabled={isLoading}
                                            className="text-[11px] font-bold text-slate-600 hover:text-violet-700 bg-slate-50 hover:bg-violet-50/50 border border-slate-200 hover:border-violet-200 rounded-full px-3.5 py-1.5 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <div className="flex items-end gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about your records, or general medical questions..."
                                    className="flex-1 bg-transparent text-[14px] font-medium text-slate-900 placeholder-slate-400 resize-none outline-none min-h-[24px] max-h-[120px] leading-relaxed"
                                    rows={1}
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim() || isLoading}
                                    className="w-9 h-9 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all active:scale-90 shrink-0"
                                >
                                    {isLoading 
                                        ? <Loader2 className="w-4 h-4 animate-spin" /> 
                                        : <Send className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2.5 text-center font-medium">
                                Disclaimer: MedChain AI provides information based on medical records and general education. Always consult a clinician for diagnosis or medical decisions.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
