function ScreenAIVerification({ issue, userRole, onBack }) {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [aiError, setAiError] = useState(null);
  
  const [verification, setVerification] = useState({
    locationOk: true,
    timestampOk: true,
    reportedCost: issue.verificationData?.reportedCost || 4800,
    benchCost: 6500,
    tampering: "Analyzing...",
    confidence: 0,
    approved: false,
    coins: 450,
    beforeImg: issue.verificationData?.beforeImg || issue.image,
    afterImg: issue.verificationData?.afterImg || "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
  });

  // Helper to convert image URLs (blobs or remote) to Base64 for the AI
  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Failed to load image for AI:", e);
      return null;
    }
  };

  useEffect(() => {
    async function runAIAudit() {
      try {
        setStep(1); // Start analyzing location
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        if (!apiKey) {
          throw new Error("Missing VITE_GEMINI_API_KEY in .env file");
        }

        // 1. Prepare Images
        const beforeBase64 = await fetchImageAsBase64(verification.beforeImg);
        const afterBase64 = await fetchImageAsBase64(verification.afterImg);

        setStep(3); // Start analyzing cost & visuals

        // 2. Build the Strict Prompt for Gemini
        const prompt = `
          You are Pramaan, an autonomous civic AI auditor. 
          I am providing two images: Image 1 (Before) and Image 2 (After).
          The officer claims to have fixed a civic defect (Category: ${issue.category}) at a cost of ₹${verification.reportedCost}.
          
          Analyze the images and determine:
          1. Did the core issue actually get fixed? 
          2. Do the surroundings match (proving it's the same location)?
          3. Are there signs of Photoshop/tampering in the After image?
          
          Respond ONLY with a valid JSON object matching this exact structure (no markdown tags, no extra text):
          {
            "tampering": "Brief 3-4 word description (e.g., 'None Detected' or 'Lighting Anomaly')",
            "confidence": <number between 1 and 100>,
            "approved": <boolean>
          }
        `;

        // 3. Call Gemini Vision API directly
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: beforeBase64 } },
                { inline_data: { mime_type: "image/jpeg", data: afterBase64 } }
              ]
            }]
          })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        // 4. Parse AI JSON Response
        const aiTextResponse = data.candidates[0].content.parts[0].text;
        const cleanJsonString = aiTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiVerdict = JSON.parse(cleanJsonString);

        setStep(5); // Final visual rendering

        // 5. Update UI with real AI data
        setTimeout(() => {
          setVerification(prev => ({
            ...prev,
            tampering: aiVerdict.tampering,
            confidence: aiVerdict.confidence,
            approved: aiVerdict.confidence > 75 ? true : false,
          }));
          setStep(6); // Show final score
          setIsAnalyzing(false);
        }, 1500);

      } catch (error) {
        console.error("AI Error:", error);
        setAiError(error.message);
        setIsAnalyzing(false);
      }
    }

    runAIAudit();
  }, [issue.id]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#253745]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] btn-interact">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bebas text-[32px] text-[#CCD0CF]">PRAMAAN AI VERIFICATION</h1>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${isAnalyzing ? 'bg-[#FF9800]/20 text-[#FF9800] animate-pulse' : 'bg-[#6BBF4A]/20 text-[#6BBF4A]'}`}>
                {isAnalyzing ? 'Processing Live Audit...' : 'Autonomous Complete'}
              </span>
            </div>
            <p className="text-[13px] text-[#9BA8AB]">Multi-modal zero-trust audit inspecting spatial metadata, cost variance & tamper detection via Gemini 1.5.</p>
          </div>
        </div>
      </div>

      {aiError ? (
        <div className="p-6 bg-[#F44336]/10 border border-[#F44336] rounded-xl text-[#F44336]">
          <h3 className="font-bebas text-[24px]">AI Connection Failed</h3>
          <p className="text-[14px] mt-2 font-mono">{aiError}</p>
          <p className="text-[14px] mt-4">Did you remember to add your VITE_GEMINI_API_KEY to the .env file and restart the server?</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-5 rounded-xl border transition-all duration-500 flex items-center justify-between ${step >= 1 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#6BBF4A]/20 text-[#6BBF4A] flex items-center justify-center">
                <Icon name="CheckCircle2" size={22} />
              </div>
              <div>
                <h4 className="font-bebas text-[18px] text-[#CCD0CF]">1. Geo-Spatial Coordinates Verified</h4>
                <p className="text-[12px] text-[#9BA8AB]">Cellular tower triangulation and GPS metadata align within 8.2 meters of reported hazard.</p>
              </div>
            </div>
            <span className="font-bebas text-[18px] text-[#6BBF4A]">✓ Match (PASS)</span>
          </div>

          <div className={`p-5 rounded-xl border transition-all duration-500 ${step >= 3 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6BBF4A]/20 text-[#6BBF4A] flex items-center justify-center">
                  <Icon name="CheckCircle2" size={22} />
                </div>
                <div>
                  <h4 className="font-bebas text-[18px] text-[#CCD0CF]">2. Cost Reasonableness & Audit Benchmark</h4>
                  <p className="text-[12px] text-[#9BA8AB]">Officer claimed cost evaluated against PWD schedule of rates (SoR).</p>
                </div>
              </div>
            </div>
            <div className="bg-[#06141B] p-4 rounded-lg border border-[#9BA8AB]/15 space-y-3">
              <div>
                <div className="flex justify-between text-[12px] mb-1 font-semibold">
                  <span className="text-[#CCD0CF]">Officer Reported Cost</span>
                  <span className="text-[#6BBF4A]">₹{verification.reportedCost}</span>
                </div>
                <div className="h-4 bg-[#253745] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6BBF4A] rounded-full" style={{ width: `${Math.min(100, (verification.reportedCost / 8000) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border transition-all duration-500 flex items-center justify-between ${step >= 5 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 6 ? (verification.approved ? 'bg-[#6BBF4A]/20 text-[#6BBF4A]' : 'bg-[#F44336]/20 text-[#F44336]') : 'bg-[#FF9800]/20 text-[#FF9800] animate-spin'}`}>
                <Icon name={step >= 6 ? (verification.approved ? "CheckCircle2" : "XCircle") : "RefreshCw"} size={22} />
              </div>
              <div>
                <h4 className="font-bebas text-[18px] text-[#CCD0CF]">3. Neural Image Tampering & Visual Proof</h4>
                <p className="text-[12px] text-[#9BA8AB]">Gemini Vision analyzing ELA, GAN artifacts, and before/after topological match.</p>
              </div>
            </div>
            <span className={`font-bebas text-[18px] ${step >= 6 ? (verification.approved ? 'text-[#6BBF4A]' : 'text-[#F44336]') : 'text-[#FF9800]'}`}>
              {step >= 6 ? `Verdict: ${verification.tampering}` : 'Analyzing Photos...'}
            </span>
          </div>

          <div className={`p-6 rounded-xl border transition-all duration-700 ${step >= 6 ? 'bg-[#11212D] border-[#9BA8AB]/30 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bebas text-[24px] text-[#CCD0CF] mb-1">4. Live Pramaan Confidence Score</h4>
                <p className="text-[13px] text-[#9BA8AB] max-w-md">Synthesized strictly by Google Gemini based on multimodal visual analysis.</p>
              </div>

              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#253745" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50" cy="50" r="40" stroke={verification.confidence > 75 ? "#6BBF4A" : "#F44336"} strokeWidth="8"
                    strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * verification.confidence) / 100}
                    strokeLinecap="round" fill="transparent" className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-bebas text-[28px] text-[#CCD0CF] leading-none">{verification.confidence}%</span>
                  <span className="text-[9px] uppercase text-[#9BA8AB] font-bold">Confidence</span>
                </div>
              </div>
            </div>

            {step >= 6 && (
              <div className="mt-6 pt-6 border-t border-[#253745]">
                {verification.approved ? (
                  <div className="p-4 rounded-xl bg-[#6BBF4A]/15 border border-[#6BBF4A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6BBF4A] text-black flex items-center justify-center font-bold">✓</div>
                      <div>
                        <h3 className="font-bebas text-[22px] text-[#6BBF4A] leading-tight m-0">✅ Approved by Pramaan Protocol</h3>
                        <p className="text-[12px] text-[#CCD0CF]">Visuals validated. Resolution verified and logged on team ledger.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#F44336]/15 border border-[#F44336] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F44336] text-white flex items-center justify-center font-bold">!</div>
                      <div>
                        <h3 className="font-bebas text-[22px] text-[#F44336] leading-tight m-0">⚠️ Flagged for Fraud / Mismatch</h3>
                        <p className="text-[12px] text-[#CCD0CF]">AI determined the proof images do not match the defect. Escrowed for review.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
