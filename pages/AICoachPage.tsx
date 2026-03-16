
import React, { useRef, useState, useEffect } from 'react';
import { TranslationSet } from '../types';

declare const Pose: any;
declare const Camera: any;
declare const drawConnectors: any;
declare const drawLandmarks: any;
declare const POSE_CONNECTIONS: any;

// Helper to ensure reference image analysis
// Helper to ensure reference image analysis
const analyzeImagePose = async (imageElement: HTMLImageElement, canvasElement: HTMLCanvasElement, attempt = 0) => {
  if (!imageElement.complete || !imageElement.naturalWidth) return;

  // Check if MediapPipe Pose is loaded
  if (typeof Pose === 'undefined') {
    if (attempt < 20) {
      console.log("Waiting for MediaPipe Pose...", attempt);
      setTimeout(() => analyzeImagePose(imageElement, canvasElement, attempt + 1), 500);
    }
    return;
  }

  // Match canvas logic to image
  canvasElement.width = imageElement.naturalWidth;
  canvasElement.height = imageElement.naturalHeight;

  const pose = new Pose({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  pose.onResults((results: any) => {
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: 'rgba(255, 255, 255, 0.6)', lineWidth: 4 });
      drawLandmarks(ctx, results.poseLandmarks, { color: '#34d399', lineWidth: 2, radius: 4 });
    }
    ctx.restore();
  });

  try {
    await pose.send({ image: imageElement });
  } catch (error) {
    console.error("Reference Pose Analysis Error:", error);
  } finally {
    await pose.close();
  }
};

type YogaPose = 'meditation' | 'mountain' | 'warrior';

interface JointStatus {
  spine: boolean;
  shoulders: boolean;
  balance: boolean;
  limbs: boolean;
}

const poseData = {
  meditation: {
    title: 'Méditation (Sukhasana)',
    icon: '🧘',
    image: '/images/pose-meditation.jpg',
    checklist: [
      { l: "Colonne Verticale", key: "spine" },
      { l: "Épaules Alignées", key: "shoulders" },
      { l: "Base Stable", key: "balance" },
      { l: "Bras Relaxés", key: "limbs" }
    ],
  },
  mountain: {
    title: 'Posture de la Montagne (Tadasana)',
    icon: '🏔️',
    image: '/images/pose-mountain.jpg',
    checklist: [
      { l: "Symétrie", key: "spine" },
      { l: "Épaules à Niveau", key: "shoulders" },
      { l: "Ancrage", key: "balance" },
      { l: "Alignement Bras", key: "limbs" }
    ],
  },
  warrior: {
    title: 'Guerrier II (Virabhadrasana)',
    icon: '⚔️',
    image: '/images/pose-warrior.jpg',
    checklist: [
      { l: "Fente Profonde", key: "balance" },
      { l: "Épaules Niveau", key: "shoulders" },
      { l: "Colonne Verticale", key: "spine" },
      { l: "Bras Étendus", key: "limbs" }
    ],
  }
};

