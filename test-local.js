'use strict';
// Nur in der Test-App laden. app.js und style.css bleiben identisch zum Original.
if (!window.RUEFNER_SUPABASE?.url) {
  profiles = function () {
    const ps=db.players.filter(p=>!p.isDeleted);
    return `<div class="section"><h2>🧪 Lokale Testspieler</h2><p class="muted">Nur auf diesem Gerät gespeichert. Keine Online-Anmeldung nötig.</p></div><div class="panel"><div class="field"><label>Neuer Testspieler</label><input id="testPlayerName" maxlength="35" placeholder="z. B. Testspieler 1"></div>${btn('＋ Spieler erstellen','addLocalTestPlayer()')}</div><div class="profile-directory">${ps.map(p=>`<button class="profile-list-card" onclick="selectLocalTestPlayer('${esc(p.id)}')">${avatar(p.id)}<span class="profile-list-name">${esc(p.name)} ${db.current===p.id?'✓':''}</span><span class="profile-list-arrow">›</span></button>`).join('')}</div>`;
  };
  window.addLocalTestPlayer=function(){
    const field=document.getElementById('testPlayerName');const n=field?.value.trim();
    if(!n)return showAppAlert('Bitte einen Namen eingeben.');
    if(db.players.some(p=>!p.isDeleted&&p.name.toLocaleLowerCase('de')===n.toLocaleLowerCase('de')))return showAppAlert('Dieser Name existiert bereits.');
    const pid='test-'+id();db.players.push({id:pid,onlineId:pid,name:n,status:'',photo:null,isDeleted:false});
    if(!db.current)db.current=pid;save();render();
  };
  window.selectLocalTestPlayer=function(pid){if(!player(pid))return;db.current=pid;save();render();};
  requireProfile=function(){if(!db.current||!player(db.current)){go('profiles');return false;}return true;};
  saveFriendlyOnline=async function(){return;};
  allOnlineStatResults=function(){return db.games.filter(g=>['friendly','king'].includes(g.kind)).map(g=>({client_match_id:g.id,player_a:g.a,player_b:g.b,winner:g.winner,side_a:g.sides?.[0],side_b:g.sides?.[1],played_at:g.date,kind:g.kind}));};
  // Original-Statistikansicht beibehalten; nur Datenquelle lokal ersetzen.
  onlineDirectoryLoaded=true; onlineDirectoryLoading=false; onlineDirectoryError='';
  cloudResultsLoaded=true; cloudResultsLoading=false; cloudResultsError='';
  plLoaded=true; plLoading=false; plError='';
  friendship=function(){return `<div class="section"><h2>🏓 Freundschaftsspiel · Test</h2></div><div class="panel">${pairPicker()}${btn('Spiel starten','startFriendly()')}</div>`;};
  render();
}
