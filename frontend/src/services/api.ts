import type { HealthProfile, MedicineInfo, LibraryItem } from '../types';

const API_BASE = '/api';

// Fallback initial demo profile
export const initialHealthProfile: HealthProfile = {
  name: "Alex Morgan",
  age: 32,
  gender: "Female",
  height: "168 cm",
  weight: "62 kg",
  bloodGroup: "O+",
  allergies: "Penicillin",
  conditions: "Mild seasonal asthma",
  medications: "Albuterol inhaler (as needed)",
  emergencyContact: "David Morgan (+1 555-019-283)"
};

// Fallback initial library items
export const sampleLibrary: LibraryItem[] = [
  {
    id: "lib-1",
    title: "Understanding Fevers & When to Seek Emergency Care",
    category: "Common Symptoms",
    readTime: "4 min read",
    summary: "How body temperature regulation works and the critical red flags that require urgent medical attention.",
    content: "A fever is usually a sign that your body is fighting off an infection. For adults, a fever is generally considered a body temperature of 100.4°F (38°C) or higher.\n\n### When to seek immediate emergency care:\n- Difficulty breathing or chest pain\n- Stiff neck paired with confusion or high fever\n- Persistent vomiting or inability to keep liquids down\n- Extreme lethargy or sudden confusion\n- Fever exceeding 103°F (39.4°C) that doesn't respond to antipyretics\n\nAlways monitor accompanying symptoms and hydrate adequately.",
    tags: ["fever", "infection", "urgent care"]
  },
  {
    id: "lib-2",
    title: "Safe Use of Over-The-Counter Pain Relievers",
    category: "Medicines",
    readTime: "5 min read",
    summary: "Differences between Acetaminophen, Ibuprofen, and Naproxen, including organ cautions and proper intervals.",
    content: "Different pain relievers work through distinct mechanisms in the body:\n\n1. **Acetaminophen (Paracetamol)**: Primarily relieves pain and reduces fever. Filtered by the liver. Safe limit is typically 3000-4000mg/day for healthy adults.\n2. **NSAIDs (Ibuprofen, Naproxen)**: Reduce inflammation, pain, and swelling. Filtered by the kidneys; can irritate the stomach lining. Take with food.\n\n*Caution: Never combine multiple products containing acetaminophen as it may cause unintentional overdose.*",
    tags: ["paracetamol", "ibuprofen", "pain relief"]
  },
  {
    id: "lib-3",
    title: "Sleep Hygiene: Evidence-Based Tips for Restorative Rest",
    category: "Sleep",
    readTime: "3 min read",
    summary: "Circadian rhythm alignment, blue-light mitigation, and wind-down rituals to improve sleep architecture.",
    content: "Optimizing sleep is foundational for immune resilience and cognitive function:\n\n- **Consistent Sleep-Wake Timing**: Keep bedtime and wake-up times within 30 minutes, even on weekends.\n- **Light Regulation**: Get direct sunlight within 60 minutes of waking; limit screens or blue light 90 minutes before bed.\n- **Temperature Optimization**: Cool bedroom temperatures (around 65°F / 18°C) facilitate the core body cooling needed for deep sleep.\n- **Caffeine Cutoff**: Avoid caffeine 8-10 hours prior to scheduled sleep.",
    tags: ["sleep", "circadian rhythm", "wellness"]
  },
  {
    id: "lib-4",
    title: "Deciphering Your Complete Blood Count (CBC) Lab Report",
    category: "Common Symptoms",
    readTime: "6 min read",
    summary: "What RBC, WBC, Hemoglobin, and Platelet reference intervals mean in a standard diagnostic panel.",
    content: "A Complete Blood Count evaluates your overall health and detects a variety of conditions:\n\n- **WBC (White Blood Cells)**: Immune defenders. Elevated numbers can signal infection, stress, or inflammation.\n- **RBC & Hemoglobin**: Oxygen transporters. Low counts may indicate anemia, fatigue, or nutritional deficiencies.\n- **Platelets**: Essential for blood clotting and wound repair.\n\n*Note: Always review lab results in context with your prescribing physician.*",
    tags: ["blood test", "lab report", "cbc"]
  },
  {
    id: "lib-5",
    title: "Nutritional Essentials for Gut Microbiome Health",
    category: "Nutrition",
    readTime: "4 min read",
    summary: "Prebiotics, fermented foods, and diverse fiber intake to support healthy digestion and immune function.",
    content: "A diverse microbiome supports immune strength, mood synthesis, and nutrient absorption:\n\n- Eat 30+ diverse plant varieties weekly (seeds, legumes, herbs, greens).\n- Incorporate fermented items like kefir, kimchi, sauerkraut, or unsweetened yogurt.\n- Stay well-hydrated to facilitate fiber passage.",
    tags: ["gut health", "nutrition", "microbiome"]
  },
  {
    id: "lib-6",
    title: "Basic First Aid for Minor Burns and Scalds",
    category: "First Aid",
    readTime: "3 min read",
    summary: "Immediate steps to take for first and second-degree thermal burns and what NOT to apply.",
    content: "Immediate steps for minor burns:\n\n1. **Cool Water**: Hold the affected area under cool running water for 10-20 minutes. Do NOT use ice or freezing water.\n2. **Protect**: Cover loosely with sterile non-stick gauze.\n3. **Avoid Folk Remedies**: Never apply butter, oil, toothpaste, or egg whites.\n4. **Seek Medical Help**: If the burn blisters extensively, covers joints or the face, or is larger than 3 inches.",
    tags: ["first aid", "burns", "safety"]
  }
];