const AICoachPage: React.FC<{ t: TranslationSet }> = ({ t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refImageRef = useRef<HTMLImageElement>(null);
  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedPose, setSelectedPose] = useState<YogaPose>('meditation');
  const [feedback, setFeedback] = useState(t.aiCoach.feedbackInitial);
  const [holdTime, setHoldTime] = useState(0);
  const [isPoseAligned, setIsPoseAligned] = useState(false);
  const [jointStatus, setJointStatus] = useState<JointStatus>({
    spine: false,
    shoulders: false,
    balance: false,
    limbs: false
  });

  const currentPose = poseData[selectedPose];
  const cameraRef = useRef<any>(null);
  const poseInstanceRef = useRef<any>(null);
  const activeFlag = useRef(false);

  useEffect(() => {
    return () => stopCoaching();
  }, []);

  const calculateJointAngle = (A: any, B: any, C: any) => {
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return Math.round(angle);
  };

  const drawJointLabel = (ctx: CanvasRenderingContext2D, point: any, text: string, color: string) => {
    if (!canvasRef.current) return;
    const x = point.x * canvasRef.current.width;
    const y = point.y * canvasRef.current.height;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath();
    ctx.roundRect(x + 10, y - 25, 55, 20, 4);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = 'bold 11px Inter';
    ctx.fillText(text, x + 16, y - 11);
  };

  const onResults = (results: any) => {
    if (!activeFlag.current || !canvasRef.current || !videoRef.current) return;
    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: 'rgba(255, 255, 255, 0.4)', lineWidth: 2 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#ef4444', lineWidth: 1, radius: 4 });
      const lm = results.poseLandmarks;
      const shoulderSymmetry = Math.abs(lm[11].y - lm[12].y);
      const midShoulderX = (lm[11].x + lm[12].x) / 2;
      const midHipX = (lm[23].x + lm[24].x) / 2;
      const spineLean = Math.abs(midShoulderX - midHipX);
      const shoulderScore = Math.max(0, 1 - (shoulderSymmetry / 0.08));
      const spineScore = Math.max(0, 1 - (spineLean / 0.12));
      let balanceScore = 0;
      let limbsScore = 0;
      if (selectedPose === 'mountain') {
        balanceScore = Math.max(0, 1 - (Math.abs(lm[0].x - midHipX) / 0.1));
        limbsScore = Math.max(0, 1 - (Math.abs(lm[15].x - lm[11].x) / 0.2));
      } else if (selectedPose === 'warrior') {
        const kneeAngle = calculateJointAngle(lm[24], lm[26], lm[28]);
        balanceScore = Math.max(0, 1 - (Math.abs(kneeAngle - 90) / 45));
        limbsScore = Math.max(0, 1 - (Math.abs(lm[15].y - lm[11].y) / 0.1));
      } else {
        balanceScore = Math.max(0, 1 - (Math.abs(lm[27].y - lm[28].y) / 0.2));
        limbsScore = lm[15].y > lm[23].y ? 1.0 : 0.0;
      }
      const isShoulderOk = shoulderSymmetry < 0.035;
      const isSpineOk = spineLean < 0.045;
      const isBalanceOk = balanceScore > 0.8;
      const isLimbsOk = limbsScore > 0.8;
      setJointStatus({ shoulders: isShoulderOk, spine: isSpineOk, balance: isBalanceOk, limbs: isLimbsOk });
      const totalScore = Math.round((shoulderScore * 0.25 + spineScore * 0.35 + balanceScore * 0.2 + limbsScore * 0.2) * 100);

      const allOk = totalScore > 85;
      setIsPoseAligned(allOk);
      if (totalScore < 50) setFeedback("Entrez dans la zone de scan.");
      else if (!isSpineOk) setFeedback("Redressez votre colonne !");
      else if (!isShoulderOk) setFeedback("Épaules non-symétriques.");
      else if (allOk) setFeedback(t.aiCoach.feedbackExcellent);
      else setFeedback(t.aiCoach.feedbackAdjust);

      drawJointLabel(canvasCtx, lm[11], `${Math.round(shoulderScore * 100)}%`, isShoulderOk ? '#22c55e' : '#ef4444');
      drawJointLabel(canvasCtx, lm[0], `VERT: ${Math.round(spineScore * 100)}%`, isSpineOk ? '#22c55e' : '#ef4444');
    } else {
      setIsPoseAligned(false);
      setFeedback("Sujet perdu. Reculez.");
    }
    canvasCtx.restore();
  };

  const startCoaching = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setFeedback(t.aiCoach.feedbackScanning);
    activeFlag.current = true;
    setIsActive(true);
    const pose = new Pose({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    pose.setOptions({ modelComplexity: 2, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.8, minTrackingConfidence: 0.8 });
    pose.onResults(onResults);
    poseInstanceRef.current = pose;
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (activeFlag.current && poseInstanceRef.current && videoRef.current) {
          try { await poseInstanceRef.current.send({ image: videoRef.current }); } catch (e) { }
        }
      }, width: 1280, height: 720
    });
    camera.start();
    cameraRef.current = camera;
  };

  const stopCoaching = () => {
    activeFlag.current = false;
    setIsActive(false);

    // Fully stop camera streams
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    if (cameraRef.current) {
      try { cameraRef.current.stop(); } catch (e) { }
      cameraRef.current = null;
    }

    if (poseInstanceRef.current) {
      try { poseInstanceRef.current.close(); } catch (e) { }
      poseInstanceRef.current = null;
    }

    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    setHoldTime(0);
    setJointStatus({ spine: false, shoulders: false, balance: false, limbs: false });
    setFeedback(t.aiCoach.feedbackInitial);
  };

  useEffect(() => {
    let interval: any;
    if (isActive && isPoseAligned) { interval = setInterval(() => setHoldTime(prev => prev + 1), 1000); }
    return () => clearInterval(interval);
  }, [isActive, isPoseAligned]);

  // Analyze reference pose when selection changes
  useEffect(() => {
    const img = refImageRef.current;
    const canvas = refCanvasRef.current;
    if (img && canvas) {
      if (img.complete) {
        analyzeImagePose(img, canvas);
      } else {
        img.onload = () => analyzeImagePose(img, canvas);
      }
    }
  }, [selectedPose]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase rounded skew-x-[-12deg]">Elite AI v3.2</span>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">{t.aiCoach.title}</h1>
          </div>
          <p className="text-gray-400 text-sm">{t.aiCoach.subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
          <div className="grid grid-cols-3 bg-zinc-900 p-1 rounded-xl border border-white/5 flex-grow sm:flex-grow-0 gap-1">
            {(['meditation', 'mountain', 'warrior'] as YogaPose[]).map((p) => (
              <button
                key={p}
                disabled={isActive}
                onClick={() => setSelectedPose(p)}
                className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-300 border border-transparent ${selectedPose === p
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border-red-500'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 disabled:opacity-30'
                  }`}
              >
                <span className="text-lg mb-0">{poseData[p].icon}</span>
                <span className="text-[9px] font-black uppercase tracking-tighter whitespace-nowrap">{p}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {!isActive ? (
              <button
                onClick={startCoaching}
                className="bg-red-600 px-6 py-2.5 rounded-xl font-black uppercase text-sm hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] flex-grow sm:flex-grow-0"
              >
                {t.aiCoach.startBtn}
              </button>
            ) : (
              <button
                onClick={stopCoaching}
                className="bg-zinc-800 px-6 py-2.5 rounded-xl font-black uppercase text-sm hover:bg-white hover:text-black transition-all flex-grow sm:flex-grow-0 border border-white/10"
              >
                {t.aiCoach.finishBtn}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 flex-grow">
        {/* Main Visual Comparison Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Reference Guide - Left Column */}
          <div className="bg-red-600 p-6 rounded-[40px] border border-white/10 shadow-2xl flex flex-col h-full">
            <h3 className="font-bold uppercase mb-4 text-white/70 text-[10px] tracking-[0.2em]">Neural Engine v3.2 - Guide</h3>
            <div className="bg-black/30 rounded-3xl border border-white/5 overflow-hidden flex-grow relative min-h-[300px]">
              <div className="absolute inset-0 w-full h-full">
                <img
                  ref={refImageRef}
                  src={currentPose.image}
                  alt={currentPose.title}
                  className="w-full h-full object-contain p-4 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 relative z-10"
                  crossOrigin="anonymous"
                />
                <canvas
                  ref={refCanvasRef}
                  className="absolute inset-0 w-full h-full object-contain p-4 pointer-events-none z-20"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <span className="text-3xl">{currentPose.icon}</span>
                <div className="font-black uppercase tracking-tight text-xl leading-none text-white">{selectedPose}</div>
              </div>
              <div className="absolute top-4 right-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/10 ${isActive ? (isPoseAligned ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300 animate-pulse') : 'bg-white/10 text-white/40'}`}>
                  {isActive ? (isPoseAligned ? 'Anatomical Lock' : 'Analyse en cours...') : 'System Standby'}
                </div>
              </div>
            </div>
          </div>

          {/* Camera Source - Right Column */}
          <div className="relative bg-zinc-950 rounded-[40px] overflow-hidden border border-white/10 aspect-video shadow-2xl h-full min-h-[300px]">
            {!isActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 bg-black/60 backdrop-blur-md">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                  <span className="text-4xl animate-bounce">{currentPose.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">Votre Flux Caméra</h3>
                <p className="text-gray-400 max-w-sm italic text-sm">Prêt pour l'analyse...</p>
              </div>
            )}
            <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`} />
            <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1] z-20 pointer-events-none" />
            
            {/* Overlay Timer on Camera */}
            {isActive && (
              <div className="absolute top-6 right-6 z-30">
                <div className={`px-6 py-3 rounded-2xl skew-x-[-12deg] shadow-2xl transition-all duration-500 flex flex-col items-center justify-center ${isPoseAligned ? 'bg-green-600' : 'bg-red-600'}`}>
                  <div className="skew-x-[12deg] text-center text-white">
                    <div className="text-[10px] font-black uppercase opacity-80 leading-none mb-1 text-white">{t.aiCoach.timeAligned}</div>
                    <div className="text-2xl font-black tabular-nums tracking-tighter leading-none text-white">
                      {Math.floor(holdTime / 60)}:{String(holdTime % 60).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lower Stats & Biofeedback Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback Message */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {isActive ? (
              <div className="flex-grow bg-zinc-900 px-8 py-6 rounded-[32px] border border-white/10 shadow-xl flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20 shrink-0">
                  <div className={`w-4 h-4 rounded-full ${isPoseAligned ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1 leading-none">Diagnostic Bio-Anatomique</span>
                  <span className={`text-2xl font-bold italic tracking-tight ${isPoseAligned ? 'text-green-400' : 'text-white'}`}>
                    {feedback}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-grow bg-zinc-900/40 p-8 rounded-[32px] border border-white/5 flex items-center gap-6">
                 <div className="p-4 rounded-2xl bg-white/5 text-2xl">💡</div>
                 <p className="text-gray-400 italic text-sm">Positionnez-vous de manière à voir votre corps en entier pour un scan de précision de l'IA.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-zinc-900/80 p-6 rounded-[32px] border border-white/10 shadow-xl">
              <h3 className="font-bold uppercase mb-4 text-gray-500 text-[10px] tracking-[0.2em]">{t.aiCoach.vectorsTitle}</h3>
              <div className="space-y-3">
                {currentPose.checklist.map((item, i) => {
                  const statusKey = item.key as keyof JointStatus;
                  const isOk = isActive && jointStatus[statusKey];
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold uppercase transition-colors ${isOk ? 'text-white' : 'text-white/40'}`}>{item.l}</span>
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${isOk ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-zinc-800'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-5 rounded-2xl border border-white/10 bg-red-700 flex items-center gap-4">
              <div className="text-xl opacity-60 text-white">🎯</div>
              <div>
                <div className="text-[10px] font-black uppercase mb-0.5 text-white">{t.aiCoach.objectiveTitle}</div>
                <p className="text-[10px] text-white/70 leading-tight uppercase font-semibold">{t.aiCoach.objectiveDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
