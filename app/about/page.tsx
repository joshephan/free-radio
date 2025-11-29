export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-8">About</h1>

        <div className="bg-zinc-800/50 rounded-xl p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Free Radio</h2>
          <p className="text-zinc-400 mb-6">
            A simple and free internet radio streaming app. Listen to radio stations from around the world.
          </p>

          <div className="border-t border-zinc-700 pt-6 mt-6">
            <p className="text-zinc-300 mb-2">
              Created by{" "}
              <a
                href="https://www.youtube.com/@hoony_han"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sanghoon Han
              </a>
            </p>
            <p className="text-zinc-300">
              Please visit{" "}
              <a
                href="https://parallax.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                my service
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
