"use client";

import { useState } from "react";

const EMOJI_CATEGORIES = {
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲"],
  "Gestures": ["👍", "👎", "👏", "🙌", "🤝", "🙏", "✌️", "🤞", "👋", "🤙", "💪", "🦾", "✋", "🖐️", "✊", "👊", "🤛", "🤜"],
  "Hearts": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
  "Animals": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅"],
  "Food": ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬"],
  "Objects": ["⌚", "📱", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "💽", "💾", "💿", "📀", "🎥", "📷", "📸", "📹", "📼", "🔍", "🔎", "🕯️", "💡", "🔦"],
  "Symbols": ["✅", "❌", "❓", "❗", "⭐", "🌟", "✨", "💫", "🔥", "💥", "💢", "💦", "💨", "🎉", "🎊", "🎁", "🏆", "🥇", "🥈", "🥉", "🎖️"],
  "Flags": ["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇰🇷", "🇨🇳", "🇫🇷", "🇩🇪", "🇮🇹", "🇪🇸", "🇧🇷", "🇷🇺", "🇮🇳", "🇲🇽", "🇳🇱", "🇸🇪", "🇳🇴", "🇩🇰", "🇫🇮", "🇵🇱"]
};

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof EMOJI_CATEGORIES>("Smileys");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  const copyEmoji = async (emoji: string) => {
    await navigator.clipboard.writeText(emoji);
    setSelectedEmoji(emoji);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    setRecentEmojis(prev => {
      const filtered = prev.filter(e => e !== emoji);
      return [emoji, ...filtered].slice(0, 20);
    });
  };

  const getAllEmojis = () => {
    return Object.values(EMOJI_CATEGORIES).flat();
  };

  const filteredEmojis = searchQuery
    ? getAllEmojis()
    : EMOJI_CATEGORIES[activeCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-center text-white mb-2">
            Emoji Picker 😊
          </h1>
          <p className="text-center text-yellow-100 mb-6">
            Click any emoji to copy to clipboard
          </p>

          <div className="bg-white/10 rounded-2xl p-6 mb-6 text-center">
            <div className="text-8xl mb-2">{selectedEmoji || "👆"}</div>
            <p className="text-white/80">
              {copied ? "✅ Copied!" : "Click an emoji to copy"}
            </p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emojis..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(EMOJI_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat as keyof typeof EMOJI_CATEGORIES);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat && !searchQuery
                    ? "bg-white text-orange-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {recentEmojis.length > 0 && (
            <div className="mb-4">
              <h3 className="text-white/80 text-sm mb-2">Recently Used:</h3>
              <div className="flex flex-wrap gap-1">
                {recentEmojis.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => copyEmoji(emoji)}
                    className="text-2xl p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/5 rounded-2xl p-4">
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-1">
              {filteredEmojis.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => copyEmoji(emoji)}
                  className="text-3xl p-2 hover:bg-white/20 rounded-lg transition transform hover:scale-125 active:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-yellow-100 text-sm">
          <p>Free Emoji Picker - Copy emojis instantly</p>
          <p className="mt-1">© 2026 Emoji Picker Tool</p>
        </div>
      </div>
    </div>
  );
}
