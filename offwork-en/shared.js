/* Shared logic for all off-work countdown variants.
   Page must define window.applyState(state) to render.
   URL params: ?start=9&end=18 work hours; ?now=HH:MM ?day=0-6 for testing. */
const q = new URLSearchParams(location.search);
const START_H = parseFloat(q.get('start') ?? '9');
const END_H = parseFloat(q.get('end') ?? '18');

const QUIPS = {
  early:   ["Coffee first. Everything else can wait.", "Fresh in, and already counting down?", "Pretend to read emails for a while.", "The chair is still warming up."],
  mid:     ["Strategic slacking in progress…", "Look busy — the boss might walk by.", "Refill your water. That's 5 minutes gone.", "Nod in meetings. Works every time."],
  half:    ["Halfway! …that's still SO long.", "Lunch was the only real meeting today.", "The afternoon is where hope goes to die."],
  slump:   ["The 3 PM wall. Stay strong.", "Your salary is cheering for you.", "Eyes open. Soul elsewhere.", "Do not fall asleep. Camera might be on."],
  rush:    ["Pack your spirit. Almost free.", "Do NOT accept new tasks now!", "Hand on mouse. Ready to sprint.", "Final stretch — act busy."],
  before:  ["Enjoy your last free moments.", "Not at work yet and already counting?", "Five more minutes of sleep is fine."],
  after:   ["RUN. Don't look back!", "Freedom tastes amazing.", "Clocked out. You win today."],
  weekend: ["It's the weekend. Why are you here?", "Close Notion. Go touch grass.", "Checking this on a weekend? Wow."],
};

const LABELS = {
  work: 'Time until freedom',
  before: 'Time until work',
  after: 'Free for',
  weekend: 'No work today',
};

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

let quipPool = [], quipIdx = 0, lastPhase = '';

function fmt(ms){
  const s = Math.max(0, Math.floor(ms/1000));
  const h = String(Math.floor(s/3600)).padStart(2,'0');
  const m = String(Math.floor(s%3600/60)).padStart(2,'0');
  const sec = String(s%60).padStart(2,'0');
  return `${h}:${m}:${sec}`;
}

function nowSim(){
  const n = new Date();
  const sim = q.get('now');
  if(sim){ const [h,m] = sim.split(':').map(Number); n.setHours(h, m||0); /* keep real seconds so the clock still ticks in simulation */ }
  const simDay = q.get('day');
  if(simDay !== null){ n.setDate(n.getDate() + (parseInt(simDay) - n.getDay())); }
  return n;
}

function pickQuip(phase){
  if(phase !== lastPhase){
    lastPhase = phase;
    quipPool = QUIPS[phase];
    quipIdx = Math.floor(Math.random()*quipPool.length);
  }
  return quipPool[quipIdx];
}

function rotateQuip(){
  if(!quipPool.length) return null;
  quipIdx = (quipIdx+1) % quipPool.length;
  return quipPool[quipIdx];
}

function computeState(){
  const n = nowSim();
  const day = n.getDay();
  const start = new Date(n); start.setHours(Math.floor(START_H), (START_H%1)*60, 0, 0);
  const end = new Date(n); end.setHours(Math.floor(END_H), (END_H%1)*60, 0, 0);
  const meta = n.toLocaleTimeString('en-GB') + ' · ' + DAYS[day];

  if(day === 0 || day === 6){
    return { mode:'weekend', phase:'weekend', label:LABELS.weekend, timer:'🎉', meta, pct:null, quip:pickQuip('weekend') };
  }
  if(n < start){
    return { mode:'before', phase:'before', label:LABELS.before, timer:fmt(start-n), meta, pct:null, quip:pickQuip('before') };
  }
  if(n >= end){
    return { mode:'after', phase:'after', label:LABELS.after, timer:fmt(n-end), meta, pct:null, quip:pickQuip('after') };
  }
  const pct = (n - start) / (end - start) * 100;
  const phase = pct < 15 ? 'early' : pct < 40 ? 'mid' : pct < 60 ? 'half' : pct < 85 ? 'slump' : 'rush';
  return { mode:'work', phase, label:LABELS.work, timer:fmt(end-n), meta, pct, quip:pickQuip(phase) };
}

function startEngine(){
  const run = () => window.applyState(computeState());
  run();
  setInterval(run, 1000);
  setInterval(() => {
    const nq = rotateQuip();
    if(nq !== null && window.applyQuip) window.applyQuip(nq);
  }, 15000);
}
