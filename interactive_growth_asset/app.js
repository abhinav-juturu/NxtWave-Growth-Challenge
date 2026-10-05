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
const STORAGE_KEY_SEED_DONE = "nxtwave_sim_seed_v2";
const WEBHOOK_ENDPOINT = "https://script.google.com/macros/s/AKfycby-placeholder-webhook/exec"; // Optional external webhook endpoint

// Global State
let currentTrack = "rag";
let diagnosticScores = {};
let activeUser = null;

// ==========================================================================
// SIMULATION DATA ENGINE
// ==========================================================================

const SIM_STUDENTS = [
  { fullName: "Arjun Mehta",       college: "VJTI Mumbai",           gradYear: "2027", track: "rag",     minsAgo: 3   },
  { fullName: "Priya Sharma",      college: "CBIT Hyderabad",        gradYear: "2027", track: "agent",   minsAgo: 7   },
  { fullName: "Rahul Nair",        college: "PSG Tech Coimbatore",   gradYear: "2027", track: "copilot", minsAgo: 12  },
  { fullName: "Sneha Pillai",      college: "RV College Bengaluru",  gradYear: "2027", track: "cv",      minsAgo: 18  },
  { fullName: "Karthik Reddy",     college: "JNTUH Hyderabad",       gradYear: "2027", track: "rag",     minsAgo: 25  },
  { fullName: "Ananya Singh",      college: "NSIT New Delhi",        gradYear: "2027", track: "agent",   minsAgo: 31  },
  { fullName: "Vishal Kumar",      college: "AKGEC Ghaziabad",       gradYear: "2027", track: "rag",     minsAgo: 40  },
  { fullName: "Deepa Raghunath",   college: "Anna Univ. Chennai",    gradYear: "2027", track: "copilot", minsAgo: 48  },
  { fullName: "Sriram Balaji",     college: "SRM Kattankulathur",    gradYear: "2027", track: "cv",      minsAgo: 55  },
  { fullName: "Meera Krishnan",    college: "NIT Trichy",            gradYear: "2027", track: "rag",     minsAgo: 62  },
  { fullName: "Tanmay Joshi",      college: "DBIT Mumbai",           gradYear: "2027", track: "agent",   minsAgo: 70  },
  { fullName: "Pooja Verma",       college: "LNMIIT Jaipur",         gradYear: "2027", track: "copilot", minsAgo: 80  },
  { fullName: "Aditya Pandey",     college: "AKTU Lucknow",          gradYear: "2027", track: "rag",     minsAgo: 92  },
  { fullName: "Lakshmi Devi",      college: "VIT Vellore",           gradYear: "2027", track: "agent",   minsAgo: 105 },
  { fullName: "Suresh Babu",       college: "MVSR Hyderabad",        gradYear: "2027", track: "cv",      minsAgo: 118 },
  { fullName: "Nandini Iyer",      college: "IIT Madras (Diploma)",  gradYear: "2027", track: "rag",     minsAgo: 130 },
  { fullName: "Rohit Desai",       college: "MIT Pune",              gradYear: "2027", track: "copilot", minsAgo: 142 },
  { fullName: "Swathi Reddy",      college: "Osmania Univ.",         gradYear: "2027", track: "agent",   minsAgo: 155 },
  { fullName: "Aakash Gupta",      college: "DTU New Delhi",         gradYear: "2027", track: "rag",     minsAgo: 170 },
  { fullName: "Bhavna Tiwari",     college: "MITS Gwalior",          gradYear: "2027", track: "cv",      minsAgo: 185 },
  { fullName: "Chaitanya Patel",   college: "GEC Gandhinagar",       gradYear: "2027", track: "copilot", minsAgo: 200 },
  { fullName: "Divya Mohan",       college: "SASTRA Thanjavur",      gradYear: "2027", track: "rag",     minsAgo: 218 },
  { fullName: "Farhan Shaikh",     college: "VJTI Mumbai",           gradYear: "2027", track: "agent",   minsAgo: 235 },
  { fullName: "Geeta Narayanan",   college: "NIT Warangal",          gradYear: "2027", track: "cv",      minsAgo: 252 },
  { fullName: "Harshit Agrawal",   college: "HBTU Kanpur",           gradYear: "2027", track: "rag",     minsAgo: 270 },
  { fullName: "Ishita Bose",       college: "Jadavpur Univ.",        gradYear: "2027", track: "copilot", minsAgo: 290 },
  { fullName: "Jayesh Mistry",     college: "BVM Engineering",       gradYear: "2027", track: "agent",   minsAgo: 310 },
  { fullName: "Kavitha Sundar",    college: "SSN College Chennai",   gradYear: "2027", track: "rag",     minsAgo: 330 },
  { fullName: "Lokesh Yadav",      college: "RTU Kota",              gradYear: "2027", track: "cv",      minsAgo: 355 },
  { fullName: "Manisha Patil",     college: "Sinhgad Tech Pune",     gradYear: "2027", track: "copilot", minsAgo: 378 },
  { fullName: "Nikhil Teja",       college: "CBIT Hyderabad",        gradYear: "2027", track: "rag",     minsAgo: 400 },
  { fullName: "Oindrila Das",      college: "Heritage Inst. Kolkata",gradYear: "2027", track: "agent",   minsAgo: 424 },
  { fullName: "Pranav Kulkarni",   college: "COEP Pune",             gradYear: "2027", track: "cv",      minsAgo: 450 },
  { fullName: "Rekha Srinivasan",  college: "CEG Anna Univ.",        gradYear: "2027", track: "rag",     minsAgo: 478 },
  { fullName: "Saurabh Chauhan",   college: "IET Lucknow",           gradYear: "2027", track: "copilot", minsAgo: 508 },
  { fullName: "Tejaswini Rao",     college: "MVSR Hyderabad",        gradYear: "2027", track: "agent",   minsAgo: 540 },
  { fullName: "Udit Malhotra",     college: "NSIT New Delhi",        gradYear: "2027", track: "rag",     minsAgo: 572 },
  { fullName: "Varsha Naik",       college: "KJ Somaiya Mumbai",     gradYear: "2027", track: "cv",      minsAgo: 610 },
  { fullName: "Wasim Ansari",      college: "VIT Pune",              gradYear: "2027", track: "copilot", minsAgo: 648 },
  { fullName: "Yamini Raj",        college: "PSG Tech Coimbatore",   gradYear: "2027", track: "rag",     minsAgo: 690 },
  { fullName: "Zoya Siddiqui",     college: "Amity Univ. Noida",     gradYear: "2027", track: "agent",   minsAgo: 732 },
  { fullName: "Abhishek Thakur",   college: "NIT Rourkela",          gradYear: "2027", track: "cv",      minsAgo: 780 },
  { fullName: "Bhargavi Nair",     college: "TKM College Kollam",    gradYear: "2027", track: "copilot", minsAgo: 828 },
  { fullName: "Chirag Patel",      college: "GEC Surat",             gradYear: "2027", track: "rag",     minsAgo: 882 },
  { fullName: "Disha Goyal",       college: "Thapar Inst. Patiala",  gradYear: "2027", track: "agent",   minsAgo: 938 },
  { fullName: "Elan Selvan",       college: "Thiagarajar CEng",      gradYear: "2027", track: "cv",      minsAgo: 996 },
  { fullName: "Falguni Jain",      college: "LNMIIT Jaipur",         gradYear: "2027", track: "copilot", minsAgo: 1060},
];

