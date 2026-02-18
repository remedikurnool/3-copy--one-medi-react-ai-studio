import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Cpu } from "lucide-react";

export default function CustomPackageLandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-purple-700 pt-16 pb-32 text-white">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
                        AI-Powered Health Analysis
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        ONE MEDI <br />
                        <span className="text-teal-200">Smart Health Package Builder™</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-teal-50 max-w-2xl mx-auto mb-10">
                        Build a personalized health checkup package based on your unique risk profile, lifestyle, and medical history.
                    </p>

                    <Link
                        href="/lab-tests/custom-package/assessment"
                        className="inline-flex items-center gap-2 bg-white text-teal-700 hover:bg-teal-50 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                        Start Your Assessment
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <p className="mt-4 text-sm text-teal-100/80">
                        Takes less than 2 minutes • 100% Private & Secure
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Activity className="w-8 h-8 text-teal-500" />}
                        title="Risk Analysis"
                        description="Our engine analyzes your vitals and lifestyle to detect potential health risks early."
                    />
                    <FeatureCard
                        icon={<Cpu className="w-8 h-8 text-purple-500" />}
                        title="AI-Driven Logic"
                        description="Smart algorithms recommend the exact tests you need, filtering out unnecessary ones."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
                        title="Doctor Verified"
                        description="All recommendations are based on clinical guidelines and verified by top doctors."
                    />
                </div>
            </div>

            {/* How It Works */}
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                    <Step number="1" title="Answer Questions" description="Tell us about your health & lifestyle" />
                    <Step number="2" title="Get Risk Score" description="View your personalized risk profile" />
                    <Step number="3" title="Custom Package" description="Book your tailored lab package" />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center bg-gray-50 p-4 z-10">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg ring-4 ring-white">
                {number}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 max-w-[150px]">{description}</p>
        </div>
    );
}
