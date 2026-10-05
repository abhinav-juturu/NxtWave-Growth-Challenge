// ==========================================================================
// NxtWave — Enterprise Growth Asset Application Logic (Realistic & Verified)
// ==========================================================================

// Pinned, Beginner-Friendly 60-Minute Track Specifications
const TRACK_DATA = {
  rag: {
    tag: "Track 1: Full-Stack GenAI",
    title: "PDF Knowledge Assistant with Streamlit & LLM",
    desc: "Build and deploy a lightweight web application that allows users to upload a syllabus PDF or textbook chapter and ask questions in natural language with source references.",
    pipeline: [
      "PDF Upload & Text Extraction using PyPDF2 / pdfplumber",
      "Text chunking & prompt context formatting for LLM query",
      "Streaming response generation using OpenAI / Groq free cloud API",
      "Instant one-click deployment to Streamlit Community Cloud (Public URL)"
    ],
    stack: ["Python 3.10+", "Streamlit", "OpenAI / Groq API", "PyPDF2", "Streamlit Cloud"],
    bullets: [
      "Built and deployed a responsive PDF document assistant using Streamlit and LLM APIs, enabling natural language querying over technical documents.",
      "Implemented automated text parsing and context-injection prompt pipelines to return accurate answers with page references.",
      "Deployed public web application on Streamlit Cloud with environment secret management and sub-[X]s response latency."
    ],
    fileName: "app.py",
    code: `import streamlit as st
from pypdf import PdfReader
from openai import OpenAI

st.title("Document QA Assistant")
uploaded_file = st.file_uploader("Upload PDF document", type="pdf")

if uploaded_file:
    reader = PdfReader(uploaded_file)
    text = " ".join([page.extract_text() for page in reader.pages[:10]])
    query = st.text_input("Ask a question about this document:")
    if query and st.button("Generate Answer"):
        client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": f"Context: {text[:4000]}"},
                      {"role": "user", "content": query}]
        )
        st.write(response.choices[0].message.content)`
  },
  agent: {
    tag: "Track 2: AI Workflows",
    title: "Automated Job Description & Resume Matcher",
    desc: "Build a Python automation script that analyzes placement job descriptions against candidate resumes, identifies missing keywords, and drafts tailored pitch notes.",
    pipeline: [
      "Resume & Job Description text ingestion and sanitization",
      "Structured gap extraction (Missing Skills, Core Tech, Experience)",
      "Prompt chaining to output ATS compatibility percentage and suggested revisions",
      "Interactive Streamlit / Gradio interface for instant candidate feedback"
    ],
    stack: ["Python 3.10+", "OpenAI / Claude API", "Gradio / Streamlit", "JSON Schema Output"],
    bullets: [
      "Developed an automated resume alignment tool parsing placement job descriptions to identify missing skills and technical keywords.",
      "Engineered structured prompt schemas extracting actionable gaps with [X]% accuracy compared against manual recruiter reviews.",
      "Built an interactive web demo allowing peers to paste job descriptions and receive targeted ATS optimization notes."
    ],
    fileName: "job_matcher.py",
    code: `import json
from openai import OpenAI

client = OpenAI()

def analyze_fit(resume_text, job_description):
    prompt = f"Analyze resume fit for job. Output JSON with match_score, missing_skills, recommendations.\\nResume: {resume_text}\\nJob: {job_description}"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": prompt}]
    )
    return json.loads(response.choices[0].message.content)`
  },
  cv: {
    tag: "Track 3: Browser AI Vision",
    title: "Client-Side Webcam Focus & Posture Telemetry",
    desc: "Build a client-side computer vision web app running directly in the browser using TensorFlow.js / MediaPipe to detect user attention during simulated mock interviews.",
    pipeline: [
      "Webcam video stream capture via HTML5 Canvas API",
      "Real-time facial landmark detection using MediaPipe Vision in 30 lines of JS",
      "Gaze orientation calculation (Centric vs. Away)",
      "Live focus percentage telemetry dashboard rendered at 30+ FPS"
    ],
    stack: ["JavaScript (ES6)", "MediaPipe Vision WASM", "HTML5 Canvas", "Vercel / GitHub Pages"],
    bullets: [
      "Built a client-side video telemetry tool running in-browser at [X] FPS without sending private video frames to external servers.",
      "Implemented facial landmark angle estimation to track candidate eye-contact during simulated mock interview sessions.",
      "Deployed public web app on GitHub Pages with zero cloud infrastructure cost."
    ],
    fileName: "vision_tracker.js",
    code: `// Real-time client-side face landmark tracking
const video = document.getElementById("webcam");
const canvas = document.getElementById("output");

async function initVision() {
  const model = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    { runtime: "tfjs" }
  );
  async function detect() {
    const faces = await model.estimateFaces(video);
    if (faces.length > 0) {
      // Calculate gaze angle & update focus telemetry
    }
    requestAnimationFrame(detect);
  }
  detect();
}`
  },
  copilot: {
    tag: "Track 4: Developer Tools",
    title: "AI Code Explainer & Edge-Case Unit Test Generator",
    desc: "Build a developer utility that analyzes code snippets, explains algorithmic time/space complexity, and automatically writes comprehensive PyTest unit tests.",
    pipeline: [
      "Code snippet input & syntax validation",
      "Algorithmic complexity breakdown (Big-O time and space analysis)",
      "Prompt-guided synthesis of PyTest unit tests including edge cases",
      "Interactive diff viewer with 1-click test suite download"
    ],
    stack: ["Python 3.10+", "FastAPI", "OpenAI / Claude API", "PyTest"],
    bullets: [
      "Engineered an automated code review utility analyzing time complexity and security risks on student code submissions.",
      "Automated test case generation covering null inputs, boundary values, and performance limits for Python functions.",
      "Created a web-based code explainer used by batchmates to review data structures and algorithms questions."
    ],
    fileName: "code_reviewer.py",
    code: `from openai import OpenAI

def review_code(code_snippet):
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Analyze complexity, edge cases, and generate PyTest test cases."},
            {"role": "user", "content": f"Review this code:\\n{code_snippet}"}
        ]
    )
    return response.choices[0].message.content`
  }
};

