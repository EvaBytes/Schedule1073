// Motor de generacion de horarios gen()
function gen(){
 S.ov=S.ov||{};const H=dset(S.hol),K=dset(S.key),m0=S.q*3,start=new Date(S.yr,m0,1),end=new Date(S.yr,m0+3,0),E=S.emps;
 const tot=E.map(()=>0),tgt=E.map(()=>0),days={},weeks={},asg=E.map(()=>({})),AB=E.map(e=>absSet(e.v)),AV=E.map(avOf),lack=E.map(()=>0),lw=E.map(()=>0),ovr=E.map(()=>0);
 for(let d=new Date(start);d<=end;d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1)){
  const k=iso(d),w=dow(d),o={date:new Date(d),k,w,hol:H.has(k),key:K.has(k),as:[],miss:[]};days[k]=o;
  const mon=iso(new Date(d.getFullYear(),d.getMonth(),d.getDate()-w));(weeks[mon]=weeks[mon]||[]).push(o)}
 const nb=(o,n)=>iso(new Date(o.date.getFullYear(),o.date.getMonth(),o.date.getDate()+n));
 const ok=(i,o,s,e)=>{const p=asg[i][nb(o,-1)],n=asg[i][nb(o,1)];return !(p&&24-p.e+s<11)&&!(n&&24-e+n.s<11)};
 const wk=Object.keys(weeks).sort();
 wk.forEach(mon=>{const W=weeks[mon],rem=E.map((e,i)=>{const r=e.h*(W.length-W.filter(o=>AB[i].has(o.k)).length)/7;tgt[i]+=r;return r}),sl=[];
  W.forEach(o=>{if(o.hol)return;S.secs.forEach(sec=>sec.sh.forEach(sh=>{if(!sh.d[o.w])return;const n=o.key?sh.k:sh.p,s=tm(sh.s),e=tm(sh.e);for(let j=0;j<n;j++)sl.push({o,sec,sh,s,e,dur:e-s,key:o.k+'|'+sec.id+'|'+sh.n+'|'+j})}))});
  const el=x=>AV.filter(a=>(a[x.sec.id]||[])[x.o.w]).length;
  sl.filter(x=>x.key in S.ov).forEach(x=>{const i=E.findIndex(e=>e.n===S.ov[x.key]);if(i<0){x.o.miss.push({sec:x.sec,sh:x.sh,s:x.s,e:x.e,key:x.key,man:1});return}const a={i,sec:x.sec,sh:x.sh,s:x.s,e:x.e,key:x.key,man:1};asg[i][x.o.k]=a;x.o.as.push(a);rem[i]-=x.dur;tot[i]+=x.dur});for(let z=sl.length-1;z>=0;z--)if(sl[z].key in S.ov)sl.splice(z,1);
  sl.sort((a,b)=>(b.o.key-a.o.key)||(el(a)-el(b))||(b.dur-a.dur));
  sl.forEach(x=>{const c=E.map((e,i)=>i).filter(i=>(AV[i][x.sec.id]||[])[x.o.w]&&!asg[i][x.o.k]&&!AB[i].has(x.o.k)&&rem[i]>=x.dur-.75&&ok(i,x.o,x.s,x.e)).sort((a,b)=>(rem[b]-rem[a])||(tot[a]-tot[b]));
   if(c.length){const i=c[0],a={i,sec:x.sec,sh:x.sh,s:x.s,e:x.e,key:x.key};asg[i][x.o.k]=a;x.o.as.push(a);rem[i]-=x.dur;tot[i]+=x.dur}else x.o.miss.push({sec:x.sec,sh:x.sh,s:x.s,e:x.e,key:x.key})});E.forEach((e,i)=>{if(rem[i]>2){lack[i]+=rem[i];lw[i]++}else if(rem[i]<-1)ovr[i]-=rem[i]});});
 R={days,tot,tgt,wk,weeks,start,lack,lw,ovr};wi=Math.min(wi,wk.length-1);render();if(cur==='home')renderHome()}
