export default class SortableList {

  subElements = {};

  onPointerMove = (event) => {
    const { clientX, clientY } = event;
    event.preventDefault();
    // event перемещается по всему документу, следовательно и event target будет постоянно разный

    this.moveDraggingAt(clientX, clientY);
    // здесь реализовано в оснвном перемещение placeholder

    const prevElem = this.placeholderElement.previousElementSibling;
    const nextElem = this.placeholderElement.nextElementSibling;
    const { columnList } = this.subElements;

    const { firstElementChild, lastElementChild } = columnList;
    const { top: firstElementTop } = firstElementChild.getBoundingClientRect();
    const { bottom, right, left } = columnList.getBoundingClientRect();



    if (clientY < firstElementTop) {
      return firstElementChild.before(this.placeholderElement);
    }

    if (clientY > bottom) {
      return lastElementChild.after(this.placeholderElement);
    }

    if (clientX > right) {

      this.checkDragElement(event, 'none')
      let elementBelow = document.elementFromPoint(clientX, clientY);
      this.checkDragElement(event, 'block')
      

      if (elementBelow && elementBelow.classList.contains('sortable-list__item')) {
        return this.appendPlaceHolder(clientY, elementBelow);
      } else {
        return;
      }
    }

    if (clientX < left) {
      
      this.checkDragElement(event, 'none')
      let elementBelow = document.elementFromPoint(clientX, clientY);
      this.checkDragElement(event, 'block')

      if (elementBelow && elementBelow.classList.contains('sortable-list__item')) {
        return this.appendPlaceHolder(clientY, elementBelow);
      } else {
        return;
      }
    }

    if (prevElem) {
      const { top, height } = prevElem.getBoundingClientRect();
      const middlePrevElem = top + height / 2;

      if (clientY < middlePrevElem) {
        return prevElem.before(this.placeholderElement);
      }
    }

    if (nextElem) {
      const { top, height } = nextElem.getBoundingClientRect();
      const middleNextElem = top + height / 2;

      if (clientY > middleNextElem) {
        return nextElem.after(this.placeholderElement);
      }
    }

    this.scrollIfCloseToWindowEdge(clientY);
  };

  checkDragElement(event, style) {
    
    if (event.target.closest('.sortable-list__item_dragging')) {
      if (!event.target.classList.contains('sortable-list__item_dragging') && event.target.parentNode.classList.contains('sortable-list__item_dragging')) {
       event.target.parentNode.style.display = `${style}`;
      } else {
       event.target.style.display = `${style}`;
      }
    }
  }

  appendPlaceHolder(clientY, elementBelow) {
    const { top, height } = elementBelow.getBoundingClientRect();
    const middleElem = top + height / 2;
    if (clientY < middleElem) {
      return elementBelow.before(this.placeholderElement);
    }

    if (clientY > middleElem) {
      return elementBelow.after(this.placeholderElement);
    }

  }

  onPointerUp = () => {
    this.dragStop();
  };

  controlForm = (event) => {
    if (event.target.closest(`[data-element=openForm]`)) {
      event.target.classList.add('form-hidden');
      event.target.nextElementSibling.classList.remove('form-hidden');
    }

    if (event.target.closest(`[data-element="handleDelete"]`)) {
      this.hideForm();
    }
  }


  addCard = (event) => {
    event.preventDefault();

    const { openForm, productForm } = this.subElements;

    const value = event.target.title.value;

    this.addItem(this.getCard(value));
    openForm.classList.remove('form-hidden');
    productForm.classList.add('form-hidden');

  }




  constructor({ items = [] } = {}) {
    this.items = items;

    this.render();
  }

  render() {

    this.element = document.createElement('div');
    this.element.innerHTML = this.getTemplate();
    this.element = this.element.firstElementChild;

    this.subElements = this.getSubElements();

    this.initEventListeners();
  }


  getTemplate() {
    return `<div class='table__sortable'>
     ${this.getSortList()}
     ${this.addInput()}
    </div>`
  }

  getSortList() {
    this.wrapper = document.createElement('ul');
    this.wrapper.className = 'sortable-list';
    this.wrapper.dataset.element = 'columnList'
    this.addItems();
    return this.wrapper.outerHTML;
  }



  hideForm() {
    const { openForm, productForm } = this.subElements;
    openForm.classList.remove('form-hidden');
    productForm.classList.add('form-hidden');

  }


