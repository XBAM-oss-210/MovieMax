
'use client'
export default function Loading() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-zinc-950">

            <div className="flex flex-col items-center gap-8">

                {/* Logo */}
                <div className="text-3xl font-extrabold tracking-tight text-white">
                    Movie<span className="text-red-600">MAX</span>
                </div>

                {/* Animation */}
                <div className="flex items-center gap-1.5">
                    <span className="h-6 w-1.5 animate-[loading_0.8s_ease-in-out_infinite] rounded-full bg-red-600" />

                    <span className="h-9 w-1.5 animate-[loading_0.8s_ease-in-out_0.15s_infinite] rounded-full bg-red-600" />

                    <span className="h-6 w-1.5 animate-[loading_0.8s_ease-in-out_0.3s_infinite] rounded-full bg-red-600" />
                </div>

            </div>

            <style jsx>{`
                @keyframes loading {
                    0%, 100% {
                        transform: scaleY(0.5);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scaleY(1);
                        opacity: 1;
                    }
                }
            `}</style>

        </div>
    );
}
