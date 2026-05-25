import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import rackBg from '../rack-bg.png';
import rackImg from '../rack.png';
import highlightSource from '../highlight-source.png';
import highlightNetwork from '../highlight-network.png';
import highlightTimestamp from '../highlight-timestamp.png';
import highlightAudit from '../highlight-audit.png';
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
   HERO IMAGE
══════════════════════════════════════════ */
const EXISTING_RACK_BLUE_LEDS = [
  { top: '16.8%', left: '57.6%', delay: '-0.2s', duration: '2.4s' },
  { top: '18.9%', left: '57.6%', delay: '-1.4s', duration: '2.9s' },
  { top: '23.7%', left: '57.7%', delay: '-0.9s', duration: '2.2s' },
  { top: '26.3%', left: '57.8%', delay: '-2.1s', duration: '3.1s' },
  { top: '32.5%', left: '55.7%', delay: '-1.7s', duration: '2.6s' },
  { top: '33.1%', left: '59.4%', delay: '-0.4s', duration: '3s' },
  { top: '38.8%', left: '55.4%', delay: '-2.6s', duration: '2.5s' },
  { top: '39.2%', left: '58.9%', delay: '-1.1s', duration: '2.8s' },
  { top: '50.6%', left: '57.4%', delay: '-0.6s', duration: '3.2s' },
  { top: '51.5%', left: '43.7%', delay: '-1.9s', duration: '2.3s' },
  { top: '50.5%', left: '41.0%', delay: '-2.5s', duration: '2.8s' },
  { top: '50.7%', left: '45.5%', delay: '-0.8s', duration: '3.1s' },
  { top: '52.5%', left: '44.3%', delay: '-1.6s', duration: '2.4s' },
  { top: '52.7%', left: '56.4%', delay: '-2.9s', duration: '2.9s' },
  { top: '58.5%', left: '57.1%', delay: '-2.8s', duration: '2.7s' },
  { top: '57.8%', left: '41.2%', delay: '-0.7s', duration: '3.4s' },
  { top: '58.1%', left: '44.8%', delay: '-2.2s', duration: '2.6s' },
  { top: '59.9%', left: '43.1%', delay: '-1.2s', duration: '3s' },
  { top: '63.5%', left: '57.9%', delay: '-1.3s', duration: '3.3s' },
  { top: '62.7%', left: '40.9%', delay: '-3.1s', duration: '2.7s' },
  { top: '64.2%', left: '46.2%', delay: '-0.4s', duration: '3.2s' },
  { top: '65.0%', left: '55.6%', delay: '-1.8s', duration: '2.5s' },
  { top: '73.1%', left: '57.7%', delay: '-0.1s', duration: '2.6s' },
  { top: '72.0%', left: '43.2%', delay: '-2.3s', duration: '3.1s' },
  { top: '73.8%', left: '45.7%', delay: '-0.9s', duration: '2.8s' },
  { top: '74.4%', left: '56.3%', delay: '-1.5s', duration: '3.3s' },
  { top: '82.5%', left: '57.8%', delay: '-2.2s', duration: '2.9s' },
  { top: '80.8%', left: '43.4%', delay: '-1.1s', duration: '2.5s' },
  { top: '82.2%', left: '46.8%', delay: '-3s', duration: '3.2s' },
  { top: '84.0%', left: '55.8%', delay: '-0.5s', duration: '2.7s' },
  { top: '86.7%', left: '55.8%', delay: '-1.9s', duration: '3.4s' },
  { top: '88.8%', left: '57.6%', delay: '-2.7s', duration: '2.6s' },
];

