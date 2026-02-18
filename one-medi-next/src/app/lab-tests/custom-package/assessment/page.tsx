"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from "lucide-react";

// Types
type FormData = {
    age: string;
    gender: string;
    weight: string;
    height: string;
    bmi: string;
    smoker: boolean;
    alcohol: boolean;
    activityLevel: string;
    existingConditions: string[];
    symptoms: string[];
};

const INITIAL_DATA: FormData = {
    age: "",
    gender: "",
    weight: "",
    height: "",
    bmi: "",
    smoker: false,
    alcohol: false,
    activityLevel: "moderate",
    existingConditions: [],
    symptoms: [],
};

const STEPS = [
    { id: 1, title: "Basic Info", description: "Your vitals" },
    { id: 2, title: "Lifestyle", description: "Habits & Activity" },
    { id: 3, title: "Medical History", description: "Past & Family" },
    { id: 4, title: " symptoms", description: "Current Issues" },
];

export default function AssessmentPage() {
    const router = useRouter();
    // const supabase = createClient();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("health_assessment_draft");
        if (saved) {
            setFormData(JSON.parse(saved));
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("health_assessment_draft", JSON.stringify(formData));
    }, [formData]);

    // Auto BMI Calculation
    useEffect(() => {
        if (formData.weight && formData.height) {
            const w = parseFloat(formData.weight);
            const h = parseFloat(formData.height) / 100; // cm to m
            if (w > 0 && h > 0) {
                const bmi = (w / (h * h)).toFixed(1);
                setFormData(prev => ({ ...prev, bmi }));
            }
        }
    }, [formData.weight, formData.height]);

    const updateData = (fields: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            submitAssessment();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const submitAssessment = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Convert data types if needed
            const payload = {
                ...formData,
                age: parseInt(formData.age) || 0,
                weight: parseFloat(formData.weight) || 0,
                height: parseFloat(formData.height) || 0,
                bmi: parseFloat(formData.bmi) || 0,
            };

            // 2. Call Edge Function
            const { data, error } = await supabase.functions.invoke('health-package-engine', {
                body: { questionnaireData: payload }
            });

            if (error) throw error;

            // 3. Store result in localStorage for result page to pick up (or URL params)
            // Ideally, the edge function returns an assessment_id if it persisted data
            // For now, let's pass the result via query param or simple state store
            // But URL params might be too long. 
            // Let's store in localStorage just for the demo transition
            localStorage.setItem("health_assessment_result", JSON.stringify(data));

            router.push("/lab-tests/custom-package/result");
        } catch (err: any) {
            console.error("Assessment Error:", err);
            setError(err.message || "Failed to generate package. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {STEPS.map((step) => (
                            <div
                                key={step.id}
                                className={`flex flex-col items-center flex-1 relative ${step.id <= currentStep ? "text-teal-600" : "text-gray-400"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step.id <= currentStep ? "bg-teal-600 text-white" : "bg-gray-200"
                                    }`}>
                                    {step.id < currentStep ? <CheckCircle className="w-6 h-6" /> : step.id}
                                </div>
                                <span className="text-xs font-medium hidden sm:block">{step.title}</span>

                                {/* Connector Line */}
                                {step.id < STEPS.length && (
                                    <div className={`absolute top-5 left-1/2 w-full h-1 -z-10 ${step.id < currentStep ? "bg-teal-600" : "bg-gray-200"
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{STEPS[currentStep - 1].title}</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {currentStep === 1 && (
                            <StepBasic
                                data={formData}
                                update={updateData}
                            />
                        )}
                        {currentStep === 2 && (
                            <StepLifestyle
                                data={formData}
                                update={updateData}
                            />
                        )}
                        {currentStep === 3 && (
                            <StepMedical
                                data={formData}
                                update={updateData}
                            />
                        )}
                        {currentStep === 4 && (
                            <StepSymptoms
                                data={formData}
                                update={updateData}
                            />
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1 || loading}
                        className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${currentStep === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="px-8 py-3 bg-teal-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-teal-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                {currentStep === STEPS.length ? "Generate Package" : "Next Step"}
                                {currentStep < STEPS.length && <ChevronRight className="w-5 h-5" />}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Sub-components for Steps
function StepBasic({ data, update }: { data: FormData, update: (f: Partial<FormData>) => void }) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                    type="number"
                    value={data.age}
                    onChange={(e) => update({ age: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="Years"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                    value={data.gender}
                    onChange={(e) => update({ gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                    type="number"
                    value={data.height}
                    onChange={(e) => update({ height: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. 175"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                    type="number"
                    value={data.weight}
                    onChange={(e) => update({ weight: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. 70"
                />
            </div>
            {data.bmi && (
                <div className="md:col-span-2 bg-teal-50 p-4 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-teal-800">Your Calculated BMI</span>
                    <span className="text-2xl font-bold text-teal-600">{data.bmi}</span>
                </div>
            )}
        </div>
    );
}

function StepLifestyle({ data, update }: { data: FormData, update: (f: Partial<FormData>) => void }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-xl hover:border-teal-500 cursor-pointer transition-all"
                onClick={() => update({ smoker: !data.smoker })}>
                <div>
                    <h3 className="font-medium text-gray-900">Do you smoke?</h3>
                    <p className="text-sm text-gray-500">Includes occasional smoking</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.smoker ? "bg-teal-600 border-teal-600" : "border-gray-300"}`}>
                    {data.smoker && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl hover:border-teal-500 cursor-pointer transition-all"
                onClick={() => update({ alcohol: !data.alcohol })}>
                <div>
                    <h3 className="font-medium text-gray-900">Do you consume alcohol?</h3>
                    <p className="text-sm text-gray-500">More than once a week</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.alcohol ? "bg-teal-600 border-teal-600" : "border-gray-300"}`}>
                    {data.alcohol && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Physical Activity Level</label>
                <div className="grid grid-cols-3 gap-4">
                    {['sedentary', 'moderate', 'active'].map((level) => (
                        <button
                            key={level}
                            onClick={() => update({ activityLevel: level })}
                            className={`p-3 rounded-lg border-2 font-medium capitalize transition-all ${data.activityLevel === level
                                ? "border-teal-600 bg-teal-50 text-teal-700"
                                : "border-gray-200 hover:border-teal-200"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StepMedical({ data, update }: { data: FormData, update: (f: Partial<FormData>) => void }) {
    const conditions = ["Diabetes", "Hypertension", "Thyroid", "Heart Disease", "High Cholesterol"];

    const toggleCondition = (cond: string) => {
        if (data.existingConditions.includes(cond)) {
            update({ existingConditions: data.existingConditions.filter(c => c !== cond) });
        } else {
            update({ existingConditions: [...data.existingConditions, cond] });
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Do you have any existing conditions?</h3>
            <div className="grid grid-cols-2 gap-4">
                {conditions.map((cond) => (
                    <div
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${data.existingConditions.includes(cond)
                            ? "border-teal-600 bg-teal-50"
                            : "border-gray-200 hover:border-teal-200"
                            }`}
                    >
                        <span className={data.existingConditions.includes(cond) ? "font-medium text-teal-900" : "text-gray-700"}>
                            {cond}
                        </span>
                        {data.existingConditions.includes(cond) && <CheckCircle className="w-5 h-5 text-teal-600" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

function StepSymptoms({ data, update }: { data: FormData, update: (f: Partial<FormData>) => void }) {
    const allSymptoms = ["Fatigue", "Chest Pain", "Dizziness", "Weight Loss", "Hair Fall", "Joint Pain", "Acne", "Indigestion"];

    const toggleSymptom = (sym: string) => {
        if (data.symptoms.includes(sym)) {
            update({ symptoms: data.symptoms.filter(s => s !== sym) });
        } else {
            update({ symptoms: [...data.symptoms, sym] });
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Are you experiencing any symptoms?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allSymptoms.map((sym) => (
                    <div
                        key={sym}
                        onClick={() => toggleSymptom(sym)}
                        className={`p-3 rounded-lg border text-sm text-center cursor-pointer transition-all ${data.symptoms.includes(sym)
                            ? "border-teal-600 bg-teal-600 text-white font-medium shadow-md"
                            : "border-gray-200 hover:border-teal-300"
                            }`}
                    >
                        {sym}
                    </div>
                ))}
            </div>
        </div>
    );
}