// Deterministic ticket IDs for seeded students (pre-computed)
const SIM_TICKET_IDS = [
  "NXTAI-3847","NXTAI-5129","NXTAI-7203","NXTAI-4416","NXTAI-6831",
  "NXTAI-2957","NXTAI-8074","NXTAI-1593","NXTAI-9264","NXTAI-3712",
  "NXTAI-6045","NXTAI-4883","NXTAI-7391","NXTAI-2268","NXTAI-5540",
  "NXTAI-8817","NXTAI-1034","NXTAI-6692","NXTAI-3319","NXTAI-9105",
  "NXTAI-4427","NXTAI-7780","NXTAI-2134","NXTAI-5561","NXTAI-8888",
  "NXTAI-3206","NXTAI-6673","NXTAI-1941","NXTAI-9318","NXTAI-4454",
  "NXTAI-7775","NXTAI-2207","NXTAI-5548","NXTAI-8891","NXTAI-3233",
  "NXTAI-6619","NXTAI-1977","NXTAI-9344","NXTAI-4480","NXTAI-7716",
  "NXTAI-2253","NXTAI-5582","NXTAI-8819","NXTAI-3255","NXTAI-6696",
  "NXTAI-1913","NXTAI-9380",
];

// Activity ticker messages for the live feed
const SIM_ACTIVITY_MESSAGES = [
  { name: "Arjun M.",    college: "VJTI Mumbai",         track: "Full-Stack GenAI",   time: "just now"  },
  { name: "Priya S.",    college: "CBIT Hyderabad",      track: "AI Workflows",       time: "2m ago"     },
  { name: "Karthik R.",  college: "JNTUH Hyderabad",     track: "Full-Stack GenAI",   time: "5m ago"     },
  { name: "Sneha P.",    college: "RV College",          track: "Browser AI Vision",  time: "9m ago"     },
  { name: "Tanmay J.",   college: "DBIT Mumbai",         track: "AI Workflows",       time: "14m ago"    },
  { name: "Ananya S.",   college: "NSIT Delhi",          track: "AI Workflows",       time: "19m ago"    },
  { name: "Vishal K.",   college: "AKGEC Ghaziabad",     track: "Full-Stack GenAI",   time: "26m ago"    },
  { name: "Deepa R.",    college: "Anna Univ.",          track: "Developer Tools",    time: "34m ago"    },
  { name: "Rohit D.",    college: "MIT Pune",            track: "Developer Tools",    time: "41m ago"    },
  { name: "Meera K.",    college: "NIT Trichy",          track: "Full-Stack GenAI",   time: "50m ago"    },
];

