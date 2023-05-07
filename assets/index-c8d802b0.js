(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();document.querySelector(".footer__copyright").textContent=`© Copyright Termly ${new Date().getFullYear()}`;const u={hidden:"hidden",mine:"mine",number:"number",marked:"marked"};function Q(t,e){const s=[],o=V(t,e);for(let i=0;i<t;i++){const c=[];for(let r=0;r<t;r++){const d=document.createElement("div");d.dataset.status=u.hidden;const y={element:d,x:i,y:r,get status(){return this.element.dataset.status},set status(p){this.element.dataset.status=p},mine:o.some(p=>A(p,{x:i,y:r}))};c.push(y)}s.push(c)}return s}function V(t,e){const s=[];for(;s.length<e;){const o={x:O(t),y:O(t)};s.some(i=>A(i,o))||s.push(o)}return s}function A(t,e){return t.x===e.x&&t.y===e.y}function O(t){return Math.floor(Math.random()*t)}function G(t){t.status!==u.hidden&&t.status!==u.marked||(t.status===u.marked?t.status=u.hidden:t.status=u.marked)}function F(t,e){if(e.status!==u.hidden)return;if(e.mine){e.status=u.mine;return}e.status=u.number;const s=Z(t,e),o=s.filter(i=>i.mine);o.length===0?s.forEach(F.bind(null,t)):e.element.textContent=o.length}function Z(t,{x:e,y:s}){var i;const o=[];for(let c=-1;c<=1;c++)for(let r=-1;r<=1;r++){const d=(i=t[e+c])==null?void 0:i[s+r];d&&o.push(d)}return o}function ee(t){return t.some(e=>e.some(s=>s.status==u.mine))}function te(t){return t.every(e=>e.every(s=>s.status===u.number||s.mine&&(s.status==u.hidden||s.status===u.marked)))}if(document.querySelector(".main-minesweeper")){let t=function(){document.querySelector(".minesweeper__play").textContent="reload",document.querySelector(".minesweeper__play").addEventListener("click",()=>{window.location.reload()})};var reloadTheGame=t;document.querySelector(".minesweeper__subtitle").style.display="none",document.querySelector(".minesweeper__board").style.display="none",document.querySelector(".minesweeper__play").addEventListener("click",()=>{const e=Number(document.querySelector("#field").value),s=Number(document.querySelector("#mine").value);document.querySelector(".minesweeper__board").style.display="inline-grid",document.querySelector(".minesweeper__subtitle").style.display="block",document.querySelectorAll(".minesweeper__input").forEach(m=>{m.style.display="none"}),document.querySelectorAll("label").forEach(m=>{m.style.display="none"});const o=Q(e,s),i=document.querySelector(".minesweeper__board"),c=document.querySelector("[data-mines]"),r=document.querySelector(".minesweeper__subtitle");document.querySelector("[data-mines]").textContent=s,document.querySelector(".minesweeper__container").style.width=`calc(${e} * 60px + 100px)`,document.querySelector(".minesweeper__container").style.maxWidth=`calc(${e} * 60px + 100px)`,i.style.setProperty("--size",e),o.forEach(m=>{m.forEach(x=>{i.append(x.element),x.element.addEventListener("click",()=>{F(o,x),y()}),x.element.addEventListener("contextmenu",f=>{f.preventDefault(),G(x),d()})})});function d(){const m=o.reduce((x,f)=>x+f.filter(q=>q.status==u.marked).length,0);c.textContent=s-m}function y(){const m=te(o),x=ee(o);(m||x)&&(i.addEventListener("click",p,{capture:!0}),i.addEventListener("contextmenu",p,{capture:!0})),m&&(r.textContent="You Win",alert("You Won")),x&&(r.textContent="You Lose",o.forEach(f=>{f.forEach(q=>{q.status===u.marked&&G(q),q.mine&&F(o,q)})}),alert("You Lost"))}function p(m){m.stopImmediatePropagation()}t()})}let v={x:0,y:0},_={x:0,y:0};window.addEventListener("keydown",t=>{let e=t.keyCode;setTimeout(()=>{if(e==37||e==65){if(document.querySelector(".snake__snake").classList.add("left"),_.x!==0)return;v={x:-1,y:0}}else if(e==38||e==87){if(document.querySelector(".snake__snake").classList.add("top"),_.y!==0)return;v={x:0,y:-1}}else if(e==39||e==68){if(document.querySelector(".snake__snake").classList.add("right"),_.x!==0)return;v={x:1,y:0}}else if(e==40||e==83){if(document.querySelector(".snake__snake").classList.add("bottom"),_.y!==0)return;v={x:0,y:1}}},1)});document.querySelector("#up").addEventListener("click",t=>{document.querySelector(".snake__snake").classList.add("top"),console.log("hi"),_.y===0&&(v={x:0,y:-1})});document.querySelector("#bottom").addEventListener("click",t=>{document.querySelector(".snake__snake").classList.add("bottom"),_.y===0&&(v={x:0,y:1})});document.querySelector("#left").addEventListener("click",t=>{document.querySelector(".snake__snake").classList.add("left"),_.x===0&&(v={x:-1,y:0})});document.querySelector("#right").addEventListener("click",t=>{document.querySelector(".snake__snake").classList.add("right"),_.x===0&&(v={x:1,y:0})});function ne(){return _=v,v}const se=10;let P=0;const g=[{x:17,y:17}];function ie(){ce();const t=ne();for(let e=g.length-2;e>=0;e--)g[e+1]={...g[e]};g[0].x+=t.x,g[0].y+=t.y}function re(t){g.forEach(e=>{const s=document.createElement("div");s.style.gridRowStart=e.y,s.style.gridColumnStart=e.x,s.classList.add("snake__snake"),t.appendChild(s)})}function T(t,{ignoreHead:e=!1}={}){return g.some((s,o)=>e&&o==0?!1:oe(s,t))}function oe(t,e){return t.x===e.x&&t.y===e.y}function ae(t){P+=t}function ce(){for(let t=0;t<P;t++)g.push({...g[g.length-1]});P=0}const Y=35,le=1;let D=$();function he(){T(D)&&(ae(le),D=$())}function de(t){const e=document.createElement("div");e.style.gridRowStart=D.y,e.style.gridColumnStart=D.x,e.classList.add("snake__food"),t.appendChild(e)}function $(){let t;for(;t==null||T(t);)t=ue();return t}function ue(){return{x:Math.floor(Math.random()*Y)+1,y:Math.floor(Math.random()*Y)+1}}if(document.querySelector(".main-snake")){let o=function(f){if(e){document.querySelector(".snake__gameover").style.display="flex";return}window.requestAnimationFrame(o),!((f-t)/1e3<1/se)&&(t=f,i(),c())},i=function(){ie(),he(),r()},c=function(){s.innerHTML="",re(s),de(s)},r=function(){e=d(y())||p()},d=function(f){return f.x<1||f.x>Y||f.y<1||f.y>Y},y=function(){return g[0]},p=function(){return T(g[0],{ignoreHead:!0})};var main=o,checkDeath=r,outSideGrid=d,getSnakeHead=y,snakeIntersection=p;let t=0,e=!1;const s=document.getElementById("game-board");document.querySelector(".snake__btn").addEventListener("click",()=>{window.location.reload()}),window.requestAnimationFrame(o)}class me{constructor(e,s,o,i,c){this.x=e,this.y=s,this.width=o,this.height=i,this.speed=c,this.direction=k,this.nextDirection=this.direction,this.frameCount=7,this.currentFrame=1,setInterval(()=>{this.changeAnimation()},100)}moveProcess(){if(this.changeDirectionIfPossible(),this.moveForwards(),this.checkCollisions()){this.moveBackwards();return}}eat(){for(let e=0;e<a.length;e++)for(let s=0;s<a[0].length;s++)a[e][s]==2&&this.getMapX()==s&&this.getMapY()==e&&(a[e][s]=3,Me())}moveBackwards(){switch(this.direction){case k:this.x-=this.speed;break;case I:this.y+=this.speed;break;case b:this.x+=this.speed;break;case E:this.y-=this.speed;break}}moveForwards(){switch(this.direction){case k:this.x+=this.speed;break;case I:this.y-=this.speed;break;case b:this.x-=this.speed;break;case E:this.y+=this.speed;break}}checkCollisions(){let e=!1;return(a[parseInt(this.y/n)][parseInt(this.x/n)]==1||a[parseInt(this.y/n+.9999)][parseInt(this.x/n)]==1||a[parseInt(this.y/n)][parseInt(this.x/n+.9999)]==1||a[parseInt(this.y/n+.9999)][parseInt(this.x/n+.9999)]==1)&&(e=!0),e}checkGhostCollision(){for(let e=0;e<M.length;e++){let s=M[e];if(s.getMapX()==this.getMapX()&&s.getMapY()==this.getMapY())return!0}return!1}changeDirectionIfPossible(){if(this.direction==this.nextDirection)return;let e=this.direction;this.direction=this.nextDirection,this.moveForwards(),this.checkCollisions()?(this.moveBackwards(),this.direction=e):this.moveBackwards()}changeAnimation(){this.currentFrame=this.currentFrame==this.frameCount?1:this.currentFrame+1}draw(){l.save(),l.translate(this.x+n/2,this.y+n/2),l.rotate(this.direction*90*Math.PI/180),l.translate(-this.x-n/2,-this.y-n/2),l.drawImage(j,(this.currentFrame-1)*n,0,n,n,this.x,this.y,this.width,this.height),l.restore()}getMapX(){return parseInt(this.x/n)}getMapY(){return parseInt(this.y/n)}getMapXRightSide(){return parseInt((this.x*.99+n)/n)}getMapYRightSide(){return parseInt((this.y*.99+n)/n)}}class fe{constructor(e,s,o,i,c,r,d,y,p,m){this.x=e,this.y=s,this.width=o,this.height=i,this.speed=c,this.direction=k,this.imageX=r,this.imageY=d,this.imageHeight=p,this.imageWidth=y,this.range=m,this.randomTargetIndex=parseInt(Math.random()*4),this.target=W[this.randomTargetIndex],setInterval(()=>{this.changeRandomDirection()},1e4)}changeRandomDirection(){this.randomTargetIndex+=parseInt(Math.random()*4),this.randomTargetIndex=this.randomTargetIndex%4}moveProcess(){if(this.isInRange()?this.target=h:this.target=W[this.randomTargetIndex],this.changeDirectionIfPossible(),this.moveForwards(),this.checkCollisions()){this.moveBackwards();return}}moveBackwards(){switch(this.direction){case k:this.x-=this.speed;break;case I:this.y+=this.speed;break;case b:this.x+=this.speed;break;case E:this.y-=this.speed;break}}moveForwards(){switch(this.direction){case k:this.x+=this.speed;break;case I:this.y-=this.speed;break;case b:this.x-=this.speed;break;case E:this.y+=this.speed;break}}checkCollisions(){let e=!1;return(a[parseInt(this.y/n)][parseInt(this.x/n)]==1||a[parseInt(this.y/n+.9999)][parseInt(this.x/n)]==1||a[parseInt(this.y/n)][parseInt(this.x/n+.9999)]==1||a[parseInt(this.y/n+.9999)][parseInt(this.x/n+.9999)]==1)&&(e=!0),e}isInRange(){let e=Math.abs(h.getMapX()-this.getMapX()),s=Math.abs(h.getMapY()-this.getMapY());return Math.sqrt(e*e+s*s)<=this.range}changeDirectionIfPossible(){let e=this.direction;if(this.direction=this.calculateNewDirection(a,parseInt(this.target.x/n),parseInt(this.target.y/n)),typeof this.direction>"u"){this.direction=e;return}this.getMapY()!=this.getMapYRightSide()&&(this.direction==b||this.direction==k)&&(this.direction=I),this.getMapX()!=this.getMapXRightSide()&&this.direction==I&&(this.direction=b),this.moveForwards(),this.checkCollisions()?(this.moveBackwards(),this.direction=e):this.moveBackwards()}calculateNewDirection(e,s,o){let i=[];for(let r=0;r<e.length;r++)i[r]=e[r].slice();let c=[{x:this.getMapX(),y:this.getMapY(),rightX:this.getMapXRightSide(),rightY:this.getMapYRightSide(),moves:[]}];for(;c.length>0;){let r=c.shift();if(r.x==s&&r.y==o)return r.moves[0];{i[r.y][r.x]=1;let d=this.addNeighbors(r,i);for(let y=0;y<d.length;y++)c.push(d[y])}}return 1}addNeighbors(e,s){let o=[],i=s.length,c=s[0].length;if(e.x-1>=0&&e.x-1<i&&s[e.y][e.x-1]!=1){let r=e.moves.slice();r.push(b),o.push({x:e.x-1,y:e.y,moves:r})}if(e.x+1>=0&&e.x+1<i&&s[e.y][e.x+1]!=1){let r=e.moves.slice();r.push(k),o.push({x:e.x+1,y:e.y,moves:r})}if(e.y-1>=0&&e.y-1<c&&s[e.y-1][e.x]!=1){let r=e.moves.slice();r.push(I),o.push({x:e.x,y:e.y-1,moves:r})}if(e.y+1>=0&&e.y+1<c&&s[e.y+1][e.x]!=1){let r=e.moves.slice();r.push(E),o.push({x:e.x,y:e.y+1,moves:r})}return o}changeAnimation(){this.currentFrame=this.currentFrame==this.frameCount?1:this.currentFrame+1}draw(){l.save(),l.drawImage(ye,this.imageX,this.imageY,this.imageWidth,this.imageHeight,this.x,this.y,this.width,this.height),l.restore()}getMapX(){return parseInt(this.x/n)}getMapY(){return parseInt(this.y/n)}getMapXRightSide(){return parseInt((this.x*.99+n)/n)}getMapYRightSide(){return parseInt((this.y*.99+n)/n)}}const X=document.getElementById("canvas"),l=X.getContext("2d"),j=document.getElementById("animation"),ye=document.getElementById("ghosts"),L=(t,e,s,o,i)=>{l.fillStyle=i,l.fillRect(t,e,s,o)};let ge=30,n=20,h,pe="#fff",S=n/2,w=(n-S)/2,C="black",xe="#fff",M=[],we=4,R=3,H=0,N=[{x:0,y:0},{x:176,y:0},{x:0,y:121},{x:176,y:121}];const k=4,I=3,b=2,E=1;let a=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],[1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1],[1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],[1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1],[0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[1,1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,1,1,1,1],[1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1],[1,1,1,1,1,2,1,2,1,2,2,2,1,2,1,2,1,1,1,1,1],[0,0,0,0,1,2,1,2,1,1,1,1,1,2,1,2,1,0,0,0,0],[0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],[1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],[1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1],[1,1,2,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,2,1,1],[1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],[1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];for(let t=0;t<a.length;t++)for(let e=0;e<a[0].length;e++)a[t][e]===2&&H++;const W=[{x:1*n,y:1*n},{x:1*n,y:(a.length-2)*n},{x:(a[0].length-2)*n,y:n},{x:(a[0].length-2)*n,y:(a.length-2)*n}];function z(){h=new me(n,n,n,n,n/5)}const K=()=>{Ce(),ke()},U=setInterval(K,1e3/ge),ke=()=>{h.moveProcess(),h.eat();for(let t=0;t<M.length;t++)M[t].moveProcess();h.checkGhostCollision()&&Se(),B>=H&&(_e(),clearInterval(U))},ve=()=>{l.font="500 25px Montserrat",l.fillStyle="white",l.fillText("Lives:",200,n*a.length+30);for(let t=0;t<R;t++)l.drawImage(j,2*n,0,n,n,270+t*n,n*a.length+12,n,n)},Se=()=>{z(),J(),R--,R==0&&(document.querySelector(".pacman__reload").style.display="block",Ie())},Ie=()=>{be(),clearInterval(U)},be=()=>{l.font="bold 50px Montserrat",l.fillStyle="red",l.fillText("Game Over",80,250)},_e=()=>{l.font="bold 50px Montserrat",l.fillStyle="darkgreen",l.fillText("You Won",80,250),document.querySelector(".pacman__reload").style.display="block"};let B=0;function Me(){return B++}function qe(){l.font="500 25px Montserrat ",l.marginTop="20px",l.fillStyle="white",l.fillText(`Score: ${B}`,0,n*a.length+30)}const J=()=>{M=[];for(let t=0;t<we;t++){let e=new fe(9*n+(t%2==0?0:1)*n,10*n+(t%2==0?0:1)*n,n,n,h.speed/2,N[t%4].x,N[t%4].y,124,116,6+t);M.push(e)}},Le=()=>{for(let t=0;t<a.length;t++)for(let e=0;e<a[0].length;e++)a[t][e]==2&&L(e*n+n/3,t*n+n/3,n/3,n/3,xe)},Ee=()=>{for(let t=0;t<M.length;t++)M[t].draw()},Ce=()=>{L(0,0,X.width,X.height,"black"),Ye(),Le(),h.draw(),qe(),Ee(),ve()},Ye=()=>{for(let t=0;t<a.length;t++)for(let e=0;e<a[0].length;e++)a[t][e]==1&&L(e*n,t*n,n,n,pe),e>0&&a[t][e-1]==1&&L(e*n,t*n+w,S+w,S,C),e<a[0].length-1&&a[t][e+1]==1&&L(e*n+w,t*n+w,S+w,S,C),t>0&&a[t-1][e]==1&&L(e*n+w,t*n,S,S+w,C),t<a.length-1&&a[t+1][e]==1&&L(e*n+w,t*n+w,S,S+w,C)};z();J();K();window.addEventListener("keydown",t=>{let e=t.keyCode;setTimeout(()=>{e==37||e==65?h.nextDirection=b:e==38||e==87?h.nextDirection=I:e==39||e==68?h.nextDirection=k:(e==40||e==83)&&(h.nextDirection=E)},1)});document.querySelector("#up").addEventListener("click",t=>{h.nextDirection=I});document.querySelector("#bottom").addEventListener("click",t=>{h.nextDirection=E});document.querySelector("#left").addEventListener("click",t=>{h.nextDirection=b});document.querySelector("#right").addEventListener("click",t=>{h.nextDirection=k});
