budgetController =(function(){
    return 0 ; 
})();

UIController =(function(){
    let DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBnn: '.add__btn'
    };

    return {
        getInput : function () {
            return {
                type: document.querySelector(DOMStrings.inputType),
                description: document.querySelector(DOMStrings.inputDescription),
                value: document.querySelector(DOMStrings.inputValue)
            }
        },
        DOM: DOMStrings
    } ;
})();

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
