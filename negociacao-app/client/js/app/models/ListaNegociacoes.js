class ListaNegociacoes {
    
    constructor(/*observer*/) {
        
        this._negociacoes = [];
        // this._observer = observer;
    }
    
    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
        // this._observer(this);
        
    }
    
    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }
    
    esvazia()   {
        
        this._negociacoes = [];
        // this._observer(this);
    }
}