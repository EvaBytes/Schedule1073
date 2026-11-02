// Utilidades de horas, fechas y texto
const tm=s=>{const [a,b]=(s||'0:0').split(':');return +a+(+b||0)/60};
const fm=x=>{const h=Math.floor(x+1e-9),m=Math.round((x-h)*60);return h+':'+String(m).padStart(2,'0')};
const esc=t=>String(t).replace(/"/g,'&quot;').replace(/</g,'&lt;');
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const dset=t=>new Set(t.match(/\d{4}-\d{2}-\d{2}/g)||[]);
const dow=d=>(d.getDay()+6)%7;
function absSet(v){const s=new Set();String(v||'').replace(/(\d{4}-\d{2}-\d{2})(?:\s*(?:\/|a|→)\s*(\d{4}-\d{2}-\d{2}))?/g,(m,a,b)=>{const p=t=>{const [y,mo,d]=t.split('-');return new Date(+y,mo-1,+d)};let d=p(a);const f=b?p(b):d;for(let n=0;d<=f&&n<400;n++){s.add(iso(d));d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1)}return m});return s}
