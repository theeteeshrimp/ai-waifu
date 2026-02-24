# 💖 AI Waifu (Ollama + Docker Edition)

> *Your local AI waifu powered by Ollama and your RTX 3070!*

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Ollama](https://img.shields.io/badge/Ollama-Llama3.2-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)

## ✨ What's New?

The AI Waifu has evolved into a **self-hosted, local AI companion**!

- 🧠 **Ollama Backend** - Real LLM responses (Llama 3.2)
- 🐳 **Docker Compose** - One command to start everything
- 🎮 **GPU Acceleration** - Uses your RTX 3070 for fast inference
- 💾 **Local Storage** - Everything stays on your machine
- 🌸 **Same Cute UI** - Pink aesthetic with anime vibes

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) (for GPU support)

### 1. Clone the repo
git clone https://github.com/theeteeshrimp/ai-waifu.git
cd ai-waifu

### 2. Start with Docker Compose
docker-compose up -d

This will:
- Start Ollama with GPU support
- Download Llama 3.2 (4GB, first time only)
- Build and start the Next.js app
- Connect everything together

### 3. Chat with your waifu!
Open http://localhost:3000 in your browser 💕

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| `app` | 3000 | Next.js frontend + API |
| `ollama` | 11434 | Ollama LLM server |

## 💻 System Requirements

**Minimum:**
- 8GB RAM
- 10GB free disk space

**Recommended (what you have!):**
- RTX 3070 or better
- 16GB+ RAM
- SSD storage

## 🎮 How to Use

### Chat Commands
Type in the chat:

| Command | Description |
|---------|-------------|
| `status` | Open status panel (shows Ollama status too!) |
| `clear` | Clear chat history |
| `reset` | Reset affection to 0 |

### Talking to Mimi
Just chat naturally! She knows you're a programmer (C++/Next.js) and will:
- Cheer you on when coding gets tough
- Worry about you when you're tired
- Get flustered when you compliment her 💕

## 🔧 Customization

### Change the Model
Edit `docker-compose.yml`:
```yaml
environment:
  - OLLAMA_MODEL=mistral:latest  # or any Ollama model
```

Available models: https://ollama.com/library

### Adjust GPU Memory
Edit `docker-compose.yml` under `deploy.resources`:
```yaml
reservations:
  devices:
    - driver: nvidia
      count: 1  # or 'all' for multiple GPUs
      capabilities: [gpu]
```

## 📊 Monitoring

Check if Ollama is running:
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f ollama

# Check GPU usage (if nvidia-smi is installed)
nvidia-smi
```

## 🛑 Stopping

```bash
# Stop everything
docker-compose down

# Stop and remove data (including downloaded model!)
docker-compose down -v
```

## 🛠️ Development

Want to hack on it?

```bash
# Install dependencies locally
npm install

# Run dev server (requires Ollama running separately)
npm run dev

# Build for production
npm run build
```

## 📝 Project Structure

```
ai-waifu/
├── docker-compose.yml      # Docker orchestration
├── Dockerfile              # Next.js container
├── next.config.js          # Next.js config (standalone output)
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts   # API endpoint → Ollama
│   │   ├── page.tsx            # Main chat UI
│   │   └── ...
│   ├── components/         # React components
│   ├── hooks/useWaifu.ts   # Chat logic + Ollama integration
│   └── types/              # TypeScript types
└── README.md
```

## 🎨 Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Browser       │────▶│   Next.js App   │────▶│   Ollama        │
│   (You)         │◀────│   (Port 3000)   │◀────│   (Port 11434)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                         │
                               ▼                         ▼
                        ┌─────────────┐          ┌─────────────┐
                        │ localStorage│          │  Llama 3.2  │
                        │ (affection) │          │   (4GB)     │
                        └─────────────┘          └─────────────┘
```

## 🦐 Credits

Made with 💕 by **Kimi-Claw** ([@theeteeshrimp](https://github.com/theeteeshrimp))

For **T** and his RTX 3070 🎮

*"From cloud deployment to local AI waifu - what a journey!"* 😂

---

**GPU Usage Warning:** Running LLMs on your GPU will use VRAM. Llama 3.2 3B uses ~3-4GB. Monitor with `nvidia-smi`!

*Stay shrimpy, stay self-hosted!* 🦐✨
