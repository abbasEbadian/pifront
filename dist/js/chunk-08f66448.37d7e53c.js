(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08f66448"],{"11a1":function(t,e,i){"use strict";!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),i=" *[data-v-5928e1c7] { -webkit-box-sizing: border-box; box-sizing: border-box; } .fullscreen-v-img[data-v-5928e1c7] { z-index: 9999; height: 100%; width: 100%; position: fixed; top: 0; left: 0; overflow: hidden; background-color: rgba(0, 0, 0, 0.7); -ms-touch-action: none; touch-action: none; } .content-v-img img[data-v-5928e1c7] { width: auto; height: auto; max-width: 100%; max-height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .header-v-img[data-v-5928e1c7], .footer-v-img[data-v-5928e1c7] { position: absolute; width: 100%; background-color: rgba(0, 0, 0, 0.3); height: 50px; z-index: 9999; display: flex; align-items: center; } .header-v-img[data-v-5928e1c7] { justify-content: space-between; } .footer-v-img[data-v-5928e1c7] { bottom: 0; justify-content: center; height: 70px; /* scrolling thumbnails on mobile */ overflow-x: auto; } .footer-v-img img[data-v-5928e1c7] { width: 60px; height: 60px; cursor: pointer; -webkit-transition: transform 0.2s ease-out; transition: transform 0.2s ease-out; object-fit: cover; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .footer-v-img img.is-selected[data-v-5928e1c7] { transform: scale(1.1); } .footer-v-img img[data-v-5928e1c7]:not(:last-child) { margin-right: 7px; } .title-v-img[data-v-5928e1c7] { font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; color: white; text-align: center; max-height: 100%; overflow: auto; } .count-v-img[data-v-5928e1c7], .buttons-v-img[data-v-5928e1c7] { width: 80px; font-family: 'Avenir', Helvetica, Arial, sans-serif; } .count-v-img[data-v-5928e1c7] { font-size: 15px; color: white; margin-left: 10px; } .buttons-v-img[data-v-5928e1c7] { margin-right: 10px; text-align: right; } .buttons-v-img span path[data-v-5928e1c7] { fill: #e5e6eb; -webkit-transition: fill 0.4s ease-in-out; transition: fill 0.4s ease-in-out; } .buttons-v-img span[data-v-5928e1c7] { cursor: pointer; color: #e5e6eb; font-size: 30px; -webkit-transition: color 0.4s ease-in-out; transition: color 0.4s ease-in-out; text-decoration: none; text-align: center; } .buttons-v-img span[data-v-5928e1c7]:not(:last-child) { margin-right: 8px; } .buttons-v-img span svg[data-v-5928e1c7] { height: 20px; width: 15px; } .buttons-v-img span:hover svg path[data-v-5928e1c7] { fill: white; } .buttons-v-img span[data-v-5928e1c7]:hover { color: white; } .prev-v-img svg[data-v-5928e1c7], .next-v-img svg[data-v-5928e1c7] { margin: 5px auto; } .prev-v-img[data-v-5928e1c7], .next-v-img[data-v-5928e1c7] { color: white; width: 35px; height: 35px; position: absolute; top: 50%; margin-top: -12.5px; font-size: 15px; font-family: 'Avenir', Helvetica, Arial, sans-serif; text-align: center; background-color: rgba(0, 0, 0, 0.3); z-index: 1000; opacity: 0.3; -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; cursor: pointer; } .prev-v-img[data-v-5928e1c7]:hover, .next-v-img[data-v-5928e1c7]:hover { opacity: 1; } .prev-v-img[data-v-5928e1c7] { left: 10px; } .next-v-img[data-v-5928e1c7] { right: 10px; } .v-img-fade-enter[data-v-5928e1c7], .v-img-fade-leave-to[data-v-5928e1c7] { opacity: 0; } .v-img-fade-enter-active[data-v-5928e1c7], .v-img-fade-leave-active[data-v-5928e1c7] { -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=i:e.appendChild(document.createTextNode(i)),t.appendChild(e)}}();var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.closed?t._e():i("div",{staticClass:"fullscreen-v-img",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.close(e)}}},[i("div",{staticClass:"header-v-img"},[i("span",{staticClass:"count-v-img"},[t.images.length>1?i("span",[t._v(t._s(t.currentImageIndex+1)+"/"+t._s(t.images.length)+" ")]):t._e()]),i("span",{staticClass:"title-v-img"},[t._v(t._s(t.titles[t.currentImageIndex]))]),i("div",{staticClass:"buttons-v-img"},[t.sourceButtons[t.currentImageIndex]?i("span",[i("a",{attrs:{href:t.images[t.currentImageIndex],target:"_blank"}},[i("svg",{staticStyle:{"enable-background":"new 0 0 475.078 475.077"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",width:"512px",height:"512px",viewBox:"0 0 475.078 475.077","xml:space":"preserve"}},[i("path",{attrs:{d:"M467.083,318.627c-5.324-5.328-11.8-7.994-19.41-7.994H315.195l-38.828,38.827c-11.04,10.657-23.982,15.988-38.828,15.988    c-14.843,0-27.789-5.324-38.828-15.988l-38.543-38.827H27.408c-7.612,0-14.083,2.669-19.414,7.994    C2.664,323.955,0,330.427,0,338.044v91.358c0,7.614,2.664,14.085,7.994,19.414c5.33,5.328,11.801,7.99,19.414,7.99h420.266    c7.61,0,14.086-2.662,19.41-7.99c5.332-5.329,7.994-11.8,7.994-19.414v-91.358C475.078,330.427,472.416,323.955,467.083,318.627z     M360.025,414.841c-3.621,3.617-7.905,5.424-12.854,5.424s-9.227-1.807-12.847-5.424c-3.614-3.617-5.421-7.898-5.421-12.844    c0-4.948,1.807-9.236,5.421-12.847c3.62-3.62,7.898-5.431,12.847-5.431s9.232,1.811,12.854,5.431    c3.613,3.61,5.421,7.898,5.421,12.847C365.446,406.942,363.638,411.224,360.025,414.841z M433.109,414.841    c-3.614,3.617-7.898,5.424-12.848,5.424c-4.948,0-9.229-1.807-12.847-5.424c-3.613-3.617-5.42-7.898-5.42-12.844    c0-4.948,1.807-9.236,5.42-12.847c3.617-3.62,7.898-5.431,12.847-5.431c4.949,0,9.233,1.811,12.848,5.431    c3.617,3.61,5.427,7.898,5.427,12.847C438.536,406.942,436.729,411.224,433.109,414.841z",fill:"#FFFFFF"}}),i("path",{attrs:{d:"M224.692,323.479c3.428,3.613,7.71,5.421,12.847,5.421c5.141,0,9.418-1.808,12.847-5.421l127.907-127.908    c5.899-5.519,7.234-12.182,3.997-19.986c-3.23-7.421-8.847-11.132-16.844-11.136h-73.091V36.543c0-4.948-1.811-9.231-5.421-12.847    c-3.62-3.617-7.901-5.426-12.847-5.426h-73.096c-4.946,0-9.229,1.809-12.847,5.426c-3.615,3.616-5.424,7.898-5.424,12.847V164.45    h-73.089c-7.998,0-13.61,3.715-16.846,11.136c-3.234,7.801-1.903,14.467,3.999,19.986L224.692,323.479z",fill:"#FFFFFF"}})])])]):t._e(),i("span",{on:{click:t.close}},[t._v("×")])])]),i("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?i("span",{staticClass:"prev-v-img",on:{click:t.prev}},[i("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{d:"M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z",fill:"#fff"}})])]):t._e()]),i("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?i("span",{staticClass:"next-v-img",on:{click:t.next}},[i("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{d:"M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z",fill:"#fff"}})])]):t._e()]),t.thumbnails&&t.images.length>1?i("div",{staticClass:"footer-v-img"},t._l(t.images,(function(e,n){return i("img",{key:n,class:{"is-selected":t.currentImageIndex==n},attrs:{src:e},on:{click:function(e){t.select(n)}}})}))):t._e(),i("div",{staticClass:"content-v-img"},[i("img",{attrs:{src:t.images[t.currentImageIndex]},on:{click:t.next}})])],1)])},staticRenderFns:[],_scopeId:"data-v-5928e1c7",data:function(){return{images:[],titles:[],sourceButtons:[],visibleUI:!0,currentImageIndex:0,closed:!0,uiTimeout:null,handlers:{},thumbnails:!1}},watch:{closed:function(t){t&&this.handlers.closed&&this.handlers.closed(),!t&&this.handlers.opened&&this.handlers.opened()}},methods:{fireChangeEvent:function(){this.handlers.changed&&this.handlers.changed(this.currentImageIndex)},close:function(){this.closed||(document.querySelector("body").classList.remove("body-fs-v-img"),this.images=[],this.currentImageIndex=0,this.closed=!0)},next:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex+1<this.images.length?this.currentImageIndex++:this.currentImageIndex=0,this.fireChangeEvent())},select:function(t){this.currentImageIndex=t},prev:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex>0?this.currentImageIndex--:this.currentImageIndex=this.images.length-1,this.fireChangeEvent())},showUI:function(){var t=this;this.closed||(clearTimeout(this.uiTimeout),this.visibleUI=!0,this.uiTimeout=setTimeout((function(){t.visibleUI=!1}),3500))}},created:function(){var t=this;window.addEventListener("keyup",(function(e){27!==e.keyCode&&81!==e.keyCode||t.close(),39!==e.keyCode&&76!==e.keyCode||t.next(),37!==e.keyCode&&72!==e.keyCode||t.prev()})),window.addEventListener("scroll",(function(){t.close()})),window.addEventListener("mousemove",(function(){t.showUI()}))}},a=(function(){function t(t){this.value=t}function e(e){function i(a,s){try{var o=e[a](s),r=o.value;r instanceof t?Promise.resolve(r.value).then((function(t){i("next",t)}),(function(t){i("throw",t)})):n(o.done?"return":"normal",o.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":a.resolve({value:e,done:!0});break;case"throw":a.reject(e);break;default:a.resolve({value:e,done:!1})}(a=a.next)?i(a.key,a.arg):s=null}var a,s;this._invoke=function(t,e){return new Promise((function(n,o){var r={key:t,arg:e,resolve:n,reject:o,next:null};s?s=s.next=r:(a=s=r,i(t,e))}))},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}),s=function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)},o=function(t,e,i){var n="pointer",a=e.arg||null,s=void 0,o=void 0,r=t.src,l=void 0,c=void 0,u={};return i.altAsTitle&&(l=t.alt),s=i.openOn,o=i.sourceButton,c=i.thumbnails,void 0!==e.value&&(n=e.value.cursor||n,a=e.value.group||a,s=e.value.openOn||s,r=e.value.src||r,l=e.value.title||l,u.opened=e.value.opened,u.closed=e.value.closed,u.changed=e.value.changed,void 0!==e.value.sourceButton&&(o=e.value.sourceButton),void 0!==e.value.thumbnails&&(c=e.value.thumbnails)),t.setAttribute("data-vue-img-src",r),a&&t.setAttribute("data-vue-img-group",a),l&&t.setAttribute("data-vue-img-title",l),o&&t.setAttribute("data-vue-img-source-button",o),c&&t.setAttribute("data-vue-img-thumbnails",c),r||console.error("v-img element missing src parameter."),t.style.cursor=n,{cursor:n,src:r,group:a,title:l,events:u,sourceButton:o,openOn:s,thumbnails:c}},r=function(t,e){var i=t.extend(n);e=a({altAsTitle:!1,sourceButton:!1,thumbnails:!1,openOn:"click"},e),t.directive("img",{update:function(t,i,n,a){var s=void 0,r=void 0;a.data.attrs&&n.data.attrs&&(r=a.data.attrs.src!==n.data.attrs.src,e.altAsTitle&&(s=a.data.attrs.alt!==n.data.attrs.alt));var l=i.oldValue!==i.value;(r||s||l)&&o(t,i,e)},bind:function(n,a){var r=o(n,a,e),l=window.vueImg;if(!l){var c=document.createElement("div");c.setAttribute("id","imageScreen"),document.querySelector("body").appendChild(c),l=window.vueImg=(new i).$mount("#imageScreen")}n.addEventListener(r.openOn,(function(){var e=void 0;e=n.dataset.vueImgGroup?[].concat(s(document.querySelectorAll('img[data-vue-img-group="'+n.dataset.vueImgGroup+'"]'))):[n],t.set(l,"images",e.map((function(t){return t.dataset.vueImgSrc}))),t.set(l,"titles",e.map((function(t){return t.dataset.vueImgTitle}))),t.set(l,"sourceButtons",e.map((function(t){return"true"===t.dataset.vueImgSourceButton}))),t.set(l,"thumbnails","true"===n.dataset.vueImgThumbnails),t.set(l,"currentImageIndex",e.indexOf(n)),t.set(l,"handlers",r.events),t.set(l,"closed",!1)}))}})};"undefined"!=typeof window&&window.Vue&&window.Vue.use(r),e["a"]=r},"44cf":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("hr",{staticClass:"container-m-nx border-light mt-0"}),t._v(" "),i("h5",{staticClass:"font-weight-bold pt-1 pb-1 mt-4 mb-4"},[t._v("Vue Gallery")]),t._v(" "),t.isIE10Mode?t._e():i("gallery",{ref:"gallery",attrs:{images:t.vueGalleryImageLinks,index:t.vueGalleryIndex,options:t.vueGalleryOptions},on:{close:function(e){t.vueGalleryIndex=null}}}),t._v(" "),t.isIE10Mode?i("b-modal",{attrs:{visible:t.vueGalleryFallback,size:"xl","hide-footer":"","hide-header":"","content-class":"bg-transparent","body-class":"p-0"},on:{hidden:function(e){t.vueGalleryIndex=null}}},[i("button",{staticClass:"close position-absolute text-white opacity-100 px-3",staticStyle:{"font-size":"40px",right:"0"},on:{click:function(e){t.vueGalleryIndex=null}}},[t._v("×")]),t._v(" "),null!==t.vueGalleryIndex?i("img",{staticClass:"mw-100 rounded",attrs:{src:t.vueGalleryImageLinks[t.vueGalleryIndex]}}):t._e()]):t._e(),t._v(" "),i("div",{staticClass:"row"},t._l(t.vueGalleryImages,(function(e,n){return i("div",{key:n,staticClass:"col-md-3"},[i("a",{staticClass:"img-thumbnail",attrs:{title:e.title,href:"javascript:void(0)"},on:{click:function(e){t.vueGalleryIndex=n}}},[i("img",{staticClass:"img-fluid",attrs:{src:t.publicUrl+e.url,alt:e.altText}})])])})),0),t._v(" "),i("hr",{staticClass:"container-m-nx border-light mt-5 mb-4"}),t._v(" "),i("h5",{staticClass:"font-weight-bold pt-1 pb-1 mb-4"},[t._v("V Img")]),t._v(" "),i("div",{staticClass:"row"},t._l(t.vImgImages,(function(e,n){return i("div",{key:n,staticClass:"col-md-3"},[i("a",{staticClass:"img-thumbnail",attrs:{href:"javascript:void(0)"}},[i("img",{directives:[{name:"img",rawName:"v-img",value:t.vImgOptions,expression:"vImgOptions"}],staticClass:"img-fluid",attrs:{src:t.publicUrl+e.url,alt:e.altText}})])])})),0)],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h4",{staticClass:"font-weight-bold py-3 mb-4"},[i("span",{staticClass:"text-muted font-weight-light"},[t._v("UI elements /")]),t._v(" Lightbox\n  ")])}],s=i("2b0e"),o=i("11a1");s["default"].use(o["a"],{altAsTitle:!0});var r={name:"ui-lightbox",metaInfo:{title:"Lightbox - UI elements"},components:{gallery:()=>i.e("chunk-0bc976ba").then(i.t.bind(null,"067c",7)).then(t=>t.default).catch(()=>{})},data:()=>({vueGalleryIndex:null,vueGalleryImages:[{url:"img/bg/1.jpg",title:"Image 1",altText:"Image 1"},{url:"img/bg/2.jpg",title:"Image 2",altText:"Image 2"},{url:"img/bg/3.jpg",title:"Image 3",altText:"Image 3"},{url:"img/bg/4.jpg",title:"Image 4",altText:"Image 4"}],vueGalleryOptions:{onopen:function(){if("rtl"!==document.documentElement.getAttribute("dir")&&"rtl"!==document.body.getAttribute("dir"))return;const t=Object.getPrototypeOf(this),e=t.translateX;t.translateX=function(t,i,n){i=this.touchStart&&this.touchStart.x?i:-1*i,e.call(this,t,i,0,n)},t.positionSlide=function(t){const e=this.slides[t];e.style.width=this.slideWidth+"px",this.support.transform&&(e.style.right=t*-this.slideWidth+"px",this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0))},t.ontouchstart=function(){},t.ontouchmove=function(){},t.ontouchend=function(){},t.ontouchcancel=function(){}}},vImgOptions:{group:"v-img-gallery"},vImgImages:[{url:"img/bg/1.jpg",altText:"Image 1"},{url:"img/bg/2.jpg",altText:"Image 2"},{url:"img/bg/3.jpg",altText:"Image 3"},{url:"img/bg/4.jpg",altText:"Image 4"}]}),computed:{vueGalleryImageLinks(){return this.vueGalleryImages.map(t=>this.publicUrl+t.url)},vueGalleryFallback(){return null!==this.vueGalleryIndex}}},l=r,c=(i("c460"),i("597e"),i("2877")),u=Object(c["a"])(l,n,a,!1,null,null,null);e["default"]=u.exports},"597e":function(t,e,i){"use strict";i("bc9c")},"6a3f":function(t,e,i){},bc9c:function(t,e,i){},c460:function(t,e,i){"use strict";i("6a3f")}}]);
//# sourceMappingURL=chunk-08f66448.37d7e53c.js.map