
import React, { useRef, useState, useEffect } from 'react';
import { TranslationSet } from '../types';

declare const Pose: any;
declare const Camera: any;
declare const drawConnectors: any;
declare const drawLandmarks: any;
declare const POSE_CONNECTIONS: any;

// Helper to ensure reference image analysis
// Helper to ensure reference image analysis
const analyzeImagePose = async (imageElement: HTMLImageElement, canvasElement: HTMLCanvasElement, onRefLandmarks: (lm: any) => void, attempt = 0) => {
  if (!imageElement.complete || !imageElement.naturalWidth) return;

  // Check if MediapPipe Pose is loaded
  if (typeof Pose === 'undefined') {
    if (attempt < 20) {
      console.log("Waiting for MediaPipe Pose...", attempt);
      setTimeout(() => analyzeImagePose(imageElement, canvasElement, onRefLandmarks, attempt + 1), 500);
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
      onRefLandmarks(results.poseLandmarks);
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

type YogaPose = 'meditation' | 'mountain' | 'warrior' | 'tree' | 'squat' | 'pushup' | 'plank' | 'lunge' | 'burpee';

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
  },
  tree: {
    title: 'Posture de l\'Arbre (Vrksasana)',
    icon: '🌳',
    image: '/images/pose-tree.jpg',
    checklist: [
      { l: "Équilibre", key: "balance" },
      { l: "Colonne Verticale", key: "spine" },
      { l: "Ouverture Hanche", key: "limbs" },
      { l: "Mains Jointes", key: "shoulders" }
    ],
  },
  squat: { title: 'Squat', icon: '🦵', image: '', checklist: [], premium: true },
  pushup: { title: 'Pompes', icon: '💪', image: '', checklist: [], premium: true },
  plank: { title: 'Planche', icon: '⏸️', image: '', checklist: [], premium: true },
  lunge: { title: 'Fente', icon: '🚶', image: '', checklist: [], premium: true },
  burpee: { title: 'Burpee', icon: '🔥', image: '', checklist: [], premium: true }
};
interface AICoachPageProps {
  t: TranslationSet;
  onNavigate?: (page: string) => void;
}

const AICoachPage: React.FC<AICoachPageProps> = ({ t, onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refImageRef = useRef<HTMLImageElement>(null);
  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedPose, setSelectedPose] = useState<YogaPose>('meditation');
  const [feedback, setFeedback] = useState(t.aiCoach.feedbackInitial);
  const [holdTime, setHoldTime] = useState(0);
  const [isPoseAligned, setIsPoseAligned] = useState(false);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);
  const userImgRef = useRef<HTMLImageElement>(null);
  const refLandmarksRef = useRef<any>(null);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUserUploadedImage(url);
    }
  };

  useEffect(() => {
    return () => stopCoaching();
  }, []);

  const calculateJointAngle = (A: any, B: any, C: any) => {
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return Math.round(angle);
  };

  const getVector = (l: any[], a: number, b: number) => {
    const dx = l[b].x - l[a].x;
    const dy = l[b].y - l[a].y;
    const mag = Math.hypot(dx, dy) || 1;
    return { x: dx/mag, y: dy/mag };
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
    if (!activeFlag.current || !canvasRef.current) return;
    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: 'rgba(255, 255, 255, 0.4)', lineWidth: 2 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#ef4444', lineWidth: 1, radius: 4 });
      const lm = results.poseLandmarks;

      let shoulderScore = 0;
      let spineScore = 0;
      let balanceScore = 0;
      let limbsScore = 0;

      if (refLandmarksRef.current) {
        const ref = refLandmarksRef.current;
        const strictSim = (segs: number[][]) => {
           let bestScore = 0;
           // Test 4 orientations: Normal, MirrorX, MirrorY, MirrorBoth
           const flips = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
           
           flips.forEach(([fx, fy]) => {
             let dotSum = 0;
             segs.forEach(([a, b]) => {
                const v1 = getVector(ref, a, b);
                const v2 = getVector(lm, a, b);
                dotSum += (v1.x * (v2.x * fx) + v1.y * (v2.y * fy));
             });
             bestScore = Math.max(bestScore, dotSum / segs.length);
           });
           return bestScore;
        };
        
        shoulderScore = strictSim([[11, 12]]);
        spineScore = strictSim([[11, 23], [12, 24], [23, 24], [11, 24], [12, 23]]);
        balanceScore = strictSim([[23, 25], [24, 26], [25, 27], [26, 28]]);
        limbsScore = strictSim([[11, 13], [13, 15], [12, 14], [14, 16]]);
      } else {
        const shoulderSymmetry = Math.abs(lm[11].y - lm[12].y);
        const midShoulderX = (lm[11].x + lm[12].x) / 2;
        const midHipX = (lm[23].x + lm[24].x) / 2;
        const spineLean = Math.abs(midShoulderX - midHipX);
        shoulderScore = Math.max(0, 1 - (shoulderSymmetry / 0.08));
        spineScore = Math.max(0, 1 - (spineLean / 0.12));
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
      }

      const isShoulderOk = shoulderScore > 0.85;
      const isSpineOk = spineScore > 0.85;
      const isBalanceOk = balanceScore > 0.80;
      const isLimbsOk = limbsScore > 0.80;

      setJointStatus({ shoulders: isShoulderOk, spine: isSpineOk, balance: isBalanceOk, limbs: isLimbsOk });
      const totalScore = Math.round((shoulderScore * 0.25 + spineScore * 0.35 + balanceScore * 0.2 + limbsScore * 0.2) * 100);

      const allOk = totalScore >= 85 && isShoulderOk && isSpineOk;
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
      }, width: 640, height: 480
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

    setUserUploadedImage(null);
    setHoldTime(0);
    setJointStatus({ spine: false, shoulders: false, balance: false, limbs: false });
    setFeedback(t.aiCoach.feedbackInitial);
  };

  useEffect(() => {
    let interval: any;
    if (isActive && isPoseAligned && !userUploadedImage) { 
      interval = setInterval(() => setHoldTime(prev => prev + 1), 1000); 
    }
    return () => clearInterval(interval);
  }, [isActive, isPoseAligned, userUploadedImage]);

  // Analyze reference pose when selection changes
  useEffect(() => {
    const img = refImageRef.current;
    const canvas = refCanvasRef.current;
    if (img && canvas) {
      const run = () => analyzeImagePose(img, canvas, (lm) => { refLandmarksRef.current = lm; });
      if (img.complete) {
        run();
      } else {
        img.onload = run;
      }
    }
  }, [selectedPose]);

  // Analyze user uploaded image
  useEffect(() => {
    const img = userImgRef.current;
    if (img && userUploadedImage) {
      const analyzeUserImg = async () => {
        if (cameraRef.current) cameraRef.current.stop();
        activeFlag.current = true;
        setIsActive(true);
        setFeedback(t.aiCoach.feedbackScanning);

        if (canvasRef.current) {
          canvasRef.current.width = img.naturalWidth || 640;
          canvasRef.current.height = img.naturalHeight || 480;
        }

        const pose = new Pose({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
        pose.setOptions({ modelComplexity: 2, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
        pose.onResults(onResults);
        poseInstanceRef.current = pose;

        try {
          await pose.send({ image: img });
        } catch (e) {
          console.error(e);
        }
      };

      if (img.complete) {
        analyzeUserImg();
      } else {
        img.onload = analyzeUserImg;
      }
    }
  }, [userUploadedImage, selectedPose]);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4 h-full flex flex-col">
      {/* Header - Pose Selection */}
      <div className="flex justify-center mb-3">
        <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-white/5 w-full sm:w-auto gap-0.5 overflow-x-auto scrollbar-hide">
          {(['meditation', 'mountain', 'warrior', 'tree', 'squat', 'pushup', 'plank', 'lunge', 'burpee'] as YogaPose[]).map((p) => {
            const isLocked = (poseData[p] as any).premium;
            return (
              <button
                key={p}
                onClick={() => {
                  if (isLocked) {
                    onNavigate?.('memberships');
                  } else {
                    setSelectedPose(p);
                    setUserUploadedImage(null);
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300 border border-transparent whitespace-nowrap group ${selectedPose === p
                  ? 'bg-red-600 text-white shadow-lg border-red-500'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
              >
                <span className="text-xs">{poseData[p].icon}</span>
                <span className="text-[7px] font-black uppercase tracking-tighter flex items-center gap-1">
                  {p}
                  {isLocked && <span className="text-[6px] opacity-40 group-hover:opacity-100">🔒</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Main Dashboard Interaction Zone - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-[2.5fr_5.5fr_2fr] gap-4 items-stretch">
          
          {/* 1. Zone Référence */}
          <div className="bg-red-600 p-3 rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden max-h-[260px]">
            <h3 className="font-bold uppercase mb-2 text-white/70 text-[9px] tracking-[0.2em] px-1">1. RÉFÉRENCE</h3>
            <div className="bg-zinc-950/80 rounded-xl border border-white/10 overflow-hidden flex-grow relative min-h-[140px]">
              <div className="absolute inset-0 w-full h-full">
                <img
                  ref={refImageRef}
                  src={currentPose.image}
                  alt={currentPose.title}
                  className="w-full h-full object-contain p-2 grayscale opacity-80 transition-opacity relative z-10"
                  crossOrigin="anonymous"
                />
                <canvas ref={refCanvasRef} className="absolute inset-0 w-full h-full object-contain p-2 pointer-events-none z-20" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white">
                <span className="text-lg">{currentPose.icon}</span>
                <div className="font-black uppercase tracking-tight text-[10px]">{selectedPose}</div>
              </div>
            </div>
          </div>

          {/* 2. Zone Utilisateur (Live ou Photo) */}
          <div className="bg-zinc-950 p-3 rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden relative max-h-[260px]">
            <h3 className="font-bold uppercase mb-2 text-red-500 text-[9px] tracking-[0.2em] px-1">2. PRATIQUE</h3>
            
            <div className="flex gap-2 mb-2">
              <label className="flex-grow py-1.5 rounded-lg text-[8px] font-black uppercase bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700 cursor-pointer transition-all flex items-center justify-center gap-1">
                <span>📸 PHOTO</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              <button
                onClick={isActive && !userUploadedImage ? stopCoaching : startCoaching}
                className={`flex-grow py-1.5 rounded-lg text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1 border ${isActive && !userUploadedImage ? 'bg-white text-black border-white' : 'bg-red-600 text-white border-red-600 hover:bg-red-700'}`}
              >
                <span>{isActive && !userUploadedImage ? '🛑 STOP' : '🎥 LIVE'}</span>
              </button>
            </div>

            <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden flex-grow relative min-h-[140px] flex items-center justify-center">
              {!isActive && !userUploadedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 bg-black/60 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-2 border border-white/5">
                    <span className="text-lg">🧘</span>
                  </div>
                  <p className="text-gray-500 font-bold uppercase text-[8px] max-w-[120px]">Choisissez une source.</p>
                </div>
              )}
              
              {userUploadedImage ? (
                <div className="absolute inset-0 w-full h-full">
                  <img ref={userImgRef} src={userUploadedImage} crossOrigin="anonymous" className="w-full h-full object-contain z-10" alt="User upload" />
                  <canvas ref={canvasRef} width={640} height={480} className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none" />
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black/20">
                  <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-contain transform scale-x-[-1] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-20'}`} />
                  <canvas ref={canvasRef} width={640} height={480} className="absolute inset-0 w-full h-full object-contain transform scale-x-[-1] z-20 pointer-events-none" />
                </div>
              )}

              {/* Timer Overlay */}
              {isActive && !userUploadedImage && (
                <div className="absolute top-4 right-4 z-30">
                  <div className={`px-3 py-1.5 rounded-xl shadow-2xl transition-all ${isPoseAligned ? 'bg-green-600' : 'bg-red-600 animate-pulse'}`}>
                    <div className="text-white text-center">
                      <div className="text-[6px] font-black uppercase opacity-80 leading-none mb-0.5">Aligned</div>
                      <div className="text-base font-black tabular-nums tracking-tighter leading-none">
                        {Math.floor(holdTime / 60)}:{String(holdTime % 60).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Zone Exemples (Gallérie) */}
          <div className="bg-zinc-900/50 p-3 rounded-[24px] border border-white/5 flex flex-col shadow-xl max-h-[260px]">
             <h3 className="font-bold uppercase mb-2 text-gray-500 text-[8px] tracking-[0.2em] px-1 text-center font-black italic">PROPOSÉ</h3>
             <div className="flex-grow overflow-y-auto scrollbar-hide">
               <div className="grid grid-cols-2 gap-2 pb-2">
                 {[
                   { id: '1', img: '/images/meditation.jpg' },
                   { id: '2', img: '/images/mountain.png' },
                   { id: '3', img: '/images/warrior1.png' },
                   { id: '4', img: '/images/warrior2.jpg' },
                   { id: '5', img: '/images/tree1.jpg' }
                 ].map((ex) => (
                   <div 
                     key={ex.id} 
                     onClick={() => setUserUploadedImage(ex.img)} 
                     className="group relative cursor-pointer aspect-square rounded-lg overflow-hidden border border-white/10 bg-black hover:border-red-500 transition-all shadow-md shrink-0"
                   >
                     <img src={ex.img} alt="Ex" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                   </div>
                 ))}
               </div>
             </div>
             <p className="text-[5px] text-zinc-600 font-black uppercase text-center mt-1 shrink-0">Cliquez pour analyser</p>
          </div>
        </div>

        {/* Lower Dashboard Zone - 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. Diagnostic Status */}
          <div className="flex flex-col">
            {isActive ? (
              <div className={`flex-grow bg-zinc-900 px-4 py-3 rounded-[20px] border border-white/10 shadow-xl flex items-center gap-3 transition-all duration-500 ${isPoseAligned ? 'border-green-500/30' : 'border-red-500/30'}`}>
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/5 shrink-0">
                  <div className={`w-2 h-2 rounded-full ${isPoseAligned ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-0.5 leading-none">Diagnostic</span>
                  <span className={`text-sm font-bold italic tracking-tight ${isPoseAligned ? 'text-green-400' : 'text-white'}`}>
                    {feedback}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-grow bg-zinc-900/60 p-5 rounded-[20px] border border-red-500/20 flex flex-col items-center justify-center text-center gap-1 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <p className="text-white font-black uppercase text-xs sm:text-sm tracking-tighter leading-tight">
                  Positionnez-vous face à la caméra pour demarrer une pose.<br/>
                  <span className="text-red-500 text-[10px]">Seulement 04 positions sont disponible sans abonnement</span>
                </p>
              </div>
            )}
          </div>

          {/* 2. Pose Checklist */}
          <div className="bg-zinc-900/80 p-3 rounded-[20px] border border-white/10 shadow-xl">
            <h3 className="font-bold uppercase mb-2 text-gray-500 text-[8px] tracking-[0.2em]">{t.aiCoach.vectorsTitle}</h3>
            <div className="space-y-1">
              {currentPose.checklist.map((item, i) => {
                const statusKey = item.key as keyof JointStatus;
                const isOk = isActive && jointStatus[statusKey];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase transition-colors ${isOk ? 'text-white' : 'text-white/40'}`}>{item.l}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-1 w-8 rounded-full transition-all duration-500 ${isOk ? 'bg-green-400' : 'bg-zinc-800'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 3. Core Objective */}
          <div className="p-3 rounded-[20px] border border-white/10 bg-red-700/80 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
            <div className="text-xl opacity-60 text-white">🎯</div>
            <div>
              <div className="text-[8px] font-black uppercase mb-0.5 text-white">{t.aiCoach.objectiveTitle}</div>
              <p className="text-[8px] text-white/70 leading-normal uppercase font-semibold">{t.aiCoach.objectiveDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