export const sampleMedicines: MedicineInfo[] = [
  {
    name: "Paracetamol (Acetaminophen)",
    commonUse: "Relief of mild-to-moderate pain and reduction of fever.",
    drugClass: "Analgesic & Antipyretic",
    sideEffects: ["Nausea (mild)", "Rash (rare)", "Headache (rare)"],
    warnings: [
      "Do not exceed maximum daily limits (4,000 mg/24h) to avoid liver toxicity.",
      "Check other cough/cold products to ensure they don't also contain paracetamol.",
      "Avoid regular alcohol consumption while taking this medication."
    ],
    whenToSeekHelp: [
      "Signs of allergic reaction (swelling, hives, wheezing)",
      "Unexplained nausea, upper right abdominal pain, or jaundice (yellowing skin/eyes)"
    ]
  },
  {
    name: "Ibuprofen",
    commonUse: "Relief of inflammation, joint pain, menstrual cramps, dental pain, and fever.",
    drugClass: "NSAID (Nonsteroidal Anti-inflammatory Drug)",
    sideEffects: ["Heartburn/indigestion", "Stomach irritation", "Dizziness"],
    warnings: [
      "Always take with or after meals or milk to protect stomach lining.",
      "Use caution if you have a history of peptic ulcers, asthma, or kidney disease.",
      "Avoid concurrent use with other NSAIDs like naproxen or aspirin."
    ],
    whenToSeekHelp: [
      "Black or tarry stools, or coffee-ground vomit (signs of gastrointestinal bleeding)",
      "Swelling in feet/ankles or sudden weight gain indicating kidney stress"
    ]
  },
  {
    name: "Cetirizine",
    commonUse: "Relief of seasonal and perennial allergic rhinitis, hives, and pollen allergies.",
    drugClass: "Second-generation Antihistamine",
    sideEffects: ["Mild drowsiness in some individuals", "Dry mouth", "Fatigue"],
    warnings: [
      "May cause mild drowsiness—use caution when driving or operating machinery initially.",
      "Avoid combining with central nervous system depressants or heavy alcohol."
    ],
    whenToSeekHelp: [
      "Difficulty breathing or sudden facial swelling (anaphylaxis)",
      "Severe rapid heartbeat or irregular pulse"
    ]
  },
  {
    name: "Amoxicillin",
    commonUse: "Prescription antibiotic for bacterial infections (ear, throat, respiratory, urinary).",
    drugClass: "Penicillin-class Beta-Lactam Antibiotic",
    sideEffects: ["Mild diarrhea", "Nausea", "Vomiting"],
    warnings: [
      "Requires a valid doctor's prescription.",
      "Must complete the full prescribed course even if feeling better, to prevent bacterial resistance.",
      "Ineffective against viral illnesses like common cold or influenza."
    ],
    whenToSeekHelp: [
      "Skin rash, hives, difficulty breathing (penicillin allergy)",
      "Severe watery or bloody diarrhea during or after the treatment"
    ]
  }
];

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  profile?: HealthProfile,
  attachment?: { name: string; type: string; base64Data?: string }
): Promise<{ conversationId: string; message: string; timestamp: string; isWarning?: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationId,
        healthProfile: profile,
        attachment
      })
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API not reachable or error, switching to graceful client fallback:", err);
  }

  // Graceful local AI health simulation if backend is offline
  await new Promise(r => setTimeout(r, 900));
  const lower = message.toLowerCase();

  let fallbackReply = "";
  let isWarning = false;

  if (lower.includes("emergency") || lower.includes("chest pain") || lower.includes("can't breathe") || lower.includes("cannot breathe") || lower.includes("stroke")) {
    isWarning = true;
    fallbackReply = `### ⚠️ Urgent Medical Warning\n\nSymptoms involving acute chest pain, severe shortness of breath, sudden numbness, or loss of consciousness require **immediate emergency medical evaluation**.\n\n- **Call Emergency Services (911 / 112 / your local emergency number)** immediately.\n- Do not drive yourself to the emergency department.\n- Rest in a comfortable seated position while awaiting assistance.\n\n*Disclaimer: Health Companion cannot replace immediate in-person emergency care.*`;
  } else if (lower.includes("fever") && lower.includes("headache")) {
    fallbackReply = `Sorry to hear you're dealing with a fever and headache. To help provide safe and tailored context, a few follow-up questions can be helpful:\n\n- **Temperature**: Have you measured your temperature with a thermometer? (e.g., above 101°F / 38.3°C?)\n- **Duration**: How many days or hours have you felt this way?\n- **Associated Symptoms**: Do you have a stiff neck, sensitivity to light, nausea, cough, or sore throat?\n- **Medications**: Have you taken any antipyretics like paracetamol or ibuprofen today?\n\n### General Comfort Measures in the Meantime:\n1. **Hydration**: Drink water, herbal teas, or electrolyte solutions.\n2. **Rest**: Rest in a dim, quiet room to ease head tension.\n3. **Cool Compress**: A damp cloth on the forehead can provide gentle comfort.\n\n*Note: If your fever exceeds 103°F (39.4°C), is accompanied by a rigid neck or sudden confusion, please seek prompt medical care.*`;
  } else if (lower.includes("paracetamol") || lower.includes("medicine") || lower.includes("ibuprofen")) {
    fallbackReply = `### Medicine Information Overview\n\n- **Paracetamol (Acetaminophen)**: Widely used for lowering fever and easing mild-to-moderate aches. Maximum daily limit for adults is typically 3000–4000 mg.\n- **Ibuprofen (NSAID)**: Helps relieve inflammatory pain and reduce fever. Should always be taken with food.\n\n*Important Safety Advice*: Always check packaging labels for exact active ingredient concentrations, adhere strictly to recommended intervals, and consult your pharmacist or doctor before combining medications.`;
  } else if (lower.includes("lab") || lower.includes("report") || lower.includes("cbc")) {
    fallbackReply = `### Interpreting Lab Documents\n\nI can help break down common diagnostic markers (such as CBC, lipid profiles, metabolic panels, or liver enzymes) in simple terms!\n\nFeel free to type out your specific results (such as Hemoglobin, WBC count, Platelets) or upload your lab report image/PDF using the **paperclip or image icon** below.\n\n*Reminder: AI explanations are informational only and should always be reviewed alongside your ordering physician's clinical assessment.*`;
  } else if (lower.includes("sleep")) {
    fallbackReply = `### Evidence-Based Sleep Guidance\n\nImproving your restorative sleep starts with regulating your circadian rhythm:\n\n1. **Consistent Wake Time**: Wake up at the same hour daily to stabilize your body clock.\n2. **Morning Sunlight**: Get 10–15 minutes of outdoor sunlight within an hour of waking.\n3. **Dim Screens Before Bed**: Reduce blue light exposure from phones and laptops 60–90 minutes prior to sleep.\n4. **Cool Environment**: Keep your bedroom around 65°F–68°F (18°C–20°C).\n5. **Limit Stimulants**: Avoid caffeine within 8 hours of your scheduled bedtime.`;
  } else {
    fallbackReply = `Thank you for sharing. Could you tell me a little more about what you're experiencing?\n\n- When did these symptoms begin?\n- On a scale of 1 to 10, how severe is the discomfort?\n- Have you noticed anything that makes it better or worse?\n\nSharing any current medications or relevant conditions also helps me provide more relevant general health information.\n\n*Remember: This information is educational and is not a clinical diagnosis or medical prescription.*`;
  }

  return {
    conversationId: conversationId || `conv-${Date.now()}`,
    message: fallbackReply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isWarning
  };
}

export async function uploadDocument(file: File): Promise<{
  id: string;
  name: string;
  type: string;
  size: string;
  extractedSummary: string;
  base64Data?: string;
}> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend document upload not reachable, using client preview:", err);
  }

  // Fallback client-side file reading
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  return {
    id: `doc-${Date.now()}`,
    name: file.name,
    type: file.type,
    size: `${(file.size / 1024).toFixed(1)} KB`,
    extractedSummary: `Medical file "${file.name}" uploaded successfully.`,
    base64Data
  };
}
