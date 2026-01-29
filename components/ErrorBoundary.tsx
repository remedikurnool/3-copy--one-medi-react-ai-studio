import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="size-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-red-500">error</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                        We apologize for the inconvenience. Please try again or contact support if the problem persists.
                    </p>
                    {this.state.error && (
                        <details className="mb-6 max-w-md w-full">
                            <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                                Technical details
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-left overflow-auto text-red-600">
                                {this.state.error.message}
                            </pre>
                        </details>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={this.handleRetry}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">refresh</span>
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Functional wrapper for easier use
export function withErrorBoundary<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    fallback?: ReactNode
) {
    return function WithErrorBoundary(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <WrappedComponent {...props} />
            </ErrorBoundary>
        );
    };
}
