import React from "react"
import { useState } from "react"
import { Mic, Volume2, Sparkles } from "lucide-react"
import axios from "axios"

export default function TextToSpeechLanding() {
    const [text, setText] = useState("")

    // Simulate sending text to backend and getting audio URL
    const handleSubmit = async () => {
        if (!text.trim()) return
               
        await axios.post('https://be-text-to-voice.onrender.com/talk', {
            message: text
        })

        setText('')
    }

    // Generate random particles for background
    const generateParticles = (count) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 10 + 5,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }))
    }

    const particles = generateParticles(15)

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-500 to-purple-700">
            {/* Animated background particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-white opacity-20"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
                    }}
                />
            ))}

            {/* Animated glow effect */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 opacity-20 blur-[100px] animate-pulse" />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md px-4">
                <div className="overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 p-8 shadow-2xl border border-white/20 animate-fadeIn">
                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <Volume2 className="h-8 w-8 text-white animate-pulse" />
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-white">Text to Speech</h1>
                        <p className="text-white/80">Type your text and hear it spoken</p>
                    </div>

                    <div className="relative">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text here..."
                            className="w-full rounded-lg border border-white/20 bg-white/10 p-4 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                        />
                        <Sparkles className="absolute right-3 top-3 h-5 w-5 text-white/40 animate-twinkle" />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className={`group relative hover:text-white w-full overflow-hidden rounded-lg bg-white py-3 font-medium text-purple-700 shadow-lg transition-all duration-300 hover:bg-opacity-90 
                            } `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {
                                <>
                                    <Mic className="h-5 w-5" />
                                    Convert to Speech
                                </>
                            }
                        </span>
                        <span className="absolute bottom-0 left-0 h-full w-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
                    </button>

                </div>

                <div className="mt-6 text-center text-white/60 text-sm animate-fadeIn">
                    Convert any text to natural-sounding speech in seconds
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}

