import { useEffect, useRef, useState } from 'react';
import './WhyRackTrackPage.css';

const WHY = {
  body: 'Existing tools sense the rack. Or they read from the network. Or they track vendor and security data. ',
  bodyHighlight: 'RackTrack does all three, in the same pass, and reconciles them',
  bodyTail: ' — which is why the output is trustworthy enough to defend in an audit, fast enough to use in an incident, and complete enough to drive capacity and procurement decisions.',
  pillars: [
    {
      num: '01',
      title: 'Sense',
      desc: 'Computer vision captures device position, labels, ports, cable state, and visual evidence from the rack.',
    },
    {
      num: '02',
      title: 'Verify',
      desc: 'Observed state is checked against existing CMDB, DCIM, network, and audit records to expose drift.',
    },
    {
      num: '03',
      title: 'Enrich',
      desc: 'RackTrack turns findings into exports, reports, and workflows each team can use immediately.',
    },
  ],
  compTable: {
    headers: ['System', 'Sense', 'Verify', 'Enrich'],
    rows: [
      { name: 'RackTrack', highlight: true, cells: ['Yes', 'Yes', 'Yes'] },
      { name: 'DCIM', highlight: false, cells: ['Manual', 'Partial', 'Yes'] },
      { name: 'Network discovery', highlight: false, cells: ['No', 'Partial', 'Yes'] },
      { name: 'Manual audit', highlight: false, cells: ['Yes', 'Point-in-time', 'No'] },
      { name: 'CMDB', highlight: false, cells: ['No', 'No', 'Yes'] },
    ],
  },
  evidence: {
    headline: 'The physical layer should be a source of truth, not a quarterly project.',
    body:
      'RackTrack gives infrastructure teams a practical path from uncertain records to verified physical evidence.',
  },
};

/* ══════════════════════════════════════════
   PILLAR ILLUSTRATIONS
══════════════════════════════════════════ */

