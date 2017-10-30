import css from './css/index.css';
import less from './css/black.less';
import sass from './css/nav.scss';

// import $ from 'jquery'

{
    let str = 'Hello Webpack'
    document.getElementById('title').innerHTML = str;
    $('#gogo').animate({height : "150" } , 1000 )
    .animate({width : "300" } , 1000 )
    .hide(2000)
    .animate({height : "show" , width : "show" , opacity : "show" } , 1000 )
    .animate({height : "500"} , 1000 );
}

let json = require('../config.json');
document.getElementById('jsonArea').innerHTML = json.name;