class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function() {

                        console.log(`A funcao "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                console.log(`A propriedade "${prop}" foi interceptada`);
                return Reflect.get(target, prop, receiver);       
            },
            set (target, prop, value, receiver) {

                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                console.log(`A propriedade "${prop}" foi alterada. Valor anterior: ${target[prop]}, novo valor: ${value}`);
                return Reflect.set(target, prop, value, receiver);

            }
        })
    }

    static _isFunction (attr) {
        return typeof(attr) == typeof(Function);
    }
}