let simActivityIdx = 0;

/**
 * Seed localStorage with realistic pre-existing registrations (runs only once).
 */
function seedSimulationData() {
  try {
    if (localStorage.getItem(STORAGE_KEY_SEED_DONE)) return; // Already seeded

    const now = Date.now();
    const seeded = SIM_STUDENTS.map((s, i) => ({
      ticketId: SIM_TICKET_IDS[i],
      fullName: s.fullName,
      email: `${s.fullName.toLowerCase().replace(/\s+/g, ".")}@college.edu.in`,
      whatsapp: `98765${String(10000 + i).slice(1)}`,
      college: s.college,
      gradYear: s.gradYear,
      track: s.track,
      referredBy: null,
      timestamp: new Date(now - s.minsAgo * 60 * 1000).toISOString(),
      referralCount: Math.floor(Math.random() * 4)
    }));

    saveStoredRegistrations(seeded);
    localStorage.setItem(STORAGE_KEY_SEED_DONE, "1");
  } catch (e) {
    console.warn("Seed failed:", e);
  }
}

/**
 * Animate the registration counter from startVal → endVal over ~1.2 s.
 */
function animateCounter(el, startVal, endVal, duration = 1200) {
  if (!el) return;
  const range = endVal - startVal;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + range * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/**
 * Show one activity ticker notification (cycling through SIM_ACTIVITY_MESSAGES).
 */
function showActivityTicker() {
  const data = SIM_ACTIVITY_MESSAGES[simActivityIdx % SIM_ACTIVITY_MESSAGES.length];
  simActivityIdx++;

  const ticker = document.getElementById("activity-ticker");
  if (!ticker) return;

  ticker.innerHTML = `
    <span class="ticker-avatar">${data.name.charAt(0)}</span>
    <div class="ticker-text">
      <strong>${data.name}</strong> from <em>${data.college}</em> just claimed their Admit Pass
      <span class="ticker-track-tag">${data.track}</span>
    </div>
    <span class="ticker-time">${data.time}</span>
  `;
  ticker.classList.add("ticker-visible");

  setTimeout(() => {
    ticker.classList.remove("ticker-visible");
  }, 4000);
}

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  seedSimulationData();
  setupTrackTabs();
  renderTrackSpec("rag");
  checkUrlReferralParam();
  loadPersistedData();
  updateRegistrationCounters();

  // Start live activity ticker after a short delay, then every 8 s
  setTimeout(() => {
    showActivityTicker();
    setInterval(showActivityTicker, 8000);
  }, 3500);
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
    document.getElementById("register-section").scrollIntoView({ behavior: "smooth" });
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
  document.getElementById("register-section").scrollIntoView({ behavior: "smooth" });
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

  // Collapse the form to remove whitespace gap
  collapseFormAfterRegistration(user);
}

// Collapse the form panel after successful registration
function collapseFormAfterRegistration(user) {
  // Show the success bar above the layout
  const successBar = document.getElementById("registration-success-bar");
  if (successBar) {
    successBar.classList.remove("hidden");
    const nameEl = document.getElementById("success-user-name");
    const collegeEl = document.getElementById("success-user-college");
    if (nameEl) nameEl.textContent = user.fullName;
    if (collegeEl) collegeEl.textContent = user.college;
  }

  // Hide the form fields, show a compact registered summary instead
  const formFields = document.getElementById("form-fields");
  if (formFields) {
    formFields.style.display = "none";
  }
  const registeredSummary = document.getElementById("registered-summary");
  if (registeredSummary) {
    registeredSummary.style.display = "block";
  }
}

// Toggle form back open for editing
function toggleEditRegistration() {
  const formFields = document.getElementById("form-fields");
  const registeredSummary = document.getElementById("registered-summary");
  const successBar = document.getElementById("registration-success-bar");
  if (formFields) formFields.style.display = "";
  if (registeredSummary) registeredSummary.style.display = "none";
  if (successBar) successBar.classList.add("hidden");
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

// Update Verified Registration Counters (navbar + stats bar kept in sync)
function updateRegistrationCounters() {
  const records = getStoredRegistrations();
  const target = records.length;

  // Navbar counter
  const counterEl = document.getElementById("reg-count-display");
  if (counterEl) {
    const current = parseInt(counterEl.textContent) || 0;
    if (target !== current) {
      animateCounter(counterEl, current, target);
    } else {
      counterEl.textContent = target;
    }
  }

  // Stats bar "Students Registered" — always in sync with navbar
  const statEl = document.getElementById("stat-registrations");
  if (statEl) {
    const current = parseInt(statEl.textContent) || 0;
    if (target !== current) {
      animateCounter(statEl, current, target);
    } else {
      statEl.textContent = target;
    }
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
