// Pagina Planifica: trimestre, secciones/turnos y disponibilidad
function bars(sh,sec){return `<div class="b" style="left:${(tm(sh.s)-6)/16*100}%;width:${(tm(sh.e)-tm(sh.s))/16*100}%;background:${sec.c}">${sh.n} ×${sh.p}</div>`}
function drawPv(){let h='<div class="ax" style="margin-left:96px">'+Array.from({length:16},(_,i)=>`<span>${6+i}</span>`).join('')+'</div>';
 S.secs.forEach(sec=>sec.sh.forEach(sh=>{h+=`<div class="pv"><span><b style="color:${sec.c}">${esc(sec.n)}</b></span><div class="tl"><div class="ob"></div>${bars(sh,sec)}</div></div>`}));$('#pv').innerHTML=h}
function drawSecs(){const w=$('#secs');w.innerHTML='';S.secs.forEach((sec,si)=>{const d=document.createElement('div');d.className='sec';d.style.setProperty('--c',sec.c);
 d.innerHTML=`<div class="row"><input value="${esc(sec.n)}" data-k="n" placeholder="Sección"><input type="color" value="${sec.c}" data-k="c" style="max-width:54px;padding:2px"></div><div class="note" style="margin-top:6px">Turno · inicio · fin · normal · clave</div>`;
 const [ni,ci]=d.querySelectorAll('input');ni.oninput=()=>{sec.n=ni.value;save();drawPv();drawEmps()};ci.oninput=()=>{sec.c=ci.value;d.style.setProperty('--c',ci.value);save();drawPv();drawEmps()};
 sec.sh.forEach((sh,hi)=>{const r=document.createElement('div');r.innerHTML=`<div class="sh"><input value="${esc(sh.n)}"><input type="time" value="${sh.s}"><input type="time" value="${sh.e}"><input type="number" min="0" value="${sh.p}"><input type="number" min="0" value="${sh.k}"></div><div class="days"></div>`;
  const ins=r.querySelectorAll('input');['n','s','e','p','k'].forEach((k,j)=>ins[j].oninput=()=>{sh[k]=(k==='p'||k==='k')?+ins[j].value||0:ins[j].value;save();drawPv()});
  const dd=r.querySelector('.days');tog(dd,sh.d,'');const x=document.createElement('button');x.className='x';x.textContent='Quitar turno';x.onclick=()=>{sec.sh.splice(hi,1);drawSecs();drawPv();save()};dd.appendChild(x);d.appendChild(r)});
 const a=document.createElement('button');a.className='s';a.textContent='+ Turno';a.onclick=()=>{sec.sh.push({n:'Nuevo',s:'09:30',e:'14:30',p:1,k:2,d:[...W6]});drawSecs();drawPv();save()};
 const x=document.createElement('button');x.className='x';x.textContent='Quitar sección';x.onclick=()=>{S.secs.splice(si,1);S.emps.forEach(e=>e.s=e.s.filter(i=>i!==sec.id));drawSecs();drawEmps();drawPv();save()};
 d.appendChild(a);d.appendChild(x);w.appendChild(d)})}
function drawEmps(){const w=$('#emps');w.innerHTML='';S.emps.forEach((e,i)=>{const A=avOf(e),r=document.createElement('div');r.className='emp';
 r.innerHTML=`<div class="eh"><input value="${esc(e.n)}" placeholder="Nombre"><input type="number" min="0" step="0.5" value="${e.h}" title="Horas/semana"></div><div class="note" style="margin-bottom:6px">Nombre · horas por semana (base de contrato)</div>`;
 const [n,h]=r.querySelectorAll('input');n.oninput=()=>{e.n=n.value;save()};h.oninput=()=>{e.h=+h.value||0;save()};
 S.secs.forEach(sec=>{const a=A[sec.id]=A[sec.id]||[0,0,0,0,0,0,0],row=document.createElement('div');row.className='days';row.innerHTML=`<b style="width:104px;color:${sec.c};font-size:13px">${esc(sec.n)}</b>`;tog(row,a,'sc',null);row.querySelectorAll('.d').forEach(b=>b.style.setProperty('--c',sec.c));r.appendChild(row)});
 r.insertAdjacentHTML('beforeend',`<label>Ausencias y vacaciones (fecha o fecha/fecha)</label><input class="av" placeholder="2026-12-24/2026-12-31, 2026-11-10" value="${esc(e.v||'')}">`);
 r.querySelector('.av').oninput=ev=>{e.v=ev.target.value;save()};
 const x=document.createElement('button');x.className='x';x.textContent='Quitar empleado';x.onclick=()=>{S.emps.splice(i,1);drawEmps();save()};r.appendChild(x);w.appendChild(r)})}
function init(){$('#yr').value=S.yr;$('#q').value=S.q;$('#hol').value=S.hol;$('#key').value=S.key;
 $('#yr').oninput=e=>{S.yr=+e.target.value;save();drawEmps()};$('#q').oninput=e=>{S.q=+e.target.value;save();drawEmps()};$('#hol').oninput=e=>{S.hol=e.target.value;save()};$('#key').oninput=e=>{S.key=e.target.value;save()};
 drawSecs();drawEmps();drawPv()}
$('#adds').onclick=()=>{S.secs.push({id:S.nid++,n:'Nueva sección',c:'#9c36b6',sh:[{n:'Turno',s:'09:30',e:'14:30',p:1,k:2,d:[...W6]}]});drawSecs();drawEmps();drawPv();save()};
$('#adde').onclick=()=>{S.emps.push({n:'Nuevo',h:20,d:[...W5],s:S.secs.map(s=>s.id)});drawEmps();save()};
