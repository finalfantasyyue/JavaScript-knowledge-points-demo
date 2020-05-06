import './index.css';
import './index.scss';
// import lans from '../resource/en.json'
// require('./index.scss');  //也可以通过require引入
import {Child,Person,fun1,fun2,fun3,lan} from './module1';   //等同于    import * as Module1 from './module1';  除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
/*import * as Module1 from './module1';
console.log(Module1.fun1())
let person = new Module1.Person('dw',11);
$('body').append('<div class="dynamic">'+person.sayName()+'---'+person.f1()+' '+person.f2()+'---'+person.f3()+'</div>');*/

let person = new Person('dw',20);
console.log(person)
$('body').append('<div class="dynamic">'+person.sayName()+'---'+person.f1()+' '+person.f2()+'---'+person.f3()+'</div>');

let child = new Child('lq',18,'man');
$('body').append('<div class="dynamic2">'+child.sayHello()+'</div>');

function fun(){
	$('body').append('<div class="dynamic3">'+fun1()+' '+fun2()+' '+fun3()+'</div>')
}
fun();

var _span = $('<span></span>').insertBefore('input')
$('body').on('keyup','input',function(){
	var _input = $('input').val();
	$(_span).css({'display':'inline-block'}).html(_input);
})

$('#app .wrapper').html('webpack4');
$('body').append('<img src="images/qbl.jpg" width="100" height="100" alt="失败">').append('<a href="list.html">列表页</a>').append('<img src="images/bz.jpg">');


//多语言
// $('input').val(lans.city)
$('input').val(__('city'))