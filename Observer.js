let Derp = (function() {
    class Derp {}

    // customSetter optional
    Derp.set = function(object, property, value, customSetter) {
        if (object.hasOwnProperty(property) && !customSetter) {
            object[property] = value;
            return value;
        }

        let prop = value;
        Object.defineProperty(object, property, {
            configurable: true,
            get: function() {
                return prop;
            },
            set: customSetter
                ? function(value) {
                      customSetter(prop, value);
                  }
                : function(value) {
                      prop = value;
                  }
        });

        return value;
    };

    Derp.watch = function(object, property) {
        let observer = new Observer();
        if (property !== undefined && property !== null) {
            // Watch only one property
            Derp.set(object, property, object[property], function(prop, value) {
                prop = value;
                observer.notify();
            });
        } else {
            for(let key of Object.keys(object)) {
                Derp.set(object, key, object[key], function(prop, value) {
                    prop = value;
                    observer.notify();
                }
            }
        }
    };

    class Observer {
        constructor() {
            this._id = IDAllocator.allocate();
        }

        notify() {
            console.log(`Observer ${this._id} notified`);
        }
    }

    class IDAllocator {
        static allocate() {
            return '0';
        }
        
        static deallocate(id) {
            
        }
    }

    return Derp;
})();

console.log(Derp);
let obj = {};
Derp.set(obj, "dang", 5);
Derp.watch(obj, "dang");
console.log(obj.dang);
Derp.set(obj, "dang", 7);
// delete obj.dang;
console.log(obj);
