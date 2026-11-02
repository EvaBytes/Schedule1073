// Barra lateral y navegacion entre paginas
const PG={home:['pg-home'],plan:['cfg','pg-bar'],hor:['out','pg-bar']},TT={home:'Home',plan:'Planifica',hor:'Horarios'};
function drawSb(){$('#sb').innerHTML='<div class="lg">Horarios · Tienda</div>'+[['home','🏠','Decathlon 1073'],['plan','🗓️','Planifica'],['hor','📋','Horarios']].map(([p,i,t])=>`<button class="nv${cur===p?' on':''}" onclick="go('${p}')"><span>${i}</span>${t}</button>`).join('')}
function go(p){cur=p;['pg-home','cfg','pg-bar','out'].forEach(id=>{$('#'+id).style.display=PG[p].includes(id)?(id==='pg-bar'?'flex':'grid'):'none'});$('#ttl').textContent=TT[p];drawSb();if(p==='home')renderHome();window.scrollTo(0,0)}
