export default class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property, delay = 0) {
    this._TIME_OFFSET_LETTER = 20;
    this._TIME_OFFSET_WORD = 100;

    this.elementSelector = elementSelector;
    this.timer = timer;
    this.classForActivate = classForActivate;
    this.property = property;

    if (typeof this.elementSelector === `string`) {
      this.element = document.querySelector(this.elementSelector);
    } else {
      this.element = this.elementSelector;
    }

    this.timeOffset = 0;
    this.delay = delay;

    this.prepareText();
  }


  createElement(letter) {
    const span = document.createElement(`span`);

    span.textContent = letter;
    span.style.transition = this.getTransition();

    this.timeOffset += 20;

    return span;
  }


  getTransition() {
    return `${this.property} ${this.timer}ms ease ${this.delay + this.timeOffset}ms`;
  }


  prepareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(/[\s]+/);

    const {length} = text;

    const content = text.reduce((fragmentParent, word, index) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createElement(letter, index));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      // Add Space text node:
      if (index < length - 1) {
        fragmentParent.appendChild(document.createTextNode(` `));
      }

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }


  // clearStyle() {
  //   const spans = [...this.element.querySelectorAll(`.slogan__word span`)];
  //   spans.forEach((span) => span.removeAttribute(`style`));
  // }


  // addStyle(delta) {
  //   this.timeOffset = 0;
  //   delta = (typeof delta !== `number`) ? this.timeOffsetDelta : delta;

  //   const words = [...this.element.querySelectorAll(`.slogan__word`)];

  //   words.forEach((word) => {
  //     [...word.querySelectorAll(`span`)].forEach((span) => {
  //       span.style.transition = this.getTransition();
  //       this.timeOffset += delta;
  //     });
  //   });
  // }


  runAnimation() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(this.classForActivate);
  }

  destroyAnimation() {
    this.element.classList.remove(this.classForActivate);
  }
}
