# VisionAI - Text to Image Generator 🎨✨

A beautiful, modern text-to-image AI generation application built with React, Vite, and the official Hugging Face Javascript SDK.

## 🚀 Live Demo
**[Launch Application: ai-image-model-phi.vercel.app](https://ai-image-model-phi.vercel.app/)**

## 🌟 Overview
This project uses the fast and high-quality `black-forest-labs/FLUX.1-schnell` model hosted on the Hugging Face Serverless Inference Router to generate stunning visuals dynamically from text prompts. It is wrapped in a premium, responsive glassmorphic UI.

### Features
- ⚡ **Lightning Fast Image Generation** using FLUX.1.
- 🌈 **Premium Glassmorphism UI** with smooth CSS animations.
- 📦 **Hugging Face JS SDK** for robust API routing without CORS issues.
- ☁️ **Vercel Edge Network** automatic deployments.

## 🛠️ Local Development

1. **Clone & Install**
   ```bash
   git clone https://github.com/akhileshsude/text-to-image-ai-model.git
   cd AIimagemodel
   npm install
   ```

2. **Add Environment Variables**
   Create a `.env` file in the root directory and add your Hugging Face token:
   ```env
   VITE_HF_TOKEN=hf_your_token_here
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

---
*Built with React & Vite.*
