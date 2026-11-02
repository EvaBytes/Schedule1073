// Estado de la app (datos, persistencia en localStorage y disponibilidad por trimestre)
const MT=()=>[{n:'Mañana',s:'09:30',e:'15:00',p:1,k:2,d:[...W6]},{n:'Tarde',s:'15:30',e:'21:30',p:1,k:2,d:[...W6]}];
let S={yr:2026,q:3,nid:7,hol:'2026-10-12\n2026-11-01\n2026-12-06\n2026-12-08\n2026-12-25',key:'2026-11-27\n2026-12-22',
secs:[{id:1,n:'Descarga',c:'#e8590c',sh:[{n:'Camión',s:'06:00',e:'09:30',p:1,k:2,d:[...W6]}]},
{id:2,n:'Servicios (cajas)',c:'#0082C3',sh:[{n:'Apertura',s:'09:00',e:'14:00',p:1,k:2,d:[...W6]},{n:'Tarde',s:'16:30',e:'21:30',p:2,k:3,d:[...W6]}]},
{id:3,n:'Taller',c:'#6b7c3a',sh:[{n:'Mañana',s:'09:30',e:'14:30',p:1,k:1,d:[...W6]},{n:'Tarde',s:'16:00',e:'21:00',p:1,k:1,d:[...W6]}]},
{id:4,n:'Colectivos',c:'#9c36b6',sh:MT()},{id:5,n:'Agua',c:'#1098ad',sh:MT()},{id:6,n:'Montaña',c:'#2f9e44',sh:MT()}],
emps:[['Lucía',20,W5,[1,2]],['Pedro',20,W6,[2,3]],['Alba',15,W5,[2]],['Cristian',30,W5,[1,4]],['Elena',25,W6,[2,5]],['Pablo',20,W6,[3]],['Sara',20,W5,[4]],['Iván',25,W6,[1,5,6]],['Nuria',20,W6,[6]],['Diego',20,W5,[3,4]],['Laura',25,W6,[5,6]],['Raúl',20,W6,[2,4]],['Ana',30,W5,[4,5,6]],['Hugo',20,W6,[3,6]]].map(a=>({n:a[0],h:a[1],d:[...a[2]],s:a[3]}))};
try{const t=localStorage.getItem('hor28');if(t)S=JSON.parse(t)}catch(e){}
const save=()=>{try{localStorage.setItem('hor28',JSON.stringify(S))}catch(e){}};
const secOf=id=>S.secs.find(s=>s.id===id);
let R=null,view='sem',wi=0,flt=0;
const qk=()=>S.yr+'-'+S.q;
function avOf(e){e.qa=e.qa||{};const k=qk();if(!e.qa[k]){const ks=Object.keys(e.qa).sort();if(ks.length)e.qa[k]=JSON.parse(JSON.stringify(e.qa[ks[ks.length-1]]));else{e.qa[k]={};(e.s||[]).forEach(id=>e.qa[k][id]=[...(e.d||[1,1,1,1,1,0,0])])}}return e.qa[k]}
let cur='home',hd=(t=>new Date(t.getFullYear(),t.getMonth(),t.getDate()))(new Date());
