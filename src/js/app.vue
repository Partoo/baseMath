<template>  

 <div id="wrap">
  <div class="content">

   <span id="number-1" class="card" v-bind:class="currentColor">{{number_1}}</span>
   <span class="static">{{operator}}</span>
   <span id="number-2" class="card" v-bind:class="currentColor">{{number_2}}</span>
   <span class="static">=</span>
   <span id="result" class="card yellow"><i>?</i></span>
 </div>

 <div class="answers">
   <span class="card orange" id="{{answer}}" v-on:click="isCorrect($event)" v-for="answer in answers">{{answer}}</span>
 </div>  
</div>
<div id="cloudy">

</div>
<footer>                
  <span>机会:{{life}}</span>
  <span class="animated result">分数:{{score}}</span>      
</footer>
<div class="overlay">
  <div class="mymodal">
   <p>{{comment}}</p>
   <p><a href="#" class="button" v-on:click="init()">再来一次</a></p>
 </div>
</div>

</template>

<script>
  module.exports = {
    data:function(){
      return{
        number_1:1,
        number_2:1,
        currentColor:'red',
        animateState:false,
        right:true,
        correct:1,
        uAnswer:1,
        life:2,
        score:0,
        answers:[],
        comment:'',
        types:['+','-','×','÷'],
        operator:''
      }
    },
    ready:function(){
      this.gameStart();   
    },
    methods:{
      init:function(){
        this.life = 2;
        this.score = 0;
        $('.overlay').hide();
        this.gameStart();
      },
      gameStart:function(){        
        this.animation();
        $('.overlay').hide();           
        this.getType();
      },
      gameOver:function(){
        $('.overlay').show();
        if (this.score>=100) {
          this.comment = '宝贝全对啦,但要注意保护视力喔'
        }else{
          this.comment = '宝贝得了' + this.score + '分,加油!'
        };
      },
      getType:function(){
        var currentType = this.types[Math.floor((Math.random()*this.types.length))];
        this.operator = currentType;
        switch(this.operator){
          case '+':
          this.number_1 = this.random(90);
          this.number_2 = this.random(90); 
          this.correct = this.number_1+this.number_2;          
          break;
          case '-':
          this.number_1 = this.random(100);
          this.number_2 = this.random(this.number_1); 
          this.correct = this.number_1 - this.number_2;
          break;
          case '×':
          this.number_1 = this.random(9);
          this.number_2 = this.random(9); 
          this.correct = this.number_1 * this.number_2;
          break;
          case '÷':
          this.correct = this.random(9); 
          this.number_2 = this.random(9); 
          this.number_1 = this.number_2 * this.correct;
          break;
        }
        this.randomAnswers();
      },
      random:function(range){
        return Math.floor((Math.random()*range)+1);
      },
      randomAnswers:function(){
        var a = this.correct;
        var b = this.correct + this.random(9);
        var c = this.correct + 10;
        this.answers = this.shuffleArray([a,b,c]);
      },
      genAnswers:function(){
        var answers = []; 
        var answer1 =  this.correct;
      },
      isCorrect:function(e){
        this.uAnswer = e.target.id;      
        if (this.uAnswer == this.correct) {
          this.score+=1; 
        }else{
          this.life=this.life -1;
        }
        if (this.life <=0 || this.score>=100) {
          this.gameOver()
        }else{
          this.gameStart();       
        }
      },
      shuffleArray:function(array){
        for (var i = 2; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      },

      getColor:function(){
       var colors=['red','orange','yellow','green','cyan','blue','purple'];

       var max = colors.length - 1;
       if (this.i >= max) {
        this.i = 0;
      };
      this.i ++;

      this.currentColor =  colors[this.i];
    },

    animation:function(){
      var myBox = $('.content span');
      myBox.addClass('animated bounceIn');
      myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
        function(e) {
          myBox.removeClass('animated bounceIn rollIn');
        });

    }
  }
}
</script>