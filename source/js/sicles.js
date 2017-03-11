// все циклы JS - 4

// повторяет фрагмент кода заданное количество раз

// for  (инициализация, тест, инкремент)

var arr = [1,2,'str',3],
    len = arr.length;


for(var i=0; i<len; i++){
    console.log( arr[i] );
}

var b;
for( b = 10 ; b > 0 ; b -- ){

    console.log(b);

}


// for ir - используется для обхода объектов, переменная это каждое свойство объекта

var obj={
    propp : 'one',
    propp2 : 'two',
    dxsdxs : 'three'
},
prop;

for ( prop in obj ) {

     console.log( prop + ':' + obj[prop] );

}

// но есть какоето правило проверки - связанное с прототипными наследованиями - проверяем на принадлежностьсвойства нашему объекту

for ( prop in obj ) {
    if( obj.hasOwnProperty(prop)) {
        console.log(prop + ':' + obj[prop]);
    }
}

//while

var k = 0;
while( k < 10){
    console.log( k++ );

};

//do while
// этот цикл имеет вначале тело - те он будет выполнен хотябы 1 раз
var h = 0;
do {
    console.log( ++h );
} while( h<1 );