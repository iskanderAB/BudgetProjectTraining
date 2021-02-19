budgetController =(function(){
    return 0 ; 
})();

UIController =(function(){
    return 0 ; 
})()

controller =(function(budgetCtrl , UICtrl){
    console.log("i'm running ")
    const addItem = () => console.log("add item ! "); 
    document.querySelector('.add__btn').addEventListener('click',addItem);

    document.addEventListener('keypress',(event)=>{
        if (event.keyCode === 13 ){
            addItem(event);
        }
    });
})(budgetController,UIController)