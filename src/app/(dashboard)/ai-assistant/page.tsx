'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
    Send, Bot, User, Sparkles, RefreshCw, AlertCircle,
    FileText, CalendarDays, UserCircle2, ChevronDown, ChevronUp,
    Loader2, Zap, Shield, Brain
} from 'lucide-react';
import { ragApi, RAGQueryResponse, SourceChunk } from '@/lib/api/rag';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: SourceChunk[];
    timestamp: Date;
    isError?: boolean;
}

const SUGGESTED_QUERIES = [
    "What are my recent medical records?",
    "When is my next appointment?",
    "What was the reason for my last visit?",
    "Which doctors have I seen recently?",
    "Show me my confirmed appointments.",
    "What medical records do I have on file?",
];

// ── Source Badge ───────────────────────────────────────────────────────────────
function SourceBadge({ chunk }: { chunk: SourceChunk }) {
    const [expanded, setExpanded] = useState(false);

    const icon = chunk.source_type === 'record'
        ? <FileText className="w-3.5 h-3.5" />
        : chunk.source_type === 'appointment'
        ? <CalendarDays className="w-3.5 h-3.5" />
        : <UserCircle2 className="w-3.5 h-3.5" />;

    const color = chunk.source_type === 'record'
        ? 'bg-blue-50 text-blue-700 border-blue-200'
        : chunk.source_type === 'appointment'
        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
        : 'bg-slate-50 text-slate-700 border-slate-200';

    return (
        <div className={`text-[11px] border rounded-xl overflow-hidden ${color}`}>
            <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 px-3 py-1.5 w-full text-left hover:brightness-95 transition-all"
            >
                {icon}
                <span className="font-bold capitalize">{chunk.source_type}</span>
                <span className="ml-auto text-[10px] font-medium opacity-60">
                    score: {chunk.score.toFixed(3)}
                </span>
                {expanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </button>
            {expanded && (
                <div className="px-3 pb-2 text-[11px] leading-relaxed font-medium opacity-80 border-t border-current/20">
                    {chunk.text.slice(0, 250)}{chunk.text.length > 250 ? '…' : ''}
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
                            <div className="space-y-1.5">
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
    const [messages,    setMessages]    = useState<Message[]>([]);
    const [input,       setInput]       = useState('');
    const [isLoading,   setIsLoading]   = useState(false);
    const [isReindexing, setIsReindexing] = useState(false);
    const [indexStatus, setIndexStatus] = useState<{ loaded: boolean; vectors: number } | null>(null);
    const [error,       setError]       = useState<string | null>(null);
    const bottomRef  = useRef<HTMLDivElement>(null);
    const inputRef   = useRef<HTMLTextAreaElement>(null);

    // ── Initial greeting ────────────────────────────────────────────────────────
    useEffect(() => {
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: "👋 Hello! I'm **MedChain AI**, your personal health assistant.\n\nI can help you understand your medical records, appointment history, and health data. All answers are grounded in your actual records — I never make up medical information.\n\nWhat would you like to know?",
            timestamp: new Date(),
        }]);

        // Check index health
        ragApi.health().then(h => {
            setIndexStatus({ loaded: h.index_loaded, vectors: h.total_vectors });
        }).catch(() => setIndexStatus({ loaded: false, vectors: 0 }));
    }, []);

    // ── Auto scroll ─────────────────────────────────────────────────────────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // ── Send message ─────────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (text: string) => {
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
            const resp: RAGQueryResponse = await ragApi.query({ query: text.trim(), top_k: 5 });
            const assistantMsg: Message = {
                id:        (Date.now() + 1).toString(),
                role:      'assistant',
                content:   resp.answer,
                sources:   resp.sources,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (err: any) {
            const detail = err.message || 'Something went wrong';
            const errMsg: Message = {
                id:        (Date.now() + 1).toString(),
                role:      'assistant',
                content:   `⚠️ ${detail}\n\nIf this is your first time using AI Assistant, please click "Build Index" above to initialize the knowledge base.`,
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
                content:   `✅ Knowledge base rebuilt successfully!\n${result.total_chunks} document chunks indexed from your health records. You can now ask questions about your data.`,
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

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex flex-col pb-0">
            <div className="flex-1 max-w-[900px] mx-auto w-full flex flex-col p-6 gap-4">

                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                                <Brain className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-900 leading-none">MedChain AI</h1>
                                <p className="text-[13px] text-slate-500 font-medium mt-0.5">RAG-powered health assistant</p>
                            </div>
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

                        {/* Build / Rebuild index */}
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

                {/* ── Info banner (first time) ────────────────────────── */}
                {indexStatus !== null && !indexStatus.loaded && (
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[13px] font-bold text-amber-800">Knowledge base not initialized</p>
                            <p className="text-[12px] text-amber-700 mt-0.5">
                                Click <strong>Build Index</strong> above to index your health records. This only needs to be done once (or when new records are added).
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Feature pills ───────────────────────────────────── */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { icon: <Shield className="w-3 h-3" />,   label: 'Grounded answers only'    },
                        { icon: <Zap className="w-3 h-3" />,      label: 'Semantic search (FAISS)'  },
                        { icon: <Sparkles className="w-3 h-3" />, label: 'Gemini LLM powered'       },
                    ].map(p => (
                        <span key={p.label} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 shadow-sm">
                            {p.icon}{p.label}
                        </span>
                    ))}
                </div>

                {/* ── Chat window ─────────────────────────────────────── */}
                <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '460px', maxHeight: '560px' }}>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}

                        {/* Typing indicator */}
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
                                    <span className="text-[13px] text-slate-500 font-medium ml-1">Analyzing your records…</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* ── Suggested queries ───────────────────────────── */}
                    {messages.length <= 1 && (
                        <div className="px-6 pb-3 flex flex-wrap gap-2">
                            {SUGGESTED_QUERIES.map(q => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    disabled={isLoading}
                                    className="text-[11px] font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-full px-3 py-1.5 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ── Input area ──────────────────────────────────── */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        <div className="flex items-end gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything about your health records… (Enter to send, Shift+Enter for new line)"
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
                        <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
                            MedChain AI only answers based on your records. Always consult a doctor for medical decisions.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
