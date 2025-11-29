"use client";

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-6 mb-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-zinc-400">
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
        <p className="text-zinc-400 mt-1">
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
    </footer>
  );
}
