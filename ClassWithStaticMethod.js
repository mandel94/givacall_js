class ClassWithStaticMethod {
        constructor(name) {
        this.name = name
    }
    static staticProperty = 'someValue';
    static staticMethod() {
        return 'static method has been called.';
    }
    static {
        console.log("Class is being initialized")
        this.name = "name";
    }
}

instance = new ClassWithStaticMethod("Aoh")

console.log(instance.name)