class View {

    constructor(elemento) {
          this._elemento = elemento;
    }
  
    template(model) {
      // This is a way to force child class to implement this method
      throw new Error (`Method "_template" must be implemented in ${this.constructor.name} class`);
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
  }  