/* 01 Sense */
const RackIllustration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    cv.width = 220; cv.height = 240;
    let t = 0, raf: number;

    const S = 'rgba(79,142,247,'; 

    const rr = (x:number,y:number,w:number,h:number,r:number,fill:string,stroke:string,sw:number)=>{
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
      ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
      ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
      ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
      ctx.closePath();
      ctx.fillStyle=fill; ctx.fill();
      ctx.strokeStyle=stroke; ctx.lineWidth=sw; ctx.stroke();
    };

    const draw = () => {
      t += 0.007;
      ctx.clearRect(0, 0, 220, 240);
      const fy = Math.sin(t) * 2.5; 

      const lx=8, cx2=78, rx2=148;
      const top=18+fy, bot=top+172;
      const skX=42, skY=-20; 

      ctx.beginPath();
      ctx.moveTo(rx2,top); ctx.lineTo(rx2+skX,top+skY);
      ctx.lineTo(rx2+skX,bot+skY); ctx.lineTo(rx2,bot);
      ctx.closePath();
      ctx.fillStyle='rgba(5,12,48,0.82)'; ctx.fill();
      ctx.strokeStyle=`${S}0.45)`; ctx.lineWidth=1; ctx.stroke();
      for(let i=1;i<12;i++){
        const ly=top+i*(172/12);
        ctx.beginPath(); ctx.moveTo(rx2,ly); ctx.lineTo(rx2+skX,ly+skY);
        ctx.strokeStyle=`${S}0.12)`; ctx.lineWidth=0.5; ctx.stroke();
      }
      for(let i=0;i<5;i++){
        const uy=top+20+i*28;
        rr(rx2+4,uy+skY*(rx2-lx)/(rx2-lx)+2,skX-8,10,2,'rgba(8,20,65,0.6)',`${S}0.2)`,0.5);
      }

      ctx.beginPath();
      ctx.moveTo(lx,top); ctx.lineTo(lx+skX,top+skY);
      ctx.lineTo(rx2+skX,top+skY); ctx.lineTo(rx2,top);
      ctx.closePath();
      ctx.fillStyle='rgba(12,28,88,0.55)'; ctx.fill();
      ctx.strokeStyle=`${S}0.6)`; ctx.lineWidth=1.1; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx2,top); ctx.lineTo(cx2+skX,top+skY);
      ctx.strokeStyle=`${S}0.3)`; ctx.lineWidth=0.7; ctx.stroke();

      ctx.fillStyle='rgba(4,10,42,0.95)';
      ctx.fillRect(lx,top,cx2-lx,172);
      ctx.strokeStyle=`${S}0.55)`; ctx.lineWidth=1.1;
      ctx.strokeRect(lx,top,cx2-lx,172);

      ctx.fillStyle='rgba(5,12,46,0.95)';
      ctx.fillRect(cx2,top,rx2-cx2,172);
      ctx.strokeStyle=`${S}0.55)`; ctx.lineWidth=1.1;
      ctx.strokeRect(cx2,top,rx2-cx2,172);

      const lw=cx2-lx-6, unitH=172/14;
      for(let i=0;i<14;i++){
        const uy=top+i*unitH+1;
        const uh=unitH-2;
        rr(lx+3,uy,lw,uh,2,'rgba(7,18,60,0.7)',`${S}0.18)`,0.4);
        const lc=i===2?'#4F8EF7':i===5?'#22C55E':i===8?'#f59e0b':i===11?'#4F8EF7':`${S}0.15)`;
        ctx.beginPath(); ctx.arc(lx+8,uy+uh/2,1.8,0,Math.PI*2);
        ctx.fillStyle=lc; ctx.fill();
        if(i===2||i===5||i===8||i===11){
          const bw=i===2?32:i===5?28:i===8?24:20;
          const bc=i===2?'rgba(79,142,247,0.7)':i===5?'rgba(34,197,94,0.65)':i===8?'rgba(245,158,11,0.65)':'rgba(79,142,247,0.55)';
          ctx.fillStyle=bc; ctx.fillRect(lx+13,uy+2,bw,2.2);
          ctx.fillStyle='rgba(79,142,247,0.12)'; ctx.fillRect(lx+13,uy+5,bw*0.6,1.5);
        } else {
          ctx.fillStyle=`${S}0.15)`; ctx.fillRect(lx+13,uy+2,14,2);
          ctx.fillStyle=`${S}0.08)`; ctx.fillRect(lx+13,uy+5,9,1.5);
        }
        if(i%3===0){
          rr(lx+48,uy+2,12,uh-4,1,'rgba(10,25,75,0.8)',`${S}0.2)`,0.4);
          ctx.beginPath(); ctx.arc(lx+58,uy+uh/2,1.2,0,Math.PI*2);
          ctx.fillStyle=`${S}0.4)`; ctx.fill();
        }
      }

      const cw=rx2-cx2-6;
      for(let i=0;i<14;i++){
        const uy=top+i*unitH+1;
        const uh=unitH-2;
        rr(cx2+3,uy,cw,uh,2,'rgba(7,18,60,0.7)',`${S}0.18)`,0.4);
        const lc=i===1?'#4F8EF7':i===4?'#22C55E':i===7?'#f59e0b':i===10?'#4F8EF7':`${S}0.15)`;
        ctx.beginPath(); ctx.arc(cx2+8,uy+uh/2,1.8,0,Math.PI*2);
        ctx.fillStyle=lc; ctx.fill();
        if(i===1||i===4||i===7||i===10){
          const bw=i===1?30:i===4?26:i===7?22:18;
          const bc=i===1?'rgba(79,142,247,0.7)':i===4?'rgba(34,197,94,0.65)':i===7?'rgba(245,158,11,0.65)':'rgba(79,142,247,0.55)';
          ctx.fillStyle=bc; ctx.fillRect(cx2+13,uy+2,bw,2.2);
        } else {
          ctx.fillStyle=`${S}0.15)`; ctx.fillRect(cx2+13,uy+2,12,2);
        }
        if(i%2===0){
          rr(cx2+46,uy+1,cw-50,uh-2,1,'rgba(8,22,70,0.9)',`${S}0.25)`,0.5);
          for(let d=0;d<3;d++){
            ctx.fillStyle=`${S}0.2)`; ctx.fillRect(cx2+48+d*8,uy+3,6,uh-6);
          }
        }
      }

      const scanY=top+((Math.sin(t*1.2)*0.5+0.5)*172);
      const sg=ctx.createLinearGradient(lx,scanY,rx2,scanY);
      sg.addColorStop(0,'transparent'); sg.addColorStop(0.1,`${S}0.7)`);
      sg.addColorStop(0.9,`${S}0.7)`); sg.addColorStop(1,'transparent');
      ctx.fillStyle=sg; ctx.fillRect(lx,scanY-1,rx2-lx,2.5);

      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={canvasRef} style={{width:'150px',height:'178px',flexShrink:0}}/>;
};

