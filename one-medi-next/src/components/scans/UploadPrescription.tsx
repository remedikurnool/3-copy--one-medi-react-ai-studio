import React from 'react';

export default function UploadPrescription() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-blue-900/20 my-8">
            <div className="absolute right-0 top-0 size-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-black mb-1">Have a Prescription?</h3>
                    <p className="text-blue-100 text-xs font-medium max-w-[200px] leading-relaxed">
                        Upload your doctor's prescription and we will find the best lab for you.
                    </p>
                </div>
                <button className="size-12 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">upload_file</span>
                </button>
            </div>
        </section>
    );
}
