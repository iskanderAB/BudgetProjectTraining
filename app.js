    budgetController =(() => {
        function Expense (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        };
        function Income (id, description, value) {
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
            addItem : (type, des, val) => {
                let ID ;
                data.allItems[type].length > 0 ? ID =  data.allItems[type][data.allItems[type].length-1].id  + 1 : ID = 0 ;
                data.allItems[type].push(type === 'exp' ? new Expense(ID,des,val): new Income(ID, des, val)  );
                console.log("add item return => " ,data.allItems[type][data.allItems[type].length-1]);
                return data.allItems[type][data.allItems[type].length-1];
            },
            testing: ()=> console.log(data)
        }
    })();

    UIController =(()=>{
        let DOMStrings = {
            inputType : '.add__type',
            inputDescription : '.add__description',
            inputValue : '.add__value',
            inputBtn: '.add__btn',
            incomeContainer: '.income__list',
            expenseContainer: '.expenses__list'
        };

        return {
            getInput : () => {
                return {
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDescription).value,
                    value: document.querySelector(DOMStrings.inputValue).value
                }
            },
            addListItem : (obj) => {
                let html, element;
                if (obj.constructor.name === 'Expense'){
                    element = DOMStrings.expenseContainer;
                    html =`<div class="item clearfix" id="expense-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>` ;
                }
                else {
                    element = DOMStrings.incomeContainer;
                    html =`<div class="item clearfix" id="income-${obj.id}">
                                <div class="item__description">${obj.description}</div>
                                <div class="right clearfix">
                                    <div class="item__value">${obj.value}</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                    </div>
                                </div>
                            </div>` ;
                }
                //insert the html into DOM
                console.log('container => ' , obj.constructor.name);
                console.log('element => ' , document.querySelector(element));
                document.querySelector(element).insertAdjacentHTML('afterbegin',html);
            },
            clearFields : () => {
                // for return array not nodeList
                const fields = [...document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue)];
                fields.forEach((HTMLElemnt)=>{
                    HTMLElemnt.value ='';
                })
                fields[0].focus();
                console.log(fields);
            },
            getDOMNames: ()=>DOMStrings
        } ;
    })();


    controller =((budgetCtrl , UICtrl)=>{
        console.log("i'm running ");
        const addItem = () => {
            const inputs = UICtrl.getInput();
            console.log("inputs => " , inputs);
            console.log("add item ! ");
            UICtrl.addListItem(budgetCtrl.addItem(inputs.type,inputs.description,inputs.value));
            UICtrl.clearFields();

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