  getCard(value) {
    const element = document.createElement('li');

    element.innerHTML = `
    <span>${value}</span>
    <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>
  `;

    return element;
  }


  addItems() {
    // item is a DOM element
    for (const item of this.items) {
      item.classList.add('sortable-list__item');
      item.dataset.grabHandle = 'grab';
    }

    this.wrapper.append(...this.items);
  }

  addInput() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getFormGroup();

    return wrapper.firstElementChild.innerHTML;
  }

  addItem(item) {

    const { controlPanel, columnList } = this.subElements;

    item.classList.add('sortable-list__item');
    item.dataset.grabHandle = 'grab';
    columnList.append(item);
  }

  getFormGroup() {
    return `<div class="sortable__add" data-element="controlPanel">
      <span class="sortable__open" data-element="openForm">+ Add another Card</span>
      <form class="form-group form-hidden" data-element="productForm">
    <label for="name" class="form-group__label">Описание задачи</label>
    <div class="form-group__input">
        <input class="form-group__control" name="title" type="text" id="name" required placeholder="desc task">
    </div>
    <div class="form-group__buttons">
        <button  name="save" class="button button_primary">
            add Card
         </button>
         <div class="form-group__icon">
              <img src="./assets/icons/handleDelete.svg" class="form__icon" data-element="handleDelete" alt="">
         </div>
    </div>
</form>
    </div>`
  }

  initEventListeners() {

    const { productForm, columnList, openForm } = this.subElements;

    productForm.addEventListener('submit', this.addCard)


    columnList.addEventListener('pointerdown', event => {
      this.onPointerDown(event);
    });

    this.element.addEventListener('pointerdown', this.controlForm)
  }

  onPointerDown(event) {
    const element = event.target.closest('.sortable-list__item');

    if (element) {

      if (event.target.closest('[data-delete-handle]')) {
        event.preventDefault();

        element.remove();
      } else if (event.target.closest('[data-grab-handle]')) {
        event.preventDefault();
        // предотвратить запуск выделения (действие браузера)

        this.dragStart(element, event);
      }
    }

  }

  createPlaceholderElement(width, height) {
    const element = document.createElement('li');

    element.className = 'sortable-list__placeholder';
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;

    return element;
  }

  dragStart(element, { clientX, clientY }) {

    const { columnList } = this.subElements;

    this.draggingElem = element;
    // this.elementInitialIndex = [...this.element.children].indexOf(element);
    this.elementInitialIndex = [columnList.children].indexOf(element);


    const { x, y } = element.getBoundingClientRect();

    const { offsetWidth, offsetHeight } = element;

    this.pointerShift = {
      x: clientX - x,
      y: clientY - y
    };

    // кординаты для выравнивания взятого элемента на уровне мышки

    this.draggingElem.style.width = `${offsetWidth}px`;
    this.draggingElem.style.height = `${offsetHeight}px`;
    this.draggingElem.classList.add('sortable-list__item_dragging');
    // создает пустой placeholder где был элемент
    this.placeholderElement = this.createPlaceholderElement(offsetWidth, offsetHeight);

    this.draggingElem.after(this.placeholderElement);
    // move to the end, to be over other list elements
    // this.element.append(this.draggingElem);
    columnList.append(this.draggingElem);
    this.moveDraggingAt(clientX, clientY);
    this.addDocumentEventListeners();
  }


  moveDraggingAt(clientX, clientY) {
    this.draggingElem.style.left = `${clientX - this.pointerShift.x}px`;
    this.draggingElem.style.top = `${clientY - this.pointerShift.y}px`;
  }

  addDocumentEventListeners() {
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  removeDocumentEventListeners() {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }


  scrollIfCloseToWindowEdge(clientY) {
    const scrollingValue = 10;
    const threshold = 20;

    if (clientY < threshold) {
      window.scrollBy(0, -scrollingValue);
    } else if (clientY > document.documentElement.clientHeight - threshold) {
      window.scrollBy(0, scrollingValue);
    }
  }

  dragStop() {

    this.draggingElem.style.cssText = '';
    this.draggingElem.classList.remove('sortable-list__item_dragging');
    this.placeholderElement.replaceWith(this.draggingElem);
    this.draggingElem = null;

    this.removeDocumentEventListeners();


  }


  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]')
    for (const item of elements) {
      this.subElements[item.dataset.element] = item;
    }
    return this.subElements;
  }


  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.removeDocumentEventListeners();
    this.element = null;
  }
}
