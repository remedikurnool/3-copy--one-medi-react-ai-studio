'use client';

import React from 'react';

export default function ChatPage() {
    return (
        <div className="flex flex-col h-screen bg-bg-light dark:bg-bg-dark pb-20">
            <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 shadow-sm sticky top-0 z-50">
                <div className="relative">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">support_agent</span>
                    </div>
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">Customer Support</h1>
                    <p className="text-xs text-green-600 font-bold">Online • Typically replies in 5m</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                <div className="text-center text-xs text-gray-400 my-2">Today, 10:23 AM</div>

                {/* Bot Message */}
                <div className="flex gap-3 max-w-[85%]">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-slate-800 dark:text-slate-200">Hi Siva! Welcome to One Medi Support. How can I help you today?</p>
                    </div>
                </div>

                {/* Options */}
                <div className="flex flex-wrap gap-2 ml-11">
                    <button className="px-3 py-1.5 bg-white border border-primary/20 text-primary text-xs font-bold rounded-full hover:bg-primary/5">Where is my order?</button>
                    <button className="px-3 py-1.5 bg-white border border-primary/20 text-primary text-xs font-bold rounded-full hover:bg-primary/5">Cancel booking</button>
                    <button className="px-3 py-1.5 bg-white border border-primary/20 text-primary text-xs font-bold rounded-full hover:bg-primary/5">Talk to agent</button>
                </div>

                {/* User Message */}
                <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-md">
                        <p className="text-sm">Where is my medicine order #OD4432?</p>
                    </div>
                </div>

                {/* Agent Message */}
                <div className="flex gap-3 max-w-[85%]">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1">
                        <span className="material-symbols-outlined text-sm">support_agent</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-slate-800 dark:text-slate-200">Checking that for you... It looks like your order is out for delivery and should reach you by 2 PM today.</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 fixed bottom-0 left-0 right-0 z-40">
                <div className="max-w-md mx-auto w-full">
                    <div className="flex gap-2 items-center bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full pr-1.5">
                        <button className="size-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                        <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 text-slate-900 dark:text-white focus:outline-none" placeholder="Type a message..." />
                        <button className="size-9 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-dark transition-colors">
                            <span className="material-symbols-outlined text-[18px] translate-x-0.5">send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
