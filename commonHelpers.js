import"./assets/modulepreload-polyfill-3cfb730f.js";import{f,i as h}from"./assets/vendor-77e16229.js";const p="../img/error.svg",b='URL("../img/btn.png")',n=document.querySelector("#datetime-picker"),e=document.querySelector("[data-start]"),g=document.querySelector("[data-days]"),v=document.querySelector("[data-hours]"),L=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]"),d=document.querySelectorAll(".value");let u=null;e.disabled=!0;e.classList.add("disabled");const x={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<=Date.now()?(n.disabled=!0,e.disabled=!0,e.classList.remove("active"),e.classList.add("disabled"),h.show({message:"Please choose a date in the future",position:"topCenter",titleColor:"#fff",messageColor:"#fff",color:"#EF4040",timeout:15e4,iconUrl:p,class:"custom-close-button",onOpening:()=>{const s=document.querySelector(".iziToast-close");s.style.color="#fff",s.style.setProperty("background-image",b),s.style.setProperty("opacity","1"),s.style.setProperty("fill","#fff"),s.style.setProperty("background-size","12px");const o=document.querySelector(".iziToast");o.style.setProperty("width","340px"),o.style.setProperty("height","64px"),o.style.setProperty("display","flex"),o.style.setProperty("align-items","center"),o.style.setProperty("justify-content","center")},onClosing:()=>{n.disabled=!1,e.disabled=!0,e.classList.remove("active"),e.classList.add("disabled")}})):(e.disabled=!1,e.classList.add("active"),e.classList.remove("disabled"))}};f(n,x);e.addEventListener("click",C);function C(){d.forEach(t=>t.classList.toggle("end")),n.disabled=!0,e.disabled=!0,e.classList.remove("active"),e.classList.add("disabled"),u=setInterval(()=>{const s=new Date(n.value)-Date.now(),{days:o,hours:i,minutes:l,seconds:r}=P(s);g.textContent=a(o),v.textContent=a(i),L.textContent=a(l),S.textContent=a(r),s<1e3&&(d.forEach(c=>c.classList.toggle("end")),clearInterval(u),n.disabled=!1)},1e3)}function P(t){const r=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),y=Math.floor(t%864e5%36e5%6e4/1e3);return{days:r,hours:c,minutes:m,seconds:y}}function a(t){return`${t}`.padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map