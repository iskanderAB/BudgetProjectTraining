budgetController =(function(){
    return 0 ; 
})();

UIController =(function(){
    let DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput : () => {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        DOM: ()=>DOMStrings
    } ;
})();

controller =(function(budgetCtrl , UICtrl){
    console.log("i'm running ");
    let DOM = UICtrl.DOM;
    const addItem = () => {
        console.log(UICtrl.getInput());
        console.log("add item ! ");
    };
    document.querySelector(DOM.inputBtn).addEventListener('click',addItem);

    document.addEventListener('keypress',(event)=>{
        if (event.keyCode === 13 ){
            addItem(event);
        }
    });
})(budgetController,UIController);
