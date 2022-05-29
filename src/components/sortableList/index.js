export default class SortableList {

  subElements = {};

  onPointerMove = ({ clientX, clientY }) => {
    this.moveDraggingAt(clientX, clientY);
    // здесь реализовано в оснвном перемещение placeholder

    // moveDraggingAt(clientX, clientY) {
    //   this.draggingElem.style.left = `${clientX - this.pointerShift.x}px`;
    //   this.draggingElem.style.top = `${clientY - this.pointerShift.y}px`;
    // }


    const prevElem = this.placeholderElement.previousElementSibling;
    const nextElem = this.placeholderElement.nextElementSibling;



    const { firstElementChild, lastElementChild } = this.element;
    const { top: firstElementTop } = firstElementChild.getBoundingClientRect();
    const { bottom } = this.element.getBoundingClientRect();

    if (clientY < firstElementTop) {
      return firstElementChild.before(this.placeholderElement);
    }

    if (clientY > bottom) {
      return lastElementChild.after(this.placeholderElement);
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

  onPointerUp = () => {
    this.dragStop();
  };


  addCard = (event) => {
    event.preventDefault();
    
    const { openForm, productForm} = this.subElements;

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
    this.element = document.createElement('ul');
    this.element.className = 'sortable-list';
    this.element
    this.addItems();
    this.subElements = this.getSubElements()

    this.initEventListeners();

  }


  hideForm() {
    const { openForm, productForm} = this.subElements;
    openForm.classList.remove('form-hidden');
    productForm.classList.add('form-hidden');

  }


  getCard(value) {
    const element = document.createElement('li');

    element.innerHTML = `
    <span data-grab-handle>${value}</span>
    <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>
  `;

  return element.firstElementChild;
  }


  addItems() {
    // item is a DOM element
    for (const item of this.items) {
      item.classList.add('sortable-list__item');
    }

    this.element.append(...this.items);
    this.addInput();
  }

  addInput() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getFormGroup();

    this.element.append(wrapper.firstElementChild);
  }

  addItem(item) {

    const { controlPanel } = this.subElements;

    item.classList.add('sortable-list__item');
    controlPanel.before(item);
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

    const { productForm } = this.subElements;

    productForm.addEventListener('submit', this.addCard)


    this.element.addEventListener('pointerdown', event => {
      this.onPointerDown(event);
    });
  }

  onPointerDown(event) {
    const element = event.target.closest('.sortable-list__item');

    if (element) {
      if (event.target.closest('[data-grab-handle]')) {
        event.preventDefault();
        // предотвратить запуск выделения (действие браузера)

        this.dragStart(element, event);
      }

      if (event.target.closest('[data-delete-handle]')) {
        event.preventDefault();

        element.remove();
      }
    }

    if (event.target.closest(`[data-element=openForm]`)) {
      event.target.classList.add('form-hidden');
      event.target.nextElementSibling.classList.remove('form-hidden');
    }

    if (event.target.closest(`[data-element="handleDelete"]`)) {
      this.hideForm();
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

    this.draggingElem = element;
    this.elementInitialIndex = [...this.element.children].indexOf(element);

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
    this.element.append(this.draggingElem);
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
