class Person{
	constructor(name,age){
		this.name = name;
		this.age = age;
		this.hi = 'hi';
	}
	sayName(){
		return `my name is ${this.name}, my age is ${this.age}`
	}
	f1(){
		return `hello`;
	}
	f2(){
		return `world`;
	}
	f3(hi){
		hi = 'hi2';
		return this.hi+'/'+hi;
	}
}
class Child extends Person{
	constructor(name,age,sex){
		super(name,age);
		this.sex = sex;
	}
	sayHello(){
		// return `继承${this.sex},${this.name},${super.sayName()}`;
		return `继承+${this.sex} ${this.name}+....${super.sayName()}`;
	}
}
function f1(){
	return 'hello1';
}
function f2(){
	return 'world2';
}
const  hi = 'hii';
function f3(hi){
	 hi = 'hii2';
	 return hi;
}
function f4(){
	console.log('f4')
}
let lan = {values:"This is my first div added!"}
/*export {
	f1 as fun1,
	f2 as fun2,
	f3 as fun3
}*/
export {Child,Person,lan,f1 as fun1,f2 as fun2,f3 as fun3,f4};
// export default Person;