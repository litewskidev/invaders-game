import { templates } from '../../settings.js';

class Instructions {
  constructor(element) {
    const thisInstructions = this;

    thisInstructions.element = element;
    thisInstructions.render();
  }

  render() {
    const thisInstructions = this;

    const generatedHTML = templates.instructionsWidget();
    thisInstructions.dom = {};
    thisInstructions.dom.wrapper = thisInstructions.element;
    thisInstructions.element.innerHTML = generatedHTML;
  }
}

export default Instructions;
