'use client';

import {
    Plus, List, Calendar as CalendarIcon,
    MoreVertical, Info, FileText, ChevronDown, CheckCircle2, Clock,
    MapPin, User, Stethoscope
} from "lucide-react"

export default function AppointmentsPage() {
    return (
        <div className="min-h-full bg-slate-50/50 pb-20">
            <div className="flex-1 p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500 mt-2 space-y-10">

                {/* Header Section */}
                <div className="space-y-6">
                    <h1 className="text-xl font-bold text-blue-600 tracking-tight">Appointments</h1>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15]">
                                Manage your clinical <br />
                                <span className="text-blue-600">care journey.</span>
                            </h2>
                            <p className="text-[15px] font-medium text-slate-500 mt-4 leading-relaxed max-w-xl">
                                View upcoming visits, access digital consultation notes, and book new appointments with your specialist team.
                            </p>
                        </div>
                        <div className="pt-2">
                            <button className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-bold rounded-full shadow-md shadow-blue-600/20 text-[15px]">
                                <Plus className="w-5 h-5" />
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">

                    {/* Left Column (Forms & Info) */}
                    <div className="space-y-6">

                        {/* Quick Booking Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Quick Booking</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Select Specialist */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">Select Specialist</label>
                                    <div className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all rounded-2xl p-3 border border-slate-100 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                <img src="https://i.pravatar.cc/150?img=47" alt="Dr. Sarah Jenkins" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] font-bold text-slate-900">Dr. Sarah Jenkins</h4>
                                                <p className="text-[12px] font-medium text-slate-500">Cardiologist • MD</p>
                                            </div>
                                        </div>
                                        <ChevronDown className="w-5 h-5 text-slate-400 mr-1" />
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">Preferred Date</label>
                                        <div className="flex flex-col justify-center bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer rounded-2xl p-4 border border-slate-100 min-h-[5.5rem]">
                                            <div className="flex items-start gap-2">
                                                <CalendarIcon className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                                <span className="text-[14px] font-bold text-slate-900 leading-tight">Oct 24,<br />2023</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">Time Slot</label>
                                        <div className="flex flex-col justify-center bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer rounded-2xl p-4 border border-slate-100 min-h-[5.5rem]">
                                            <div className="flex items-start gap-2">
                                                <Clock className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                                <span className="text-[14px] font-bold text-slate-900 leading-tight">09:30<br />AM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Reason for Visit */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">Reason for Visit</label>
                                    <textarea
                                        className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        placeholder="Describe your symptoms or request..."
                                    ></textarea>
                                </div>

                                <button className="w-full py-4 bg-slate-200/80 hover:bg-slate-200 active:scale-95 transition-all text-blue-700 font-bold text-[15px] rounded-2xl">
                                    Review Request
                                </button>
                            </div>
                        </div>

                        {/* Important Note Card */}
                        <div className="bg-[#cc5500] hover:scale-[1.02] transition-transform cursor-default rounded-[2rem] p-8 relative overflow-hidden text-white shadow-md">
                            {/* Background asterisk pattern */}
                            <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Info className="w-5 h-5 opacity-90" />
                                    <h3 className="text-[15px] font-bold">Important Note</h3>
                                </div>
                                <p className="text-[14px] leading-relaxed font-medium opacity-90">
                                    For medical emergencies, please call 911 immediately or visit the nearest ER. Digital bookings are for routine consultations only.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Appointments List) */}
                    <div className="space-y-6">

                        {/* Top Bar Toggles & Legend */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50">
                                <button className="flex items-center gap-2 px-5 py-2 bg-white hover:bg-slate-50 active:scale-95 transition-all text-blue-600 font-bold text-[13px] rounded-full shadow-sm">
                                    <List className="w-4 h-4" /> List View
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 active:scale-95 transition-all font-bold text-[13px] rounded-full">
                                    <CalendarIcon className="w-4 h-4" /> Calendar
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-[12px] font-bold text-slate-500 hidden sm:flex">
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Confirmed</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-600"></div> Pending</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Card 1: Confirmed */}
                            <div className="bg-white rounded-[2rem] p-4 flex flex-col sm:flex-row gap-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                {/* Date Block */}
                                <div className="bg-slate-50 rounded-[1.5rem] w-full sm:w-32 py-5 flex flex-col items-center justify-center shrink-0 border border-slate-100/50">
                                    <span className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">Oct</span>
                                    <span className="text-[2rem] font-black text-slate-900 leading-none my-1">24</span>
                                    <span className="text-[12px] font-bold text-blue-600">09:30 AM</span>
                                </div>

                                {/* Content Block */}
                                <div className="flex-1 py-2 flex flex-col justify-center relative pr-4">
                                    <button className="absolute top-2 right-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full p-1 active:scale-95 transition-all hidden sm:block">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold tracking-wider rounded-full uppercase">Confirmed</span>
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">Cardiovascular Screening</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium cursor-pointer hover:text-slate-900 transition-colors">
                                            <Stethoscope className="w-4 h-4 text-slate-400" /> Dr. Sarah Jenkins
                                        </div>
                                        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                                            <MapPin className="w-4 h-4 text-blue-500" /> North Wing, Suite 402
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Block */}
                                <div className="flex sm:flex-col justify-center gap-2.5 sm:w-28 shrink-0">
                                    <button className="flex-1 sm:flex-none py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-slate-800 font-bold text-[13px] rounded-xl text-center">
                                        Details
                                    </button>
                                    <button className="flex-1 sm:flex-none py-2.5 px-4 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all text-blue-700 font-bold text-[13px] rounded-xl text-center">
                                        Check-in
                                    </button>
                                </div>
                            </div>

                            {/* Card 2: Pending */}
                            <div className="bg-white rounded-[2rem] p-4 flex flex-col sm:flex-row gap-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="bg-slate-50 rounded-[1.5rem] w-full sm:w-32 py-5 flex flex-col items-center justify-center shrink-0 border border-slate-100/50">
                                    <span className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">Nov</span>
                                    <span className="text-[2rem] font-black text-slate-900 leading-none my-1">02</span>
                                    <span className="text-[12px] font-bold text-[#b56b3e]">11:15 AM</span>
                                </div>
                                <div className="flex-1 py-2 flex flex-col justify-center relative pr-4">
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-extrabold tracking-wider rounded-full uppercase">Awaiting Confirmation</span>
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-900 mb-3 hover:text-orange-700 transition-colors cursor-pointer">Dermatology Consult</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium cursor-pointer hover:text-slate-900 transition-colors">
                                            <Stethoscope className="w-4 h-4 text-[#b56b3e]" /> Dr. Michael Chen
                                        </div>
                                        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                                            <MapPin className="w-4 h-4 text-[#b56b3e]" /> East Medical Plaza
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col justify-center gap-2.5 sm:w-28 shrink-0">
                                    <button className="flex-1 sm:flex-none py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-slate-700 font-bold text-[13px] rounded-xl text-center">
                                        Reschedule
                                    </button>
                                    <button className="flex-1 sm:flex-none py-2.5 px-4 bg-red-50 hover:bg-red-100 active:scale-95 transition-all text-red-600 font-bold text-[13px] rounded-xl text-center">
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            {/* Card 3: Completed */}
                            <div className="bg-white/60 rounded-[2rem] p-4 flex flex-col sm:flex-row gap-6 shadow-sm border border-slate-100 opacity-75 hover:opacity-100 hover:shadow-md transition-all">
                                <div className="bg-slate-100/50 rounded-[1.5rem] w-full sm:w-32 py-5 flex flex-col items-center justify-center shrink-0 border border-slate-200/50">
                                    <span className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">Sep</span>
                                    <span className="text-[2rem] font-black text-slate-400 leading-none my-1">15</span>
                                    <span className="text-[12px] font-bold text-slate-400">02:00 PM</span>
                                </div>
                                <div className="flex-1 py-2 flex flex-col justify-center relative pr-4">
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-extrabold tracking-wider rounded-full uppercase">Completed</span>
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-400 mb-3 hover:text-slate-900 transition-colors cursor-pointer">Annual Physical Wellness</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-[13px] text-slate-400 font-medium">
                                            Dr. Sarah Jenkins <a href="#" className="ml-2 underline text-slate-400 hover:text-blue-600 transition-colors active:scale-95 inline-block">View Notes</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col justify-center gap-2.5 sm:w-28 shrink-0">
                                    <button className="flex-1 sm:flex-none py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-slate-500 hover:text-slate-800 font-bold text-[13px] rounded-xl text-center">
                                        Re-book
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {/* Stat 1 */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center min-h-[140px] hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                        <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-4">Upcoming Visits</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-[2.5rem] font-black text-blue-600 leading-none">02</span>
                            <span className="text-[15px] font-medium text-slate-500">scheduled</span>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center min-h-[140px] hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                        <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-4">Unread Results</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-[2.5rem] font-black text-[#cc5500] leading-none">01</span>
                            <span className="text-[15px] font-medium text-slate-500">available</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center min-h-[140px] hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group">
                        <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-4">Care Team</span>
                        <div className="flex items-center pt-2">
                            <div className="flex -space-x-4">
                                <img src="https://i.pravatar.cc/150?img=47" className="w-14 h-14 rounded-full border-4 border-white object-cover bg-slate-100 z-30 group-hover:scale-110 transition-transform" alt="Doctor" />
                                <img src="https://i.pravatar.cc/150?img=11" className="w-14 h-14 rounded-full border-4 border-white object-cover bg-slate-100 z-20 group-hover:scale-110 transition-transform" alt="Doctor" />
                                <img src="https://i.pravatar.cc/150?img=68" className="w-14 h-14 rounded-full border-4 border-white object-cover bg-slate-100 z-10 group-hover:scale-110 transition-transform" alt="Doctor" />
                                <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-100 z-0 flex items-center justify-center text-[14px] font-bold text-slate-500 shadow-sm group-hover:bg-slate-200 transition-colors">
                                    +2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