/* 02 Verify */
const NetworkIllustration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    const W = 220, H = 220;
    cv.width = W; cv.height = H;
    const cx = 105, cy = 100;
    let frame = 0;
    const nodes = [
      { angle: -100, dist: 72 }, { angle: -60, dist: 62 }, { angle: -20, dist: 76 },
      { angle: 20, dist: 60 }, { angle: 55, dist: 70 }, { angle: 100, dist: 62 },
      { angle: 140, dist: 72 }, { angle: 175, dist: 65 }, { angle: -140, dist: 70 },
    ].map(n => {
      const r = (n.angle * Math.PI) / 180;
      return { x: cx + n.dist * Math.cos(r), y: cy + n.dist * Math.sin(r),
        pulse: Math.random(), speed: 0.004 + Math.random() * 0.003, sparkle: Math.random() * Math.PI * 2 };
    });
    let raf: number;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 78);
      bg.addColorStop(0, 'rgba(79,142,247,0.14)'); bg.addColorStop(0.5, 'rgba(79,142,247,0.05)'); bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, 78, 0, Math.PI*2); ctx.fill();
      nodes.forEach(n => {
        n.pulse += n.speed; if (n.pulse > 1) n.pulse = 0; n.sparkle += 0.04;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = 'rgba(79,142,247,0.4)'; ctx.lineWidth = 1.2; ctx.stroke();
        const t = n.pulse, px = cx + (n.x-cx)*t, py = cy + (n.y-cy)*t;
        const pg = ctx.createRadialGradient(px,py,0,px,py,7);
        pg.addColorStop(0,'rgba(120,210,255,0.95)'); pg.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(px,py,7,0,Math.PI*2); ctx.fillStyle=pg; ctx.fill();
        ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2); ctx.fillStyle='rgba(200,240,255,0.98)'; ctx.fill();
        const shine = 0.5 + 0.5*Math.sin(n.sparkle);
        const halo = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,16);
        halo.addColorStop(0,`rgba(79,142,247,${0.28*shine})`); halo.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(n.x,n.y,16,0,Math.PI*2); ctx.fillStyle=halo; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x,n.y,10,0,Math.PI*2);
        ctx.strokeStyle=`rgba(79,142,247,${0.55+0.35*shine})`; ctx.lineWidth=1.8; ctx.stroke();
        ctx.fillStyle='rgba(5,14,50,0.95)'; ctx.fill();
        const dg = ctx.createRadialGradient(n.x-2,n.y-2,0,n.x,n.y,6);
        dg.addColorStop(0,`rgba(${Math.round(100+80*shine)},${Math.round(180+50*shine)},255,1)`); dg.addColorStop(1,'#4F8EF7');
        ctx.beginPath(); ctx.arc(n.x,n.y,5,0,Math.PI*2); ctx.fillStyle=dg; ctx.fill();
        if (shine > 0.85) {
          const sp=(shine-0.85)/0.15; ctx.save(); ctx.globalAlpha=sp*0.9;
          ctx.strokeStyle='rgba(180,230,255,0.95)'; ctx.lineWidth=1;
          const sl=8*sp;
          ctx.beginPath(); ctx.moveTo(n.x-sl,n.y); ctx.lineTo(n.x+sl,n.y); ctx.moveTo(n.x,n.y-sl); ctx.lineTo(n.x,n.y+sl); ctx.stroke();
          ctx.restore();
        }
      });
      const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
      cg.addColorStop(0,'rgba(79,142,247,0.35)'); cg.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,24,0,Math.PI*2);
      ctx.strokeStyle='rgba(79,142,247,0.95)'; ctx.lineWidth=2.2; ctx.stroke(); ctx.fillStyle='rgba(5,14,50,0.95)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,15,0,Math.PI*2); ctx.fillStyle='rgba(79,142,247,0.22)'; ctx.fill();
      const wg = ctx.createRadialGradient(cx-2,cy-2,0,cx,cy,11);
      wg.addColorStop(0,'rgba(220,245,255,1)'); wg.addColorStop(0.4,'rgba(120,200,255,0.9)'); wg.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(cx,cy,11,0,Math.PI*2); ctx.fillStyle=wg; ctx.fill();
      const sx=162, sy=148; ctx.save();
      const sg = ctx.createRadialGradient(sx,sy,0,sx,sy,28);
      sg.addColorStop(0,'rgba(50,100,255,0.45)'); sg.addColorStop(1,'transparent');
      ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(sx,sy,28,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(sx,sy-20); ctx.lineTo(sx+16,sy-12); ctx.lineTo(sx+16,sy+2);
      ctx.quadraticCurveTo(sx+16,sy+18,sx,sy+24); ctx.quadraticCurveTo(sx-16,sy+18,sx-16,sy+2); ctx.lineTo(sx-16,sy-12); ctx.closePath();
      ctx.fillStyle='rgba(30,80,210,0.9)'; ctx.fill(); ctx.strokeStyle='rgba(120,180,255,0.9)'; ctx.lineWidth=1.8; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx-7,sy+2); ctx.lineTo(sx-1,sy+8); ctx.lineTo(sx+9,sy-6);
      ctx.strokeStyle='white'; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke();
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ width:'175px', height:'175px', flexShrink:0 }} />;
};
/* 03 Enrich — layers drop in one by one and stack */
const LayersIllustration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    cv.width = 240; cv.height = 320;
    let t = 0, raf: number;

    const CYCLE = 5.5;
    const restY  = [54, 154, 254];
    const colors = [
      { c1:'#7B4FD4', c2:'#9B6FFF' },
      { c1:'#00BFFF', c2:'#00E5FF' },
      { c1:'#8B5CF6', c2:'#C084FC' },
    ];
    const dropStarts = [0, 0.18, 0.36];
    const dropDur    = 0.16;

    const easeOutBack = (x: number) => {
      const c1=1.70158, c3=c1+1;
      return 1 + c3*Math.pow(x-1,3) + c1*Math.pow(x-1,2);
    };

    const diamond = (cx:number,cy:number,hw:number,hh:number) => {
      ctx.beginPath();
      ctx.moveTo(cx,cy-hh); ctx.lineTo(cx+hw,cy);
      ctx.lineTo(cx,cy+hh); ctx.lineTo(cx-hw,cy);
      ctx.closePath();
    };

    const drawDoc = (cx:number,cy:number) => {
      const x=cx-20,y=cy-26,w=40,h=48,fold=12;
      ctx.beginPath();
      ctx.moveTo(x,y); ctx.lineTo(x+w-fold,y); ctx.lineTo(x+w,y+fold);
      ctx.lineTo(x+w,y+h); ctx.lineTo(x,y+h); ctx.closePath();
      ctx.fillStyle='rgba(20,12,65,0.75)'; ctx.fill();
      ctx.strokeStyle='rgba(190,160,255,0.95)'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w-fold,y); ctx.lineTo(x+w-fold,y+fold); ctx.lineTo(x+w,y+fold);
      ctx.strokeStyle='rgba(190,160,255,0.7)'; ctx.lineWidth=1.3; ctx.stroke();
      [[y+22,w-14],[y+31,w-18],[y+40,w-22]].forEach(([ly,lw])=>{
        ctx.beginPath(); ctx.moveTo(x+7,ly); ctx.lineTo(x+7+lw,ly);
        ctx.strokeStyle='rgba(180,155,255,0.8)'; ctx.lineWidth=1.8; ctx.stroke();
      });
    };

    const drawChart = (cx:number,cy:number) => {
      const bars=[{dx:-24,h:20},{dx:-9,h:32},{dx:6,h:24},{dx:21,h:38}];
      bars.forEach(b=>{
        const bx=cx+b.dx-5, by=cy+20-b.h;
        ctx.fillStyle='rgba(0,200,255,0.12)'; ctx.fillRect(bx,by,10,b.h);
        ctx.strokeStyle='rgba(0,225,255,0.95)'; ctx.lineWidth=2; ctx.strokeRect(bx,by,10,b.h);
        const gg=ctx.createLinearGradient(bx,by,bx,by+6);
        gg.addColorStop(0,'rgba(0,235,255,0.9)'); gg.addColorStop(1,'transparent');
        ctx.fillStyle=gg; ctx.fillRect(bx,by,10,6);
      });
    };

    const drawShield = (cx:number,cy:number) => {
      ctx.beginPath();
      ctx.moveTo(cx,cy-26); ctx.lineTo(cx+18,cy-16); ctx.lineTo(cx+18,cy+2);
      ctx.quadraticCurveTo(cx+18,cy+18,cx,cy+26);
      ctx.quadraticCurveTo(cx-18,cy+18,cx-18,cy+2); ctx.lineTo(cx-18,cy-16);
      ctx.closePath();
      ctx.fillStyle='rgba(18,12,65,0.7)'; ctx.fill();
      ctx.strokeStyle='rgba(190,155,255,0.95)'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx-8,cy+2); ctx.lineTo(cx-1,cy+9); ctx.lineTo(cx+10,cy-7);
      ctx.strokeStyle='rgba(200,165,255,0.98)'; ctx.lineWidth=2.5;
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke();
    };

    const iconFns = [drawDoc, drawChart, drawShield];

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0,0,240,320);

      const phase = (t % CYCLE) / CYCLE;
      colors.forEach((col, i) => {
        const ds = dropStarts[i], de = ds+dropDur;
        let cy: number, alpha: number;

        if (phase < ds) {
          cy = -60; alpha = 0;
        } else if (phase < de) {
          const p = (phase-ds)/dropDur;
          cy = -60 + (restY[i]+60)*easeOutBack(Math.min(p,1));
          alpha = Math.min(p*4,1);
        } else {
          // stay permanently at rest — no fade out
          cy = restY[i]; alpha = 1;
        }

        if (alpha < 0.01) return;
        ctx.save(); ctx.globalAlpha = alpha;

        const cx=120, hw=105, hh=44;
        diamond(cx,cy,hw,hh);
        ctx.fillStyle='rgba(7,14,50,0.88)'; ctx.fill();

        const grad=ctx.createLinearGradient(cx-hw,cy,cx+hw,cy);
        grad.addColorStop(0,col.c1); grad.addColorStop(1,col.c2);
        ctx.strokeStyle=grad; ctx.lineWidth=2.2; ctx.stroke();

        // inner glow
        const ig=ctx.createRadialGradient(cx,cy,0,cx,cy,hw*0.6);
        ig.addColorStop(0,'rgba(80,60,200,0.07)'); ig.addColorStop(1,'transparent');
        diamond(cx,cy,hw-6,hh-6); ctx.fillStyle=ig; ctx.fill();

        iconFns[i](cx,cy);
        ctx.restore();
      });

      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={canvasRef} style={{width:'145px',height:'200px',flexShrink:0}}/>;
};


