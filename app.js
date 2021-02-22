budgetController =(function(){
    const Expense = (id, description, value) => {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    const Income = () => {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {

    }
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
        getDOMNames: ()=>DOMStrings
    } ;
})();


controller =(function(budgetCtrl , UICtrl){
    console.log("i'm running ");
    const addItem = () => {
        console.log(UICtrl.getInput());
        console.log("add item ! ");
    };
    const setupEventListener = () => {
        const DOM = UICtrl.getDOMNames();

        document.querySelector(DOM.inputBtn).addEventListener('click',addItem);

        document.addEventListener('keypress',(event)=>{
            if (event.keyCode === 13 ){
                addItem(event);
            }
        });
    };
    return {
        init : () => {
            console.log("Ctrl App running ");
            setupEventListener();
        }
    }
})(budgetController,UIController);

controller.init();
