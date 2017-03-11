// функции в JS - это объекты
// функции можно передават ьв другие функции - как параметры
// для функций можно писать свойства и методы - при инициализации функция получает 2 скрытых свойства - но не суть


function func (a, b) {
    return a + b;   // преждевременное завершение
}

console.log( func(3,4) );

//функция всегда что-то возвращает, если нет ретерн - то возвращает undefined

// в имя функции - записана ссылка на ф-ю

console.log( func );


// В коде можно вызвать ф-ию раньше ее определения - тк определение функции определяется движком раньше вызова
// есть литеральная запись функции где это с какимито косяками работает

//обратные функции

var func = function (callback) {

    var name = "Nick";
    return callback(name);

};

console.log( func(function (n) {
    return "Hello" + n;
    
}) );


//возвращение ф-ии

var func1 = function () {
    return function () {
        console.log( 'Ghbdtn! ');
    };
};

console.log( func1()() ); // вызывает функцию и функцию


// анонимная сомовызывающаяся функция

(function () {
    console.log( 'Привет от странной функции!' );
})();

//это основа модульного JS - популярный паттерн


// объект arguments - псевдо массив

var funcArgs = function (a, b, c) {
    console.log( arguments );

};

funcArgs(1,2,3);

// ф-ии могут принимать неограниченгое число параметров

var funcArgs22 = function () {

    var i,
        sum = 0;

    for ( i=0 ; i <arguments.length; i++ ){

        sum += arguments[i];

    };

    return sum;

};

console.log( funcArgs22(1,2,3) );

// Область видимости SCOPE
// - любая переменная вне функции - глобальная
// - любая переменная внутри функции - локальная


// Есть глобальный объект в JS - window - можно так и ввести в консоли

var one1one = 1;
//console.log( window.one1one );

// если в функции забыть поставить перед переменной var она получит глобаль и будет портить другие циклы

//// // // цепочка областей видимоси

/*
все переменные всплывают к верху облсти видимости - те если не находит в лок области то ищет в глоб области - те всплывает
если же переменная есть в локале - но еще не определена - то будет определена только после команды определения

итого - всегда объявляй переменные в начале области видимости!!!

*/


///// замыкания

/*
все переменные внутри ф-ии это св-та спец внутреннего скрытого объекта lexikal envirement
одно из его св-в это scope
*/


var firstFunc = function () {
    var index = 5;

    return function () {
        return index;

    };
};

var secFunc = function () {
    var index = 15;

    console.log( firstFunc()() );
};

secFunc();

// console.log( index );

// это какието ебучие замыкания - те замыкания позволяют запоминать промежут данные - например старый и новый индекс



// BOM -browser object model

// console.log( window.navigator );    // тут хранится вся системная инфа по ОС браузеру и тп
// console.log( window.navigator.userAgent );


//  console.log( screen ); // все даные об экране
// screen.width
// screen.height

// location.reload() - инфа о текущем url, перезагрузка
// location.toString() - полезоное свойство

// console.log( history ); - объект хранит историю переходов - используется на совр аякс сайтах

// window.alert('bom');
// window.confirm('bom'); //- принимат true или false

// пс console.log - это window.console.log

// встроенные диалоговые окна - сейчас  используется редко
/*
var bar = window.prompt();
if (bar==='привет'){
    alert('привет и тебе');
}else {
    alert( 'пока' );
}
*/

/////////// DOM  - объектная модель XML-HTML документа

// все пробелы в коде - будут узлами документа, особенно в старых браузерах

(function () {
    var elems = document.getElementsByTagName('p'),    // работает быстрее - самый нативный
        classElems = document.getElementsByClassName('paragraf'),
        idElem = document.getElementById('sxsxx'),   // работает быстрее - самый нативный
        elemsSelector = document.querySelector('p'),  // современный метод селектор - выведет первый элемент с тегом p который найдет
        elemsSelectorAll = document.querySelectorAll('p'),  // выведет все p
        elemsInDiv = document.querySelectorAll('div p'),
        idElemSelect = document.querySelector('#sxsxx');



    console.log( elems );

    // можно работать как с массивом

    for ( var i =0, len = elems.length ; i < len; i++ ){
        console.log( elems[i].tagName);
        console.log( elems[i].nodeName ); // более универсальный может работать с текстовыми узлами

        //  .parentNode - родительский узел
        //  .previousSibling - предыдущий родственник
        // .nextSibling
    }
})();


//  .nodeType - выдаст тип элемента, если 1 - узел эелемента, если 3 - это текстовый узел
// позволяет узнать с текстовым или нет ущлом мы работает

// .childNodes - вывести все дочерние узлы - покажет и пробелы
// .children - выведет именно дочерные лементы - никаких пустых нодов - что нам чаще и надо !!!!

// .lastChild    но покажут и пробелы
// .firstChild

// .innerHtml - содержимое элемента в виде строки