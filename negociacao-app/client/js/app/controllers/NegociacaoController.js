class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // // This way we could use 'observer' to do the data binding traps
        // this._listaNegociacoes = new ListaNegociacoes((model) => {
        //     this._negociacoesView.update(model);
        // });        

        // This way we use 'proxy' to data binding traps
        this._listaNegociacoes = ProxyFactory.create (
            new ListaNegociacoes(), ['adiciona', 'esvazia'], 
            model => this._negociacoesView.update(model)
        );
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));


        this._mensagem = ProxyFactory.create(
            new Mensagem(), ['texto'], 
            model => this._mensagemView.update(model)
        );
        this._mensagemView = new MensagemView($('#mensagemView'));
        // this._mensagemView.update(this._mensagem);

    }
    
    adiciona(event) {
        
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        // this._mensagemView.update(this._mensagem); /* it is done now with the Proxy */ 
        this._limpaFormulario();   
        
        console.log(this._listaNegociacoes);

    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        // this._mensagemView.update(this._mensagem); /* it is done now with the Proxy */ 
    }

    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}