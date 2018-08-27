!function(e){function t(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,n){"use strict";t.a={props:{elementId:String,inputClass:{type:String,default:"tags-input-default-class"},existingTags:{type:Object,default:function(){return{}}},value:{type:[Array,String],default:function(){return[]}},typeahead:{type:Boolean,default:!1},typeaheadActivationThreshold:{type:Number,default:1},typeaheadMaxResults:{type:Number,default:0},placeholder:{type:String,default:"Add a tag"},limit:{type:Number,default:0},onlyExistingTags:{type:Boolean,default:!1},deleteOnBackspace:{type:Boolean,default:!0},allowDuplicates:{type:Boolean,default:!1},validate:{type:Function,default:function(){return!0}}},data:function(){return{badgeId:0,tagBadges:[],tags:[],input:"",oldInput:"",hiddenInput:"",searchResults:[],searchSelection:0}},created:function(){this.tagsFromValue()},watch:{tags:function(){this.hiddenInput=this.tags.join(","),this.$emit("input",this.tags)},value:function(){this.tagsFromValue()}},methods:{escapeRegExp:function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},tagFromInput:function(){if(this.searchResults.length&&this.searchSelection>=0)this.tagFromSearch(this.searchResults[this.searchSelection]),this.input="";else{var e=this.input.trim();if(!this.onlyExistingTags&&e.length&&this.validate(e)){this.input="";var t=this.makeSlug(e),n=this.existingTags[t];t=n?t:e,e=n||e,this.addTag(t,e)}}},tagFromSearchOnClick:function(e){this.tagFromSearch(e),this.$refs.taginput.blur()},tagFromSearch:function(e){this.searchResults=[],this.input="",this.oldInput="",this.addTag(e.slug,e.text)},makeSlug:function(e){return e.toLowerCase().replace(/\s/g,"-")},addTag:function(e,t){if(this.limit>0&&this.tags.length>=this.limit)return!1;this.tagSelected(e)||(this.tagBadges.push(t.replace(/\s/g,"&nbsp;")),this.tags.push(e))},removeLastTag:function(){!this.input.length&&this.deleteOnBackspace&&this.removeTag(this.tags.length-1)},removeTag:function(e){this.tags.splice(e,1),this.tagBadges.splice(e,1)},searchTag:function(){if(!0===this.typeahead&&(this.oldInput!=this.input||!this.searchResults.length&&0==this.typeaheadActivationThreshold)){this.searchResults=[],this.searchSelection=0;var e=this.input.trim();if(e.length&&e.length>=this.typeaheadActivationThreshold||0==this.typeaheadActivationThreshold){for(var t in this.existingTags){this.existingTags[t].toLowerCase().search(this.escapeRegExp(e.toLowerCase()))>-1&&!this.tagSelected(t)&&this.searchResults.push({slug:t,text:this.existingTags[t]})}this.searchResults.sort(function(e,t){return e.text<t.text?-1:e.text>t.text?1:0}),this.typeaheadMaxResults>0&&(this.searchResults=this.searchResults.slice(0,this.typeaheadMaxResults))}this.oldInput=this.input}},onFocus:function(){this.searchTag()},hideTypeahead:function(){var e=this;this.input.length||this.$nextTick(function(){e.ignoreSearchResults()})},nextSearchResult:function(){this.searchSelection+1<=this.searchResults.length-1&&this.searchSelection++},prevSearchResult:function(){this.searchSelection>0&&this.searchSelection--},ignoreSearchResults:function(){this.searchResults=[],this.searchSelection=0},clearTags:function(){this.tags.splice(0,this.tags.length),this.tagBadges.splice(0,this.tagBadges.length)},tagsFromValue:function(){if(this.value&&this.value.length){var e=Array.isArray(this.value)?this.value:this.value.split(",");if(this.tags==e)return;this.clearTags();var t=!0,n=!1,s=void 0;try{for(var i,a=e[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var r=i.value,o=this.existingTags[r],u=o||r;this.addTag(r,u)}}catch(e){n=!0,s=e}finally{try{!t&&a.return&&a.return()}finally{if(n)throw s}}}else{if(0==this.tags.length)return;this.clearTags()}},tagSelected:function(e){var t=this;if(this.allowDuplicates)return!1;if(!e)return!1;var n=this.makeSlug(e);return!!this.tags.find(function(e){return n==t.makeSlug(e)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(2);window.VoerroTagsInput=s.a,t.default=s.a},function(e,t,n){"use strict";function s(e){n(3)}var i=n(0),a=n(9),r=n(8),o=s,u=r(i.a,a.a,!1,o,null,null);t.a=u.exports},function(e,t,n){var s=n(4);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n(6)("cba96d62",s,!0,{})},function(e,t,n){t=e.exports=n(5)(!1),t.push([e.i,".tags-input{display:flex;flex-wrap:wrap;align-items:center}.tags-input input{flex:1;background:transparent;border:none}.tags-input span{margin-right:.3rem;margin-bottom:.2rem}.typeahead>span{cursor:pointer;margin-right:.3rem}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var a=s(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([a]).join("\n")}return[n].join("\n")}function s(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var s=n(t,e);return t[2]?"@media "+t[2]+"{"+s+"}":s}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(s[a]=!0)}for(i=0;i<e.length;i++){var r=e[i];"number"==typeof r[0]&&s[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),t.push(r))}},t}},function(e,t,n){function s(e){for(var t=0;t<e.length;t++){var n=e[t],s=c[n.id];if(s){s.refs++;for(var i=0;i<s.parts.length;i++)s.parts[i](n.parts[i]);for(;i<n.parts.length;i++)s.parts.push(a(n.parts[i]));s.parts.length>n.parts.length&&(s.parts.length=n.parts.length)}else{for(var r=[],i=0;i<n.parts.length;i++)r.push(a(n.parts[i]));c[n.id]={id:n.id,refs:1,parts:r}}}}function i(){var e=document.createElement("style");return e.type="text/css",h.appendChild(e),e}function a(e){var t,n,s=document.querySelector("style["+m+'~="'+e.id+'"]');if(s){if(f)return g;s.parentNode.removeChild(s)}if(y){var a=p++;s=d||(d=i()),t=r.bind(null,s,a,!1),n=r.bind(null,s,a,!0)}else s=i(),t=o.bind(null,s),n=function(){s.parentNode.removeChild(s)};return t(e),function(s){if(s){if(s.css===e.css&&s.media===e.media&&s.sourceMap===e.sourceMap)return;t(e=s)}else n()}}function r(e,t,n,s){var i=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=x(t,i);else{var a=document.createTextNode(i),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(a,r[t]):e.appendChild(a)}}function o(e,t){var n=t.css,s=t.media,i=t.sourceMap;if(s&&e.setAttribute("media",s),v.ssrId&&e.setAttribute(m,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=n(7),c={},h=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,f=!1,g=function(){},v=null,m="data-vue-ssr-id",y="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){f=n,v=i||{};var a=l(e,t);return s(a),function(t){for(var n=[],i=0;i<a.length;i++){var r=a[i],o=c[r.id];o.refs--,n.push(o)}t?(a=l(e,t),s(a)):a=[];for(var i=0;i<n.length;i++){var o=n[i];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete c[o.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],s={},i=0;i<t.length;i++){var a=t[i],r=a[0],o=a[1],u=a[2],l=a[3],c={id:e+":"+i,css:o,media:u,sourceMap:l};s[r]?s[r].parts.push(c):n.push(s[r]={id:r,parts:[c]})}return n}},function(e,t){e.exports=function(e,t,n,s,i,a){var r,o=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(r=e,o=e.default);var l="function"==typeof o?o.options:o;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),i&&(l._scopeId=i);var c;if(a?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},l._ssrRegister=c):s&&(c=s),c){var h=l.functional,d=h?l.render:l.beforeCreate;h?(l._injectStyles=c,l.render=function(e,t){return c.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,c):[c]}return{esModule:r,exports:o,options:l}}},function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{class:e.inputClass+" tags-input"},[e._l(e.tagBadges,function(t,s){return n("span",{key:s,staticClass:"badge badge-pill badge-light"},[n("span",{domProps:{innerHTML:e._s(t)}}),e._v(" "),n("i",{staticClass:"tags-input-remove",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.removeTag(s)}}})])}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],ref:"taginput",attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.input},on:{keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;t.preventDefault(),e.tagFromInput(t)},function(t){if(!("button"in t)&&8!==t.keyCode)return null;e.removeLastTag(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key))return null;e.nextSearchResult(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key))return null;e.prevSearchResult(t)}],keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key))return null;e.ignoreSearchResults(t)},e.searchTag],focus:e.onFocus,blur:e.hideTypeahead,value:e.tags,input:function(t){t.target.composing||(e.input=t.target.value)}}}),e._v(" "),e.elementId?n("input",{directives:[{name:"model",rawName:"v-model",value:e.hiddenInput,expression:"hiddenInput"}],attrs:{type:"hidden",name:e.elementId,id:e.elementId},domProps:{value:e.hiddenInput},on:{input:function(t){t.target.composing||(e.hiddenInput=t.target.value)}}}):e._e()],2),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:e.searchResults.length,expression:"searchResults.length"}],staticClass:"typeahead"},e._l(e.searchResults,function(t,s){return n("span",{key:s,staticClass:"badge",class:{"badge-primary":s==e.searchSelection,"badge-dark":s!=e.searchSelection},domProps:{textContent:e._s(t.text)},on:{mousedown:function(n){n.preventDefault(),e.tagFromSearchOnClick(t)}}})}))])},i=[],a={render:s,staticRenderFns:i};t.a=a}]);
//# sourceMappingURL=voerro-vue-tagsinput.js.map