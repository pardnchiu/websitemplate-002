let hover_observer=null,global_animation=null;function unhover(e){e.classList.add("unhover");var t=setTimeout((()=>{clearTimeout(t),t=null,e.classList.remove("unhover")}),500)}function trans10to16(e){const t="0123456789abcdef";return`${t[Math.floor(e/16)]}${t[Math.floor(e%16)]}`}document.querySelectorAll('div[df="scr"]').forEach((e=>{const t=`#${e.getAttribute("col")}`,o=Number(e.getAttribute("st")),c=Number(e.getAttribute("ed"));document.body.addEventListener("scroll",(function(){let r=(this.scrollTop-o)/(c-o);this.scrollTop<o?e.style["background-color"]=`${t}00`:this.scrollTop>=o&&this.scrollTop<=c?e.style["background-color"]=`${t}${trans10to16(255*r*.8)}`:this.scrollTop>c&&(e.style["background-color"]=`${t}${trans10to16(204)}`)}))})),document.querySelector('img[df="nvb"]').onclick=()=>{const e=document.createElement("div"),t=document.querySelector("div.navbar").querySelector("div").cloneNode(!0),o=document.createElement("p");o.innerText="▴ 收起列表",e.id="navbar",document.body.appendChild(e);let c=setTimeout((()=>{clearTimeout(c),document.body.style.overflow="hidden",e.appendChild(t),e.appendChild(o),t.querySelectorAll('div[df="li"]').forEach((e=>{e.onclick=function(){this.classList.contains("act")?this.classList.remove("act"):(document.querySelectorAll(".act")&&document.querySelectorAll(".act").forEach((e=>{e.classList.remove("act")})),this.classList.add("act"))}}))}),500);o.onclick=function(){document.body.style.overflow="scroll",document.querySelectorAll(".act")&&document.querySelectorAll(".act").forEach((e=>{e.classList.remove("act")})),t.querySelectorAll('div[df="li"]').forEach((e=>{e.onclick=null})),document.querySelector("div.navbar").appendChild(t),this.parentElement.classList.add("hide");let e=setTimeout((()=>{clearTimeout(e),this.parentElement.remove()}),500)}},document.addEventListener("DOMContentLoaded",(()=>{const e=matchMedia("(pointer:fine)").matches;matchMedia("(pointer:coarse)").matches;let t=[].slice.call(document.querySelectorAll("a[mi='1'], div[mi='1'], a[wh='1'], div[wh='1']")),o=[].slice.call(document.querySelectorAll(".btn"));"IntersectionObserver"in window&&(hover_observer=new IntersectionObserver(((t,o)=>{for(i=0;i<t.length;i++){const o=t[i];o.isIntersecting&&(e?o.target.addEventListener("mouseout",(e=>{unhover(e.target)})):o.target.addEventListener("click",(e=>{e.target.classList.contains("act")?e.target.classList.remove("act"):(document.querySelectorAll(".act")&&document.querySelectorAll(".act").forEach((e=>{e.classList.remove("act")})),e.target.classList.add("act"))})))}})),t.forEach((e=>{hover_observer.observe(e)})),o.forEach((e=>{hover_observer.observe(e)})))}));