(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ed972e0"],{da19:function(t,a,e){"use strict";function r(t){return parseInt(t,10)}function n(t,a,e){return r(t.x+e.x)===r(2*a.x)&&r(t.y+e.y)===r(2*a.y)}function i(t,a){return Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2))}function o(t,a,e){var r={x:t.x-a.x,y:t.y-a.y},n=Math.sqrt(r.x*r.x+r.y*r.y),i={x:r.x/n,y:r.y/n};return{x:a.x+i.x*e,y:a.y+i.y*e}}function s(t,a,e){var r=a.minX,n=a.minY,i=a.maxX,o=a.maxY,s=e.max,d=e.min;t=t.map((function(t){return"number"===typeof t?t:t.value}));var u=Math.min.apply(Math,t.concat([d]))-.001,h=(i-r)/(t.length-1),l=(o-n)/(Math.max.apply(Math,t.concat([s]))+.001-u);return t.map((function(a,e){return{x:e*h+r,y:o-(a-u)*l+1e-5*+(e===t.length-1)-1e-5*+(0===e)}}))}function d(t,a){var e=t.shift();return"M"+e.x+" "+e.y+t.map((function(r,s){var d=t[s+1],u=t[s-1]||e,h=d&&n(d,r,u);if(!d||h)return"L"+r.x+" "+r.y;var l=Math.min(i(u,r),i(d,r)),c=l/2<a,f=c?l/2:a,m=o(u,r,f),p=o(d,r,f);return"L"+m.x+" "+m.y+"S"+r.x+" "+r.y+" "+p.x+" "+p.y})).join("")}var u={props:["smooth","data","boundary","radius","id","max","min"],render:function(t){var a=this,e=a.data,r=a.smooth,n=a.boundary,i=a.radius,o=a.id,u=a.max,h=a.min,l=s(e,n,{max:u,min:h}),c=d(l,r?i:0);return t("path",{attrs:{d:c,fill:"none",stroke:"url(#"+o+")"}})}},h={props:["gradient","gradientDirection","id"],render:function(t){var a=this,e=a.gradient,r=a.gradientDirection,n=a.id,i=e.length-1||1,o=e.slice().reverse().map((function(a,e){return t("stop",{attrs:{offset:e/i,"stop-color":a}})}));return t("defs",[t("linearGradient",{attrs:{id:n,x1:+("left"===r),y1:+("top"===r),x2:+("right"===r),y2:+("bottom"===r)}},o)])}},l={name:"Trend",props:{data:{type:Array,required:!0},autoDraw:Boolean,autoDrawDuration:{type:Number,default:2e3},autoDrawEasing:{type:String,default:"ease"},gradient:{type:Array,default:function(){return["#000"]}},gradientDirection:{type:String,default:"top"},max:{type:Number,default:-1/0},min:{type:Number,default:1/0},height:Number,width:Number,padding:{type:Number,default:8},radius:{type:Number,default:10},smooth:Boolean},watch:{data:{immediate:!0,handler:function(t){var a=this;this.$nextTick((function(){if(!a.$isServer&&a.$refs.path&&a.autoDraw){var t=a.$refs.path.$el,e=t.getTotalLength();t.style.transition="none",t.style.strokeDasharray=e+" "+e,t.style.strokeDashoffset=Math.abs(e-(a.lastLength||0)),t.getBoundingClientRect(),t.style.transition="stroke-dashoffset "+a.autoDrawDuration+"ms "+a.autoDrawEasing,t.style.strokeDashoffset=0,a.lastLength=e}}))}}},render:function(t){if(this.data&&!(this.data.length<2)){var a=this,e=a.width,r=a.height,n=a.padding,i=e||300,o=r||75,s={minX:n,minY:n,maxX:i-n,maxY:o-n},d=this.$props;return d.boundary=s,d.id="vue-trend-"+this._uid,t("svg",{attrs:{width:e||"100%",height:r||"25%",viewBox:"0 0 "+i+" "+o}},[t(h,{props:d}),t(u,{props:d,ref:"path"})])}},install:function(t){t.component(l.name,l)}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(l),a["a"]=l},ddfd:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._m(0),t._v(" "),e("hr",{staticClass:"container-m-nx border-light mt-0 mb-5"}),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",[e("trend",{attrs:{"auto-draw":!0,"auto-draw-duration":3e3,"auto-draw-easing":"ease-out",smooth:!0,data:[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],gradient:["#00c6ff","#F0F","#FF0"],radius:10,"stroke-width":2,"stroke-linecap":"butt"}})],1)]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",[e("trend",{attrs:{"auto-draw":!0,"auto-draw-duration":3e3,"auto-draw-easing":"ease-out",smooth:!0,data:[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],gradient:["red","orange","yellow"],radius:.5,"stroke-width":.9,"stroke-linecap":"round"}})],1)]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",[e("trend",{attrs:{"auto-draw":!0,"auto-draw-duration":3e3,"auto-draw-easing":"ease-out",smooth:!0,data:[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],gradient:["#42b3f4","#42b3f4"],radius:25,"stroke-width":.4,"stroke-linecap":"round"}})],1)]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",[e("trend",{attrs:{"auto-draw":!0,"auto-draw-duration":3e3,"auto-draw-easing":"ease-out",smooth:!0,data:[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],gradient:["#222","#222"],radius:4.8,"stroke-width":1.2,"stroke-linecap":"round"}})],1)])])])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h4",{staticClass:"font-weight-bold py-3 mb-4"},[e("span",{staticClass:"text-muted font-weight-light"},[t._v("Charts /")]),t._v(" Vue Trend\n  ")])}],i=e("2b0e"),o=e("da19");i["default"].use(o["a"]);var s={name:"charts-vue-trend",metaInfo:{title:"Vue Trend - Charts"}},d=s,u=e("2877"),h=Object(u["a"])(d,r,n,!1,null,null,null);a["default"]=h.exports}}]);
//# sourceMappingURL=chunk-3ed972e0.c3400ccf.js.map