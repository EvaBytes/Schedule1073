// Botones L M X J V S D
function tog(el,arr,cls,fn){DN.forEach((l,i)=>{const b=document.createElement('button');b.className='d '+cls+(arr[i]?' on':'');b.textContent=l;b.onclick=()=>{arr[i]=arr[i]?0:1;b.classList.toggle('on');save();fn&&fn()};el.appendChild(b)})}
