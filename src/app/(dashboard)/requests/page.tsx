'use client';

import { useState } from 'react';
import {
    ClipboardList, CheckCircle2, Ban, Clock, TrendingUp, Filter, Plus,
    X, FileText, FileClock, ChevronLeft, ChevronRight, Check
} from "lucide-react"

export default function RequestsPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="min-h-full bg-slate-50/50 pb-20 relative">
            <div className="flex-1 p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500 mt-2 space-y-8">

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pending Stat */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
                        <div className="pl-3">
                            <h3 className="text-[11px] font-extrabold text-slate-500 tracking-wider uppercase mb-1">PENDING</h3>
                            <div className="text-[2.5rem] font-bold text-slate-900 leading-none mb-2">08</div>
                            <div className="flex items-center gap-1.5 text-[12px] font-bold text-blue-600">
                                <Clock className="w-3.5 h-3.5" /> Needs review
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Approved Stat */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00A86B]"></div>
                        <div className="pl-3">
                            <h3 className="text-[11px] font-extrabold text-slate-500 tracking-wider uppercase mb-1">APPROVED</h3>
                            <div className="text-[2.5rem] font-bold text-slate-900 leading-none mb-2">142</div>
                            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#00A86B]">
                                <TrendingUp className="w-3.5 h-3.5" /> +12 this month
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#e6f6f0] text-[#00A86B] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Rejected Stat */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d32f2f]"></div>
                        <div className="pl-3">
                            <h3 className="text-[11px] font-extrabold text-slate-500 tracking-wider uppercase mb-1">REJECTED</h3>
                            <div className="text-[2.5rem] font-bold text-slate-900 leading-none mb-2">12</div>
                            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#d32f2f]">
                                <Ban className="w-3.5 h-3.5" /> Restricted access
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#fdeaea] text-[#d32f2f] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Ban className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Tabs & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200">
                    <div className="flex items-center gap-8">
                        {['All Requests', 'Pending', 'Approved', 'Rejected'].map(tab => {
                            const value = tab.toLowerCase().replace(' ', '-');
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(value)}
                                    className={`pb-4 px-1 text-[15px] font-bold transition-all border-b-[3px] ${activeTab === value
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-3 pb-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 font-bold text-[13px] rounded-full transition-all">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 font-bold text-[13px] rounded-full shadow-sm transition-all">
                            <Plus className="w-4 h-4" /> New Request
                        </button>
                    </div>
                </div>

                {/* List Container */}
                <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-default">
                        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-[35%]">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100">
                                <img src="https://i.pravatar.cc/150?img=47" alt="Dr" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Dr. Sarah Thompson</h4>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 mt-0.5">
                                    <FileText className="w-3.5 h-3.5" /> Specialist consultation review
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-[65%] gap-4 md:gap-8">
                            <div className="w-[20%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">STATUS</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#cc5500] text-white text-[11px] font-bold leading-none">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 mr-1.5"></div> Urgent
                                </span>
                            </div>
                            <div className="w-[30%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">REQUESTED</span>
                                <span className="text-[13px] font-bold text-slate-800">Oct 24, 2:45 PM</span>
                            </div>
                            <div className="flex items-center justify-end gap-3 w-[40%]">
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-bold text-[13px] rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
                                    View Details
                                </button>
                                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-default">
                        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-[35%]">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Dr" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Dr. James Wilson</h4>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 mt-0.5">
                                    <FileClock className="w-3.5 h-3.5" /> Routine lab results sync
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-[65%] gap-4 md:gap-8">
                            <div className="w-[20%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">STATUS</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eef2fc] text-[#4b71d6] text-[11px] font-bold leading-none">
                                    Standard
                                </span>
                            </div>
                            <div className="w-[30%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">REQUESTED</span>
                                <span className="text-[13px] font-bold text-slate-800">Oct 23, 10:15 AM</span>
                            </div>
                            <div className="flex items-center justify-end gap-3 w-[40%]">
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-bold text-[13px] rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
                                    View Details
                                </button>
                                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white/60 p-5 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-slate-100 hover:shadow-md hover:bg-white transition-all group cursor-default">
                        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-[35%] opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100">
                                <img src="https://i.pravatar.cc/150?img=5" alt="Dr" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Dr. Elena Rodriguez</h4>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 mt-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Cardiology records history
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-[65%] gap-4 md:gap-8">
                            <div className="w-[20%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">STATUS</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#e6f6f0] text-[#00A86B] text-[11px] font-bold leading-none">
                                    Approved
                                </span>
                            </div>
                            <div className="w-[30%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">REQUESTED</span>
                                <span className="text-[13px] font-bold text-slate-800">Oct 21, 9:30 AM</span>
                            </div>
                            <div className="flex items-center justify-end gap-3 w-[40%] pr-[20px] md:pr-14">
                                <button className="w-full md:w-auto px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-[13px] rounded-full hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all outline-none">
                                    Access Record
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-default">
                        <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-[35%]">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100">
                                <img src="https://i.pravatar.cc/150?img=12" alt="Dr" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Dr. Marcus Chen</h4>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 mt-0.5">
                                    <Filter className="w-3.5 h-3.5" /> Physical therapy progress tracking
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-[65%] gap-4 md:gap-8">
                            <div className="w-[20%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">STATUS</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eef2fc] text-[#4b71d6] text-[11px] font-bold leading-none">
                                    Standard
                                </span>
                            </div>
                            <div className="w-[30%]">
                                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block mb-1">REQUESTED</span>
                                <span className="text-[13px] font-bold text-slate-800">Oct 20, 4:00 PM</span>
                            </div>
                            <div className="flex items-center justify-end gap-3 w-[40%]">
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-bold text-[13px] rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
                                    View Details
                                </button>
                                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] font-medium text-slate-500">Showing 1 to 4 of 162 requests</p>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold text-[13px] shadow-sm">
                            1
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 font-bold text-[13px] transition-all">
                            2
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 font-bold text-[13px] transition-all">
                            3
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
