// Arranque: botones globales e inicializacion
$('#prt').onclick=()=>window.print();$('#clr').onclick=()=>{S.ov={};save();gen()};
$('#gen').onclick=()=>{save();gen();go('hor')};
init();gen();go('home');
