"use strict";(self.webpackChunkDnD_list=self.webpackChunkDnD_list||[]).push([[835],{857:(e,t,n)=>{function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,{default:()=>o});class i{checkDragElement(e,t){e.target.closest(".sortable-list__item_dragging")&&(!e.target.classList.contains("sortable-list__item_dragging")&&e.target.parentNode.classList.contains("sortable-list__item_dragging")?e.target.parentNode.style.display=""+t:e.target.style.display=""+t)}appendPlaceHolder(e,t){const{top:n,height:s}=t.getBoundingClientRect(),i=n+s/2;return e<i?t.before(this.placeholderElement):e>i?t.after(this.placeholderElement):void 0}constructor(){let{items:e=[]}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,"subElements",{}),s(this,"onPointerMove",e=>{const{clientX:t,clientY:n}=e;e.preventDefault(),this.moveDraggingAt(t,n);const s=this.placeholderElement.previousElementSibling,i=this.placeholderElement.nextElementSibling,{columnList:l}=this.subElements,{firstElementChild:r,lastElementChild:o}=l,{top:a}=r.getBoundingClientRect(),{bottom:d,right:m,left:c}=l.getBoundingClientRect();if(n<a)return r.before(this.placeholderElement);if(n>d)return o.after(this.placeholderElement);if(t>m){this.checkDragElement(e,"none");let s=document.elementFromPoint(t,n);return this.checkDragElement(e,"block"),s&&s.classList.contains("sortable-list__item")?this.appendPlaceHolder(n,s):void 0}if(t<c){this.checkDragElement(e,"none");let s=document.elementFromPoint(t,n);return this.checkDragElement(e,"block"),s&&s.classList.contains("sortable-list__item")?this.appendPlaceHolder(n,s):void 0}if(s){const{top:e,height:t}=s.getBoundingClientRect();if(n<e+t/2)return s.before(this.placeholderElement)}if(i){const{top:e,height:t}=i.getBoundingClientRect();if(n>e+t/2)return i.after(this.placeholderElement)}this.scrollIfCloseToWindowEdge(n)}),s(this,"onPointerUp",()=>{this.dragStop()}),s(this,"controlForm",e=>{e.target.closest("[data-element=openForm]")&&(e.target.classList.add("form-hidden"),e.target.nextElementSibling.classList.remove("form-hidden")),e.target.closest('[data-element="handleDelete"]')&&this.hideForm()}),s(this,"addCard",e=>{e.preventDefault();const{openForm:t,productForm:n}=this.subElements,s=e.target.title.value;this.addItem(this.getCard(s)),t.classList.remove("form-hidden"),n.classList.add("form-hidden")}),this.items=e,this.render()}render(){this.element=document.createElement("div"),this.element.innerHTML=this.getTemplate(),this.element=this.element.firstElementChild,this.subElements=this.getSubElements(),this.initEventListeners()}getTemplate(){return`<div class='table__sortable'>\n     ${this.getSortList()}\n     ${this.addInput()}\n    </div>`}getSortList(){return this.wrapper=document.createElement("ul"),this.wrapper.className="sortable-list",this.wrapper.dataset.element="columnList",this.addItems(),this.wrapper.outerHTML}hideForm(){const{openForm:e,productForm:t}=this.subElements;e.classList.remove("form-hidden"),t.classList.add("form-hidden")}getCard(e){const t=document.createElement("li");return t.innerHTML=`\n    <span>${e}</span>\n    <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>\n  `,t}addItems(){for(const e of this.items)e.classList.add("sortable-list__item"),e.dataset.grabHandle="grab";this.wrapper.append(...this.items)}addInput(){const e=document.createElement("div");return e.innerHTML=this.getFormGroup(),e.firstElementChild.innerHTML}addItem(e){const{controlPanel:t,columnList:n}=this.subElements;e.classList.add("sortable-list__item"),e.dataset.grabHandle="grab",n.append(e)}getFormGroup(){return'<div class="sortable__add" data-element="controlPanel">\n      <span class="sortable__open" data-element="openForm">+ Add another Card</span>\n      <form class="form-group form-hidden" data-element="productForm">\n    <label for="name" class="form-group__label">Описание задачи</label>\n    <div class="form-group__input">\n        <input class="form-group__control" name="title" type="text" id="name" required placeholder="desc task">\n    </div>\n    <div class="form-group__buttons">\n        <button  name="save" class="button button_primary">\n            add Card\n         </button>\n         <div class="form-group__icon">\n              <img src="./assets/icons/handleDelete.svg" class="form__icon" data-element="handleDelete" alt="">\n         </div>\n    </div>\n</form>\n    </div>'}initEventListeners(){const{productForm:e,columnList:t,openForm:n}=this.subElements;e.addEventListener("submit",this.addCard),t.addEventListener("pointerdown",e=>{this.onPointerDown(e)}),this.element.addEventListener("pointerdown",this.controlForm)}onPointerDown(e){const t=e.target.closest(".sortable-list__item");t&&(e.target.closest("[data-delete-handle]")?(e.preventDefault(),t.remove()):e.target.closest("[data-grab-handle]")&&(e.preventDefault(),this.dragStart(t,e)))}createPlaceholderElement(e,t){const n=document.createElement("li");return n.className="sortable-list__placeholder",n.style.width=e+"px",n.style.height=t+"px",n}dragStart(e,t){let{clientX:n,clientY:s}=t;const{columnList:i}=this.subElements;this.draggingElem=e,this.elementInitialIndex=[i.children].indexOf(e);const{x:l,y:r}=e.getBoundingClientRect(),{offsetWidth:o,offsetHeight:a}=e;this.pointerShift={x:n-l,y:s-r},this.draggingElem.style.width=o+"px",this.draggingElem.style.height=a+"px",this.draggingElem.classList.add("sortable-list__item_dragging"),this.placeholderElement=this.createPlaceholderElement(o,a),this.draggingElem.after(this.placeholderElement),i.append(this.draggingElem),this.moveDraggingAt(n,s),this.addDocumentEventListeners()}moveDraggingAt(e,t){this.draggingElem.style.left=e-this.pointerShift.x+"px",this.draggingElem.style.top=t-this.pointerShift.y+"px"}addDocumentEventListeners(){document.addEventListener("pointermove",this.onPointerMove),document.addEventListener("pointerup",this.onPointerUp)}removeDocumentEventListeners(){document.removeEventListener("pointermove",this.onPointerMove),document.removeEventListener("pointerup",this.onPointerUp)}scrollIfCloseToWindowEdge(e){e<20?window.scrollBy(0,-10):e>document.documentElement.clientHeight-20&&window.scrollBy(0,10)}dragStop(){this.draggingElem.style.cssText="",this.draggingElem.classList.remove("sortable-list__item_dragging"),this.placeholderElement.replaceWith(this.draggingElem),this.draggingElem=null,this.removeDocumentEventListeners()}getSubElements(){const e=this.element.querySelectorAll("[data-element]");for(const t of e)this.subElements[t.dataset.element]=t;return this.subElements}remove(){this.element&&this.element.remove()}destroy(){this.remove(),this.removeDocumentEventListeners(),this.element=null}}const l=[{text:"hehe",count:1},{text:"not hehe",count:2},{text:"elden ring",count:3},{text:"javasript",count:4},{text:"test",count:5},{text:"warhammer",count:6}];function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class o{constructor(){r(this,"subElements",{}),r(this,"components",{}),this.data=l}render(){const e=document.createElement("div");return e.innerHTML=this.getTemplate(),this.element=e.firstElementChild,this.subElements=this.getSubElements(),this.initComponents(),this.renderComponents(),this.element}initComponents(){const e=new i({items:this.data.map(e=>{const t=document.createElement("li");return t.innerHTML=`\n                <span>${e.text}</span>\n                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>\n              `,t})}),t=new i({items:this.data.map(e=>{const t=document.createElement("li");return t.innerHTML=`\n                <span>${e.text}</span>\n                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>\n              `,t})}),n=new i({items:this.data.map(e=>{const t=document.createElement("li");return t.innerHTML=`\n                <span>${e.text}</span>\n                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>\n              `,t})});this.components={sortableListFirst:e,sortableListSecond:t,sortableListThird:n}}renderComponents(){Object.keys(this.components).forEach(e=>{const t=this.subElements[e],{element:n}=this.components[e];t.append(n)})}getSubElements(){const e=this.element.querySelectorAll("[data-element]");for(const t of e)this.subElements[t.dataset.element]=t;return this.subElements}removeEventListeners(){this.removeEventListeners()}remove(){this.element&&this.element.remove()}destroy(){this.remove(),this.element=null,this.subElements=null;for(const e of Object.values(this.components))e.destroy()}getTemplate(){return'\n        <div class="trello__tables">\n        <div class="trello__table" data-element="sortableListFirst">\n        </div>\n        <div class="trello__table" data-element="sortableListSecond">\n        </div>\n        <div class="trello__table" data-element="sortableListThird">\n        </div>\n        </div>\n        '}}}}]);
//# sourceMappingURL=trello-index-js-835.js.map