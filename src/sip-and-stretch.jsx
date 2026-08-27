import { useState, useEffect, useRef, useCallback } from "react";
import POSE_IMAGES from "./poseImages";

const CLASS_DATA = {
  title: "Sip & Stretch",
  blocks: [
    {
      id: "welcome", label: "Welcome", color: "#c9a96e",
      stretches: [{
        id: 1, name: "Arrive & Breathe", duration: 300,
        pose: "breathwork", bilateral: false,
        instruction: "Lie on your back, knees bent, feet flat. Inhale 4 counts through your nose, hold 2, exhale slowly for 6 through your mouth.",
        muscleInfo: "Activates the parasympathetic nervous system — shifts your body out of fight-or-flight and into recovery mode.",
        standard: { label: "Supine Breathwork", description: "Back flat on mat, knees bent, feet hip-width. Arms at sides, palms up. Eyes closed." },
        modified: null
      }]
    },
    {
      id: "supine", label: "Supine", color: "#b87d5e",
      stretches: [
        { id: 2, name: "Reclined Butterfly", duration: 180, pose: "butterfly", bilateral: false,
          instruction: "Lie back, bring the soles of your feet together, and let your knees fall open wide. Rest your hands on your ribs and let gravity do the work.",
          muscleInfo: "Adductors and inner groin — the one area treadmill, rower, and floor work never touch. Every stride and stroke moves straight ahead; this opens what gets left behind.",
          standard: { label: "Supta Baddha Konasana", description: "Soles of feet together, knees wide and heavy. Arms at sides or hands resting on ribs. Nothing to hold — just release." },
          modified: { label: "Supported Knees", description: "Slide your feet farther from your hips, or place a pillow under each outer thigh to soften the inner-knee pull." }
        },
        { id: 3, name: "Knee to Chest", duration: 90, pose: "supineHipFlex", bilateral: true,
          instruction: "Lying on your back — extend one leg long on the mat. Draw the opposite knee gently into your chest.",
          muscleInfo: "Psoas — runs from your lower spine to your femur and shortens with every run and every hour of sitting.",
          standard: { label: "Knee to Chest", description: "Lie flat. Extend one leg long, press the back of that knee toward the floor. Pull opposite knee to chest." },
          modified: { label: "Towel Under Knee", description: "Place a folded towel under the extended knee for lower back support. Slightly bend the extended leg if needed." }
        },
        { id: 7, name: "Supine Hamstring Stretch", duration: 90, pose: "legRaise", bilateral: true,
          instruction: "Lie on your back. Extend one leg toward the ceiling. Hold behind the thigh or calf. Flex the foot — toes toward your shin.",
          muscleInfo: "Flexing the foot adds the calf — you're stretching the entire posterior line of the leg in one hold.",
          standard: { label: "Leg Raise Hold", description: "One leg flat, one raised. Hold behind calf or thigh. Flex foot, toes toward shin. Both hips grounded." },
          modified: { label: "Strap or Towel", description: "Loop a belt or towel around the arch of the lifted foot. Hold both ends — removes flexibility requirement." }
        },
        { id: 15, name: "Supine Spinal Twist", duration: 90, pose: "spinalTwist", bilateral: true,
          instruction: "Lying on your back, draw one knee to your chest and guide it across your body. Arm out at shoulder height. Gaze opposite.",
          muscleInfo: "Paraspinal muscles along the spine — compressed during every forward-hinge movement in OTF floor work.",
          standard: { label: "Full Twist", description: "Knee crosses body, shoulder stays grounded. Opposite hand gently on crossed knee. Hold completely still." },
          modified: { label: "Bolstered Knee", description: "Pillow under the crossed knee so it doesn't hang. Reduces rotation intensity for those with lower back sensitivity." }
        },
        { id: 17, name: "Happy Baby", duration: 90, pose: "happyBaby", bilateral: false,
          instruction: "On your back, grab the outer edges of your feet. Draw knees wide toward your armpits. Rock gently side to side.",
          muscleInfo: "Sacrum — the triangular bone at the base of your spine that bears enormous load through every rowing stroke.",
          standard: { label: "Ananda Balasana", description: "Reach and hold outer edges of both feet or ankles. Knees wide. Rock gently like a slow hammock." },
          modified: { label: "Half Happy Baby", description: "One leg at a time, other foot flat on floor. Or loop a strap around the foot instead of holding directly." }
        }
      ]
    },
    {
      id: "floor", label: "Floor/Kneeling", color: "#7d9b8a",
      stretches: [
        { id: 20, name: "Lying Quad Stretch", duration: 120, pose: "lyingQuad", bilateral: true,
          instruction: "Sit with one leg long and the other folded back beside your hip. Lean into your hands and lift your chest. Keep the bent knee comfortable and stay tall through the front of the thigh.",
          muscleInfo: "Quad and front hip - this opens the tissue that shortens with every treadmill stride, squat, and long stretch of sitting.",
          standard: { label: "Lean-Back Quad Stretch", description: "One leg extends forward, the other folds back beside the hip. Hands on floor behind you, chest lifted, both sit bones grounded as much as possible." },
          modified: { label: "More Upright", description: "Sit higher on a folded blanket or yoga block and keep more weight in your hands. If the knee is sensitive, reduce the bend or come out immediately." }
        },
        { id: 16, name: "Cat-Cow", duration: 90, pose: "catCow", bilateral: false,
          instruction: "On all fours. Full exhale on the round, full inhale on the open. If somewhere feels amazing — stay there.",
          muscleInfo: "Decompresses the lumbar discs and rehydrates spinal cartilage. This is deliberate, slow restoration — not warm-up.",
          standard: { label: "Breath-Led Flow", description: "Hands under shoulders, knees under hips. Exhale: round spine up. Inhale: drop belly, lift chest. 4–6 slow rounds." },
          modified: { label: "Seated Chair Version", description: "Sit at edge of chair, hands on knees. Same motion — no floor required. Great for wrist sensitivity." }
        },
        { id: 22, name: "Cobra", duration: 60, pose: "cobra", bilateral: false,
          instruction: "Lie on your belly with your palms under your shoulders. Press lightly into your hands, lift your chest, and keep the back of your neck long.",
          muscleInfo: "Abdominals and front body - this gives the chest, hip flexors, and trunk a gentle extension after all the rounding and hinging.",
          standard: { label: "Low Cobra", description: "Legs long behind you, tops of feet pressing down. Lift the chest with light hand support and shoulders sliding away from ears." },
          modified: { label: "Baby Cobra", description: "Keep more weight in the floor and lift only a little. You can also place forearms down for a sphinx-like version if the low back wants less." }
        },
        { id: 11, name: "Childs Pose", duration: 90, pose: "childsPose", bilateral: false,
          instruction: "Wide knees, sit hips toward heels. Walk hands forward.",
          muscleInfo: "Lat — the largest back muscle, connecting your arm to your spine. Compressed during every rowing stroke.",
          standard: { label: "Extended Child's Pose", description: "Knees wide, big toes together. Walk hands far forward. For lat: shift hands to one side, press opposite hip back." },
          modified: { label: "Supported with Bolster", description: "Place a pillow under chest or forehead. Reduces compression for those with knee sensitivity." }
        },
        { id: 10, name: "Thread the Needle", duration: 90, pose: "threadNeedle", bilateral: true,
          instruction: "On all fours, slide one arm palm-up under your body until the shoulder and ear rest on the mat.",
          muscleInfo: "Thoracic spine and posterior shoulder — the exact area that locks up from rowing posture.",
          standard: { label: "Full Thread", description: "Slide arm under body, shoulder and ear on mat. Opposite hand reaches overhead. Hips stay level." },
          modified: { label: "Seated Rotation", description: "Sit cross-legged. One hand behind you on floor, other on opposite knee. Rotate gently, looking over shoulder." }
        },
        { id: 4, name: "Low Lunge", duration: 90, pose: "lowLunge", bilateral: true,
          instruction: "Step one foot forward into a lunge. Drop the back knee to the mat. Press hips gently forward and down.",
          muscleInfo: "Deep hip flexor and quad — reverses the shortening pattern that builds up from every stride on the tread.",
          standard: { label: "Kneeling Lunge", description: "Front knee over ankle, back knee on mat. Hands on front knee, chest tall. Option: arms overhead to deepen." },
          modified: { label: "Hands on Floor", description: "Both hands on the floor on either side of front foot for support. Only lower as far as comfortable." }
        },
        { id: 5, name: "Pigeon Pose", duration: 90, pose: "pigeon", bilateral: true,
          instruction: "From a lunge, bring your front shin across the mat. Sink hips toward the floor. Fold your chest forward.",
          muscleInfo: "Piriformis and deep glute — the deepest hip external rotator stretch available. Chronically loaded from rowing and running.",
          standard: { label: "Full Pigeon", description: "Front shin angled or parallel to mat. Back leg extends behind. Fold chest over front shin onto forearms or forehead." },
          modified: { label: "Reclined Figure Four", description: "Stay on your back in figure four position — identical hip stretch with zero pressure on the knee." }
        }
      ]
    },
    {
      id: "break", label: "Break", color: "#c9a96e",
      stretches: [{
        id: 9, name: "Top Off Your Glass", duration: 180, pose: "sipBreak", bilateral: false,
        instruction: "Stand, move naturally, sip, breathe. A few gentle hip circles or shoulder rolls if it feels good.",
        muscleInfo: "Intentional rest is part of recovery. The nervous system integrates work during stillness — not just during movement.",
        standard: { label: "Rest & Reset", description: "Move naturally. Hydrate. Enjoy. You're halfway through." },
        modified: null
      }]
    },
    {
      id: "break2", label: "Break", color: "#c9a96e",
      stretches: [{
        id: 23, name: "Sip Break — Round Two", duration: 180, pose: "sipBreak", bilateral: false,
        instruction: "Stand, move naturally, sip, breathe. A few gentle hip circles or shoulder rolls if it feels good.",
        muscleInfo: "Intentional rest is part of recovery. The nervous system integrates work during stillness — not just during movement.",
        standard: { label: "Rest & Reset", description: "Move naturally. Hydrate. Enjoy. The home stretch is ahead." },
        modified: null
      }]
    },
    {
      id: "standing", label: "Standing", color: "#8a7db8",
      stretches: [
        { id: 13, name: "Cross-Body Shoulder", duration: 60, pose: "crossBody", bilateral: true,
          instruction: "Pull one arm across your chest. Press just above the elbow — not on the joint — with your other hand. Then overhead tricep.",
          muscleInfo: "Posterior shoulder and rotator cuff — the most loaded and most neglected structure in OTF training.",
          standard: { label: "Cross-Body Hold", description: "Arm across chest, opposite hand pressing above elbow. Hold, then bend elbow behind head for overhead tricep." },
          modified: null
        },
        { id: 12, name: "Chest Opener", duration: 90, pose: "chestOpener", bilateral: false,
          instruction: "Interlace your fingers behind your back. Squeeze your shoulder blades together, straighten your arms, and open your chest toward the ceiling.",
          muscleInfo: "Pec major and anterior shoulder — rowing and every pressing movement pulls them forward. This reverses it.",
          standard: { label: "Clasped Hands Chest Opener", description: "Stand tall, fingers interlaced behind back, arms straight. Lift hands slightly away from body and open chest upward." },
          modified: { label: "Hands Clasped Behind", description: "Clasp hands behind your back and open chest to ceiling — a deeply effective alternative with no wall needed." }
        },
        { id: 8, name: "Calf & Achilles Stretch", duration: 60, pose: "calfStretch", bilateral: true,
          instruction: "Step one foot back about two feet. Press your back heel firmly into the floor. Slight bend in the front knee. Hands rest on your front thigh for balance.",
          muscleInfo: "Gastrocnemius and soleus — loaded on every treadmill step. No wall needed.",
          standard: { label: "Split Stance Heel Press", description: "Back heel flat on floor, front knee soft. Hold still — don't bounce. Switch sides when prompted." },
          modified: null
        }
      ]
    },
    {
      id: "seated", label: "Seated", color: "#6b9bb8",
      stretches: [
        { id: 21, name: "Side Bend", duration: 90, pose: "sideBend", bilateral: true,
          instruction: "Sit tall with one hand grounded beside you. Reach the other arm overhead and arc gently to the side. Keep both sit bones heavy and breathe into the open ribs.",
          muscleInfo: "Lats and obliques - this opens the side body that tightens with rowing, running arm drive, and long hours at a desk.",
          standard: { label: "Seated Side Reach", description: "One hand or fingertips on the floor, opposite arm arcs overhead. Keep chest open instead of collapsing forward." },
          modified: { label: "Prop Under Hips", description: "Sit on a folded blanket or block to reduce low back strain. Keep the bend smaller and support the lower hand on a yoga block if needed." }
        },
        { id: 6, name: "Seated Forward Fold", duration: 120, pose: "seatedFold", bilateral: false,
          instruction: "Sit tall with legs extended. Inhale to lengthen the spine, then exhale and hinge forward from your hips. Let your hands land where they land.",
          muscleInfo: "Hamstrings, calves, and lower back — the entire posterior chain that takes the most load during rowing and floor work.",
          standard: { label: "Full Forward Fold", description: "Legs straight, feet flexed. Hinge from hips with a flat back. Reach toward feet wherever they land." },
          modified: { label: "Bent Knees", description: "Bend your knees significantly to remove strain from the lower back. Gradually work toward straightening over time." }
        },
        { id: 14, name: "Thoracic Twist", duration: 90, pose: "thoracicExt", bilateral: true,
          instruction: "Hand behind your head, elbow wide. Inhale, then exhale and gently arch your upper back and twist upward.",
          muscleInfo: "Thoracic spine — locked up by desk posture, phone posture, and rowing mechanics.",
          standard: { label: "Seated T-Spine Opener", description: "Hands interlaced behind head, elbows wide. Inhale, then exhale and gently arch the upper back." },
          modified: { label: "Over Rolled Towel", description: "Lie on your back, towel across mid-back. Arms out to sides. Let gravity open the chest." }
        }
      ]
    },
    {
      id: "closing", label: "Closing", color: "#c9a96e",
      stretches: [
        { id: 18, name: "Savasana", duration: 300, pose: "savasana", bilateral: false,
          instruction: "Legs extended, palms facing up, arms slightly away from your body. Close your eyes. There is nothing left to do.",
          muscleInfo: "The nervous system consolidates the benefits of stretching during complete stillness. This is the most important five minutes.",
          standard: { label: "Full Rest", description: "Completely flat. Legs relaxed and falling open naturally. Arms slightly away from body, palms up. Eyes closed." },
          modified: null
        }
      ]
    },
  ]
};

