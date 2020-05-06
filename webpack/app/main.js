require('index.scss');
let $ = require('jquery');
import {Child,Person,fun1,fun2,fun3} from './module1';   //等同于    import * as Module1 from './module1';  除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
/*import * as Module1 from './module1';
console.log(Module1.fun1())
let person = new Module1.Person('dw',11);
$('body').append('<div class="dynamic">'+person.sayName()+'---'+person.f1()+' '+person.f2()+'---'+person.f3()+'</div>');*/

let person = new Person('dw',20);
$('body').append('<div class="dynamic">'+person.sayName()+'---'+person.f1()+' '+person.f2()+'---'+person.f3()+'</div>');

let child = new Child('lq',18,'man');
$('body').append('<div class="dynamic2">'+child.sayHello()+'</div>');

function fun(){
	$('body').append('<div class="dynamic3">'+fun1()+' '+fun2()+' '+fun3()+'</div>')
}
fun();
$('body').on('keyup','input',function(){
	var _input = $('input').val();
	$('span').css({'width':'150px','display':'inline-block'}).html(_input);
})