import SortableList from "../../components/sortableList";
import data from "./data";

export default class Page {
    subElements = {};
    components = {};


    constructor() {
        this.data = data
    }

    render() {

        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements();
        this.initComponents();
        this.renderComponents();

        return this.element;
    }


    initComponents() {

        const sortableListFirst = new SortableList({
            items: this.data.map(item => {
                const element = document.createElement('li');

                element.innerHTML = `
                <span data-grab-handle>${item.text}</span>
                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>
              `;

              return element;
            })
        })

        const sortableListSecond = new SortableList({
            items: this.data.map(item => {
                const element = document.createElement('li');

                element.innerHTML = `
                <span data-grab-handle>${item.text}</span>
                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>
              `;

              return element;
            })
        })

        const sortableListThird = new SortableList({
            items: this.data.map(item => {
                const element = document.createElement('li');

                element.innerHTML = `
                <span data-grab-handle>${item.text}</span>
                <span data-delete-handle><img src="./assets/icons/handleDelete.svg"></span>
              `;

              return element;
            })
        })

        this.components = {
            sortableListFirst,
            sortableListSecond,
            sortableListThird,
        }
    }

    renderComponents() {
        Object.keys(this.components).forEach(component => {
            console.log(component);
            const root = this.subElements[component];
            const { element } = this.components[component];
            root.append(element);
        })
    }



    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]')
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        return this.subElements;
    }

    removeEventListeners() {
        this.removeEventListeners();
    }

    remove() {
        if (this.element) {
            this.element.remove()
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;


        for (const component of Object.values(this.components)) {
            component.destroy();
        }
    }


    getTemplate() {
        return `
        <div class="trello__tables">
        <div class="trello__table" data-element="sortableListFirst">
        </div>
        <div class="trello__table" data-element="sortableListSecond">
        </div>
        <div class="trello__table" data-element="sortableListThird">
        </div>
        </div>
        `
    }
}