const RackAnimationOverlay = () => (
  <div className="why-rack-scan-visual">
  <img
    src={rackImg}
    alt="RackTrack — scans hardware, reads the wire, pulls vendor data, reconciled in one pass"
    style={{width:'100%',height:'auto',display:'block',mixBlendMode:'screen', filter:'brightness(1.1) contrast(1.15)'}}
  />
    <div className="why-existing-led-layer" aria-hidden="true">
      {EXISTING_RACK_BLUE_LEDS.map((led, index) => (
        <span
          key={`${led.top}-${led.left}-${index}`}
          className="why-existing-blue-led"
          style={{
            top: led.top,
            left: led.left,
            '--led-delay': led.delay,
            '--led-duration': led.duration,
          } as CSSProperties}
        />
      ))}
    </div>
    <div className="why-rack-scan-window" aria-hidden="true">
      <div className="why-rack-scan-line" />
    </div>
  </div>
);
const FeatShield = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(34,197,94,0.6))' }}>
    <rect width="44" height="44" rx="10" fill="rgba(10,40,22,0.95)" stroke="rgba(34,197,94,0.70)" strokeWidth="1.2"/>
    <path d="M22 9l11 5v8c0 7-4.5 11-11 13-6.5-2-11-6-11-13v-8l11-5z" stroke="#22C55E" strokeWidth="1.6" fill="rgba(34,197,94,0.15)" strokeLinejoin="round"/>
    <path d="M17 22l3.5 3.5L27 18" stroke="#4ADE80" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const FeatBolt = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.6))' }}>
    <rect width="44" height="44" rx="10" fill="rgba(40,28,6,0.95)" stroke="rgba(251,191,36,0.70)" strokeWidth="1.2"/>
    <path d="M25 10l-9 13h8l-4 11 11-15h-8l2-9z" stroke="#FBBF24" strokeWidth="1.6" fill="rgba(251,191,36,0.18)" strokeLinejoin="round"/>
  </svg>
);
const FeatChart = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(52,211,153,0.55))' }}>
    <rect width="44" height="44" rx="10" fill="rgba(10,30,50,0.95)" stroke="rgba(52,211,153,0.68)" strokeWidth="1.2"/>
    <rect x="12" y="27" width="5" height="8"  rx="1" fill="#60A5FA"/>
    <rect x="20" y="21" width="5" height="14" rx="1" fill="#34D399"/>
    <rect x="28" y="15" width="5" height="20" rx="1" fill="#4ADE80"/>
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

/* ── Icons for Tool Highlight Carousel ── */
const IconLink = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#4F8EF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#4F8EF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconClock = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4F8EF7" strokeWidth="1.8"/>
    <polyline points="12 6 12 12 16 14" stroke="#4F8EF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4F8EF7" strokeWidth="1.8"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#4F8EF7" strokeWidth="1.8"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#4F8EF7" strokeWidth="1.8"/>
  </svg>
);
const IconShieldCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4F8EF7" strokeWidth="1.8" strokeLinejoin="round"/>
    <polyline points="9 12 11 14 15 10" stroke="#4F8EF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/* ── Animated canvas overlay — original PNG preserved as base ── */
