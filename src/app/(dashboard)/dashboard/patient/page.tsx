import { BadgeCheck, FileText, Users, Activity, HeartPulse, Link2, ShieldAlert, ArrowUpRight, ArrowRight, ShieldCheck, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { PatientRecordsChart } from "@/components/charts/patient-records-chart"
import { Button } from "@/components/ui/button"

export default function PatientDashboard() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-50 min-h-[calc(100vh-4rem)] lg:max-w-7xl mx-auto">

            {/* Standard Dashboard Header */}
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-primary pl-4">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden md:flex bg-white">
                        <FileText className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                    <Button className="shadow-sm">
                        <Activity className="mr-2 h-4 w-4" /> Upload Record
                    </Button>
                </div>
            </div>

            {/* Top Stats Overview (Clean Row) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm border-slate-200/60 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Records</CardTitle>
                        <FileText className="h-4 w-4 text-blue-500 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">42</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <span className="text-emerald-500 flex items-center mr-1 font-medium"><ArrowUpRight className="h-3 w-3" /> +10.5%</span> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200/60 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Providers</CardTitle>
                        <Users className="h-4 w-4 text-indigo-500 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">3</div>
                        <p className="text-xs text-muted-foreground mt-1 text-slate-500 font-medium">
                            Currently authorized to view
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200/60 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Fully Verified</CardTitle>
                        <BadgeCheck className="h-4 w-4 text-emerald-500 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">100%</div>
                        <p className="text-xs text-muted-foreground mt-1 text-slate-500 font-medium">
                            Secured on Polygon blockchain
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200/60 bg-white border-b-2 border-b-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Health Score</CardTitle>
                        <HeartPulse className="h-4 w-4 text-rose-500 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 text-emerald-600">85 / 100</div>
                        <p className="text-xs text-muted-foreground mt-1 text-slate-500 font-medium">
                            Data Complete & Intact
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Details Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Chart Area - 4 columns */}
                <Card className="col-span-4 shadow-sm border-slate-200/60 flex flex-col bg-white">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>
                            Upload history of your medical documents over the year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 flex-1 min-h-[300px]">
                        <PatientRecordsChart />
                    </CardContent>
                </Card>

                {/* Active Contracts Table - 3 columns */}
                <Card className="col-span-3 shadow-sm border-slate-200/60 flex flex-col bg-white">
                    <CardHeader>
                        <CardTitle>Active Smart Contracts</CardTitle>
                        <CardDescription>
                            Manage the providers who have access to your health data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 px-4">
                        <div className="space-y-4">
                            {[
                                { dr: "Dr. Sarah Adams", role: "Primary Care", status: "Active", dot: "bg-emerald-500" },
                                { dr: "Metro General Hospital", role: "Emergency Services", status: "Active", dot: "bg-emerald-500" },
                                { dr: "Dr. Michael Chen", role: "Cardiologist", status: "Expiring", dot: "bg-amber-500" },
                            ].map((contract, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="h-10 w-10 flex border border-slate-200 rounded-full items-center justify-center bg-white shadow-sm">
                                                <Users className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${contract.dot}`}></span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold leading-none text-slate-900">{contract.dr}</p>
                                            <p className="text-xs text-muted-foreground font-medium">{contract.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                                            {contract.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-slate-100 mt-2">
                        <Button variant="ghost" className="w-full text-sm text-primary font-semibold hover:bg-primary/5">
                            Manage All Access <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Bottom Section - Timeline */}
            <Card className="shadow-sm border-slate-200/60 bg-white">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        A complete audit trail of all actions taking place on your decentralized records.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {[
                            { time: '2h ago', title: 'Data Accessed', desc: 'Dr. Smith accessed Blood Test Results via Contract #241', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
                            { time: '1d ago', title: 'File Uploaded', desc: 'New MRI Scan encrypted and pinned to IPFS', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                            { time: '3d ago', title: 'Access Revoked', desc: 'Read access successfully stripped from Dr. Adams', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center border ${item.bg} ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col flex-1 pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">{item.title}</p>
                                        <p className="text-xs font-medium text-slate-400">{item.time}</p>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
