import{r as i,c as y,o as L,b as k,a as l,d as r,e as a,_ as D,f as e,F as p,g as B,w as c,U as q,h as x,i as A,j as $,t as h,u as _,k as O,l as I,m as P,n as d,p as j,q as v,s as z,v as E,x as U}from"./index-_El_U3pL.js";const H={class:"container"},M={class:"profile"},G={key:0,class:"filtered-cards"},J={key:0,class:"filtered-cards__wrapper"},K={key:1,class:"filtered-cards__wrapper"},Q=e("h1",null,"There are no cards with this name",-1),R=[Q],W={key:2,class:"filtered-cards__button"},X=e("p",null,"Show all",-1),Y={class:"profile__hero"},Z={class:"profile__hero-wrapper"},ee={class:"profile__hero-left"},se={class:"user-info__image-img"},oe={class:"user-info__info-name"},te={class:"user-info__info-user-name"},le={class:"profile__hero-right"},ae={class:"nft-info__bottom-buttons nft-info__button"},re=O('<div class="profile__hero-follow"><p class="profile__hero-follow-num">234</p><p class="profile__hero-follow-text">Followers</p></div><div class="profile__hero-follow"><p class="profile__hero-follow-num">15</p><p class="profile__hero-follow-text">Following</p></div>',2),ie={class:"profile__hero-icons"},ne={class:"profile__hero-icon"},ce=e("p",null,"Twitch",-1),_e={class:"profile__hero-icon"},de=e("p",null,"Instagram",-1),ue={class:"profile__hero-icon"},fe=e("p",null,"Twitter",-1),pe={class:"profile__hero-icon"},he=e("p",null,"Onlyfans",-1),ve={class:"profile__hero-description"},me=e("span",null,"Description: ",-1),we={class:"profile-cards"},Ce={class:"profile-cards__buttons"},ge={class:"nft-cards__wrapper"},Be={__name:"ProfilePage",setup(ye){const m=i(""),u=i(y),w=i(4),C=i(null),n=i(y.filter(s=>s.userId===0)),g=i(n.value),b=["Created","Collected","Bids"];function V(s){s!==""?k.disableBodyScroll():k.enableBodyScroll(),m.value=s;const t=s.toLowerCase();u.value=y.filter(o=>o.name.toLowerCase().includes(t))}function N(){m.value="",w.value=4}function T(){w.value+=4}function F(s){return!C.value&&s===b[0]||C.value===s?"selected":""}function S(s){C.value=s,s==="Created"?n.value=g.value.filter(t=>t.state==="Approved"):s==="Collected"?n.value=g.value.filter(t=>t.state==="Declined"):s==="Bids"&&(n.value=g.value.filter(t=>t.state==="On moderation"))}return L(()=>{k.enableBodyScroll(),S("Created")}),(s,t)=>(l(),r(p,null,[a(D,{onUpdateInputValue:V,onClearInput:t[0]||(t[0]=o=>N())}),e("div",H,[e("section",M,[m.value?(l(),r("div",G,[e("div",null,[u.value.length>0?(l(),r("div",J,[(l(!0),r(p,null,B(u.value.slice(0,w.value),(o,f)=>(l(),I(U,{key:f,card:o},null,8,["card"]))),128))])):(l(),r("div",K,R)),u.value.length>0?(l(),r("div",W,[a(q,{onClick:T},{default:c(()=>[X]),_:1})])):x("",!0)])])):x("",!0),e("div",Y,[e("div",Z,[e("div",ee,[a(A,{class:"user-info__hero-wrapper"},{image:c(()=>[e("div",se,[a(P,{srcset:_(d)[0].img.webp,src:_(d)[0].img.default,alt:"user"},null,8,["srcset","src"])])]),"info-name":c(()=>[e("p",oe,h(_(d)[0].user),1)]),"info-user-name":c(()=>[e("p",te,"@"+h(_(d)[0].userName),1)]),_:1})]),e("div",le,[e("div",ae,[re,a(j,{id:0})])])]),e("div",ie,[e("div",ne,[a(v,{id:"twich",class:"profile__hero-icon-svg"}),ce]),e("div",_e,[a(v,{id:"instagram",class:"profile__hero-icon-svg"}),de]),e("div",ue,[a(v,{id:"twitter",class:"profile__hero-icon-svg"}),fe]),e("div",pe,[a(v,{id:"onlyfans",class:"profile__hero-icon-svg"}),he])]),e("div",ve,[e("p",null,[me,$(h(_(d)[0].description),1)])])])]),e("section",we,[e("div",Ce,[(l(),r(p,null,B(b,o=>a(E,{key:o,onClick:f=>S(o),class:z(F(o))},{default:c(()=>[$(h(o),1)]),_:2},1032,["onClick","class"])),64))]),e("div",ge,[(l(!0),r(p,null,B(n.value,(o,f)=>(l(),I(U,{key:f,card:o},null,8,["card"]))),128))])])])],64))}};export{Be as default};
