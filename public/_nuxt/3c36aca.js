(window.webpackJsonp=window.webpackJsonp||[]).push([[18,3,4,5,6,8,9,10],{337:function(t,e,r){var content=r(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("11b1675e",content,!0,{sourceMap:!1})},338:function(t,e,r){"use strict";r.r(e);r(40);var n={name:"Footer",data:function(){return{topMenus:[{text:"브랜드스토리",routerName:"brandStory"},{text:"매거진",routerName:"magazine"},{text:"건강설문",routerName:"healthConsulting"},{text:"고객후기",routerName:"review"},{text:"스토어",routerName:"store"},{text:"이벤트",routerName:"event"},{text:"공지사항",routerName:"notification"}],indicatorX:0,indicatorWidth:0,indicatorHeight:0,indicatorTop:0}},methods:{firstMenuClick:function(i,t){this.indicatorX=this.$refs.item[i].getBoundingClientRect().left,this.indicatorWidth=this.$refs.item[i].getBoundingClientRect().width,this.indicatorTop=this.$refs.item[i].getBoundingClientRect().y+this.$refs.item[i].getBoundingClientRect().height,console.log("click",t),this.$router.push({name:t})},divDragOver:function(t,i){console.log(this.$refs.item[i].getBoundingClientRect()),this.indicatorX=this.$refs.item[i].getBoundingClientRect().left,this.indicatorWidth=this.$refs.item[i].getBoundingClientRect().width,this.indicatorTop=this.$refs.item[i].getBoundingClientRect().y+this.$refs.item[i].getBoundingClientRect().height,console.log(this.indicatorX)},divDragLeave:function(){this.indicatorWidth=0},logoClick:function(){this.$router.push({name:"index"})}},mounted:function(){console.log(this.$refs.item[0].getBoundingClientRect().left),this.indicatorX=this.$refs.item[0].getBoundingClientRect().left,this.indicatorTop=this.$refs.item[0].getBoundingClientRect().y+this.$refs.item[0].getBoundingClientRect().height},computed:{ingSlider:function(){return"\n          width: ".concat(this.indicatorWidth,"px;\n          left: ").concat(this.indicatorX,"px;\n          top: ").concat(this.indicatorTop,"px;\n          ")}}},o=(r(339),r(39)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{display:"flex"}},[e("div",{staticClass:"main"},[e("div",{staticClass:"main-header"},[e("div",{staticClass:"top-menu"},[e("div",{staticStyle:{display:"flex","flex-direction":"row",width:"100%"}},[e("img",{staticClass:"top-first-image",attrs:{src:"https://www.mypuzzle.co.kr/resources/images/logo/header_logo.svg"},on:{click:t.logoClick}}),t._v(" "),e("div",{staticStyle:{display:"flex","flex-direction":"column"}},[e("div",{ref:"div_menus",staticStyle:{display:"flex","flex-direction":"row"}},t._l(t.topMenus,(function(r,n){return e("div",{key:r,staticStyle:{display:"flex"},on:{click:function(e){return t.firstMenuClick(n,r.routerName)},mouseleave:function(e){return t.divDragLeave()}}},[e("a",{ref:"item",refInFor:!0,staticClass:"top-first-menus",on:{mouseover:function(e){return t.divDragOver(e,n)}}},[t._v("\n                  "+t._s(r.text)+"\n                ")])])})),0),t._v(" "),e("div",{ref:"slider",staticClass:"slider",style:t.ingSlider},[e("div",{staticClass:"indicator"})])]),t._v(" "),e("div",{staticStyle:{flex:"1"}}),t._v(" "),e("div",{staticClass:"top-second-menus"},[e("div",{staticClass:"kakao-consulting"},[t._v("톡상담")]),t._v(" "),e("div",{staticStyle:{display:"flex","flex-direction":"row","margin-left":"8px"}},[e("div",{staticClass:"login-saved",on:{click:function(e){return t.$router.push({name:"Login"})}}},[t._v("\n                로그인\n              ")]),t._v(" "),e("div",{staticStyle:{"margin-left":"4px","margin-right":"4px"}},[t._v("·")]),t._v(" "),e("div",{staticClass:"login-saved"},[t._v("장바구니")])])])])])]),t._v(" "),e("div",{staticClass:"bottom-div"})])])}),[],!1,null,"194ff2c0",null);e.default=component.exports},339:function(t,e,r){"use strict";r(337)},340:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main[data-v-194ff2c0]{background-color:#fff;height:60px;position:fixed;width:100%;z-index:999}.main[data-v-194ff2c0],.main .main-header[data-v-194ff2c0]{display:flex;flex-direction:column;margin:auto}.main .main-header[data-v-194ff2c0]{height:98%;max-width:1140px;width:75%}.main .main-header .top-menu[data-v-194ff2c0]{align-items:flex-end;display:flex;flex:1;padding-bottom:10px}.main .main-header .top-first-image[data-v-194ff2c0]{cursor:pointer;width:195px}.main .main-header .top-first-menus[data-v-194ff2c0]{color:#000;cursor:pointer;font-size:18px;font-weight:700;margin-left:25px;text-decoration-line:none}.main .main-header .top-first-menus[data-v-194ff2c0]:hover{color:#5b1a7c}.main .main-header .top-second-menus[data-v-194ff2c0]{display:flex;flex-direction:row}.main .main-header .login-saved[data-v-194ff2c0]{color:#505050;cursor:pointer;font-size:12px}.main .main-header .slider[data-v-194ff2c0]{background-color:aqua;position:absolute;transition:all .33s cubic-bezier(.38,.8,.32,1.07);z-index:1}.main .main-header .indicator[data-v-194ff2c0]{background:#5b1a7c;border-radius:1px;height:4px;margin:0 auto;max-width:100%;position:relative;width:100px}.main .bottom-div[data-v-194ff2c0]{background-color:#d0d0d0;height:0;width:100%}",""]),n.locals={},t.exports=n},341:function(t,e,r){var content=r(348);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("7642392c",content,!0,{sourceMap:!1})},342:function(t,e,r){var content=r(353);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("7b0ffd37",content,!0,{sourceMap:!1})},343:function(t,e,r){var content=r(355);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("1de6125c",content,!0,{sourceMap:!1})},344:function(t,e,r){var content=r(357);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("591e80f5",content,!0,{sourceMap:!1})},345:function(t,e,r){var content=r(359);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("051002ab",content,!0,{sourceMap:!1})},346:function(t,e,r){var content=r(361);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("0d167bd8",content,!0,{sourceMap:!1})},347:function(t,e,r){"use strict";r(341)},348:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main_footer[data-v-37a1259c]{width:100%}.main_footer .group[data-v-37a1259c]{height:300px;margin:auto;padding:20px;width:1140px}.main_footer .group .top[data-v-37a1259c]{align-items:center;display:flex;flex-direction:row}.main_footer .group .top .footer-logo[data-v-37a1259c]{background:#000;height:80px;width:200px}.main_footer .group .top .service-group[data-v-37a1259c]{align-items:center;display:flex;flex-direction:row}.main_footer .group .top .service-group .service-text[data-v-37a1259c]{cursor:pointer;font-size:30px}.main_footer .group .middle[data-v-37a1259c]{display:flex;flex-direction:row;margin-top:20px}.main_footer .group .middle .right[data-v-37a1259c]{align-items:center;display:flex;flex:1;flex-direction:column;justify-content:center}.main_footer .group .middle .right .right-title[data-v-37a1259c]{font-size:30px}.main_footer .group .middle .right .right-content[data-v-37a1259c]{font-size:20px}",""]),n.locals={},t.exports=n},349:function(t,e,r){!function(){"use strict";var e={d:function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},p:""},r={};if(e.r(r),e.d(r,{default:function(){return v}}),"undefined"!=typeof window){var n=window.document.currentScript,o=n&&n.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);o&&(e.p=o[1])}function l(t,e,r,n,o,l,d,c){var f,h="function"==typeof t?t.options:t;if(e&&(h.render=e,h.staticRenderFns=r,h._compiled=!0),n&&(h.functional=!0),l&&(h._scopeId="data-v-"+l),d?(f=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(d)},h._ssrRegister=f):o&&(f=c?function(){o.call(this,(h.functional?this.parent:this).$root.$options.shadowRoot)}:o),f)if(h.functional){h._injectStyles=f;var v=h.render;h.render=function(t,e){return f.call(e),v(t,e)}}else{var m=h.beforeCreate;h.beforeCreate=m?[].concat(m,f):[f]}return{exports:t,options:h}}var d=l({name:"Arrows",props:{},mounted(){},methods:{}},(function(){var t=this,e=t._self._c;return e("div",{staticClass:"future-arrows"},[e("button",{staticClass:"arrow",on:{click:function(e){return t.$emit("click-left")}}},[this.$slots["arrow-left"]?t._t("arrow-left"):e("svg",{attrs:{width:"16px",height:"16px",viewBox:"-4.5 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[e("g",{attrs:{id:"Page-1",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{id:"Dribbble-Light-Preview",transform:"translate(-345.000000, -6679.000000)",fill:"#000000"}},[e("g",{attrs:{id:"icons",transform:"translate(56.000000, 160.000000)"}},[e("path",{attrs:{d:"M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231",id:"arrow_left-[#335]"}})])])])])],2),e("button",{staticClass:"arrow",on:{click:function(e){return t.$emit("click-right")}}},[this.$slots["arrow-right"]?t._t("arrow-right"):e("svg",{attrs:{width:"16px",height:"16px",viewBox:"-4.5 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[e("g",{attrs:{id:"Page-1",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{id:"Dribbble-Light-Preview",transform:"translate(-305.000000, -6679.000000)",fill:"#000000"}},[e("g",{attrs:{id:"icons",transform:"translate(56.000000, 160.000000)"}},[e("path",{attrs:{d:"M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769",id:"arrow_right-[#336]"}})])])])])],2)])}),[],!1,null,"2cde9c6c",null).exports;var c={name:"VueFutureSlider",components:{LoadingSpinner:l({name:"loading-spinner",props:{loading:{type:Boolean,default:!1}}},(function(){var t=this._self._c;return t("div",{staticClass:"loading-spinner"},[t("svg",{staticClass:"spinner",attrs:{viewBox:"0 0 50 50"}},[t("circle",{staticClass:"path",attrs:{cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}})])])}),[],!1,null,"7807caec",null).exports,Arrows:d},props:{items:{type:[Array,Object],default:()=>[]},field:{type:String,default:"image"},autoplay:{type:Boolean,default:!1},autoplaySpeed:{type:Number,default:3e3,validator:function(t){return t>500}},arrows:{type:Boolean,default:!0},slideToShow:{type:Number,default:1,validator:function(t){return t>=1}},speed:{type:Number,default:.5,validator:function(t){return t>=.1}},infinite:{type:Boolean,default:!1},loadingByOne:{type:Boolean,default:!1},cssBorder:{type:Number,default:0,validator:function(t){return t>=0}}},data:function(){return{sliderAllCount:0,sliderActive:1,sliderOffsetLeft:0,sliderOffsetStep:0,sliderOffsetWidth:0,list:[],limit:this.slideToShow,loading:!0,isPressed:!1}},computed:{_items:function(){return this.loadingByOne?this.items.slice(0,this.limit):this.items},left:function(){return this.sliderOffsetLeft+"px"},border:function(){return this.cssBorder+"px"},transition:function(){return"all "+this.speed+"s ease"},width:function(){return this.sliderOffsetWidth/this.slideToShow+"px"}},mounted(){this.init(),window.addEventListener("resize",(()=>{this.init()})),this.autoplay&&setInterval((()=>{this.nextSlide()}),this.autoplaySpeed)},methods:{init:function(){let t=this.$refs.slider;t&&(this.sliderOffsetWidth=t.offsetWidth,this.sliderOffsetStep=t.clientWidth,this.sliderAllCount=Math.ceil(this.items.length/this.slideToShow))},openSlide:function(t){t>0&&t<=this.sliderAllCount&&(this.sliderActive=t,this.sliderOffsetLeft=-(this.sliderActive*this.sliderOffsetStep-this.sliderOffsetStep))},nextSlide:function(){this.sliderActive<this.sliderAllCount?(this.limit+=this.slideToShow,this.sliderActive+=1,this.openSlide(this.sliderActive)):this.infinite&&this.openSlide(1)},prevSlide:function(){this.sliderActive>1?(this.sliderActive-=1,this.openSlide(this.sliderActive)):this.infinite&&this.openSlide(this.sliderAllCount)}}},f=l(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"future-slider-wrapper"},[e("div",{ref:"slider",staticClass:"future-slider"},[e("div",{ref:"body",staticClass:"future-slider-body",style:{left:t.left,transition:t.transition}},t._l(t._items,(function(r,n){return e("div",{key:n,staticClass:"future-slide",style:{width:t.width}},[e(r.link?"a":"div",{tag:"component",attrs:{href:r.link,target:r.target?"_blank":"_self"}},[e("img",{style:{width:t.width,"border-radius":t.border},attrs:{src:r[t.field],alt:""}})])],1)})),0)]),t.arrows&&t.sliderAllCount>1?e("arrows",{on:{"click-left":t.prevSlide,"click-right":t.nextSlide}},[e("template",{slot:"arrow-left"},[t._t("arrow-left")],2),e("template",{slot:"arrow-right"},[t._t("arrow-right")],2)],2):t._e()],1)}),[],!1,null,"4ae332e6",null).exports;const h={install(t){t.component("future-slider",f)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(h);var v=h;t.exports=r}()},350:function(t,e,r){var content=r(351);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("0917d716",content,!0,{sourceMap:!1})},351:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".future-arrows[data-v-2cde9c6c]{display:flex;justify-content:space-between;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:inherit;z-index:1}.future-arrows button.arrow[data-v-2cde9c6c]{align-items:center;background:#ccc;border:none;border-radius:50%;cursor:pointer;display:flex;height:26px;justify-content:center;opacity:.7;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:26px}.future-arrows button.arrow[data-v-2cde9c6c]:hover{opacity:1}.future-arrows button.arrow svg[data-v-2cde9c6c]{min-height:16px;min-width:16px}.future-arrows button.arrow[data-v-2cde9c6c]:first-child{margin-left:5px}.future-arrows button.arrow[data-v-2cde9c6c]:last-child{margin-right:5px}.loading-spinner[data-v-7807caec]{background:#f4f4f4;box-sizing:border-box;float:left;height:220px;overflow:hidden;position:relative;width:220px}.loading-spinner .spinner[data-v-7807caec]{stroke:#fff;animation:rotate-7807caec 2s linear infinite;height:50px;left:50%;margin:-25px 0 0 -25px;position:absolute;top:50%;width:50px;z-index:2}.loading-spinner .path[data-v-7807caec]{stroke:#93bfec;stroke-linecap:round;animation:dash-7807caec 1.5s ease-in-out infinite}@keyframes rotate-7807caec{to{transform:rotate(1turn)}}@keyframes dash-7807caec{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}.future-slider-wrapper .future-slider[data-v-4ae332e6],.future-slider-wrapper[data-v-4ae332e6]{height:inherit;max-height:inherit;max-width:inherit;position:relative;width:inherit}.future-slider-wrapper .future-slider[data-v-4ae332e6]{overflow:hidden}.future-slider-wrapper .future-slider .future-slider-body[data-v-4ae332e6]{align-items:stretch;display:flex;height:inherit;max-height:inherit;max-width:inherit;position:relative;transition:all .5s ease;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:inherit}.future-slider-wrapper .future-slider .future-slider-body .future-slide[data-v-4ae332e6]{background-position:50%;background-size:cover;flex:1 100%;height:inherit;max-height:inherit;max-width:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:inherit}.future-slider-wrapper .future-slider .future-slider-body .future-slide img[data-v-4ae332e6]{height:inherit;max-height:inherit;max-width:inherit;width:inherit}",""]),n.locals={},t.exports=n},352:function(t,e,r){"use strict";r(342)},353:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main-warper[data-v-811c9d80]{background-color:#5f00b6;height:360px;margin:auto;min-width:1080px;width:100%}.main-warper .pager-group[data-v-811c9d80]{align-items:center;display:flex;height:100%;justify-content:center;margin:auto;max-width:1312px;overflow:hidden;position:relative;width:100%}.main-warper .slider[data-v-811c9d80]{height:inherit;width:inherit}.main-warper .pager-img[data-v-811c9d80]{display:inline-block;height:360px;max-width:1200px;width:100%}.main-warper .left-arrow[data-v-811c9d80]{align-items:center;background-color:rgba(0,0,0,.5);border-radius:100%;cursor:pointer;display:flex;height:56px;justify-content:center;left:0;position:absolute;width:56px}.main-warper .arrow-text[data-v-811c9d80]{color:#fff;font-size:40px;font-weight:700}.main-warper .right-arrow[data-v-811c9d80]{align-items:center;background-color:rgba(0,0,0,.5);border-radius:100%;cursor:pointer;display:flex;height:56px;justify-content:center;position:absolute;right:0;width:56px}",""]),n.locals={},t.exports=n},354:function(t,e,r){"use strict";r(343)},355:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main-warper[data-v-6ba84db6]{margin:auto;max-width:1080px;min-width:980px;padding-bottom:100px;padding-top:100px;width:100%}.main-warper .main-warper-group[data-v-6ba84db6]{align-items:center;display:flex;flex-direction:row;justify-content:center;padding-left:20px;padding-right:20px}.main-warper .buttons[data-v-6ba84db6]{background:#707070;border-radius:8px;cursor:pointer;padding:12px 40px;text-align:center}.main-warper .content[data-v-6ba84db6]{font-size:30px;margin-left:20px}",""]),n.locals={},t.exports=n},356:function(t,e,r){"use strict";r(344)},357:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main-warper[data-v-5971b70c]{margin:auto;max-width:1080px;min-width:980px;padding-bottom:40px;padding-top:40px;width:100%}.main-warper .main-warper-group[data-v-5971b70c]{align-items:center;display:flex;flex-direction:row;justify-content:center;padding-left:20px;padding-right:20px}.main-warper .buttons[data-v-5971b70c]{background:#707070;border-radius:8px;cursor:pointer;margin-left:20px;padding:12px 40px;text-align:center}.main-warper .title[data-v-5971b70c]{font-size:40px}.main-warper .content[data-v-5971b70c]{font-size:20px;margin-top:20px}",""]),n.locals={},t.exports=n},358:function(t,e,r){"use strict";r(345)},359:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main-warper[data-v-693fc162]{margin:auto;max-width:1140px;padding-bottom:200px;padding-top:200px;width:100%}.main-warper .main-warper-group[data-v-693fc162]{align-items:center;display:flex;flex-direction:row;justify-content:center;padding-left:20px;padding-right:20px}.main-warper .buttons[data-v-693fc162]{background:#707070;border-radius:8px;cursor:pointer;margin-left:20px;padding:12px 40px;text-align:center}.main-warper .title[data-v-693fc162]{font-size:40px}.main-warper .content[data-v-693fc162]{font-size:20px;margin-top:20px}",""]),n.locals={},t.exports=n},360:function(t,e,r){"use strict";r(346)},361:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".main-warper[data-v-21e2d51c]{margin:auto;max-width:1080px;min-width:980px;padding-bottom:60px;padding-top:60px;width:100%}.main-warper .main-warper-group[data-v-21e2d51c]{align-items:center;display:flex;flex-direction:row;justify-content:center}.main-warper .title-line[data-v-21e2d51c]{background-color:#979797;border:1px;flex:1;height:2px}.main-warper .title[data-v-21e2d51c]{font-size:40px;font-weight:700;margin-left:78px;margin-right:78px}.main-warper .slick-prev[data-v-21e2d51c]{background-color:aqua}",""]),n.locals={},t.exports=n},362:function(t,e,r){"use strict";r.r(e);var n={name:"Footer"},o=(r(347),r(39)),component=Object(o.a)(n,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"main_footer"},[e("div",{staticClass:"group"},[e("div",{staticClass:"top"},[e("img",{staticClass:"footer-logo"}),t._v(" "),e("div",{staticStyle:{flex:"1"}}),t._v(" "),e("div",{staticClass:"service-group"},[e("div",{staticClass:"service-text"},[t._v("이용약관")]),t._v(" "),e("div",{staticStyle:{"margin-left":"4px","margin-right":"4px"}},[t._v("·")]),t._v(" "),e("div",{staticClass:"service-text"},[t._v("개인정보처리방침")]),t._v(" "),e("div",{staticStyle:{"margin-left":"4px","margin-right":"4px"}},[t._v("·")]),t._v(" "),e("div",{staticClass:"service-text"},[t._v("고객센터")])])]),t._v(" "),e("div",{staticClass:"middle"},[e("div",{staticClass:"left"},[e("div",{staticClass:"left-text"},[t._v("\n            (주)셀프케어 | 사업자번호: 111-22-3333333 | 대표: 홍길동\n          ")]),t._v(" "),e("div",{staticClass:"left-text"},[t._v("\n            개인정보취급담당부서: 고객경험관리팀 | 개인정보관리책임자:\n            홍길동"),e("br"),t._v("통신판매업신고: 제 2020-서울강남-000009 호 |\n            유통판매업신고: 제 2023-00000001 호"),e("br"),t._v("건강기능식품판매업신고:\n            제 2023-0000001 호\n          ")]),t._v(" "),e("div",{staticClass:"left-text"},[t._v("서울특별시 강남구 봉은사로 1길 (OO빌딩)")]),t._v(" "),e("div",{staticClass:"left-text"},[t._v("제휴문의: self-care@gmail.com")])]),t._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"right-title"},[t._v("문의 : 031) 123-4567")]),t._v(" "),e("div",{staticClass:"right-content"},[t._v("평일 오전9시-오후6시")])])])])])])}],!1,null,"37a1259c",null);e.default=component.exports},363:function(t,e,r){"use strict";r.r(e);var n={name:"howToView",data:function(){return{}},methods:{preClick:function(){}}},o=(r(356),r(39)),component=Object(o.a)(n,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-warper"},[e("div",{staticClass:"main-warper-group"},[e("img",{staticStyle:{"background-color":"aqua",width:"120px",height:"120px"}}),t._v(" "),e("div",{staticStyle:{"margin-left":"20px"}},[e("div",{staticClass:"title"},[t._v("셀프케어 뉴스레터 구독 신청")]),t._v(" "),e("div",{staticClass:"content"},[t._v("새로운 건강식품 관련 정보를 받아보세요.")])]),t._v(" "),e("div",{staticClass:"buttons"},[t._v("무료 구독하기")])])])}],!1,null,"5971b70c",null);e.default=component.exports},370:function(t,e,r){var content=r(385);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("d8b042c2",content,!0,{sourceMap:!1})},372:function(t,e,r){"use strict";r.r(e);var n=r(1),o=r(349),l=r.n(o);r(350);n.a.use(l.a);var d={name:"pagerView",data:function(){return{images:[{image:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_37670.jpg",color:"#DFD1FF"},{image:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_59293.jpg",color:"#DFD1FF"},{image:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_87197.jpg",color:"#DFD1FF"}]}},methods:{preClick:function(){}}},c=(r(352),r(39)),component=Object(c.a)(d,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-warper"},[e("div",{staticClass:"pager-group"},[e("div",{staticClass:"slider"},[e("future-slider",{attrs:{items:t.images,infinite:!0,autoplay:!0,autoplaySpped:2e3}}),t._v(" "),e("template",{slot:"arrow-left"},[e("div",{staticClass:"left-arrow"},[e("a",{staticClass:"arrow-text"},[t._v(t._s("<"))])])]),t._v(" "),e("template",{slot:"arrow-right"},[e("div",{staticClass:"right-arrow"},[e("a",{staticClass:"arrow-text"},[t._v(t._s(">"))])])])],2)])])}),[],!1,null,"811c9d80",null);e.default=component.exports},373:function(t,e,r){"use strict";r.r(e);var n={name:"howToView",data:function(){return{}},methods:{preClick:function(){}}},o=(r(354),r(39)),component=Object(o.a)(n,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-warper"},[e("div",{staticClass:"main-warper-group"},[e("div",[e("div",{staticClass:"buttons"},[t._v("AI 건강 설문하기")]),t._v(" "),e("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[t._v("전문가와 상담하기")])]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n      간단한 맞춤 설문으로 나에게 꼭 맞는 영양성분을"),e("br"),t._v("추천 받아보세요.\n    ")])])])}],!1,null,"6ba84db6",null);e.default=component.exports},374:function(t,e,r){"use strict";r.r(e);var n={name:"howToView",data:function(){return{}},methods:{preClick:function(){}}},o=(r(358),r(39)),component=Object(o.a)(n,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-warper"},[e("div",{staticClass:"main-warper-group"},[e("div",{staticStyle:{"margin-left":"20px"}},[e("div",{staticClass:"title"},[t._v("\n        123456명이"),e("br"),t._v("맞춤으로 필요한 영양 성분을 확인했어요\n      ")]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n        오직 self-care에서만 간단한 설문을 통해 AI가 추천해주는"),e("br"),t._v("유용한\n        정보를 제공해요.\n      ")])]),t._v(" "),e("div",{staticClass:"buttons"},[t._v("AI 건강 설문하기")])])])}],!1,null,"693fc162",null);e.default=component.exports},375:function(t,e,r){"use strict";r.r(e);var n=r(367),o=(r(369),{name:"subscribeSection",data:function(){return{subscribeList:[{url:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_37670.jpg",color:"#DFD1FF"},{url:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_59293.jpg",color:"#DFD1FF"},{url:"https://www.mypuzzle.co.kr/upload/site_promt_banner_pc/20230420_87197.jpg",color:"#DFD1FF"}],slickOptions:{dots:!0,slidesToShow:1,infinite:!0,sildesToScroll:1}}},methods:{next:function(){this.$refs.slick.next()},prev:function(){this.$refs.slick.prev()},reInit:function(){var t=this;this.$nextTick((function(){t.$refs.slick.reSlick()}))},handleAfterChange:function(t,e,r){console.log("handleAfterChange",t,e,r)},handleBeforeChange:function(t,e,r,n){console.log("handleBeforeChange",t,e,r,n)},handleBreakpoint:function(t,e,r){console.log("handleBreakpoint",t,e,r)},handleDestroy:function(t,e){console.log("handleDestroy",t,e)},handleEdge:function(t,e,r){console.log("handleEdge",t,e,r)},handleInit:function(t,e){console.log("handleInit",t,e)},handleReInit:function(t,e){console.log("handleReInit",t,e)},handleSetPosition:function(t,e){console.log("handleSetPosition",t,e)},handleSwipe:function(t,e,r){console.log("handleSwipe",t,e,r)},handleLazyLoaded:function(t,e,image,r){console.log("handleLazyLoaded",t,e,image,r)},handleLazyLoadError:function(t,e,image,r){console.log("handleLazeLoadError",t,e,image,r)}},components:{Slick:n.a}}),l=o,d=(r(360),r(39)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"main-warper"},[t._m(0),t._v(" "),e("slick",{ref:"slick",attrs:{options:t.slickOptions},on:{afterChange:t.handleAfterChange,beforeChange:t.handleBeforeChange,breakpoint:t.handleBreakpoint,destroy:t.handleDestroy,edge:t.handleEdge,init:t.handleInit,reInit:t.handleReInit,setPosition:t.handleSetPosition,swipe:t.handleSwipe,lazyLoaded:t.handleLazyLoaded,lazyLoadError:t.handleLazyLoadError}},t._l(t.subscribeList,(function(t,r){return e("div",{key:r,staticStyle:{width:"100%",height:"360px"}},[e("a",[e("img",{staticStyle:{width:"100%",height:"360px"},attrs:{src:t.url}})])])})),0)],1)])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-warper-group"},[e("div",{staticClass:"title-line"}),t._v(" "),e("div",{staticClass:"title"},[t._v("지금 바로 구독해야 할 이유!")]),t._v(" "),e("div",{staticClass:"title-line"})])}],!1,null,"21e2d51c",null);e.default=component.exports},384:function(t,e,r){"use strict";r(370)},385:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,".hot-item-group[data-v-58f0b692]{margin:auto;max-width:1080px;padding:20px;width:100%}.title-group[data-v-58f0b692]{align-items:center;display:flex;flex-direction:row}.title-group .title[data-v-58f0b692]{font-size:40px}.title-group .product-detail[data-v-58f0b692]{cursor:pointer}.item-group[data-v-58f0b692]{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;margin-top:20px}.item-group .item-tag-group[data-v-58f0b692]{display:flex;flex-direction:row;height:20px;width:100%}.item-group .item-tag[data-v-58f0b692]{background-color:aqua;border-radius:20px;margin-right:12px;padding:4px 12px;text-align:center}.item-group .item-title[data-v-58f0b692]{margin-top:12px}.item-group .item-price[data-v-58f0b692],.item-group .item-rating-review[data-v-58f0b692]{margin-top:8px}.magazine-group[data-v-58f0b692]{margin:auto;max-width:1080px;padding:20px;width:100%}.magazine-group .description[data-v-58f0b692]{font-size:30px}.magazine-group .magazine-item-group[data-v-58f0b692]{display:flex;margin-top:20px}.magazine-group .magazine-item[data-v-58f0b692]{flex:1}.magazine-group .magazine-item-image[data-v-58f0b692]{background-color:#faebd7;border-radius:12px;height:300px;width:100%}.magazine-group .magazine-item-title[data-v-58f0b692]{font-size:20px;margin-top:20px}.footer-line[data-v-58f0b692]{background:#707070;height:1px;width:100%}",""]),n.locals={},t.exports=n},400:function(t,e,r){"use strict";r.r(e);var footer=r(362),header=r(338),n=r(372),o=r(373),l=r(363),d=r(374),c=r(375),f={name:"IndexPage",layout:"default",components:{Footer:footer.default,Header:header.default,mainPagerView:n.default,healthQuestion:o.default,subscribe:l.default,aiConsulting:d.default,subscribeReason:c.default},methods:{select:function(t,e,r){var n={};return n.table=t,null!=e&&(n.conditions=e),null!=r&&(n.join=r),n},select1:function(object,t){var e={};return e.table=object,null!=t&&(e.conditions=t),e},join:function(t,e,r){return{joinTable:t,param1:e,param2:r}}},mounted:function(){var t=[],e=[{op:"and",f:"first_checkup.user_no",q:"=",v:"user_info.user_no"},{op:"and",f:"first_checkup.alive_flag",q:"!=",v:1}];t.push(this.select1("first_checkup",e)),t.push(this.select1("second_checkup",e));var q=this.select("user_info",[{op:"and",f:"user_info.user_no",q:"=",v:"1"},{op:"and",f:"user_info.alive_flag",q:"=",v:"1"}],t);console.log(q)},data:function(){return{itemList:[{uri:"",tags:["태그1","태그2"],title:"비타민1",price:"50,000",sale:"",rating:"4",reviewCnt:"4"},{uri:"",tags:[],title:"비타민2",price:"40,000",sale:"",rating:"4.2",reviewCnt:"5"},{uri:"",tags:["태그1","태그2"],title:"비타민3",price:"32,000",sale:"",rating:"4.4",reviewCnt:"6"},{uri:"",tags:["태그1"],title:"비타민4",price:"2,100",sale:"",rating:"4.6",reviewCnt:"7"},{uri:"",tags:[],title:"비타민5",price:"2,000",sale:"",rating:"4.8",reviewCnt:"8"}]}}},h=(r(384),r(39)),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e("div",[e("Header"),t._v(" "),e("div",{staticStyle:{"margin-top":"120px"}},[e("mainPagerView")],1),t._v(" "),e("healthQuestion"),t._v(" "),e("subscribe"),t._v(" "),e("aiConsulting"),t._v(" "),e("div",{staticClass:"hot-item-group"},[t._m(0),t._v(" "),e("div",{staticClass:"item-group"},t._l(t.itemList,(function(r,n){return e("div",{key:n},[e("img",{staticStyle:{"background-color":"aqua",width:"100%",height:"200px"}}),t._v(" "),e("div",{staticClass:"item-tag-group"},t._l(r.tags,(function(r,n){return e("div",{key:n,staticClass:"item-tag"},[t._v("\n            "+t._s(r)+"\n          ")])})),0),t._v(" "),e("div",{staticClass:"item-title"},[t._v(t._s(r.title))]),t._v(" "),e("div",{staticClass:"item-price"},[t._v(t._s(r.price))]),t._v(" "),e("div",{staticClass:"item-rating-review"},[t._v("\n          "+t._s(r.rating+" ( 후기 "+r.reviewCnt+" )")+"\n        ")])])})),0)]),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"footer-line"}),t._v(" "),e("Footer")],1)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"title-group"},[e("div",{staticClass:"title"},[t._v("셀프케어 선정 인기 제품")]),t._v(" "),e("div",{staticStyle:{flex:"1"}}),t._v(" "),e("div",{staticClass:"product-detail"},[t._v("제품 전체보기 >")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"magazine-group"},[e("div",{staticClass:"title-group"},[e("div",{staticClass:"title"},[t._v("self-care Magazine")]),t._v(" "),e("div",{staticStyle:{flex:"1"}}),t._v(" "),e("div",{staticClass:"product-detail"},[t._v("제품 전체보기 >")])]),t._v(" "),e("div",{staticClass:"description"},[t._v("\n      셀프케어에서 전달하는 건강 소식을 모아보세요.\n    ")]),t._v(" "),e("div",{staticClass:"magazine-item-group"},[e("div",{staticClass:"magazine-item"},[e("img",{staticClass:"magazine-item-image"}),t._v(" "),e("div",{staticClass:"magazine-item-title"},[t._v("매거진 타이틀 영역")])]),t._v(" "),e("div",{staticStyle:{width:"20px"}}),t._v(" "),e("div",{staticClass:"magazine-item"},[e("img",{staticClass:"magazine-item-image"}),t._v(" "),e("div",{staticClass:"magazine-item-title"},[t._v("매거진 타이틀 영역")])])])])}],!1,null,"58f0b692",null);e.default=component.exports;installComponents(component,{Header:r(338).default,Subscribe:r(363).default,Footer:r(362).default})}}]);