// Bloque de avisos (contrato, turnos sin cubrir, ausencias)
function avisos(){const {lack,lw,ovr,days}=R,L=[];
 S.emps.forEach((e,i)=>{if(lack[i]>2)L.push(`<b>${esc(e.n)}</b> no llega a su contrato en ${lw[i]} semana${lw[i]>1?'s':''} (faltan ${lack[i].toFixed(1)} h)`);if(ovr[i]>1)L.push(`<b>${esc(e.n)}</b> supera su contrato (+${ovr[i].toFixed(1)} h)`)});
 const ms=Object.values(days).reduce((a,o)=>a+o.miss.length,0);if(ms)L.push(`${ms} turnos sin cubrir`);
 Object.values(days).forEach(o=>o.as.forEach(a=>{if(a.man&&absSet(S.emps[a.i].v).has(o.k))L.push(`<b>${esc(S.emps[a.i].n)}</b> asignado el ${o.date.getDate()}/${o.date.getMonth()+1} estando ausente`)}));
 return L.length?`<div style="margin-top:12px;padding:10px 14px;border-radius:14px;border:1px solid var(--bad);background:rgba(217,45,32,.1)"><b style="color:var(--bad)">⚠ Avisos</b><ul style="margin:6px 0 0;padding-left:18px;font-size:13px">${L.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:'<p class="note" style="color:#2f9e44">✓ Todos cumplen su contrato y no hay turnos sin cubrir.</p>'}
