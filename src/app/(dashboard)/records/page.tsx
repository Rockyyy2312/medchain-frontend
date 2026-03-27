'use client';

import {
    Search, CalendarDays, Users, LayoutGrid, List, UploadCloud,
    Share2, Download, MoreVertical, X, Plus, FileText,
    Microscope, HeartPulse, HardDriveUpload, Camera, Image as ImageIcon
} from "lucide-react"

export default function RecordsPage() {
    return (
        <div className="min-h-full bg-slate-50/50 pb-20 relative">
            <div className="flex gap-8 p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500 mt-2">

                {/* Main Content Area */}
                <div className="flex-1 space-y-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="text-[13px] font-bold text-slate-400 mb-2 tracking-wide flex items-center gap-2">
                                Patient <span className="text-slate-300">›</span> <span className="text-blue-600 hover:underline cursor-pointer">Records</span>
                            </div>
                            <h2 className="text-[2.25rem] font-bold tracking-tight text-slate-900 leading-tight">
                                My Medical Records
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                                <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 rounded-lg transition-all">
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 active:scale-95 rounded-lg transition-all">
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all">
                                <UploadCloud className="w-5 h-5" />
                                Upload Record
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100/50 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by record name, doctor, or specialty..."
                                className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3 px-2 flex-wrap">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-[13px] rounded-full transition-all">
                                <CalendarDays className="w-4 h-4" /> Date Range
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-[13px] rounded-full transition-all">
                                <Users className="w-4 h-4" /> Shared Status
                            </button>
                            <div className="w-px h-6 bg-slate-200 mx-2"></div>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 active:scale-95 text-blue-600 border border-blue-200 font-bold text-[13px] rounded-full transition-all shadow-sm">
                                Radiology
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold text-[13px] rounded-full transition-all">
                                Cardiology
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold text-[13px] rounded-full transition-all">
                                Lab Results
                            </button>
                        </div>
                    </div>

                    {/* Records Grid */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Card 1 */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1 rounded-full active:scale-95 transition-all">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">Annual_Physical_2023.pdf</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold tracking-wider rounded-md">GENERAL HEALTH</span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold tracking-wider rounded-md">VERIFIED</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 text-[14px] font-medium text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                                    <Share2 className="w-4 h-4" /> Shared with 3 doctors
                                </div>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all">View</button>
                                        <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 active:scale-95 transition-all">Share</button>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full active:scale-95 transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1 rounded-full active:scale-95 transition-all">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-1 hover:text-purple-600 transition-colors cursor-pointer">Chest_XRay_Nov2023.dicom</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold tracking-wider rounded-md">RADIOLOGY</span>
                                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-extrabold tracking-wider rounded-md">HIGH RES</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 text-[14px] font-medium text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                                    <Share2 className="w-4 h-4" /> Private (Not Shared)
                                </div>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all">View</button>
                                        <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 active:scale-95 transition-all">Share</button>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full active:scale-95 transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                                        <Microscope className="w-6 h-6" />
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1 rounded-full active:scale-95 transition-all">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-1 hover:text-orange-600 transition-colors cursor-pointer">Blood_Panel_Results_Oct...</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold tracking-wider rounded-md">LABORATORY</span>
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-extrabold tracking-wider rounded-md">URGENT</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 text-[14px] font-medium text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                                    <Share2 className="w-4 h-4" /> Shared with 1 doctor
                                </div>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all">View</button>
                                        <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 active:scale-95 transition-all">Share</button>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full active:scale-95 transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                                        <HeartPulse className="w-6 h-6" />
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1 rounded-full active:scale-95 transition-all">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-[17px] font-bold text-slate-900 mb-3 line-clamp-1 hover:text-emerald-600 transition-colors cursor-pointer">Cardio_Stress_Test.pdf</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold tracking-wider rounded-md">CARDIOLOGY</span>
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold tracking-wider rounded-md">NORMAL</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 text-[14px] font-medium text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
                                    <Share2 className="w-4 h-4" /> Shared with 2 doctors
                                </div>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all">View</button>
                                        <button className="text-[14px] font-bold text-slate-600 hover:text-slate-900 active:scale-95 transition-all">Share</button>
                                    </div>
                                    <button className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full active:scale-95 transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Upload Flow Sidebar/Modal */}
                <div className="w-[400px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col sticky top-28 h-fit shrink-0">

                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[1.25rem] font-bold text-slate-900">Upload Flow</h3>
                        <button className="p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drop Zone */}
                    <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 hover:scale-[1.02] active:scale-95 transition-all mb-6">
                        <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <HardDriveUpload className="w-6 h-6" />
                        </div>
                        <h4 className="text-[15px] font-bold text-slate-900 mb-1">Drop files here</h4>
                        <p className="text-[13px] font-medium text-slate-500">or click to browse from device</p>
                    </div>

                    {/* Uploading Item */}
                    <div className=" bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8 relative group">
                        <div className="flex items-start gap-4 mb-4 pr-6">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-[13px] font-bold text-slate-900 truncate">Knee_Scan_Results_2024...</h4>
                                <p className="text-[12px] font-medium text-slate-500 mt-0.5">12.4 MB</p>
                            </div>
                            <button className="absolute top-4 right-4 text-slate-400 hover:text-red-600 active:scale-95 transition-colors">
                                <span className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-red-600/50 flex items-center justify-center transition-colors">
                                    <X className="w-2.5 h-2.5" />
                                </span>
                            </button>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[11px] font-extrabold text-blue-600 tracking-wider">UPLOADING...</span>
                                <span className="text-[11px] font-extrabold text-blue-600">65%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Tag Selection */}
                    <div className="space-y-4 mb-8 flex-1">
                        <h4 className="text-[11px] font-extrabold text-slate-500 tracking-wider uppercase">TAG SELECTION</h4>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 active:scale-95 border border-blue-600/30 text-blue-600 text-[13px] font-bold rounded-lg shadow-sm transition-all">
                                Radiology
                            </button>
                            <button className="px-4 py-2 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 text-slate-600 text-[13px] font-bold rounded-lg hover:border-slate-300 transition-all">
                                Lab Result
                            </button>
                            <button className="px-4 py-2 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 text-slate-600 text-[13px] font-bold rounded-lg hover:border-slate-300 transition-all">
                                Prescription
                            </button>
                            <button className="px-4 py-2 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 text-slate-400 font-bold text-[13px] rounded-lg hover:text-slate-900 hover:border-slate-300 transition-all flex items-center gap-1">
                                + Add Tag
                            </button>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-blue-400 hover:bg-blue-500 active:scale-95 transition-all text-white font-bold rounded-2xl text-[15px]">
                        Complete Upload
                    </button>
                </div>

            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-50">
                <div className="relative">
                    <Camera className="w-7 h-7" />
                    <div className="absolute -top-1 -right-1.5 bg-white text-blue-600 w-4 h-4 rounded-full flex items-center justify-center">
                        <Plus className="w-3 h-3 font-bold" />
                    </div>
                </div>
            </button>
        </div>
    )
}
