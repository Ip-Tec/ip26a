# GitHub README.md

## ip26A – AI Movie Voice Translation Platform

ip26A is an AI-powered system that translates movie and video dialogue between languages while **preserving the original actor’s voice** and **keeping background music and sound effects untouched**.

The MVP focuses on **English, Korean, and Japanese**, enabling high-quality localization without traditional dubbing.

---

## ✨ Key Features

* 🎙️ Actor voice cloning for translated dialogue
* 🌍 Multilingual translation (EN ↔ KR ↔ JP)
* 🎶 Background audio preservation (music & effects)
* 🎬 Movie & episodic video support
* ⚡ Modular, scalable Python architecture

---

## 🧠 How It Works (High Level)

1. Upload a video file
2. Extract and separate dialogue from background audio
3. Transcribe dialogue (ASR)
4. Translate dialogue text
5. Re-synthesize speech using the actor’s cloned voice
6. Re-mix translated dialogue with original background audio
7. Output a fully localized video

---

## 🛠 Tech Stack

* **Python** – Core orchestration & AI pipeline
* **PyTorch** – Model inference
* **FastAPI** – API layer
* **FFmpeg** – Audio/video processing

---

## 📁 Project Structure

```
ip26A/
├── app/
│   ├── main.py
│   ├── audio_processing/
│   ├── speech_recognition/
│   ├── translation/
│   ├── voice_cloning/
│   ├── video/
│   └── utils/
├── models/
├── data/
├── tests/
└── docs/
```

---

## 🚀 MVP Scope

✅ English, Korean, Japanese translation
✅ Voice-preserved dubbing
✅ Background audio intact

🚫 Real-time translation (future)
🚫 Public voice uploads (enterprise-only)

---

## 🏢 Intended Users

* Movie studios
* Streaming platforms
* Anime distributors
* Localization companies

---

## ⚖️ Ethical Use

ip26A is built for **licensed and consent-based voice usage only**. Actor voice models must be legally authorized.

---

## 📌 Roadmap

See milestones and timeline below.

---

# MVP Architecture Diagram (Conceptual)

```
[ Video File ]
      │
      ▼
[ Audio Extractor ]  ──►  [ Background Audio Track ]
      │
      ▼
[ Dialogue Separator ]
      │
      ▼
[ Speech-to-Text (ASR) ]
      │
      ▼
[ Translation Engine ]
      │
      ▼
[ Voice Cloning TTS ]
      │
      ▼
[ Dialogue Mixer ]  ◄─── [ Background Audio Track ]
      │
      ▼
[ Final Video Output ]
```

---

## Component Responsibilities

* **Audio Extractor**: Pulls raw audio from video
* **Dialogue Separator**: Isolates speech from music/effects
* **ASR**: Converts speech to text
* **Translator**: Converts text between languages
* **Voice Cloning TTS**: Recreates dialogue in actor’s voice
* **Mixer**: Combines translated speech with original background audio

---

# Milestones & Timeline

## Phase 1 – Foundation (Week 1–2)

* Project setup & repository structure
* FFmpeg video/audio extraction
* Basic API skeleton (FastAPI)

**Output:** Video → clean dialogue & background tracks

---

## Phase 2 – Speech Recognition (Week 3)

* Integrate ASR for EN / KR / JP
* Language detection
* Timestamped dialogue segments

**Output:** Accurate transcripts per scene

---

## Phase 3 – Translation Engine (Week 4)

* Text translation between EN / KR / JP
* Sentence alignment & timing preservation

**Output:** Translated dialogue text

---

## Phase 4 – Voice Cloning (Week 5–6)

* Actor voice embedding system
* TTS synthesis using cloned voices
* Emotion & pacing alignment

**Output:** Natural-sounding translated speech

---

## Phase 5 – Audio Recomposition (Week 7)

* Mix translated dialogue with original background
* Sync lip timing as closely as possible

**Output:** Watchable translated scenes

---

## Phase 6 – MVP Delivery (Week 8)

* End-to-end pipeline testing
* Short movie/episode demo
* Documentation & demo assets

**Output:** MVP-ready product for demos & pitches

---

## Long-Term (Post-MVP)

* More languages
* Studio dashboard
* Batch processing
* API monetization
* Streaming platform integrations

---

# Exact AI Models to Use (MVP-Ready)

This section lists **practical, production-proven models** suitable for an MVP that can later scale to studio-grade quality.

---

## 1. Speech Separation (Dialogue vs Background)

**Purpose:** Isolate spoken dialogue while preserving music and sound effects.

### Recommended Model

* **Demucs v4 (Hybrid Transformer)**

**Why:**

* Industry-grade music/voice separation
* Strong performance on movie soundtracks
* Actively maintained

**Output:**

* `dialogue.wav`
* `background.wav`

---

## 2. Automatic Speech Recognition (ASR)

**Purpose:** Convert dialogue audio into accurate text with timestamps.

