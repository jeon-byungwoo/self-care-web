(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{108:function(e,t,n){e.exports=n.p+"fonts/SCDream1.3f28bc1.otf"},109:function(e,t,n){e.exports=n.p+"fonts/SCDream2.f44c037.otf"},110:function(e,t,n){e.exports=n.p+"fonts/SCDream3.1e55b77.otf"},111:function(e,t,n){e.exports=n.p+"fonts/SCDream4.64c9dc7.otf"},112:function(e,t,n){e.exports=n.p+"fonts/SCDream5.ae5ee49.otf"},113:function(e,t,n){e.exports=n.p+"fonts/SCDream6.4df12ee.otf"},114:function(e,t,n){e.exports=n.p+"fonts/SCDream7.a8d826f.otf"},115:function(e,t,n){e.exports=n.p+"fonts/SCDream8.64217e4.otf"},116:function(e,t,n){e.exports=n.p+"fonts/SCDream9.c8e7afd.otf"},140:function(e,t,n){"use strict";n.r(t);n(40);var r={name:"pagerView",data:function(){return{topMenus:[{text:"건강설문",routerName:"healthConsulting"},{text:"자가진단",routerName:"healthConsulting"},{text:"스토어",routerName:"store"},{text:"펫 전용관",routerName:"petPrivate"},{text:"후기",routerName:"review"},{text:"매거진",routerName:"magazine"},{text:"소식",routerName:"notification"}],selectedTopMenus:0,indicatorX:0,indicatorWidth:0,indicatorHeight:0,indicatorTop:0,shadowNav:!1}},methods:{hrefKakao:function(){window.open("http://pf.kakao.com/_xfnvuG/chat")},firstMenuClick:function(i,e){console.log("click",e),this.selectedTopMenus=this.topMenus[i].text,this.$router.push({name:e})},divDragOver:function(e,i){},divDragLeave:function(){this.indicatorWidth=0},logoClick:function(){this.$router.push({name:"index"})},myClick:function(){this.$router.push({name:"myInfo"})},cartClick:function(){this.$router.push({name:"cart"})},update:function(){this.shadowNav=0==this.shadowNav,this.$emit("update",this.shadowNav)},handleResize:function(){var e=window.innerWidth;window.innerHeight;e>720&&(this.shadowNav=!1,this.$emit("update",this.shadowNav))}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},fetchData:function(){},computed:{ingSlider:function(){return"\n          width: ".concat(this.indicatorWidth,"px;\n          left: ").concat(this.indicatorX,"px;\n          top: ").concat(this.indicatorTop,"px;\n          ")}}},o=(n(316),n(25)),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"main-wrapper"},[t("div",{staticClass:"main-header"},[t("div",{staticClass:"menu-1step"},[t("div",{staticClass:"div-logo",on:{click:e.logoClick}},[t("img",{staticClass:"img-logo",attrs:{src:n(252),draggable:"false"}})]),e._v(" "),t("img",{staticClass:"img-talk",attrs:{src:n(311),draggable:"false"},on:{click:function(t){return e.hrefKakao()}}}),e._v(" "),t("img",{staticClass:"img-hamberger",attrs:{src:0==e.shadowNav?n(312):n(313),draggable:"false"},on:{click:e.update}})]),e._v(" "),t("div",{staticClass:"menu-2step"},[t("div",{ref:"menus",class:1==e.shadowNav?"menu-2step-area":"menu-2step-area-display-none"},[e._l(e.topMenus,(function(n,r){return t("div",{key:r,on:{click:function(t){return e.firstMenuClick(r,n.routerName)}}},[t("a",{ref:"item",refInFor:!0,class:n.text==e.selectedTopMenus?"selected-top-first-menus":"top-first-menus"},[e._v("\n            "+e._s(n.text)+"\n          ")])])})),e._v(" "),t("div",{staticClass:"flex-1"}),e._v(" "),t("div",{staticClass:"top-second-menus"},[t("img",{staticClass:"img-my",attrs:{src:n(314),draggable:"false"},on:{click:e.myClick}}),e._v(" "),t("img",{staticClass:"img-cart",attrs:{src:n(315),draggable:"false"},on:{click:e.cartClick}}),e._v(" "),t("div",{staticClass:"mobile-top-first-menus",on:{click:e.myClick}},[e._v("내 정보")]),e._v(" "),t("div",{staticClass:"mobile-top-first-menus",on:{click:e.cartClick}},[e._v("\n            장바구니\n          ")])])],2)])]),e._v(" "),t("div",{class:1==e.shadowNav?"line-display-none":"line"})])}),[],!1,null,"6ec31336",null);t.default=component.exports},221:function(e,t,n){var content=n(304);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(71).default)("0edae9fa",content,!0,{sourceMap:!1})},223:function(e,t,n){var content=n(310);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(71).default)("55038b1a",content,!0,{sourceMap:!1})},224:function(e,t,n){var content=n(317);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(71).default)("818d66a2",content,!0,{sourceMap:!1})},242:function(e,t,n){"use strict";var r={name:"DefaultLayout",data:function(){return{}}},o=n(25),component=Object(o.a)(r,(function(){var e=this._self._c;return e("div",{staticStyle:{padding:"0px"}},[e("Nuxt")],1)}),[],!1,null,null,null);t.a=component.exports},243:function(e,t,n){"use strict";var r={name:"DefaultLayout",data:function(){return{}}},o=n(25),component=Object(o.a)(r,(function(){var e=this._self._c;return e("div",{staticStyle:{margin:"0px"}},[e("Nuxt")],1)}),[],!1,null,null,null);t.a=component.exports},244:function(e,t,n){"use strict";var r=[function(){var e=this._self._c;return e("div",{staticClass:"logo-area"},[e("img",{staticClass:"logo",attrs:{src:n(251),draggable:"false"}})])},function(){var e=this._self._c;return e("div",{staticClass:"id-area"},[e("input",{staticClass:"id",attrs:{value:"",type:"email",placeholder:"이메일",autocomplete:"off","data-gtm-form-interact-field-id":"0"}})])},function(){var e=this._self._c;return e("div",{staticClass:"pw-area"},[e("input",{staticClass:"pw",attrs:{type:"password",placeholder:"비밀번호",autocomplete:"off"}})])}],o=n(10),c=(n(72),{name:"LoginLayout",data:function(){return{naverClientId:"n_Jfo39bgxlZcWQcQhYf",clientSecret:"8nfsmd6vRH",callbackUrl:"http://localhost:3000/naverLCallback"}},mounted:function(){console.log("asdbsdasd")},methods:{naverLoginBtn:function(){return Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=n_Jfo39bgxlZcWQcQhYf&redirect_uri=http://localhost:3000/naverLCallback",console.log("==================url===================="),console.log(t),window.location.href=t;case 4:case"end":return e.stop()}}),e)})))()},kakaoLoginBtn:function(){window.Kakao.init("43da0fc0239b6430f0c2b7eddf3dd1b5"),window.Kakao.Auth.getAccessToken()&&(window.Kakao.API.request({url:"/v1/user/unlink",success:function(e){console.log(e)},fail:function(e){console.log(e)}}),window.Kakao.Auth.setAccessToken(void 0)),window.Kakao.Auth.login({success:function(){var e;window.Kakao.API.request({url:"/v2/user/me",data:{property_keys:["kakao_account.email"]},success:(e=Object(o.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t);case 1:case"end":return e.stop()}}),e)}))),function(t){return e.apply(this,arguments)}),fail:function(e){console.log(e)}})},fail:function(e){console.log(e)}})},signUpClick:function(){this.$router.push({name:"signUp"})}}}),l=c,d=(n(309),n(25)),component=Object(d.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-group"},[t("div",{staticClass:"login-child-group"},[e._m(0),e._v(" "),t("div",{staticClass:"child-area"},[e._m(1),e._v(" "),e._m(2),e._v(" "),t("div",{staticClass:"login-btn"},[e._v("로그인")]),e._v(" "),t("div",{staticClass:"utill_div"},[t("div",{staticClass:"utill_text"},[e._v("비밀번호 찾기")]),e._v(" "),t("div",{staticClass:"utill_line"}),e._v(" "),t("div",{staticClass:"utill_text",on:{click:e.signUpClick}},[e._v("회원가입")])]),e._v(" "),t("div",{staticClass:"login-sns"},[t("div",{staticClass:"sns-kakao",on:{click:e.kakaoLoginBtn}},[t("img",{staticClass:"img-sns",attrs:{src:n(307),alt:"",draggable:"false"}}),e._v(" "),t("div",{staticClass:"sns-kakao-text"},[e._v("카카오톡 로그인")])]),e._v(" "),t("div",{staticClass:"sns-naver",on:{click:e.naverLoginBtn}},[t("img",{staticClass:"img-sns",attrs:{src:n(308),alt:"",draggable:"false"}}),e._v(" "),t("div",{staticClass:"sns-naver-text"},[e._v("네이버 로그인")])])])])])])}),r,!1,null,"5c0a7b43",null);t.a=component.exports},245:function(e,t,n){"use strict";var r={name:"DefaultLayout",components:{Header:n(140).default},data:function(){return{}}},o=n(25),component=Object(o.a)(r,(function(){var e=this._self._c;return e("div",[e("Header"),this._v(" "),e("div",{staticStyle:{"margin-top":"197px"}},[e("Nuxt")],1)],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{Header:n(140).default})},251:function(e,t,n){e.exports=n.p+"img/login-logo.73d6318.png"},252:function(e,t,n){e.exports=n.p+"img/ic_home_logo.0dd6c2d.png"},253:function(e,t,n){n(254),e.exports=n(255)},303:function(e,t,n){"use strict";n(221)},304:function(e,t,n){var r=n(70)((function(i){return i[1]}));r.push([e.i,"h1[data-v-6ffeedc3]{font-size:20px}",""]),r.locals={},e.exports=r},307:function(e,t,n){e.exports=n.p+"img/ic_kakao.f2f97d7.png"},308:function(e,t,n){e.exports=n.p+"img/ic_naver.c7de9fa.png"},309:function(e,t,n){"use strict";n(223)},310:function(e,t,n){var r=n(70),o=n(107),c=n(108),l=n(109),d=n(110),f=n(111),m=n(112),h=n(113),x=n(114),v=n(115),w=n(116),A=r((function(i){return i[1]})),y=o(c),k=o(l),C=o(d),_=o(f),j=o(m),z=o(h),I=o(x),N=o(v),U=o(w);A.push([e.i,'@font-face{font-family:"score1";font-weight:100;src:url('+y+') format("truetype")}@font-face{font-family:"score2";font-weight:200;src:url('+k+') format("truetype")}@font-face{font-family:"score3";font-weight:300;src:url('+C+') format("truetype")}@font-face{font-family:"score4";font-weight:400;src:url('+_+') format("truetype")}@font-face{font-family:"score5";font-weight:500;src:url('+j+') format("truetype")}@font-face{font-family:"score6";font-weight:600;src:url('+z+') format("truetype")}@font-face{font-family:"score7";font-weight:700;src:url('+I+') format("truetype")}@font-face{font-family:"score8";font-weight:800;src:url('+N+') format("truetype")}@font-face{font-family:"score9";font-weight:900;src:url('+U+') format("truetype")}.login-group[data-v-5c0a7b43]{height:100vh;margin:auto;max-width:1080px;width:100%}.login-group .login-child-group[data-v-5c0a7b43]{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;width:100%}.login-group .login-child-group .logo-area[data-v-5c0a7b43]{align-items:center;display:flex;justify-content:center;width:400px}.login-group .login-child-group .logo[data-v-5c0a7b43]{height:48px;width:120px}.login-group .login-child-group .child-area[data-v-5c0a7b43]{display:flex;flex-direction:column;margin-top:70px;width:400px}.login-group .login-child-group .child-area .id-area[data-v-5c0a7b43]{align-items:center;border-radius:1px;border-width:1px;display:flex;height:60px;margin-top:4px;width:100%}.login-group .login-child-group .child-area .id[data-v-5c0a7b43]{background-size:20px;border:1px solid #ddd;border-radius:1px;color:#999;font-family:"score2";font-size:16px;height:60px;letter-spacing:-.6px;padding:12px;vertical-align:middle;width:100%}.login-group .login-child-group .child-area .pw-area[data-v-5c0a7b43]{align-items:center;display:flex;height:60px;margin-top:20px;width:100%}.login-group .login-child-group .child-area .pw[data-v-5c0a7b43]{border:1px solid #ddd;border-radius:1px;color:#999;font-family:"score2";font-size:16px;height:60px;letter-spacing:-.6px;padding:12px;vertical-align:middle;width:100%}.login-group .login-child-group .child-area .login-btn[data-v-5c0a7b43]{align-items:center;background-color:#9ad144;border-radius:5px;color:#fff;cursor:pointer;display:flex;font-family:"score6";font-size:16px;height:60px;justify-content:center;margin-top:20px;width:100%}.login-group .login-child-group .child-area .login-sns[data-v-5c0a7b43]{display:flex;flex-direction:column;justify-content:center;margin-top:46px}.login-group .login-child-group .child-area .login-sns .sns-kakao[data-v-5c0a7b43]{align-items:center;background:#fee500;border-radius:5px;cursor:pointer;display:flex;flex-direction:row;height:60px;padding:0 30px;width:100%}.login-group .login-child-group .child-area .login-sns .sns-kakao .sns-kakao-text[data-v-5c0a7b43]{align-items:center;color:#3a1c1e;display:flex;flex:1;font-family:"score6";font-size:16px;justify-content:center;margin-right:22px}.login-group .login-child-group .child-area .login-sns .sns-naver[data-v-5c0a7b43]{align-items:center;background:#02c759;border-radius:5px;cursor:pointer;display:flex;flex-direction:row;height:60px;margin-top:15px;padding:0 30px;width:100%}.login-group .login-child-group .child-area .login-sns .sns-naver .sns-naver-text[data-v-5c0a7b43]{align-items:center;color:#fff;display:flex;flex:1;font-family:"score6";font-size:16px;justify-content:center;margin-right:22px}.login-group .login-child-group .child-area .img-sns[data-v-5c0a7b43]{cursor:pointer;height:21px;width:22px}.login-group .login-child-group .child-area .utill_div[data-v-5c0a7b43]{display:flex;justify-content:center;margin-top:20px}.login-group .login-child-group .child-area .utill_text[data-v-5c0a7b43]{color:#999;cursor:pointer;font-family:"score5";font-size:15px}.login-group .login-child-group .child-area .utill_line[data-v-5c0a7b43]{color:#d0d0d0;height:10px;margin-left:15px;margin-right:15px;width:2px}@media(max-width:720px){.login-group[data-v-5c0a7b43]{width:100%}.login-group .login-child-group[data-v-5c0a7b43]{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;width:100%}.login-group .login-child-group .logo-area[data-v-5c0a7b43]{align-items:center;display:flex;justify-content:center;width:80%}.login-group .login-child-group .logo[data-v-5c0a7b43]{height:48px;width:120px}.login-group .login-child-group .child-area[data-v-5c0a7b43]{display:flex;flex-direction:column;margin-top:70px;width:80%}.login-group .login-child-group .child-area .id-area[data-v-5c0a7b43]{align-items:center;border-radius:1px;border-width:1px;display:flex;height:60px;margin-top:4px;width:100%}.login-group .login-child-group .child-area .id[data-v-5c0a7b43]{background-size:20px;border:1px solid #ddd;border-radius:1px;color:#999;font-family:"score2";font-size:16px;height:60px;letter-spacing:-.6px;padding:12px;vertical-align:middle;width:100%}.login-group .login-child-group .child-area .pw-area[data-v-5c0a7b43]{align-items:center;display:flex;height:60px;margin-top:20px;width:100%}.login-group .login-child-group .child-area .pw[data-v-5c0a7b43]{border:1px solid #ddd;border-radius:1px;color:#999;font-family:"score2";font-size:16px;height:60px;letter-spacing:-.6px;padding:12px;vertical-align:middle;width:100%}.login-group .login-child-group .child-area .login-btn[data-v-5c0a7b43]{align-items:center;background-color:#9ad144;border-radius:5px;color:#fff;cursor:pointer;display:flex;font-family:"score6";font-size:16px;height:60px;justify-content:center;margin-top:20px;width:100%}.login-group .login-child-group .child-area .login-sns[data-v-5c0a7b43]{display:flex;flex-direction:column;justify-content:center;margin-top:46px}.login-group .login-child-group .child-area .login-sns .sns-kakao[data-v-5c0a7b43]{align-items:center;background:#fee500;border-radius:5px;cursor:pointer;display:flex;flex-direction:row;height:60px;padding:0 30px;width:100%}.login-group .login-child-group .child-area .login-sns .sns-kakao .sns-kakao-text[data-v-5c0a7b43]{align-items:center;color:#3a1c1e;display:flex;flex:1;font-family:"score6";font-size:16px;justify-content:center;margin-right:22px}.login-group .login-child-group .child-area .login-sns .sns-naver[data-v-5c0a7b43]{align-items:center;background:#02c759;border-radius:5px;cursor:pointer;display:flex;flex-direction:row;height:60px;margin-top:15px;padding:0 30px;width:100%}.login-group .login-child-group .child-area .login-sns .sns-naver .sns-naver-text[data-v-5c0a7b43]{align-items:center;color:#fff;display:flex;flex:1;font-family:"score6";font-size:16px;justify-content:center;margin-right:22px}.login-group .login-child-group .child-area .img-sns[data-v-5c0a7b43]{cursor:pointer;height:21px;width:22px}.login-group .login-child-group .child-area .utill_div[data-v-5c0a7b43]{display:flex;justify-content:center;margin-top:20px}.login-group .login-child-group .child-area .utill_text[data-v-5c0a7b43]{color:#999;cursor:pointer;font-family:"score5";font-size:15px}.login-group .login-child-group .child-area .utill_line[data-v-5c0a7b43]{color:#d0d0d0;height:10px;margin-left:15px;margin-right:15px;width:2px}}',""]),A.locals={},e.exports=A},311:function(e,t,n){e.exports=n.p+"img/ic_home_talk.63fb709.png"},312:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACBSURBVHgB7dgxDsMwDARBKsj/nxwHKtK5ucKAcJmpCdrbCVwzc01mTSbZv2dfwfz+l08wfyXLKwhuJ7id4HaC2wkGAAC4s++67tLNBLcT3E5wO8Ht/i74PfnTMpU+LU/bDwAAd9Y8e3b9feOY/e7S7QS3E9xOcDvB7dylH3DUXfoLLMAbPFxs9+sAAAAASUVORK5CYII="},313:function(e,t,n){e.exports=n.p+"img/ic_menu_close.9985250.png"},314:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJmSURBVHgB7Zs7TxRRGIa/NUYtFP+BjY3aWWiMjZdoqXaYiI2dWllp1NZotFA7LUxs1ESt1NJ4a4xREzuhgIZ/wKUAQoAMeXfyFHOAgTMwC+9TPbszXObb750zc85sJ5rnPPwG/Ch8HP4X/gL+MRpkW5hFXAjRiWa4B78bebjfwO8scUcIF0LkjMY5eOoMfxP+DN4HH4A/imo4En2KDLgjhAshckbjK/wU/BY81eopGKWH8G/w05EBd4RwIUTOaEzAd8P7EvushD1w3o9MJvZZNe4I4UKI7dFu5hPvZ79HckcIF0LkjMYfOC+orsHrXlBdj+X/VhbcEcKFEDmj8QTOaPAeYQ7+PKq5mvhZ8jgy444QLoRoavKWE623Iw8P4HciM+4I4UKIpqJBLsC55HcksT8vlp7CP0SDuCOEC2GMWYq1jhpcU7iYeH8ffEfUYwY+Cucayjv4l1glPlkKF0KsNBoH4FzFPhnt4jucM2NDsQzuCOFCiKWicQLOhzG4xDYIfw9/Cx+BT0c9dsL3w/sTfhDO5UU+xPIjKnBHiLavdOWkU2cjR4df8L3wV/Ar8NnYGPhhvoRfho/Bj8HL0cTREFspGl06qTe54SecLfQGPhC9wWv4JTgjf7wrjobYzNGYr7NzEYszeP0Z/g/O71Zs1OhQF37Iv+GH4We74mgIF0IU7dOf2MZ1hF6JA+H/zGNhNMpjd0cIF0IUo8YwXvNW9xB8MHob3p7/h5dTBO4I4UKIIhqcNeK6wy543ZmltsGZril4uW7ijhAuhCiisW4PfreEyuN1RwgXQrgQwoUQW3HytvJkuQBb905x9Gd/ZgAAAABJRU5ErkJggg=="},315:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAINSURBVHgB7Zs/SgNBGMW/iAoWJmKv4J8biAdQW7XzECmtEtBSIUlhmUOInZaiB1C8gXoEiRaCChHkZX0s+22yYQKT5f2qx+zs7uzje5nZP6nY5DkgfUx62+n/QPqC9I1NkBkTf8gIULHJcEb6xMJwTvrUAqOKADIChIzGPunrrA7tdjvR9Xo9q4t1u91EN5tNczgcdq6iqCKAjAAho3FHemcgWq1W0thoNKwInU7H2/ee9K4FQBUBZAQIGY130osD0ev1ksZqtWqFDvj+f8harcabPkgXO6iDKgLICBAyGv3Mxn7fQlCpuEMNcg2qCCAjgIwAMgLICJD3i7tE+s2mm2XSmdeiigAyAszmbFu38rBGWtHIQ0aAvGhsOO1XpI8sLi5J89g2ST9l7aiKADICjDNrvFi8vDrtazYEVQSQESAvGl45vVq8PDvtQxeHqgggI8A4C6pnixcvtorGqMgIULYFlTc2RWNUZARIP7zlqHw67fOkvy0u5kh/kf4hvZDVrooAMgKkZ40VZxsvVGKLA8Nj4zHzfdMq6WSWUUUAGQHS0fDuL2JeRHnwmDka61l9VBFARoB0NKbx/sKDHxfskeb43w6EKgLICFDmaBR6x6GKADICpKMxje8yPAo9rVJFgFmLn3G/tS60X7rzI+ktKyf8oUhyjYoGkBFg1AVVmdCCKo+YZo0wf/UZ8zy/5WtIEytDIagAAAAASUVORK5CYII="},316:function(e,t,n){"use strict";n(224)},317:function(e,t,n){var r=n(70),o=n(107),c=n(108),l=n(109),d=n(110),f=n(111),m=n(112),h=n(113),x=n(114),v=n(115),w=n(116),A=r((function(i){return i[1]})),y=o(c),k=o(l),C=o(d),_=o(f),j=o(m),z=o(h),I=o(x),N=o(v),U=o(w);A.push([e.i,'@font-face{font-family:"score1";font-weight:100;src:url('+y+') format("truetype")}@font-face{font-family:"score2";font-weight:200;src:url('+k+') format("truetype")}@font-face{font-family:"score3";font-weight:300;src:url('+C+') format("truetype")}@font-face{font-family:"score4";font-weight:400;src:url('+_+') format("truetype")}@font-face{font-family:"score5";font-weight:500;src:url('+j+') format("truetype")}@font-face{font-family:"score6";font-weight:600;src:url('+z+') format("truetype")}@font-face{font-family:"score7";font-weight:700;src:url('+I+') format("truetype")}@font-face{font-family:"score8";font-weight:800;src:url('+N+') format("truetype")}@font-face{font-family:"score9";font-weight:900;src:url('+U+') format("truetype")}.main-wrapper[data-v-6ec31336]{background:#fff;display:flex;flex-direction:column;left:0;position:sticky;top:0;width:100%;z-index:999}.main-wrapper .line[data-v-6ec31336],.main-wrapper .line-display-none[data-v-6ec31336]{background:#ddd;height:1px;margin-top:30px;width:100%}.main-wrapper .main-header[data-v-6ec31336]{display:flex;flex-direction:column;margin:48px auto auto;max-width:1200px;width:100%}.main-wrapper .main-header .menu-1step[data-v-6ec31336]{align-items:center;display:flex}.main-wrapper .main-header .menu-1step .img-menu[data-v-6ec31336]{cursor:pointer;display:none;height:20px;margin-right:28px;width:20px}.main-wrapper .main-header .menu-1step .div-logo[data-v-6ec31336]{align-items:center;display:flex;flex-grow:1;justify-content:center}.main-wrapper .main-header .menu-1step .img-logo[data-v-6ec31336]{cursor:pointer;height:38px;width:94px}.main-wrapper .main-header .menu-1step .img-talk[data-v-6ec31336]{cursor:pointer;height:35px;width:88px}.main-wrapper .main-header .menu-1step .img-hamberger[data-v-6ec31336]{cursor:pointer;display:none;height:35px;width:88px}.main-wrapper .main-header .menu-2step[data-v-6ec31336]{align-items:center;display:flex;flex:1;margin-top:58px}.main-wrapper .main-header .menu-2step .menu-2step-area[data-v-6ec31336]{display:flex;flex-direction:row;gap:61px;width:100%}.main-wrapper .main-header .menu-2step .menu-2step-area .flex-1[data-v-6ec31336]{flex:1}.main-wrapper .main-header .menu-2step .menu-2step-area-display-none[data-v-6ec31336]{display:flex;flex-direction:row;gap:61px;width:100%}.main-wrapper .main-header .menu-2step .menu-2step-area-display-none .flex-1[data-v-6ec31336]{flex:1}.main-wrapper .main-header .menu-2step .mobile-top-first-menus[data-v-6ec31336]{display:none}.main-wrapper .main-header .menu-2step .top-first-menus[data-v-6ec31336]{color:#333;cursor:pointer;font-family:"score5";font-size:17px;text-decoration-line:none}.main-wrapper .main-header .menu-2step .selected-top-first-menus[data-v-6ec31336]{color:#9ad144;cursor:pointer;font-family:"score5";font-size:17px;text-decoration-line:none}.main-wrapper .main-header .menu-2step .top-first-menus[data-v-6ec31336]:hover{color:#9ad144}.main-wrapper .main-header .menu-2step .top-second-menus[data-v-6ec31336]{display:flex;flex-direction:row}.main-wrapper .main-header .menu-2step .img-my[data-v-6ec31336]{cursor:pointer;height:22px;width:22px}.main-wrapper .main-header .menu-2step .img-cart[data-v-6ec31336]{cursor:pointer;height:22px;margin-left:25px;width:22px}.main-wrapper .main-header .login-saved[data-v-6ec31336]{color:#505050;cursor:pointer;font-size:12px}.main-wrapper .main-header .slider[data-v-6ec31336]{background-color:aqua;position:absolute;transition:all .33s cubic-bezier(.38,.8,.32,1.07);z-index:1}.main-wrapper .main-header .indicator[data-v-6ec31336]{background:#5b1a7c;border-radius:1px;height:4px;margin:0 auto;max-width:100%;position:relative;width:100px}@media(max-width:720px){.main-wrapper[data-v-6ec31336]{background:#fff;display:flex;flex-direction:column;height:76px;left:0;position:sticky;top:0;width:100%;z-index:999}.main-wrapper .line[data-v-6ec31336]{background:#ddd;height:1px;margin-top:10px;width:100%}.main-wrapper .line-display-none[data-v-6ec31336]{display:none}.main-wrapper .main-header[data-v-6ec31336]{display:flex;flex-direction:column;margin:20px auto auto;padding:0;width:100%}.main-wrapper .main-header .menu-1step[data-v-6ec31336]{align-items:center;display:flex;padding:0 20px}.main-wrapper .main-header .menu-1step .img-menu[data-v-6ec31336]{cursor:pointer;display:block;height:20px;margin-right:28px;width:20px}.main-wrapper .main-header .menu-1step .div-logo[data-v-6ec31336]{display:flex;justify-content:flex-start}.main-wrapper .main-header .menu-1step .div-logo .img-logo[data-v-6ec31336]{height:auto;width:21.25%}.main-wrapper .main-header .menu-1step .img-talk[data-v-6ec31336]{height:auto;width:22%}.main-wrapper .main-header .menu-1step .img-hamberger[data-v-6ec31336]{cursor:pointer;display:block;height:auto;margin-left:4.17%;width:6.81%}.main-wrapper .main-header .menu-2step[data-v-6ec31336]{align-items:center;background-color:#fff;display:block;justify-content:center;margin-top:0;width:100%}.main-wrapper .main-header .menu-2step .menu-2step-area[data-v-6ec31336]{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;margin-top:20px;width:100%}.main-wrapper .main-header .menu-2step .menu-2step-area .flex-1[data-v-6ec31336]{display:none}.main-wrapper .main-header .menu-2step .menu-2step-area-display-none[data-v-6ec31336]{align-items:center;display:none;flex-direction:column;justify-content:center;margin-top:0;width:100%}.main-wrapper .main-header .menu-2step .menu-2step-area-display-none .flex-1[data-v-6ec31336]{flex:1}.main-wrapper .main-header .menu-2step .mobile-top-first-menus[data-v-6ec31336]{color:#333;cursor:pointer;display:block;font-family:"score5";font-size:17px;text-decoration-line:none}.main-wrapper .main-header .menu-2step .mobile-top-first-menus[data-v-6ec31336]:hover{color:#9ad144}.main-wrapper .main-header .menu-2step .selected-top-first-menus[data-v-6ec31336]{color:#9ad144;cursor:pointer;font-family:"score5";font-size:17px;text-decoration-line:none}.main-wrapper .main-header .menu-2step .top-first-menus[data-v-6ec31336]:hover{color:#9ad144}.main-wrapper .main-header .menu-2step .top-second-menus[data-v-6ec31336]{align-items:center;display:flex;flex-direction:column;gap:61px}.main-wrapper .main-header .menu-2step .img-cart[data-v-6ec31336],.main-wrapper .main-header .menu-2step .img-my[data-v-6ec31336]{cursor:pointer;display:none;height:22px;width:22px}.main-wrapper .main-header .menu-2step .img-cart[data-v-6ec31336]{margin-left:0}.main-wrapper .main-header .menu-2step .top-first-menus[data-v-6ec31336]{color:#333;cursor:pointer;font-family:"score5";font-size:17px;text-decoration-line:none}.main-wrapper .main-header .login-saved[data-v-6ec31336]{color:#505050;cursor:pointer;font-size:12px}.main-wrapper .main-header .slider[data-v-6ec31336]{background-color:aqua;position:absolute;transition:all .33s cubic-bezier(.38,.8,.32,1.07);z-index:1}.main-wrapper .main-header .indicator[data-v-6ec31336]{background:#5b1a7c;border-radius:1px;height:4px;margin:0 auto;max-width:100%;position:relative;width:100px}}',""]),A.locals={},e.exports=A},58:function(e,t,n){"use strict";var r=n(360),o={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(n(303),n(25)),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t(r.a,{attrs:{dark:""}},[404===e.error.statusCode?t("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):t("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),t("NuxtLink",{attrs:{to:"/"}},[e._v(" Home page ")])],1)}),[],!1,null,"6ffeedc3",null);t.a=component.exports}},[[253,43,5,44]]]);