/* ══════════════════════════════════════════
   FEATURE ICONS & CONNECTOR
══════════════════════════════════════════ */
const FeatShield = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="rgba(8,18,60,0.9)" stroke="rgba(79,142,247,0.3)" strokeWidth="1"/>
    <path d="M22 9l11 5v8c0 7-4.5 11-11 13-6.5-2-11-6-11-13v-8l11-5z" stroke="#4F8EF7" strokeWidth="1.4" fill="none"/>
    <path d="M17 22l3.5 3.5L27 18" stroke="#4F8EF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const FeatBolt = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="rgba(8,18,60,0.9)" stroke="rgba(79,142,247,0.3)" strokeWidth="1"/>
    <path d="M25 10l-9 13h8l-4 11 11-15h-8l2-9z" stroke="#4F8EF7" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
  </svg>
);
const FeatChart = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="rgba(8,18,60,0.9)" stroke="rgba(79,142,247,0.3)" strokeWidth="1"/>
    <rect x="12" y="27" width="5" height="8"  rx="1" fill="#4F8EF7" opacity="0.65"/>
    <rect x="20" y="21" width="5" height="14" rx="1" fill="#4F8EF7" opacity="0.82"/>
    <rect x="28" y="15" width="5" height="20" rx="1" fill="#4F8EF7"/>
  </svg>
);

