import { Navigate } from "react-router-dom"
import { useUser } from "../contexts/UserContextProvider"
import { useEffect, useState } from "react"

const messages = [
    "Waking up the server…",
    "This may take up to 30 seconds on first load…",
    "Stretching after a long nap…",
    "Almost there, hang tight…",
    "Good things take a moment…",
]

function ProtectedRoute({ children }) {
    const { token, loading } = useUser()
    const [msgIndex, setMsgIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [dots, setDots] = useState("")

    useEffect(() => {
        if (!loading) return

        const msgTimer = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % messages.length)
        }, 4000)

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 92) return prev
                const increment = prev < 40 ? 3 : prev < 70 ? 1.5 : 0.5
                return Math.min(prev + increment, 92)
            })
        }, 400)

        const dotsTimer = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? "" : prev + "."))
        }, 500)

        return () => {
            clearInterval(msgTimer)
            clearInterval(progressTimer)
            clearInterval(dotsTimer)
        }
    }, [loading])

    useEffect(() => {
        if (!loading) setProgress(100)
    }, [loading])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0e13] flex flex-col items-center justify-center gap-8 p-8">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        className="w-16 h-16 animate-spin"
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#1e2433"
                            strokeWidth="4"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="primary"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="60 116"
                        />
                    </svg>
                </div>

                {/* Text */}
                <div className="text-center">
                    <p className="text-white text-base font-medium mb-2 min-h-6">
                        {messages[msgIndex]}
                        {dots}
                    </p>

                    <p className="text-gray-500 text-xs">
                        Free tier server · Cold start
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-[280px] h-[3px] bg-[#1e2433] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#00c896] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        )
    }

    if (token) return children

    return <Navigate to="/login" />
}

export default ProtectedRoute