// LocalStorage Persistence Configuration
const STORAGE_KEY_REGISTRATIONS = "nxtwave_registrations_v2";
const STORAGE_KEY_CURRENT_USER = "nxtwave_current_user_v2";
const WEBHOOK_ENDPOINT = "https://script.google.com/macros/s/AKfycby-placeholder-webhook/exec"; // Optional external webhook endpoint

// Global State
let currentTrack = "rag";
let diagnosticScores = {};
let activeUser = null;

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  setupTrackTabs();
  renderTrackSpec("rag");
  checkUrlReferralParam();
  loadPersistedData();
  updateRegistrationCounters();
});

// Load Persisted Storage
function loadPersistedData() {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (savedUser) {
      activeUser = JSON.parse(savedUser);
      renderExistingUserPass(activeUser);
    }
  } catch (e) {
    console.warn("Storage access restricted or unavailable:", e);
  }
}

// Check for ?ref= in URL
function checkUrlReferralParam() {
  const params = new URLSearchParams(window.location.search);
  const refCode = params.get("ref");
  if (refCode) {
    const referredInput = document.getElementById("referredBy");
    if (referredInput) {
      referredInput.value = refCode.trim().toUpperCase();
      referredInput.style.borderColor = "#0056D2";
      showToast(`Referral code applied from invite: ${refCode}`);
    }
  }
}

// Setup Track Switcher Tabs
function setupTrackTabs() {
  const tabs = document.querySelectorAll(".track-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const role = tab.getAttribute("data-role");
      currentTrack = role;
      renderTrackSpec(role);

      const trackSelect = document.getElementById("projectTrack");
      if (trackSelect) trackSelect.value = role;
    });
  });
}

