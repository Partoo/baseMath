var $ = require('jquery')
var Vue = require('vue')
var App = require('./app.vue')
var sign = require('./sign.js');
var vue = new Vue({
           el:'body',
           components:{
           	app:App
           }          
})