function SourceImageAnimated({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    let raf: number;
    let t = 0;

    const resize = () => {
      cv.width  = cv.offsetWidth  || 500;
      cv.height = cv.offsetHeight || 300;
    };

    const bz = (u: number, a: number, b: number, c: number, d: number) => {
      const v = 1 - u;
      return v*v*v*a + 3*v*v*u*b + 3*v*u*u*c + u*u*u*d;
    };

    const parts = Array.from({ length: 15 }, (_, i) => ({
      progress: i / 15,
      speed: 0.0030 + (i % 5) * 0.0004,
      stream: i % 5,
    }));

    const draw = () => {
      t += 0.016;
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const nX   = W * 0.13;
      const hubX = W * 0.50, hubY = H * 0.50;
      const shX  = W * 0.83, shY  = H * 0.50;
      const nodeYs = [H*0.20, H*0.34, H*0.50, H*0.66, H*0.80];

      const hg = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, W*0.12);
      hg.addColorStop(0, `rgba(0,207,255,${0.22 + 0.13*Math.sin(t*0.8)})`);
      hg.addColorStop(1, 'transparent');
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(hubX, hubY, W*0.12, 0, Math.PI*2); ctx.fill();

      [0, 0.9, 1.8].forEach(off => {
        const ph = (t * 0.38 + off) % 1;
        ctx.beginPath();
        ctx.arc(hubX, hubY, W*0.04 + ph*W*0.12, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(0,207,255,${(1-ph)*0.60})`;
        ctx.lineWidth = 1.4; ctx.stroke();
      });

      const sg = ctx.createRadialGradient(shX, shY, 0, shX, shY, W*0.10);
      sg.addColorStop(0, `rgba(79,142,247,${0.20 + 0.12*Math.sin(t*0.65+1)})`);
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(shX, shY, W*0.10, 0, Math.PI*2); ctx.fill();

      const sp = (t * 0.40 + 0.6) % 1;
      ctx.beginPath();
      ctx.arc(shX, shY, W*0.05 + sp*W*0.08, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(0,207,255,${(1-sp)*0.60})`; ctx.lineWidth = 1.1; ctx.stroke();

      nodeYs.forEach((ny, i) => {
        const ph = (t * 0.36 + i * 0.22) % 1;
        ctx.beginPath();
        ctx.arc(nX, ny, W*0.018 + ph*W*0.055, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(${i%2===0?'79,142,247':'0,207,255'},${(1-ph)*0.55})`;
        ctx.lineWidth = 1; ctx.stroke();
      });

      parts.forEach(p => {
        p.progress = (p.progress + p.speed) % 1;
        const u  = p.progress, si = p.stream;
        const y0 = nodeYs[si];
        const px = bz(u, nX, nX+(hubX-nX)*0.45, nX+(hubX-nX)*0.55, hubX);
        const py = bz(u, y0, y0, hubY, hubY);
        const al = Math.sin(u * Math.PI) * 0.90;
        const rgb = si%2===0 ? '79,142,247' : '0,207,255';
        const gg = ctx.createRadialGradient(px, py, 0, px, py, 9);
        gg.addColorStop(0, `rgba(${rgb},${al})`);
        gg.addColorStop(1, 'transparent');
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 2.8, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${rgb},${Math.min(al*1.3,1)})`; ctx.fill();
      });

      const hp  = (t * 0.50) % 1;
      const hpx = bz(hp, hubX, hubX+(shX-hubX)*0.35, hubX+(shX-hubX)*0.65, shX);
      const ha  = Math.sin(hp * Math.PI) * 0.90;
      const hpg = ctx.createRadialGradient(hpx, hubY, 0, hpx, hubY, 9);
      hpg.addColorStop(0, `rgba(0,207,255,${ha})`); hpg.addColorStop(1, 'transparent');
      ctx.fillStyle = hpg; ctx.beginPath(); ctx.arc(hpx, hubY, 9, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(hpx, hubY, 2.8, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,207,255,${Math.min(ha*1.3,1)})`; ctx.fill();

      ([[0.26,0.26],[0.38,0.13],[0.61,0.72],[0.72,0.26],[0.44,0.82],[0.57,0.44]] as [number,number][])
        .forEach(([xf,yf],i) => {
          const ax = xf*W, ay = (yf + Math.sin(t*0.42+i)*0.025)*H;
          const oa = 0.15 + 0.32*Math.abs(Math.sin(t*0.5+i*1.1));
          ctx.beginPath(); ctx.arc(ax, ay, 1.6, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${i%2===0?'79,142,247':'0,207,255'},${oa})`; ctx.fill();
        });

      raf = requestAnimationFrame(draw);
    };

    const t0 = setTimeout(() => { resize(); draw(); }, 120);
    window.addEventListener('resize', resize);
    return () => { clearTimeout(t0); cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div style={{ position:'relative', width:'100%', animation:'cardImgFloat 5s ease-in-out infinite' }}>
      <img src={src} alt={alt} className="tool-highlight-image" style={{ animation:'none' }} />
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', mixBlendMode:'screen', pointerEvents:'none' }}
      />
    </div>
  );
}

/* ── Tool Highlight Carousel — one block with left/right arrow navigation ── */
type ToolHighlight = {
  name: string;
  heading: string;
  desc: string;
  tag: string;
  Icon: () => React.ReactElement;
  image: string;
  imageAlt: string;
};

function ToolHighlightCarousel({ items }: { items: ToolHighlight[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      setMaxTranslate(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const idx = Math.round(clamped * (items.length - 1));
    setActiveIndex(idx);
  });

  return (
    <section
      ref={targetRef}
      className="tool-highlight-scroll-section"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div ref={viewportRef} className="tool-highlight-sticky">
        <motion.div ref={trackRef} style={{ x }} className="tool-highlight-track">
          {items.map((item, i) => (
            <article key={i} className="tool-highlight-card">
              <div className="tool-highlight-inner">
                <div className="tool-highlight-shimmer" />
                <div className="tool-highlight-content">
                  <h3 className="tool-highlight-heading">{item.heading}</h3>
                  <p className="tool-highlight-desc">{item.desc}</p>
                  <div className="tool-highlight-tag">{item.tag}</div>
                </div>
                <div className="tool-highlight-media">
                  {i === 0
                    ? <SourceImageAnimated src={item.image} alt={item.imageAlt} />
                    : <img src={item.image} alt={item.imageAlt} className="tool-highlight-image" />
                  }
                </div>
              </div>
            </article>
          ))}
        </motion.div>
        <div className="tool-highlight-dots" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={`tool-highlight-dot ${i === activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hover row for table ── */
function HoverRow({ children, isRT, isLast, index }: { children: React.ReactNode; isRT: boolean; isLast: boolean; index: number }) {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const delay = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, index * 100);
    return () => clearTimeout(delay);
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`table-row-animate${visible ? ' visible' : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr',
        borderBottom: isLast ? 'none' : '1px solid rgba(56,152,255,.1)',
        position: 'relative',
        overflow: 'hidden',
        background: hov
          ? isRT
            ? 'linear-gradient(90deg, rgba(26,240,160,0.08) 0%, rgba(26,240,160,0.02) 100%)'
            : 'linear-gradient(90deg, rgba(0,207,255,0.06) 0%, rgba(0,207,255,0.01) 100%)'
          : isRT ? 'rgba(26,240,160,0.025)' : 'transparent',
        boxShadow: hov ? (isRT ? 'inset 2px 0 0 rgba(26,240,160,0.8)' : 'inset 2px 0 0 rgba(0,207,255,0.5)') : isRT ? 'inset 2px 0 0 rgba(26,240,160,0.3)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* scan line on hover */}
      <div className="row-scan-line" />
      {/* RackTrack periodic shimmer */}
      {isRT && <div className="rt-sweep-bar" />}
      {children}
    </div>
  );
}

/* ── Counter card that animates its number on scroll ── */
function CounterCard({ label, value, border }: { label: string; value: string; border: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="stat-card" style={{ flex:1, minWidth:'120px', background:'rgba(8,20,45,.85)', border:`1px solid ${border}`, borderRadius:'10px', padding:'16px 18px', cursor:'default' }}>
      <span style={{ fontSize:'15px', fontWeight:600, color:'#00CFFF', letterSpacing:'.08em', textTransform:'uppercase', display:'block', marginBottom:'8px' }}>{label}</span>
      {visible && (
        <p className="counter-value" style={{ margin:0, fontSize:'2.25rem', fontWeight:700, color:'#ffffff', letterSpacing:'-0.02em' }}>{value}</p>
      )}
    </div>
  );
}

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

const TOOL_HIGHLIGHTS: ToolHighlight[] = [
  {
    name: 'Source Traceable',
    heading: 'Every data point traceable to its source',
    desc: 'Each device record links to the physical signal or network signal that produced it. Every claim carries provenance, so trust never relies on inference.',
    tag: 'SOURCE-LINKED',
    Icon: IconLink,
    image: highlightSource,
    imageAlt: 'Device record with tracer lines flowing back to physical and network source signals',
  },
  {
    name: 'Network Verified',
    heading: 'Every identification verifiable against the live network',
    desc: 'Camera-captured physical state is cross-referenced against CDP and LLDP from your switch fabric. Physical and logical must agree before a device is marked verified. 99%+ accuracy after cross-validation.',
    tag: 'NETWORK-VERIFIED',
    Icon: IconGlobe,
    image: highlightNetwork,
    imageAlt: 'Camera-captured state and network packets converging on a verified server',
  },
  {
    name: 'Timestamped Changes',
    heading: 'Every change timestamped',
    desc: 'State changes, device appearances, and departures are captured with verified event timing. Reconciliation is continuous, not annual, so the rack and the record stop diverging in the first place.',
    tag: 'TIMESTAMPED',
    Icon: IconClock,
    image: highlightTimestamp,
    imageAlt: 'Continuous data stream with device changes captured along a live timeline',
  },
  {
    name: 'Audit-Ready',
    heading: 'Data your compliance owners can defend',
    desc: 'Outputs mapped to the controls cited by SOC 2, ISO 27001, HIPAA, and PCI-DSS 9. Evidence is a query, not a project. Built for compliance owners, security teams, and on-call engineers who carry the consequences.',
    tag: 'AUDIT-READY',
    Icon: IconShieldCheck,
    image: highlightAudit,
    imageAlt: 'Compliance shield with framework badges and queryable evidence panels',
  },
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

  const rackDots = useMemo(() => [
    // ── left column 8% ──
    { top:'22%', left:'8%',  color:'#4F8EF7' },
    { top:'35%', left:'8%',  color:'#22C55E' },
    { top:'50%', left:'8%',  color:'#4F8EF7' },
    { top:'65%', left:'8%',  color:'#F59E0B' },
    { top:'76%', left:'8%',  color:'#22C55E' },
    { top:'85%', left:'8%',  color:'#4F8EF7' },
    { top:'92%', left:'8%',  color:'#F59E0B' },
    // ── column 21% ──
    { top:'22%', left:'21%', color:'#22C55E' },
    { top:'38%', left:'21%', color:'#4F8EF7' },
    { top:'55%', left:'21%', color:'#22C55E' },
    { top:'68%', left:'21%', color:'#4F8EF7' },
    { top:'78%', left:'21%', color:'#F59E0B' },
    { top:'88%', left:'21%', color:'#22C55E' },
    // ── column 36% ──
    { top:'25%', left:'36%', color:'#4F8EF7' },
    { top:'40%', left:'36%', color:'#F59E0B' },
    { top:'55%', left:'36%', color:'#4F8EF7' },
    { top:'70%', left:'36%', color:'#22C55E' },
    { top:'80%', left:'36%', color:'#4F8EF7' },
    { top:'90%', left:'36%', color:'#F59E0B' },
    // ── column 50% ──
    { top:'22%', left:'50%', color:'#22C55E' },
    { top:'38%', left:'50%', color:'#4F8EF7' },
    { top:'54%', left:'50%', color:'#F59E0B' },
    { top:'68%', left:'50%', color:'#4F8EF7' },
    { top:'77%', left:'50%', color:'#22C55E' },
    { top:'87%', left:'50%', color:'#4F8EF7' },
    { top:'93%', left:'50%', color:'#F59E0B' },
    // ── column 64% ──
    { top:'25%', left:'64%', color:'#4F8EF7' },
    { top:'40%', left:'64%', color:'#22C55E' },
    { top:'56%', left:'64%', color:'#4F8EF7' },
    { top:'70%', left:'64%', color:'#F59E0B' },
    { top:'79%', left:'64%', color:'#22C55E' },
    { top:'89%', left:'64%', color:'#4F8EF7' },
    // ── column 79% ──
    { top:'22%', left:'79%', color:'#22C55E' },
    { top:'36%', left:'79%', color:'#4F8EF7' },
    { top:'52%', left:'79%', color:'#22C55E' },
    { top:'66%', left:'79%', color:'#4F8EF7' },
    { top:'75%', left:'79%', color:'#F59E0B' },
    { top:'84%', left:'79%', color:'#22C55E' },
    { top:'92%', left:'79%', color:'#4F8EF7' },
    // ── right column 92% ──
    { top:'24%', left:'92%', color:'#4F8EF7' },
    { top:'40%', left:'92%', color:'#F59E0B' },
    { top:'56%', left:'92%', color:'#4F8EF7' },
    { top:'70%', left:'92%', color:'#22C55E' },
    { top:'80%', left:'92%', color:'#4F8EF7' },
    { top:'90%', left:'92%', color:'#F59E0B' },
  ], []);

  const [litDots, setLitDots] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const scheduleDot = (i: number) => {
      // random delay before next blink: 400ms – 3500ms
      const delay = 400 + Math.random() * 3100;
      const t = setTimeout(() => {
        // turn on
        setLitDots(prev => new Set([...prev, i]));
        // keep it lit for 120ms – 500ms, then turn off
        const onDuration = 120 + Math.random() * 380;
        const t2 = setTimeout(() => {
          setLitDots(prev => { const next = new Set(prev); next.delete(i); return next; });
          scheduleDot(i); // schedule next blink for this dot
        }, onDuration);
        timers.push(t2);
      }, delay);
      timers.push(t);
    };

    // stagger initial start so they don't all fire at once
    rackDots.forEach((_, i) => {
      const t = setTimeout(() => scheduleDot(i), Math.random() * 2000);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [rackDots.length]);

  return (
    <div className="why-racktrack-page">
      
      {/* MASTER CONTAINER */}
      <section style={{ position:'relative', paddingTop:'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom:'0', paddingLeft:'clamp(1rem, 4vw, 4rem)', paddingRight:'clamp(1rem, 4vw, 4rem)' }}>
        
        <div style={{ maxWidth:'112.5rem', margin:'0 auto', width:'100%' }}>
          
          {/* HERO — text left, image right */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(1.25rem, 2.4vw, 2.6rem)',
            marginBottom: 'clamp(4rem, 6vw, 7rem)',
            minHeight: 'clamp(520px, 39vw, 670px)',
            flexWrap: 'wrap',
          }}>

            {/* HERO TEXT */}
            <div style={{ flex: '1 1 min(42%, 340px)', minWidth: 0, zIndex: 20 }}>

              <h1 style={{
                fontFamily:'Archivo Black,sans-serif',
                fontSize:'clamp(2.35rem, 4.15vw, 3.95rem)',
                fontWeight:900,
                lineHeight:1.08,
                letterSpacing:'-0.01em',
                color:'#FFFFFF',
                marginBottom:'2rem',
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

              <p style={{ fontSize:'clamp(1rem, 1.18vw, 1.18rem)', color:'#F4FAFF', lineHeight:1.86, fontWeight:500, margin:0, textAlign:'justify' }}>
                {WHY.body}
                <strong style={{ color: '#7FEAFF', fontWeight: 800 }}>{WHY.bodyHighlight}</strong>
                {WHY.bodyTail}
              </p>

            </div>

            {/* HERO IMAGE — right, fills remaining space */}
            <div style={{
              flex: '1.22 1 min(58%, 460px)',
              minWidth: 0,
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              background: '#000',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              marginRight: 'clamp(-1.25rem, -1vw, -0.25rem)',
            }}>
              <RackAnimationOverlay />
            </div>

          </div>
          
          {/* 3 PILLARS SECTION */}
          <div className="why-card-grid max-lg:grid-cols-1" style={{ marginTop: 'clamp(1.5rem, 4vw, 4.5rem)' }}>
            {WHY.pillars.map((p, index)=>(
              <GlowCard key={p.num} className="why-pillar-card" style={{ borderRadius:'1.5rem' }}>
                <div className="why-pillar-card-content">
                  <div className="why-pillar-copy">
                    <div className="why-pillar-number">{p.num}</div>
                    <h3 className="why-pillar-title">{p.title}</h3>
                    <p className="why-pillar-desc">{p.desc}</p>
                  </div>
                  <div className="why-pillar-visual">
                    {getIllustration(index)}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* CONNECTORS (Hidden on mobile) */}
          <div className="why-connector-grid max-lg:hidden">
            <Connector/><Connector/><Connector/>
          </div>

          {/* FEATURE CARDS (Bottom Row) — no bottom margin so image touches */}
          <div className="why-card-grid max-lg:grid-cols-1" style={{ marginBottom: 0 }}>
            {[
              {Icon:FeatShield, title:'Audit-ready',    desc:'Defensible in any compliance review.'},
              {Icon:FeatBolt,   title:'Incident-speed', desc:'Fast enough for a live outage.'},
              {Icon:FeatChart,  title:'Decision-grade', desc:'Drives capacity and procurement.'},
            ].map(f=>(
              <GlowCard key={f.title} className="why-feature-card">
                <div className="why-feature-card-inner">
                  <div className="why-feature-icon"><f.Icon/></div>
                  <div className="why-feature-text">
                    <div className="why-feature-title">{f.title}</div>
                    <p className="why-feature-desc">{f.desc}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX SECTION — same 2rem side padding as master */}
      <section id="comparison" style={{ padding:'0 clamp(1rem, 4vw, 4rem)', position:'relative' }}>
        <div style={{ maxWidth:'112.5rem', margin:'0 auto', width:'100%' }}>

          {/* RACK IMAGE BANNER — full viewport width, breaks out of container */}
          <div style={{
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw',
            minHeight: '420px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Rack image — full brightness */}
            <img
              src={rackBg}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(0.85)',
              }}
            />
            {/* Subtle dark vignette only at very edges */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(2,8,16,0.55) 0%, rgba(2,8,16,0.05) 20%, rgba(2,8,16,0.05) 80%, rgba(2,8,16,0.55) 100%)',
            }} />
            {/* Blinking rack lights overlay */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }}>
              {rackDots.map((dot, i) => {
                const isLit = litDots.has(i);
                return (
                  <div key={i} style={{
                    position:'absolute',
                    top: dot.top, left: dot.left,
                    width:'4px', height:'4px',
                    borderRadius:'50%',
                    background: dot.color,
                    boxShadow: isLit ? `0 0 10px 4px ${dot.color}` : `0 0 5px 1px rgba(0,0,0,0.1)`,
                    opacity: isLit ? 1 : 0.18,
                    transform: isLit ? 'scale(1.3)' : 'scale(0.85)',
                    filter: isLit ? 'brightness(1.6)' : 'brightness(0.7)',
                    transition: 'opacity 0.22s ease, transform 0.22s ease, filter 0.22s ease, box-shadow 0.22s ease',
                  }} />
                );
              })}
            </div>
            {/* Headline text */}
            <h2 className="why-comparison-headline" style={{ position: 'relative', zIndex: 2, margin: 0, padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 2vw, 2rem)', fontSize: 'clamp(1.5rem, 4.5vw, 4rem)' }}>
              <span style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, #00F0FF 35%, #4F8EF7 70%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Most tools report what they find.<br />
                RackTrack knows what&apos;s actually there.
              </span>
            </h2>
          </div>
          
          <div style={{ background:'#060d1a', borderRadius:'0 0 16px 16px', padding:'clamp(1rem, 2vw, 2rem)', fontFamily:'var(--font-sans)', position:'relative', overflow:'hidden', border:'1px solid rgba(56,152,255,.15)', borderTop:'none', marginBottom:'clamp(3rem, 7vw, 7rem)', marginTop:'2.5rem' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:'radial-gradient(ellipse 60% 40% at 50% 0%,rgba(30,80,200,.12) 0%,transparent 70%)', pointerEvents:'none' }}></div>
            <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, opacity:.04, backgroundImage:'repeating-linear-gradient(0deg,rgba(56,152,255,.5) 0px,rgba(56,152,255,.5) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(56,152,255,.5) 0px,rgba(56,152,255,.5) 1px,transparent 1px,transparent 32px)', pointerEvents:'none' }}></div>

            <div style={{ position:'relative', background:'rgba(8,20,45,.7)', border:'1px solid rgba(56,152,255,.18)', borderRadius:'12px', overflow:'hidden' }}>

              {/* HEADER */}
              <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr 1fr', borderBottom:'1px solid rgba(56,152,255,.2)', background:'rgba(4,11,26,0.6)' }}>
                <div style={{ padding:'16px 16px' }} />
                {[
                  { label:'Physical Sensing' },
                  { label:'Network Identification' },
                  { label:'Enrich Data' },
                  { label:'Single Source of Truth', highlight: true },
                ].map((col, i) => (
                  <div key={i} style={{ position:'relative', padding:'20px 12px', borderLeft:'1px solid rgba(56,152,255,.12)', textAlign:'center', fontSize:'15px', fontWeight:700, color:'#00CFFF', letterSpacing:'.06em', textTransform:'uppercase' }}>
                    <div className="col-header-accent" />
                    {col.label}
                  </div>
                ))}
              </div>

              {/* ROWS */}
              {(()=>{
                const Check = ({ isRT }: { isRT?: boolean }) => (
                  <svg className={isRT ? 'check-icon-live' : ''} width="24" height="24" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8.5" fill="rgba(26,240,160,.1)" stroke="rgba(26,240,160,.45)" strokeWidth="1"/>
                    <path d="M5.5 10.2l3 3 6-6" stroke="#1af0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                );
                const Partial = () => (
                  <div style={{ width:'24px', height:'24px', borderRadius:'4px', background:'rgba(245,158,11,.08)', border:'1px solid rgba(245,158,11,.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color:'rgba(245,158,11,.9)', letterSpacing:'.04em' }}>
                    P
                  </div>
                );
                const Dash = () => (
                  <svg width="16" height="2" viewBox="0 0 16 2">
                    <line x1="1" y1="1" x2="15" y2="1" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                );
                const rows = [
                  { name:'RackTrack',         isRT:true,  cells:['check','check','check','check'] },
                  { name:'DCIM Platforms',    isRT:false, cells:['partial','partial','dash','dash'] },
                  { name:'Network Discovery', isRT:false, cells:['check','partial','dash','dash'] },
                  { name:'Manual Rack Audits',isRT:false, cells:['check','dash','dash','dash'] },
                  { name:'CMDB',              isRT:false, cells:['dash','dash','check','dash'] },
                ];
    
                return rows.map((row, ri) => (
                  <HoverRow key={row.name} isRT={row.isRT} isLast={ri === rows.length - 1} index={ri}>
                    <div style={{ padding:'18px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
                      <div
                        className={row.isRT ? 'row-dot-live' : ''}
                        style={{ width:'7px', height:'7px', borderRadius:'50%', flexShrink:0, background: row.isRT ? '#1af0a0' : 'rgba(56,152,255,.3)' }}
                      />
                      <span style={{ fontSize:'17px', fontWeight: row.isRT ? 700 : 500, color: row.isRT ? '#ffffff' : 'rgba(255,255,255,0.88)', letterSpacing: row.isRT ? '.01em' : '0' }}>
                        {row.name}
                      </span>
                    </div>
                    {row.cells.map((cell, ci) => (
                      <div key={ci} style={{ padding:'18px 12px', borderLeft:'1px solid rgba(56,152,255,.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {cell==='check'   && <Check isRT={row.isRT} />}
                        {cell==='partial' && <Partial />}
                        {cell==='dash'    && <Dash />}
                      </div>
                    ))}
                  </HoverRow>
                ));
              })()}
            </div>

            <div style={{ display:'flex', gap:'16px', marginTop:'1.5rem', flexWrap:'wrap' }}>
              <CounterCard label="Full Coverage" value="4 / 4" border="rgba(26,240,160,.2)" />
              <CounterCard label="Competitors Avg" value="1.3 / 4" border="rgba(56,152,255,.2)" />
              <div className="stat-card" style={{ flex:1, minWidth:'160px', background:'rgba(8,20,45,.85)', border:'1px solid rgba(56,152,255,.15)', borderRadius:'10px', padding:'16px 18px' }}>
                <p style={{ margin:'0 0 12px', fontSize:'15px', fontWeight:600, color:'#00CFFF', letterSpacing:'.08em', textTransform:'uppercase' }}>Legend</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'16px', fontWeight:500, color:'#ffffff' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}><circle cx="10" cy="10" r="8.5" fill="rgba(26,240,160,.1)" stroke="rgba(26,240,160,.45)" strokeWidth="1"/><path d="M5.5 10.2l3 3 6-6" stroke="#1af0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Full support
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'16px', fontWeight:500, color:'#ffffff' }}>
                    <div style={{ width:'18px', height:'18px', borderRadius:'4px', background:'rgba(245,158,11,.08)', border:'1px solid rgba(245,158,11,.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'rgba(245,158,11,.9)', flexShrink:0 }}>P</div>
                    Partial support
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'16px', fontWeight:500, color:'#ffffff' }}>
                    <svg width="16" height="2" viewBox="0 0 16 2" style={{flexShrink:0}}><line x1="1" y1="1" x2="15" y2="1" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Not available
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DEFENSIBILITY & TRUST */}
      <section style={{ padding:'0 clamp(1rem, 4vw, 4rem)', position:'relative' }}>
        <motion.div
          style={{ maxWidth:'90rem', margin:'0 auto', textAlign:'center' }}
        >
          <motion.h2
            initial={{ y: 96 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{
            fontFamily:'Archivo Black,sans-serif',
            fontSize:'clamp(2.35rem, 4.15vw, 3.95rem)',
            fontWeight:900,
            lineHeight:1.08,
            letterSpacing:'-0.01em',
            color:'#FFFFFF',
            marginTop:0,
            marginBottom:'1.5rem',
            textAlign:'center',
          }}>
            <span style={{
              background:'linear-gradient(90deg, #FFFFFF 0%, #EFFFFF 18%, #00F0FF 42%, #4F8EF7 72%, #8B5CF6 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>
              Built to be trusted by
            </span><br />
            <span style={{
              background:'linear-gradient(90deg, #00F0FF 0%, #4F8EF7 55%, #8B5CF6 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>
              the people who carry
            </span><br />
            <span style={{
              background:'linear-gradient(90deg, #FFFFFF 0%, #00F0FF 35%, #4F8EF7 70%, #8B5CF6 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>
              the consequences.
            </span>
          </motion.h2>
          <motion.p
            initial={{ y: 68 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
            color:'#F4FAFF',
            fontSize:'clamp(1rem, 1.18vw, 1.18rem)',
            fontWeight:500,
            lineHeight:1.86,
            margin:0,
            maxWidth:'68rem',
            marginLeft:'auto',
            marginRight:'auto',
            textAlign:'center',
          }}>
            Every data point in RackTrack is traceable to its source. Every device<br />
            identification is verifiable against the live network. Every change is<br />
            timestamped. Compliance owners, security teams, and on-call engineers<br />
            don&apos;t need another dashboard — they need data they can defend.
          </motion.p>
        </motion.div>
      </section>
      <ToolHighlightCarousel items={TOOL_HIGHLIGHTS} />
    </div>
  );
}
