$(document).ready(function(){
    
   $('form#register').submit(function(e){ 
       if($("input[name='pswd']").val() != $("input[name='repswd']").val()){
           e.preventDefault();
           alert('Entrez des mots de passe identiques!');
           return false;
       }
           
   });
   
    
});