// Render Track Spec
function renderTrackSpec(roleKey) {
  const data = TRACK_DATA[roleKey];
  if (!data) return;

  document.getElementById("track-badge-pill").textContent = data.tag;
  document.getElementById("track-headline").textContent = data.title;
  document.getElementById("track-summary").textContent = data.desc;
  document.getElementById("code-file-name").textContent = data.fileName;
  document.getElementById("code-content-box").textContent = data.code;

  // Pipeline
  const pipelineWrap = document.getElementById("pipeline-steps-wrap");
  pipelineWrap.innerHTML = data.pipeline.map((step, idx) => `
    <div class="pipeline-node">
      <span class="node-idx">0${idx + 1}</span>
      <span>${step}</span>
    </div>
  `).join("");

  // Tech Stack Pills
  const techWrap = document.getElementById("tech-pills-wrap");
  techWrap.innerHTML = data.stack.map(item => `
    <span class="tech-pill">${item}</span>
  `).join("");

  // Resume Bullets
  const bulletsWrap = document.getElementById("resume-bullets-wrap");
  bulletsWrap.innerHTML = data.bullets.map(b => `
    <div class="resume-bullet-item">${b}</div>
  `).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Copy Resume Bullets Action
function copyResumeBullets() {
  const data = TRACK_DATA[currentTrack];
  if (!data) return;

  const copyText = `PROJECT: ${data.title}\n` + data.bullets.map(b => `• ${b}`).join("\n");
  copyToClipboard(copyText, "Resume bullets copied to clipboard! (Remember to substitute bracketed metrics).");
}

// Sync Selected Track to Registration Form
function syncSelectedTrack() {
  const trackSelect = document.getElementById("projectTrack");
  if (trackSelect) trackSelect.value = currentTrack;
}

// Diagnostic Assessment Change Handler (Accessible Radio inputs)
function onDiagnosticChange(qNum, score) {
  diagnosticScores[qNum] = score;

  if (Object.keys(diagnosticScores).length === 3) {
    const totalScore = Object.values(diagnosticScores).reduce((a, b) => a + b, 0);
    const resultBox = document.getElementById("diagnostic-result-box");
    const badge = document.getElementById("diag-badge");
    const scoreText = document.getElementById("diag-score-text");
    const title = document.getElementById("diag-result-title");
    const body = document.getElementById("diag-result-body");

    resultBox.classList.remove("hidden");
    scoreText.textContent = `Portfolio Readiness Score: ${totalScore}/9`;

    if (totalScore <= 3) {
      badge.textContent = "High Screening Risk";
      badge.style.background = "#DC2626";
      title.textContent = "Academic Clones Have Low Impact in 2026–2027 Drives";
      body.textContent = "Standard tutorial clones are easily recognized by technical interviewers. Building and deploying an AI project in this 60-minute build provides the verifiable proof-of-work hiring managers look for.";
    } else if (totalScore <= 6) {
      badge.textContent = "Moderate Foundation";
      badge.style.background = "#D97706";
      title.textContent = "Good Fundamentals, But Lacks Live Public Deployed URL";
      body.textContent = "You have solid programming awareness, but recruiters prioritize candidates with public deployed demo links and clean GitHub repositories. In 60 minutes, you will bridge this gap.";
    } else {
      badge.textContent = "Strong Profile";
      badge.style.background = "#059669";
      title.textContent = "Ready to Build an AI Differentiator";
      body.textContent = "You have solid experience. This hands-on build will show you how to structure, document, and present modern AI application workflows for competitive product roles.";
    }

    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Registration Form Handler (With Real Deduplication & Storage)
function handleRegistration(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const college = document.getElementById("college").value.trim();
  const gradYear = document.getElementById("graduationYear").value;
  const track = document.getElementById("projectTrack").value;
  const referredBy = document.getElementById("referredBy").value.trim().toUpperCase();

  // Validate Consent
  const consent = document.getElementById("consentCheck").checked;
  if (!consent) {
    showToast("Please accept the communication consent to register.");
    return;
  }

  // Load existing records for deduplication
  let registrations = getStoredRegistrations();
  const existingRecord = registrations.find(r => r.email === email || r.whatsapp === whatsapp);

  if (existingRecord) {
    activeUser = existingRecord;
    renderExistingUserPass(activeUser);
    showToast("Welcome back! Your existing Admit Pass has been retrieved.");
    document.getElementById("ticket-side-wrap").scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Generate Unique Ticket ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `NXTAI-${randomSuffix}`;

  const newRegistration = {
    ticketId,
    fullName,
    email,
    whatsapp,
    college,
    gradYear,
    track,
    referredBy: referredBy || null,
    timestamp: new Date().toISOString(),
    referralCount: 0
  };

  // If this user was referred by someone, increment the referrer's count!
  if (referredBy) {
    const referrerIndex = registrations.findIndex(r => r.ticketId === referredBy);
    if (referrerIndex !== -1) {
      registrations[referrerIndex].referralCount = (registrations[referrerIndex].referralCount || 0) + 1;
    }
  }

  // Save new registration
  registrations.push(newRegistration);
  saveStoredRegistrations(registrations);

  activeUser = newRegistration;
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(activeUser));
  } catch (err) {
    console.warn("Could not persist active user:", err);
  }

  // Optional: Post to external webhook if configured
  postToExternalWebhook(newRegistration);

  // Update UI
  renderExistingUserPass(activeUser);
  updateRegistrationCounters();

  // Trigger celebration
  if (window.confetti && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  showToast(`Admit Pass Generated! Ticket ID: ${ticketId}`);
  document.getElementById("ticket-side-wrap").scrollIntoView({ behavior: "smooth" });
}

// Render User Pass
function renderExistingUserPass(user) {
  if (!user) return;

  const nameParts = user.fullName.split(" ");
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : user.fullName.substring(0, 2).toUpperCase();

  document.getElementById("badge-user-name").textContent = user.fullName;
  document.getElementById("badge-user-college").textContent = `${user.college} • Batch of ${user.gradYear}`;
  document.getElementById("badge-ticket-id").textContent = user.ticketId;
  document.getElementById("badge-avatar").textContent = initials;

  const trackLabels = {
    rag: "Document QA Assistant",
    agent: "Job Matching Researcher",
    cv: "Webcam Focus Telemetry",
    copilot: "AI Code Reviewer & Tester"
  };
  document.getElementById("badge-track-name").textContent = trackLabels[user.track] || trackLabels.rag;

  // Real Dynamic Referral URL based on current host & location
  const baseUrl = window.location.origin + window.location.pathname;
  const dynamicRefUrl = `${baseUrl}?ref=${user.ticketId}`;
  document.getElementById("referral-url-field").value = dynamicRefUrl;

  // Unhide Referral Hub
  const viralHub = document.getElementById("viral-hub-card");
  viralHub.classList.remove("hidden");

  // Update Milestone Tracker
  updateUserMilestoneUI(user);

  // Update User row in Leaderboard
  const userRow = document.getElementById("user-live-row");
  userRow.style.display = "table-row";
  document.getElementById("user-row-name").textContent = user.fullName;
  document.getElementById("user-row-college").textContent = `${user.college} ('${user.gradYear.slice(-2)})`;
  document.getElementById("user-row-count").textContent = `${user.referralCount || 0} Students`;

  const submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.innerHTML = `<span>Verified Student Pass Generated</span> <i data-lucide="check"></i>`;
    submitBtn.style.backgroundColor = "#059669";
    if (window.lucide) window.lucide.createIcons();
  }
}

// Update Milestone Progress
function updateUserMilestoneUI(user) {
  const count = user.referralCount || 0;
  const fillBar = document.getElementById("milestone-fill");
  const cp2 = document.getElementById("cp-tier-2");
  const cp5 = document.getElementById("cp-tier-5");
  const perkEl = document.getElementById("user-row-perk");

  if (count >= 5) {
    fillBar.style.width = "100%";
    cp2.classList.add("reached");
    cp5.classList.add("reached");
    perkEl.textContent = "Eligible for Top 2 Ambassador Voucher Pool";
    perkEl.classList.add("active");
  } else if (count >= 2) {
    fillBar.style.width = "65%";
    cp2.classList.add("reached");
    cp5.classList.remove("reached");
    perkEl.textContent = "Unlocked: Top 50 AI Interview Pack";
    perkEl.classList.add("active");
  } else if (count === 1) {
    fillBar.style.width = "40%";
    cp2.classList.remove("reached");
    cp5.classList.remove("reached");
    perkEl.textContent = "1 more to unlock Interview Pack";
  } else {
    fillBar.style.width = "20%";
    cp2.classList.remove("reached");
    cp5.classList.remove("reached");
    perkEl.textContent = "Share link with batchmates to climb";
  }
}

// Update Verified Registration Counters
function updateRegistrationCounters() {
  const records = getStoredRegistrations();
  const counterEl = document.getElementById("reg-count-display");
  if (counterEl) {
    // Show actual registrations + baseline sample
    counterEl.textContent = `${records.length}`;
  }
}

// Storage Helpers
function getStoredRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredRegistrations(records) {
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(records));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

// Post to External Webhook (Non-blocking with graceful fallback)
function postToExternalWebhook(payload) {
  try {
    fetch(WEBHOOK_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(err => {
      // Graceful silently handled - local persistence holds source of truth
    });
  } catch (err) { }
}

// Copy Referral Link
function copyReferralLink() {
  const field = document.getElementById("referral-url-field");
  if (!field || !field.value) return;
  copyToClipboard(field.value, "Your unique invite link has been copied to your clipboard!");
}

// WhatsApp Share Handler (Uses dynamic URL)
function shareOnWhatsApp() {
  if (!activeUser) {
    showToast("Please register first to generate your unique invite link!");
    return;
  }

  const ticketId = activeUser.ticketId;
  const baseUrl = window.location.origin + window.location.pathname;
  const refUrl = `${baseUrl}?ref=${ticketId}`;

  const message = `Hey batchmates! 👋 Placement season has started and interviewers look for real hands-on AI projects.

NxtWave is hosting a free live session:
*"Build Your First AI Project in 60 Minutes"* (Live code, deploy a public URL & ATS resume template).

I just reserved my verified seat (Ticket: ${ticketId}). Join with my invite link so we can unlock the *Top 50 AI Interview Questions Guide* together:
👉 ${refUrl}

Free for engineering students (Class of 2027).`;

  const encodedUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

// Safe Clipboard Copy Helper (Works across HTTP, HTTPS, & iframes)
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch (err) {
    showToast("Press Ctrl+C / Cmd+C to copy");
  }
  document.body.removeChild(textArea);
}

// Non-blocking Toast Notification
function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3200);
}
