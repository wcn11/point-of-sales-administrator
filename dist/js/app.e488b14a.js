(function(t){function e(e){for(var n,r,i=e[0],c=e[1],u=e[2],l=0,d=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,r=1;r<a.length;r++){var i=a[r];0!==o[i]&&(n=!1)}n&&(s.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},r={app:0},o={app:0},s=[];function i(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"4e5e0002"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={about:1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise((function(e,a){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"ae05b752"}[t]+".css",o=c.p+n,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===o))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var n=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=n,delete r[t],p.parentNode.removeChild(p),a(s)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){r[t]=0})));var n=o[t];if(0!==n)if(n)e.push(n[2]);else{var s=new Promise((function(e,a){n=o[t]=[e,a]}));e.push(n[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(p);var a=o[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}o[t]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var p=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0260":function(t,e,a){"use strict";a("09bf")},"034f":function(t,e,a){"use strict";a("85ec")},"09bf":function(t,e,a){},"3dfd":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("Navigation"),a("div",{staticClass:"container"},[a("router-view")],1)],1)},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light p-4"},[n("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[n("img",{staticClass:"img-fluid",attrs:{src:a("3e12")}})]),t._m(0),n("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[n("ul",{staticClass:"navbar-nav mr-auto w-100"}),n("div",{staticClass:"text-left d-flex"},[n("a",{staticClass:"btn btn-default",attrs:{href:"javascript:void(0)"},on:{click:t.logout}},[t._v(" logout ")])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})])}],i=a("bc3a"),c=a.n(i),u={name:"navigation",methods:{logout:function(){c.a.post("".concat("https://api-pos.beliayam.com/admin","/logout"),{},{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt-admin")),Accept:"application/json","Content-Type":"application/json"}}).then((function(t){console.log(t),t.data.message&&(localStorage.removeItem("jwt-admin",""),window.location.href="/login")}))}}},l=u,d=(a("0260"),a("2877")),p=Object(d["a"])(l,o,s,!1,null,"24bde404",null),f=p.exports,m={name:"App",components:{Navigation:f}},h=m,b=(a("034f"),Object(d["a"])(h,n,r,!1,null,null,null));e["a"]=b.exports},"3e12":function(t,e,a){t.exports=a.p+"img/logo_admin_navigasi.6a7c7dd4.png"},4360:function(t,e,a){"use strict";var n=a("2b0e"),r=a("2f62");n["a"].use(r["a"]),e["a"]=new r["a"].Store({state:{},mutations:{},actions:{},modules:{}})},5527:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e),function(t){a("e260"),a("e6cf"),a("cca6"),a("a79d");var e=a("2b0e"),n=a("3dfd"),r=a("4360"),o=a("a18c"),s=a("bc3a"),i=a.n(s),c=a("7400"),u=a.n(c),l=a("58ca"),d=a("50cf"),p=a("5527"),f=a.n(p),m=a("77ed"),h=a.n(m);e["a"].prototype.$http=i.a,window.$=a("1157"),e["a"].use(u.a),a("4989"),a("ce09"),e["a"].use(l["a"],{refreshOnceOnNavigation:!0}),e["a"].use(d["a"]),e["a"].use(f.a),e["a"].use(h.a),e["a"].config.productionTip=!1,new e["a"]({store:r["a"],router:o["a"],render:function(t){return t(n["a"])}}).$mount("#app")}.call(this,a("1157"))},"85ec":function(t,e,a){},a18c:function(t,e,a){"use strict";a("d3b7"),a("3ca3"),a("ddb0"),a("b0c0");var n=a("2b0e"),r=a("8c4f"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"table-responsive"},[a("div",{staticClass:"row d-flex"},t._l(t.databases,(function(e,n){return a("div",{key:n,staticClass:"col-md-3 card",staticStyle:{width:"18rem"}},[a("a",{staticClass:"text-decoration-none text-dark",attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.getSessionId(e["id"])}}},[a("img",{staticClass:"card-img-top",style:"backgroundColor: #"+e["bgColor"],attrs:{src:e["logoUrl"],alt:"..."}}),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v(t._s(e["alias"]))]),a("small",[t._v("Kadaluarsa: "+t._s(e["expired"]?"Ya":"Tidak"))]),a("p",{staticClass:"card-text"},[t._v("Some quick example text to build on the card title and make up the bulk of the card's content.")]),a("a",{staticClass:"btn btn-primary",attrs:{href:"javascript:void(0)"}},[t._v("Buka Database")])])])])})),0)])])},s=[],i=(a("99af"),a("d81d"),{name:"Home",components:{},data:function(){return{databases:[]}},methods:{getUsers:function(){var t=this;return this.$http.get("".concat("https://api-pos.beliayam.com/admin","/db-lists"),{headers:{Authorization:"Bearer "+localStorage.getItem("jwt-admin")}}).then((function(e){e["data"]["success"]&&(console.log(e["data"]["data"]["s"]),t.databases=e["data"]["data"]["d"])})).catch((function(e){console.log(e.response),t.$alertify.error(e.response["data"]["data"]["d"])}))},getSessionId:function(t){var e=this;return this.$http.post("".concat("https://api-pos.beliayam.com/admin","/set-database-session/").concat(t),{},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt-admin")}}).then((function(t){t["data"]["data"]["s"]&&t["data"]["data"]["d"].map((function(t){e.$alertify.success(t)})),e.$router.push({path:"/database/user-lists"})})).catch((function(t){e.$alertify.error(t.response["data"]["data"]["d"])}))}},filters:{isActive:function(t){return 1===t||!0===t?"Aktif":"Non-Aktif"}},created:function(){this.getUsers()}}),c=i,u=a("2877"),l=Object(u["a"])(c,o,s,!1,null,null,null),d=l.exports;n["a"].use(r["a"]);var p=[{path:"/",name:"Home",component:d,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:function(){return a.e("about").then(a.bind(null,"bd01"))}},{path:"/db/:id",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))},meta:{requiresAuth:!0}},{path:"/database/user-lists",name:"databaseUser",component:function(){return a.e("about").then(a.bind(null,"dc02"))},meta:{requiresAuth:!0}},{path:"/user/add",name:"UserAdd",component:function(){return a.e("about").then(a.bind(null,"12dd"))},meta:{requiresAuth:!0}},{path:"/user/edit/:id",name:"UserUpdate",component:function(){return a.e("about").then(a.bind(null,"a884"))},meta:{requiresAuth:!0}}],f=new r["a"]({mode:"history",routes:p});f.beforeEach((function(t,e,a){if("notFound"===t.name)return a();t.meta.requiresAuth?localStorage.getItem("jwt-admin")?a():a({path:"/login",params:{nextUrl:t.fullPath}}):localStorage.getItem("jwt-admin")?a({path:"/",params:{nextUrl:t.fullPath}}):a()}));e["a"]=f},ce09:function(t,e,a){}});
//# sourceMappingURL=app.e488b14a.js.map