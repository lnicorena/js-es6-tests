class MensagemView extends View{

    constructor(elemento) {

        // call parent constructor when method is overwritten
        super(elemento);

        // then do some other things ...
    }
    template(model) {
      return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }

  }  