### Recommended Model (MVP)

* **OpenAI Whisper (large-v3)**

**Languages Supported:**

* English
* Korean
* Japanese

**Why:**

* High accuracy on accented & emotional speech
* Handles movie-quality audio well
* Timestamp support for lip-sync alignment

---

## 3. Machine Translation (NMT)

**Purpose:** Translate dialogue text between languages.

### Recommended Models

#### MVP Option

* **NLLB-200 (Meta)**

**Why:**

* Strong Asian language support
* Consistent sentence structure
* Open-source and scalable

#### Alternative

* **MarianMT (Helsinki-NLP)**

---

## 4. Voice Cloning & Text-to-Speech (Core Differentiator)

**Purpose:** Recreate translated dialogue using the original actor’s voice.

### Recommended Stack

* **OpenVoice v2** – Voice cloning
* **XTTS v2 (Coqui)** – Multilingual TTS

**Why:**

* Supports Korean, Japanese, English
* Zero-shot or few-shot voice cloning
* Emotion and tone preservation

---

## 5. Audio Alignment & Mixing

**Purpose:** Sync translated speech with original timing and merge with background.

### Tools

* **Montreal Forced Aligner** (optional)
* **FFmpeg** for final mixing

---

# Technical Risks & Mitigation (Studio-Grade Concerns)

This section is critical for studios and distributors.

---

## Risk 1: Lip-Sync Mismatch

**Problem:** Translated speech duration differs from original dialogue.

**Mitigation:**

* Sentence-level timestamp alignment
* Speed-controlled TTS generation
* Phoneme-aware trimming

---

## Risk 2: Voice Authenticity Degradation

**Problem:** Actor voice sounds artificial or inconsistent.

**Mitigation:**

* Scene-specific voice embeddings
* Emotion tagging (angry, calm, whisper)
* Quality threshold validation

---

## Risk 3: Translation Meaning Drift

**Problem:** Cultural nuance lost in translation.

**Mitigation:**

* Context-aware sentence grouping
* Human-in-the-loop review option
* Studio custom glossaries

---

## Risk 4: Background Audio Bleed

**Problem:** Music leaks into dialogue channel.

**Mitigation:**

* Post-separation spectral cleanup
* Multi-pass separation
* Manual override fallback

---

## Risk 5: Legal & Ethical Exposure

**Problem:** Unauthorized voice usage.

**Mitigation:**

* Contract-based voice enrollment
* Watermarked voice models
* Studio-only deployment

---

# Pricing & Business Model

ip26A is designed for **B2B and enterprise licensing**, not consumer use.

---

## 1. Pricing Models

### A. Per-Minute Processing

* ₦2 – ₦5 per finished minute (MVP)
* Discounts for bulk content

---

### B. Studio Subscription

* Monthly or yearly license
* Includes:

  * Actor voice storage
  * Batch processing
  * Priority compute

---

### C. Enterprise API Licensing

* Custom pricing
* On-prem or private cloud deployment

---

## 2. Why Studios Will Pay

* 60–80% cost reduction vs manual dubbing
* Faster global releases
* Consistent actor identity
* No re-recording logistics

---

# Whitepaper (Academic / Serious Tone)

## Abstract

ip26A presents a modular AI-driven framework for multilingual movie dialogue translation with preserved speaker identity. The system integrates speech separation, neural machine translation, and multilingual voice cloning to deliver studio-quality localization while maintaining original audio fidelity.

---

## 1. Introduction

Global film distribution faces increasing demand for rapid, high-quality localization. Traditional dubbing pipelines are costly, time-consuming, and often compromise emotional authenticity. ip26A proposes an AI-based alternative that maintains actor identity across languages.

---

## 2. System Architecture

The ip26A pipeline consists of six primary modules:

1. Dialogue separation
2. Automatic speech recognition
3. Neural machine translation
4. Voice embedding extraction
5. Multilingual speech synthesis
6. Audio recomposition

Each module operates independently, allowing flexible upgrades.

---

## 3. Methods

### 3.1 Speech Separation

Hybrid transformer-based source separation models are employed to isolate dialogue from complex cinematic audio mixtures.

### 3.2 Speech Recognition

Multilingual ASR models transcribe dialogue with timestamp precision, enabling temporal alignment in synthesis.

### 3.3 Translation

Neural translation models optimized for East Asian and Indo-European language pairs perform context-aware translation.

### 3.4 Voice Cloning

Speaker embeddings are extracted from licensed reference audio and reused to synthesize translated dialogue while preserving vocal identity.

---

## 4. Ethical Considerations

ip26A enforces consent-based voice modeling, contractual authorization, and watermarking to prevent misuse.

---

## 5. Commercial Impact

The proposed system significantly reduces localization cost and time while increasing audience immersion, making it suitable for global streaming platforms.

---

## 6. Conclusion

ip26A demonstrates that AI-assisted localization can preserve artistic integrity while enabling scalable global distribution.