const ORDERED_BLOCK_IDS = ["welcome", "supine", "break", "floor", "break2", "standing", "seated", "closing"];

const ORDERED_BLOCKS = ORDERED_BLOCK_IDS
  .map(id => CLASS_DATA.blocks.find(block => block.id === id))
  .filter(Boolean);

const RAW_STRETCHES_BY_ID = Object.fromEntries(
  CLASS_DATA.blocks.flatMap(block =>
    block.stretches.map(s => [
      s.id,
      { ...s, blockId: block.id, blockColor: block.color, blockLabel: block.label },
    ])
  )
);

const STRETCHES_BY_ID = RAW_STRETCHES_BY_ID;

const ORDERED_STRETCH_IDS = [1, 2, 3, 7, 15, 17, 9, 20, 16, 22, 11, 10, 4, 5, 23, 13, 12, 8, 21, 6, 14, 18];

const ALL_STRETCHES = ORDERED_STRETCH_IDS
  .map(id => STRETCHES_BY_ID[id])
  .filter(Boolean);

const blockStretchCount = blockId =>
  ALL_STRETCHES.filter(stretch => stretch.blockId === blockId).length;

function fmt(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}`;
}

function PoseImage({ poseKey, isModified }) {
  const [err, setErr] = useState(false);
  const url = POSE_IMAGES[poseKey];

  const isPng = url?.endsWith('.png');
  const filter = isPng ? "none" : isModified
    ? "brightness(0) invert(1) opacity(0.55) sepia(1) hue-rotate(190deg) saturate(2.5)"
    : "brightness(0) invert(1) opacity(0.88)";

  if (!url || err) {
    return (
      <div style={{ width: "100%", height: "100%", maxHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "52px", opacity: 0.3 }}>
        🧘
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={poseKey}
      onError={() => setErr(true)}
      style={{
        width: "auto",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        filter,
        animation: "breathe 12s linear infinite",
        padding: "0",
        display: "block",
        borderRadius: "35px",
        clipPath: "inset(0 round 35px)"
      }}
    />
  );
}

function CircleTimer({ elapsed, total, color, size = 96 }) {
  const half = size / 2;
  const r = half - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(1, elapsed / total));
  const rem = Math.max(0, total - elapsed);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={half} cy={half} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <circle cx={half} cy={half} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: rem >= 60 ? `${Math.round(size * 0.215)}px` : `${Math.round(size * 0.277)}px`, fontFamily: "'DM Serif Display', serif", color: "#f0ece6", fontWeight: 300, letterSpacing: "-0.02em" }}>
          {fmt(rem)}
        </div>
      </div>
    </div>
  );
}

function Fonts() {
  return <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />;
}

const GB = {
  background: "linear-gradient(135deg, #c9a96e, #a8803a)",
  border: "none", color: "#0a0907",
  padding: "18px 60px", borderRadius: "100px",
  fontSize: "15px", fontFamily: "'DM Sans', sans-serif",
  fontWeight: 700, letterSpacing: "0.08em",
  textTransform: "uppercase", cursor: "pointer",
  boxShadow: "0 8px 40px rgba(201,169,110,0.28)"
};

function IB(color, active, large) {
  return {
    background: active ? `${color}18` : "transparent",
    border: `1px solid ${active ? color + "44" : "rgba(255,255,255,0.07)"}`,
    color: active ? color : "#7a7570",
    width: large ? "56px" : "48px",
    height: large ? "56px" : "48px",
    borderRadius: "50%", cursor: "pointer",
    fontSize: large ? "20px" : "18px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif"
  };
}

export default function SipAndStretch() {
  const [appState, setAppState] = useState("idle");
  const [idx, setIdx]       = useState(0);
  const [side, setSide]     = useState("left");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const cur = ALL_STRETCHES[idx];

  const kill = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const advance = useCallback((ci, cs, stretch) => {
    if (stretch.bilateral && cs === "left") {
      setSide("right"); setElapsed(0);
    } else {
      const nxt = ci + 1;
      if (nxt < ALL_STRETCHES.length) {
        setIdx(nxt);
        setSide(ALL_STRETCHES[nxt].bilateral ? "left" : "single");
        setElapsed(0);
      } else {
        setAppState("done"); kill();
      }
    }
  }, [kill]);

  const tick = useCallback((ci, cs) => {
    kill();
    const s = ALL_STRETCHES[ci];
    timerRef.current = setInterval(() => {
      setElapsed(p => {
        const n = p + 1;
        if (n >= s.duration) { kill(); setTimeout(() => advance(ci, cs, s), 200); return n; }
        return n;
      });
    }, 1000);
  }, [kill, advance]);

  useEffect(() => { if (appState === "playing") tick(idx, side); return kill; }, [idx, side, appState]); // eslint-disable-line
  useEffect(() => () => kill(), [kill]);

  const go     = () => { setAppState("playing"); setIdx(0); setSide(ALL_STRETCHES[0].bilateral ? "left" : "single"); setElapsed(0); };
  const pause  = () => { setAppState("paused"); kill(); };
  const resume = () => setAppState("playing");
  const skip   = () => { kill(); setElapsed(0); advance(idx, side, cur); };
  const back   = () => {
    kill(); setElapsed(0);
    if (cur.bilateral && side === "right") setSide("left");
    else if (idx > 0) { const p = idx - 1; setIdx(p); setSide(ALL_STRETCHES[p].bilateral ? "left" : "single"); }
  };
  const reset  = () => { kill(); setIdx(0); setSide("left"); setElapsed(0); setAppState("idle"); };

  const sideLabel = side === "left" ? "Left Side" : side === "right" ? "Right Side" : null;
  const sidePillStyle = { background: `${cur.blockColor}22`, border: `1px solid ${cur.blockColor}55`, borderRadius: "100px", padding: "7px 23px", fontSize: "20px", color: cur.blockColor, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, animation: "sideIn 0.35s ease, sideGlow 4.2s ease-in-out infinite", flexShrink: 0, boxShadow: `0 0 0 0 ${cur.blockColor}00`, "--glow-color": `${cur.blockColor}66`, "--glow-soft": `${cur.blockColor}22` };
  const rightSidePillStyle = { background: "#9fd8c022", border: "1px solid #9fd8c055", borderRadius: "100px", padding: "7px 23px", fontSize: "20px", color: "#9fd8c0", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, animation: "sideIn 0.35s ease, sideGlow 4.2s ease-in-out infinite", flexShrink: 0, boxShadow: "0 0 0 0 #9fd8c000", "--glow-color": "#9fd8c066", "--glow-soft": "#9fd8c022" };
  const nextS     = ALL_STRETCHES[idx + 1];
  const rightNext = cur.bilateral && side === "left";

  // ── DONE ──────────────────────────────────────────────────────────────────
  if (appState === "done") return (
    <div style={{ minHeight: "100vh", background: "#0a0907", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{ fontSize: "72px", marginBottom: "28px" }}>🥂</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "52px", color: "#f0ece6", letterSpacing: "-0.02em", marginBottom: "16px" }}>That's a wrap.</div>
        <div style={{ fontSize: "17px", color: "#7a7570", fontWeight: 300, lineHeight: 1.65, maxWidth: "380px", margin: "0 auto 40px" }}>
          Your body just did the quiet kind of work. Take a sip — you earned it.
        </div>
        <button onClick={reset} style={GB}>Run Again</button>
      </div>
    </div>
  );

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (appState === "idle") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 25% 15%, #1c1508 0%, #0a0907 65%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />
      <div style={{ textAlign: "center", padding: "60px 32px", maxWidth: "520px", width: "100%" }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(54px,11vw,88px)", color: "#f0ece6", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "6px" }}>Sip &amp;</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(54px,11vw,88px)", color: "#c9a96e", lineHeight: 0.95, letterSpacing: "-0.03em", fontStyle: "italic", marginBottom: "36px" }}>Stretch</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "44px" }}>
          {ORDERED_BLOCKS.map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 18px", background: "rgba(255,255,255,0.025)", borderRadius: "10px", borderLeft: `3px solid ${b.color}` }}>
              <div style={{ fontSize: "13px", color: "#9e9890", flex: 1, textAlign: "left" }}>{b.label}</div>
              <div style={{ fontSize: "11px", color: "#3d3a36" }}>{blockStretchCount(b.id)} stretch{blockStretchCount(b.id) !== 1 ? "es" : ""}</div>
            </div>
          ))}
        </div>
        <button onClick={go} style={GB}>Begin Class</button>
      </div>
    </div>
  );

  // ── PLAYING / PAUSED ──────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "hidden", background: "radial-gradient(ellipse at 70% 5%, #140f08 0%, #090806 70%)", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", color: "#f0ece6" }}>
      <Fonts />
      <style>{`
        @keyframes breathe { 0%,100%{opacity:.85;transform:scale(1)} 33.333%,50%{opacity:1;transform:scale(1.12)} }
        @keyframes sideIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sideGlow { 0%,100%{box-shadow:0 0 0 0 var(--glow-soft)} 50%{box-shadow:0 0 18px 3px var(--glow-color),0 0 34px 8px var(--glow-soft)} }
      `}</style>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto minmax(0, 1fr) auto auto", padding: "14px 24px", gap: "12px", overflow: "hidden", minHeight: 0 }}>

        {/* NAME + TIMER */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "flex-start" }}>
          <div />
          <div style={{ minWidth: 0, textAlign: "center", alignSelf: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px,6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#f0ece6" }}>{cur.name}</div>
            {sideLabel && (
              <div style={{ width: "min(100%, 360px)", margin: "12px auto 0", display: "flex", justifyContent: side === "left" ? "flex-start" : "flex-end" }}>
                <div style={side === "left" ? sidePillStyle : rightSidePillStyle}>
                  {sideLabel}
                </div>
              </div>
            )}
          </div>
          <div style={{ justifySelf: "end" }}>
            <CircleTimer elapsed={elapsed} total={cur.duration} color={cur.blockColor} size={234} />
          </div>
        </div>

        {/* POSE CARD */}
        <div style={{ display: "flex", flex: 1, minHeight: 0, justifyContent: "center" }}>
          <div style={{ width: "min(100%, 1200px)", minHeight: 0, display: "grid", gridTemplateRows: "0fr minmax(0, 14fr) 0.5fr" }}>
            <div />
            <div style={{ minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px 8px" }}>
              <div style={{ minWidth: 0, minHeight: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PoseImage poseKey={cur.pose} isModified={false} />
              </div>
            </div>
          </div>
        </div>

        {/* INSTRUCTION */}
        <div style={{ flexShrink: 0, justifySelf: "center", width: "min(100%, 620px)", textAlign: "center" }}>
          <div style={{ fontSize: "24px", lineHeight: 1.65, color: "#d4ccc4", fontWeight: 300, marginBottom: "5px" }}>{cur.instruction}</div>
        </div>

        {/* NEXT UP */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", flexShrink: 0, justifySelf: "end" }}>
          <div style={{ fontSize: "9px", color: "#3d3a36", textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap", fontWeight: 600 }}>Up next</div>
          <div style={{ flex: 1, fontSize: "12px", color: "#5e5a54" }}>{rightNext ? `${cur.name} — Right Side` : nextS ? nextS.name : "You're done"}</div>
          {!rightNext && nextS && <div style={{ fontSize: "10px", color: "#3d3a36" }}>{fmt(nextS.duration)}s</div>}
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ padding: "12px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", rowGap: "14px", flexWrap: "wrap", flexShrink: 0 }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: cur.blockColor, fontWeight: 600 }}>{cur.blockLabel}</div>
            <div style={{ fontSize: "11px", color: "#3d3a36" }}>{idx + 1} / {ALL_STRETCHES.length}</div>
          </div>
          <div style={{ display: "flex", gap: "3px" }}>
            {ALL_STRETCHES.map((_, i) => (
              <div key={i} style={{ height: "2px", flex: 1, borderRadius: "2px", background: i < idx ? cur.blockColor : i === idx ? `${cur.blockColor}88` : "rgba(255,255,255,0.08)", transition: "background 0.4s" }} />
            ))}
          </div>
        </div>
        <button onClick={back} style={IB("#3d3a36", false)}>‹‹</button>
        {appState === "playing"
          ? <button onClick={pause}  style={IB(cur.blockColor, true, true)}>⏸</button>
          : <button onClick={resume} style={{ ...IB(cur.blockColor, true, true), background: `linear-gradient(135deg, ${cur.blockColor}, ${cur.blockColor}aa)`, color: "#0a0907", boxShadow: `0 4px 18px ${cur.blockColor}44` }}>▶</button>
        }
        <button onClick={skip} style={IB("#3d3a36", false)}>{cur.bilateral && side === "left" ? "R ›" : "›› "}</button>
      </div>
    </div>
  );
}