function Connector() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'56px'}}>
      <div style={{width:'1px',flex:1,borderLeft:'1.5px dashed rgba(79,142,247,0.4)'}}/>
      <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#4F8EF7',boxShadow:'0 0 8px 3px rgba(79,142,247,0.5)',margin:'2px 0'}}/>
      <div style={{width:'1px',flex:1,borderLeft:'1.5px dashed rgba(79,142,247,0.4)'}}/>
    </div>
  );
}

/* ── Custom cursor ── */
/* ── Hover glow card ── */
function GlowCard({children, style, className}:{children:React.ReactNode; style?:React.CSSProperties; className?: string}) {
  const [hov, setHov] = useState(false);
  const [m, setM] = useState({x:50,y:50});
  return (
    <div
      className={className}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect(); setM({x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100});}}
      style={{
        position:'relative', overflow:'hidden', borderRadius:'1rem', cursor:'default',
        background:'rgba(8,18,48,0.85)', backdropFilter:'blur(14px)',
        border: hov ? '1px solid rgba(79,142,247,0.78)' : '1px solid rgba(79,142,247,0.2)',
        boxShadow: hov ? '0 18px 46px rgba(2,10,34,0.38), 0 0 36px rgba(79,142,247,0.26)' : '0 0 0 rgba(79,142,247,0)',
        transform: hov ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
        transition:'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        willChange:'transform, box-shadow',
        ...style,
      }}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',borderRadius:'inherit',opacity:hov?1:0,transition:'opacity 0.25s ease',background:`radial-gradient(circle at ${m.x}% ${m.y}%, rgba(103,213,255,0.22) 0%, rgba(79,142,247,0.12) 28%, transparent 68%)`}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background: hov?'linear-gradient(90deg,transparent,#4F8EF7,transparent)':'linear-gradient(90deg,transparent,rgba(79,142,247,0.18),transparent)',transition:'background 0.25s'}}/>
      <div style={{position:'relative',zIndex:1}}>{children}</div>
    </div>
  );
}

