
    // example code to intercept a class` getters and setters using proxies 
    // this will be used to create a data binding

    // First instanciate a Class using the native class Proxy and passing the traps
    let lista = new Proxy(new ListaNegociacoes(), {

        // this method intercept attributes when they are accessed 
        // the params are the original class object, the attribute (prop) and the Proxy
        get (target, prop, receiver) {

            // This intercep the interception to test if the call is from a function already known
            // in this case we are intercepting the functions "adiciona" and "esvazia" of the class "ListaNegociacoes" object
            if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                return function() {

                    console.log(`a propriedade "${prop}" foi interceptada`);
                    Reflect.apply(target[prop], target, arguments);
                }

            }

            // and if the call is a regular GET to a object`s property just execute it

            console.log(`a propriedade "${prop}" foi interceptada`);
            return Reflect.get(target, prop, receiver);

        },
        // and here we intercept the attribution of values to the object properties, aka setters 
        // the params are the same from the get plus the new value
        set: function(target, prop, value, receiver) {
            console.log(`valor anterior: ${target[prop]} novo valor: ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
    });

    console.log(lista.negociacoes);

    lista.adiciona(new Negociacao(new Date(), 1, 10));
