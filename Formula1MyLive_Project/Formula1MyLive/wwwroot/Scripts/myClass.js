$(function(){

    class Animal {
        constructor(name = 'anonymous', legs = 4, noise = 'nothing'){
            this.type = 'animal';
            this.name = name;
            this.legs = legs;
            this.noise = noise;
        }
        //Methods
        speak(){
            console.log(`${this.name} says "${this.noise}"`);
        }
        walk() {
            console.log(`${this.name} walks on "${this.legs}"`);
        }
        //Setter
        set eats(food){
            this.food = food;
        }
        //Getter
        get dinner(){
            return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
        }
    }

	const rex = new Animal('Rex', 4, 'woof');
    rex.eats = 'meat';
    console.log( rex.dinner ); 

    class Dog extends Animal{
        constructor(name){
            super(name, 4, 'bark');
            this.type = 'dog';
        }

         // override Animal.speak
         speak(to){
            super.speak();
            if (to) console.log(`to ${to}`);
         }
    }

    const azor = new Dog("azor");
    console.log("Azor" + azor.walk());
    console.log("Azor" + azor.speak());
    console.log("Azor" + azor.speak('lassy'));

	$.ajax({
		type: "GET",
		url: "/api/values",
		dataType: "json",
		success: function (data) {
			console.log(data);
		},
		failure: function (data) {
			console.log(data);
		},
		error: function (data) {
			console.log(data);
		}

	});

});