const TOOL_GAPS = [
  { cat:'DCIM platforms',         pros:'Comprehensive DC management, capacity and power tracking.', gaps:'Physical inventory manually entered. No real-time verification. Drift builds invisibly.' },
  { cat:'Network discovery tools',pros:'Accurate picture of traffic. Good layer 2/3 topology.',      gaps:'Only sees what has network presence. Agents and decommissioned devices invisible. No rack position context.' },
  { cat:'Manual audits',          pros:'Ground truth when done carefully. Compliance teams trust it.',gaps:'Point-in-time, immediately drifts, takes 3-6 weeks per cycle. Doesn\'t scale to modern footprint.' },
  { cat:'CMDB',                   pros:'Central record of intent, drives ITSM and change management.',gaps:'Describes what should be there, not what is. Accuracy degrades with every undocumented change.' },
];

export default function WhyRackTrackPage() {
  const getIllustration = (index: number) => {
    switch(index) {
      case 0: return <RackIllustration />;
      case 1: return <NetworkIllustration />;
      case 2: return <LayersIllustration />;
      default: return null;
    }
  };

  return (
    <div className="why-racktrack-page">
      
      {/* MASTER CONTAINER */}
      <section style={{ position:'relative', paddingTop:'2.5rem', paddingBottom:'2rem', paddingLeft:'10px', paddingRight:'2.5rem' }}>
        
        <div style={{ maxWidth:'90rem', margin:'0 auto', width:'100%' }}>
          
          {/* HERO TEXT */}
          <div style={{ position:'relative', zIndex:20, maxWidth:'700px', textAlign: 'left', marginBottom:'3.5rem' }}>
            
            <h1 style={{ 
              fontFamily:'Archivo Black,sans-serif', 
              fontSize:'clamp(2rem, 5vw, 3.75rem)', 
              fontWeight:900, 
              lineHeight:1.05, 
              letterSpacing:'-0.01em', 
              color:'#FFFFFF', 
              marginBottom:'1.5rem',
              marginTop: 0 
            }}>
              Three things<br />
              every tool does.<br />
              <span style={{ 
                background:'linear-gradient(90deg, #FFFFFF 0%, #00F0FF 35%, #4F8EF7 70%, #8B5CF6 100%)', 
                WebkitBackgroundClip:'text', 
                WebkitTextFillColor:'transparent' 
              }}>
                Only one does<br />
                all three.
              </span>
            </h1>
            
            <p style={{ fontSize:'1.15rem', color:'#F8FAFC', lineHeight:1.85, fontWeight:400, margin:0, maxWidth:'680px', textAlign:'justify' }}>
              {WHY.body}
              <strong style={{ color: '#67D5FF', fontWeight: 700 }}>{WHY.bodyHighlight}</strong>
              {WHY.bodyTail}
            </p>
            
          </div>
          
          {/* 3 PILLARS SECTION */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(420px,1fr))', gap:'2.75rem' }} className="max-xl:grid-cols-2 max-lg:grid-cols-1">
            {WHY.pillars.map((p, index)=>(
              <GlowCard key={p.num} className="why-pillar-card" style={{ borderRadius:'1.5rem', padding:'1.75rem 2.15rem 1.75rem 10px' }}>
                <div className="why-pillar-card-content" style={{ position:'relative', zIndex:2 }}>
                  {/* text left */}
                  <div className="why-pillar-copy">
                    <div style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'2.5rem', fontWeight:800, color:'#5EA6FF', lineHeight:1, marginBottom:'0.6rem', userSelect:'none' }}>{p.num}</div>
                    <h3 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1.45rem', fontWeight:800, color:'#FFFFFF', marginBottom:'0.75rem' }}>{p.title}</h3>
                    <p style={{ fontSize:'0.9rem', color:'#C8D8F0', fontWeight:400, lineHeight:1.7, margin:0 }}>{p.desc}</p>
                  </div>
                  {/* illustration right — clipped inside card */}
                  <div className="why-pillar-visual">
                    {getIllustration(index)}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* CONNECTORS (Hidden on mobile) */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(420px,1fr))', gap:'2.75rem' }} className="max-lg:grid-cols-1 max-lg:hidden">
            <Connector/><Connector/><Connector/>
          </div>

          {/* FEATURE CARDS (Bottom Row) */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(420px,1fr))', gap:'2.75rem', marginBottom:'4rem' }} className="max-lg:grid-cols-1">
            {[
              {Icon:FeatShield, title:'Audit-ready',    desc:'Defensible in any compliance review.'},
              {Icon:FeatBolt,   title:'Incident-speed', desc:'Fast enough for a live outage.'},
              {Icon:FeatChart,  title:'Decision-grade', desc:'Drives capacity and procurement.'},
            ].map(f=>(
              <GlowCard key={f.title} className="why-feature-card" style={{ borderRadius:'1rem', padding:'1.25rem 1.5rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div className="why-feature-icon"><f.Icon/></div>
                  <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div style={{fontSize:'1rem',fontWeight:700,color:'#EAF2FF',marginBottom:'0.25rem', lineHeight:1.3}}>{f.title}</div>
                    <p style={{fontSize:'0.875rem',color:'#C8D8F0',fontWeight:400,lineHeight:1.55, margin:0}}>{f.desc}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="comparison" style={{ padding:'0 2.5rem 7rem 10px', position:'relative' }}>
        <div style={{ maxWidth:'90rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'2.5rem', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'4rem' }}>Three things. One comparison.</h2>
          <div style={{ background:'rgba(8,18,48,0.85)', backdropFilter:'blur(14px)', border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1.25rem', overflow:'hidden', maxWidth:'56rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'1rem 1.5rem', background:'rgba(26,37,53,0.5)', borderBottom:'1px solid rgba(174,183,194,0.08)' }}>
              {WHY.compTable.headers.map(h=><span key={h} style={{ fontSize:'0.6875rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#8CA0B8', textAlign: h==='System'?'left':'center' }}>{h}</span>)}
            </div>
            {WHY.compTable.rows.map(row=>(
              <div key={row.name} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'1rem 1.5rem', borderBottom:'1px solid rgba(174,183,194,0.06)', alignItems:'center', background: row.highlight?'rgba(79,142,247,0.06)':'transparent' }}>
                <span style={{ fontSize:'0.9375rem', color: row.highlight?'#4F8EF7':'#8CA0B8', fontWeight: row.highlight?500:400 }}>{row.name}</span>
                {row.cells.map((c,i)=>(
                  <span key={i} style={{ textAlign:'center', fontSize: c==='Yes'?'0.8125rem':'0.75rem', color: c==='Yes'?'#22C55E': c==='No'?'rgba(255,255,255,0.2)':'#8CA0B8' }}>{c}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOL GAPS */}
      <section style={{ padding:'0 2.5rem 7rem 10px', position:'relative' }}>
        <div style={{ maxWidth:'90rem', margin:'0 auto' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'#4F8EF7', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <span style={{ display:'block', width:'1.5rem', height:'1px', background:'#4F8EF7' }} />Tool Landscape
          </div>
          <h2 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'2.5rem', fontWeight:700, color:'#EAF2FF', letterSpacing:0, marginBottom:'4rem' }}>What every category does — and where it falls short.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }} className="max-md:grid-cols-1">
            {TOOL_GAPS.map(t=>(
              <GlowCard key={t.cat} style={{ border:'1px solid rgba(174,183,194,0.08)', borderRadius:'1rem', padding:'2rem' }}>
                <h4 style={{ fontFamily:'Archivo Black,sans-serif', fontSize:'1.0625rem', fontWeight:600, color:'#EAF2FF', marginBottom:'1.25rem' }}>{t.cat}</h4>
                <div style={{ marginBottom:'1rem' }}>
                  <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#4F8EF7', marginBottom:'0.5rem' }}>Strengths</div>
                  <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{t.pros}</p>
                </div>
                <div style={{ width:'100%', height:'1px', background:'rgba(174,183,194,0.07)', margin:'1rem 0' }} />
                <div>
                  <div style={{ fontSize:'0.625rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8CA0B8', marginBottom:'0.5rem' }}>Where it falls short</div>
                  <p style={{ fontSize:'0.875rem', color:'#8CA0B8', fontWeight:300, lineHeight:1.7 }}>{t.gaps}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
