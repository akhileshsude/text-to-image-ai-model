import React, { useState } from "react";
import { Sparkles, Image as ImageIcon, Loader2, Download, AlertCircle } from "lucide-react";
import { HfInference } from "@huggingface/inference";

// Access token from environment variable
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError("");
    setImageUrl(null);

    try {
      const blob = await hf.textToImage({
        model: "black-forest-labs/FLUX.1-schnell",
        inputs: prompt
      });

      const objUrl = URL.createObjectURL(blob);
      setImageUrl(objUrl);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while generating the image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `generated-image-${Date.now()}.jpg`;
      link.click();
    }
  };

  return (
    <div className="app-wrapper">
      {/* Background Decorative Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <main className="container">
        <header className="header">
          <div className="logo">
            <Sparkles className="icon-sparkle" size={28} />
            <h1>Vision<span>AI</span></h1>
          </div>
          <p className="subtitle">Transform your imagination into stunning visuals instantly.</p>
        </header>

        <section className="glass-panel main-panel">
          <form className="prompt-form" onSubmit={handleGenerate}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Describe what you want to see... (e.g., A cybernetic tiger glowing in neon blue)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                className="prompt-input"
                autoFocus
              />
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="generate-btn"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Generating</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <div className={`image-display-area ${imageUrl ? 'has-image' : ''} ${isGenerating ? 'is-loading' : ''}`}>
            {!imageUrl && !isGenerating && (
              <div className="empty-state">
                <ImageIcon size={48} className="empty-icon" />
                <p>Your creation will appear here</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Synthesizing pixels...</p>
              </div>
            )}
            
            {imageUrl && !isGenerating && (
              <div className="result-container animate-fade-in">
                <img src={imageUrl} alt={prompt} className="generated-image" />
                <div className="image-overlay">
                  <button className="action-btn" onClick={handleDownload} title="Download Image">
                    <Download size={20} />
                    <span>Save Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="footer">
          <p>Powered by Hugging Face Inference API</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
