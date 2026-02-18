"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, AlertTriangle, Shield, Info } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type RiskSummary = {
    cardiac: number;
    metabolic: number;
    liver: number;
    hormonal: number;
};

type TestItem = {
    id: string;
    name: string;
    price: number;
};

type Package = {
    tier: string;
    name: string;
    tests: TestItem[];
    price: number;
    discount: number;
    final_price: number;
};

type AssessmentResult = {
    risk_summary: RiskSummary;
    risk_level: string;
    packages: Package[];
};

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const { addToCart } = useCartStore();

    useEffect(() => {
        const saved = localStorage.getItem("health_assessment_result");
        if (saved) {
            setResult(JSON.parse(saved));
        } else {
            router.push("/lab-tests/custom-package/assessment");
        }
    }, [router]);

    const handleBookNow = (pkg: Package) => {
        // Calculate discount ratio to apply to individual items
        const ratio = pkg.price > 0 ? (pkg.final_price / pkg.price) : 1;

        pkg.tests.forEach((test) => {
            const discountedPrice = Math.round(test.price * ratio);

            addToCart({
                id: test.id,
                type: 'lab', // Using 'lab' as it seems to be the convention in cartStore (or 'lab_test') - checking store it says 'lab' | 'lab_test'. using 'lab_test' to be safe? Store interface says 'lab' | 'lab_test'.
                name: test.name,
                price: discountedPrice,
                mrp: test.price,
                qty: 1
            });
        });

        // Add a small toast or just redirect
        router.push('/cart');
    };

    if (!result) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header with Risk Score */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900">Your Health Report</h1>
                        <div className={`px-4 py-1 rounded-full text-sm font-bold border ${result.risk_level === "HIGH" ? "bg-red-50 text-red-700 border-red-200" :
                            result.risk_level === "MODERATE" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                "bg-green-50 text-green-700 border-green-200"
                            }`}>
                            {result.risk_level} RISK PROFILE
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Risk Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <RiskCard title="Cardiac" score={result.risk_summary.cardiac} />
                    <RiskCard title="Metabolic" score={result.risk_summary.metabolic} />
                    <RiskCard title="Liver" score={result.risk_summary.liver} />
                    <RiskCard title="Hormonal" score={result.risk_summary.hormonal} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recommended Packages</h2>
                <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                    Based on your risk profile, we have curated these 3 packages for you. Each includes the essential tests you need.
                </p>

                {/* Package Tiers */}
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {result.packages.map((pkg, idx) => (
                        <div
                            key={pkg.tier}
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg border transition-transform hover:-translate-y-1 ${pkg.tier === "Advanced" ? "border-teal-500 ring-2 ring-teal-500 ring-offset-2 relative md:-mt-4 z-10" : "border-gray-200"
                                }`}
                        >
                            {pkg.tier === "Advanced" && (
                                <div className="bg-teal-500 text-white text-xs font-bold text-center py-1 uppercase tracking-wide">
                                    Most Recommended
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl font-bold text-gray-900">₹{pkg.final_price}</span>
                                    {pkg.discount > 0 && (
                                        <span className="text-sm text-gray-500 line-through">₹{pkg.price}</span>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8">
                                    {pkg.tests.map((test) => (
                                        <div key={test.id} className="flex items-start gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                                            <span>{test.name}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-start gap-2 text-sm text-gray-500 italic mt-2">
                                        <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span>+ Doctor Consultation included</span>
                                    </div>
                                </div>

                                <button
                                    className={`w-full py-3 rounded-xl font-bold transition-colors ${pkg.tier === "Advanced"
                                        ? "bg-teal-600 text-white hover:bg-teal-700"
                                        : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                                        }`}
                                    onClick={() => handleBookNow(pkg)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function RiskCard({ title, score }: { title: string, score: number }) {
    const getRiskColor = (s: number) => {
        if (s > 70) return "text-red-600 bg-red-50 border-red-100";
        if (s > 30) return "text-yellow-600 bg-yellow-50 border-yellow-100";
        return "text-green-600 bg-green-50 border-green-100";
    };

    const colorClass = getRiskColor(score);

    return (
        <div className={`p-4 rounded-xl border ${colorClass} text-center`}>
            <h4 className="font-medium mb-1 opacity-80">{title}</h4>
            <div className="text-2xl font-bold flex items-center justify-center gap-1">
                {score}%
                {score > 70 && <AlertTriangle className="w-4 h-4" />}
            </div>
            <div className="text-xs mt-1 font-medium">
                {score > 70 ? "High Risk" : score > 30 ? "Moderate" : "Low Risk"}
            </div>
        </div>
    );
}
