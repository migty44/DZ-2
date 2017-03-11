// create element


(function (){

    var elem = document.createElement('div'), //создать узел элемента
        content = document.createTextNode('это динамично созданный элемент'),
        wrappedP = document.getElementById( 'wrapped' );

    elem.innerHTML = '<strong>впсасобтвлыатс </strong>'; // это не будет работать в методе  .createTextNode
    // этот метод вставляет не только текст но и элементы внутри элемента



    elem.appendChild( content );

    wrappedP.parentNode.appendChild( elem );
    wrappedP.parentNode.insertBefore( elem, wrappedP ); // метод вставляет перед указанным элементом
    wrappedP.parentNode.replaceChild( elem, wrappedP ); // метод заменяет первый аргумент вторым


    //удаление элементов

    wrappedP.parentNode.removeChild( wrappedP ); // применяем к парент ноду - это такая большая конструкция


    elem.setAttribute( 'id', 'dfcdsaxcf' ); // устанавливает аттрибут
    elem.id = 'dcfdc'; // равнозначно


    console.log( elem );

})();

// созданные таким образом элементы не содержатся в сосре страниц


// КЕШИРОВАНИЕ

// обращение к DOM дереву самое время-затратное - это следует кешировать

var doc = document;

var elem = doc.createElement('div'), //создать узел элемента
    content = doc.createTextNode('это динамично созданный элемент'),
    wrappedP = doc.getElementById( 'wrapped' );

// теперь мы не будем постоянно обращаться к элементу - это увеличивает скорость


// изменение стилей элемента

(function () {

    var div = document.getElementsByClassName('test'),
        stile = div[0].style;

    stile.color = 'red';
    stile.backgroundColor = 'black';
    stile.border = '1px solid blue';
    stile.padding = '3px';

    // это никогда не рекомендуется делать - тк каждый раз перерисовывает DOM дерево и загружает

    // чтобы этого избежать нужно все эти свойства перечислить в CSS-классе и его добавлять

    //

    /*

     подключение стилей


        <style>
            .btn-pop{
                color: red;
                backgroung-color: black;
                border: 1 px solid blue;
                padding: 3px;
            }
        </style>

     */


    div.className = 'btn-pop'; // если мы этот элемент ловили по класснейму то этим мы перетрем свойство и ничего не произойдет

    //  поэтому перепишем

    var div = document.getElementById('tes111t'),
        stile = div.style;


    div.className = 'btn-pop css-class-new'; // можно добавить несколько классов
    div.className = ''; // перетерли строку выше
    // но чтобы убрать одно св-во нужно изъебнуться

    div.className = div.className.replace( 'btn-pop', '');

    // div.classlist.add .remove .toggle
    // он адекватнее но пока не работает в ИЕ


})();


// Анимации и таймеры

// setTimeout  принимает на вход ф-ию и делей
// setInterval

// clearTimeout(timer); // очистит таймер и ничего не сработает
// clearTimeout


(function () {
    var delay = 10,
        i = 0,
        startTimer = function ( pixels ) {
        //console.log( ' Ф-ия стартовала ');

            var elem = document.getElementById('circle'),
                bottom = elem.offsetTop;

            console.log( bottom );


            if( i < 10 ){

                //console.log( 'функция startTimer' + (i+1) + 'сработала');

                setTimeout(startTimer, delay);

                elem.style.top = bottom + pixels +'px';


            } else {
                clearInterval( timer );
            }


            i++;
    };



    var timer = setInterval( function () {

        startTimer(20);
        
    }, delay);

    // alert('dffcfwed!');



})();


//                                                       события JS

var dsxdsx = document.getElementById('box');

dsxdsx.onclick = function () {
    this.style.color = 'yellow';
};


// способ который нерекомендован
// написать прямо в коде
<div id="box" onclick="alert('бонжур епта')">


// в общем-то оба способа устаревшие
// мы не можем повесить на один элемент несколько событий

// метод addeventlistner

var buttons = document.getElementsByTagName('button'),
    changeColor = function (easd) {
        console.log(easd.type); // это объект события который передается в вызываемую ф-ию

                            //.target - элемент на котором произошло событие
                            //.currentTarget - объект на котором висит обработчик
        console.log( this ); // так же вернет спровоцировавший событие объект

        easd.preventDefault(); // отключает работу по умолчанию например ссылок или сабмитов (чтобы отправить по аякс)
        alert('cfdfc');

    };

for (var i = 0, len = buttons.length; i < len; i++){

    buttons[i].addEventListner('click', changeColor, false ); // добавляет прослушку события на заданный элемент - 3 параметра- третий для поддержки старого ие 7-8 - если тру то нет
    buttons[i].addEventListner('click', saiHi, false );
    buttons[i].removeEventListener('click', saiHi, false);

}
//                                                       события IE


//в ИЕ свои события

easd.returnValue = false;
buttons[i].attachEvent('onclick', , false);

// опишем объект для работы с кросс браузерными событиями

var eventsObj = {

    addEvent : function (el, type, fn){
        if ( typeof addEventListener !== 'undefined'){

            el.addEventListener(type, fn, false);


        } else if( typeof attachEvent !== 'undefined'){
            el.attachEvent('on' + type, fn, false)
        } else {
            el['on' + type] = fn; // литеральная нотация вместо дот нотейшен
        }
    },

    removeEvent : function (el, type, fn) {
        if ( typeof removeEventListener() !== 'undefined'){

            el.removeEventListener(type, fn, false);


        } else if( typeof detachEvent !== 'undefined'){
            el.detachEvent('on' + type, fn, false)
        } else {
            el['on' + type] = null; // литеральная нотация вместо дот нотейшен
        }
    }

    getTarget : function (event) {
        if(typeof event.target !== 'undefined'){
            return event.target;
        } else {
            return event.srcElement;
        }
    },

    preventDefault : function (event){
        if (typeof event.preventDefault !== 'undefined'){
            event.preventDefault();
        } elese {
            event.returnValue = false;
        }
    }
};

for (var i = 0, len = buttons.length; i < len; i++){

    eventsObj.addEvent(buttons[i], 'click', changeColor);

}