import{y as W,r as n,c as B,z as P,o as X,a,b as c,d as t,_ as Y,e as s,F as u,f as p,w as l,U as Z,g as T,h as A,A as L,l as F,B as ss,p as es,i as h,t as _,u as d,j as os,k as g,m as q,n as v,q as w,s as $,v as z,x as D}from"./index-B_T43p-L.js";const ts={class:"container"},as={class:"creator"},ls={key:0,class:"filtered-cards"},rs={key:0,class:"filtered-cards__wrapper"},ns={key:1,class:"filtered-cards__wrapper"},cs=s("h1",null,"There are no cards with this name",-1),is=[cs],_s={class:"filtered-cards__button"},us=s("p",null,"Show all",-1),ds={class:"creator__hero"},fs={class:"creator__hero-wrapper"},ps={class:"creator__hero-left"},hs={class:"user-info__image-img"},vs={class:"user-info__info-name"},ws={class:"user-info__info-user-name"},ms={class:"creator__hero-right"},gs={class:"nft-info__bottom-buttons nft-info__button"},Cs=os('<div class="creator__hero-follow"><p class="creator__hero-follow-num">234</p><p class="creator__hero-follow-text">Followers</p></div><div class="creator__hero-follow"><p class="creator__hero-follow-num">15</p><p class="creator__hero-follow-text">Following</p></div>',2),ys={class:"creator-cards__buttons"},ks={class:"user-info__image-img"},bs={class:"user-info__info-name"},Bs={class:"user-info__info-user-name"},Fs={class:"creator__hero-icons"},$s={class:"creator__hero-icon"},Ss=s("p",null,"Twitch",-1),Is={class:"creator__hero-icon"},Us=s("p",null,"Instagram",-1),Ns={class:"creator__hero-icon"},Vs=s("p",null,"Twitter",-1),Ps={class:"creator__hero-icon"},Ts=s("p",null,"Onlyfans",-1),As={class:"creator__hero-description"},Ls=s("span",null,"Description: ",-1),qs={class:"creator-cards"},zs={class:"creator-cards__buttons"},Ds={class:"nft-cards__wrapper"},Hs={__name:"CreatorPage",setup(Os){const O=W(),j=Number(O.params.id),C=n(B),y=n(""),S=n(4),f=n(B.filter(e=>e.userId===j)),k=n(null),I=n(f.value),b=n(!1),m=n(Array(P.length).fill("Follow")),E=n(f.value.map(e=>e.id)),U=n(!1),N=["Created","Collected"],H=["Following","Followers"];function M(e){e!==""?g.disableBodyScroll():g.enableBodyScroll(),y.value=e;const i=e.toLowerCase();C.value=B.filter(o=>o.name.toLowerCase().includes(i))}function R(){S.value+=4}function x(){y.value=""}function V(e){k.value=e,e==="Created"?f.value=I.value.filter(i=>i.ending!==""):e==="Collected"&&(f.value=I.value.filter(i=>i.ending===""))}function G(e){return!k.value&&e===N[0]||k.value===e?"selected":""}function J(e){m.value[e]=m.value[e]==="Follow"?"Unfollow":"Follow"}function K(){b.value=!0,U.value=!0,g.disableBodyScroll()}function Q(){b.value=!1,U.value=!1,g.enableBodyScroll()}return X(()=>{V("Created")}),(e,i)=>(a(),c(u,null,[t(Y,{onUpdateInputValue:M,onClearInput:i[0]||(i[0]=o=>x())}),s("div",ts,[s("section",as,[y.value?(a(),c("div",ls,[C.value.length>0?(a(),c("div",rs,[(a(!0),c(u,null,p(C.value.slice(0,S.value),(o,r)=>(a(),F(D,{key:r,card:o},null,8,["card"]))),128))])):(a(),c("div",ns,is)),s("div",_s,[t(Z,{onClick:R},{default:l(()=>[us]),_:1})])])):T("",!0),s("div",ds,[s("div",fs,[s("div",ps,[t(A,{class:"user-info__hero-wrapper"},{image:l(()=>[s("div",hs,[t(q,{srcset:d(v)[e.$route.params.id].img.webp,src:d(v)[e.$route.params.id].img.default,alt:"user"},null,8,["srcset","src"])])]),"info-name":l(()=>[s("p",vs,_(d(v)[e.$route.params.id].user),1)]),"info-user-name":l(()=>[s("p",ws,"@"+_(d(v)[e.$route.params.id].userName),1)]),_:1})]),s("div",ms,[s("div",gs,[Cs,t(L,{class:"nft-info__button-vue",onClick:K},{default:l(()=>[h("Follow")]),_:1}),b.value?(a(),F(ss,{key:0,class:"followers__popup"},{default:l(()=>[t(w,{id:"cross",onClick:Q,class:"popup__cross-icon"}),s("div",ys,[(a(),c(u,null,p(H,(o,r)=>t(z,{key:o,class:$([{selected:r===0},"followers__button"])},{default:l(()=>[h(_(o),1)]),_:2},1032,["class"])),64))]),(a(!0),c(u,null,p(d(P),(o,r)=>(a(),c("div",{class:"followers__wrapper",key:o},[t(A,{class:"followers__wrapper-info"},{image:l(()=>[s("div",ks,[t(q,{srcset:o.img.webp,src:o.img.default,alt:"user"},null,8,["srcset","src"])])]),"info-name":l(()=>[s("p",bs,_(o.name),1)]),"info-user-name":l(()=>[s("p",Bs,"@"+_(o.userName),1)]),_:2},1024),t(L,{onClick:js=>J(r),class:$(["followers__button-follow-popup",{unfollowed:m.value[r]==="Unfollow"}])},{default:l(()=>[h(_(m.value[r]),1)]),_:2},1032,["onClick","class"])]))),128))]),_:1})):T("",!0),t(es,{id:E.value},null,8,["id"])])])]),s("div",Fs,[s("div",$s,[t(w,{id:"twich",class:"creator__hero-icon-svg"}),Ss]),s("div",Is,[t(w,{id:"instagram",class:"creator__hero-icon-svg"}),Us]),s("div",Ns,[t(w,{id:"twitter",class:"creator__hero-icon-svg"}),Vs]),s("div",Ps,[t(w,{id:"onlyfans",class:"creator__hero-icon-svg"}),Ts])]),s("div",As,[s("p",null,[Ls,h(_(d(v)[e.$route.params.id].description),1)])])])]),s("section",qs,[s("div",zs,[(a(),c(u,null,p(N,o=>t(z,{key:o,onClick:r=>V(o),class:$(G(o))},{default:l(()=>[h(_(o),1)]),_:2},1032,["onClick","class"])),64))]),s("div",Ds,[(a(!0),c(u,null,p(f.value,(o,r)=>(a(),F(D,{key:r,card:o},null,8,["card"]))),128))])])])],64))}};export{Hs as default};
