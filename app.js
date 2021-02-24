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
            },
            percentage : 100
        };
        return {
            addItem : (type, des, val) => {
                // add new item 
                let ID ;
                data.allItems[type].length > 0 ? ID =  data.allItems[type][data.allItems[type].length-1].id  + 1 : ID = 0 ;
                data.allItems[type].push(type === 'exp' ? new Expense(ID,des,val): new Income(ID, des, val)  );
                
                // update total budget 
                data.totals[type] += +val;
                // uupdate percentage 
                data.percentage =Math.round((data.totals.exp/(data.totals.inc - data.totals.exp))*100);
                console.log("percentage => " ,  data.percentage);
                return data.allItems[type][data.allItems[type].length-1];
            },
            getData : () => data,
        }
    })();

    UIController =(()=>{
        let DOMStrings = {
            inputType : '.add__type',
            inputDescription : '.add__description',
            inputValue : '.add__value',
            inputBtn: '.add__btn',
            incomeContainer: '.income__list',
            expenseContainer: '.expenses__list',
            budgetValue: '.budget__value',
            budgetInc: '.budget__income--value',
            budgetExp: '.budget__expenses--value',
            percentage: '.budget__expenses--percentage'
        };
        

        return {
            getInput : () => {
                return {
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDescription).value,
                    value: +document.querySelector(DOMStrings.inputValue).value
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
            updateBudget : (totlaBudget=0, expBudget=0, incBudget=0,percentage=100) => {
                let UITotalBudget = document.querySelector(DOMStrings.budgetValue);
                let UIExpBudget = document.querySelector(DOMStrings.budgetExp);
                let UIIncBudget = document.querySelector(DOMStrings.budgetInc);
                let UIPercentage = document.querySelector(DOMStrings.percentage);
                UITotalBudget.textContent= totlaBudget > 0  || totlaBudget === 0 ? '+' + totlaBudget : totlaBudget ;
                UIExpBudget.textContent= '-' + expBudget ;
                UIIncBudget.textContent=  '+' + incBudget ;
                UIPercentage.textContent= percentage + ' %'; 
                console.log(UITotalBudget);
            } , 
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

        const updateBudget = () => {
            const totalBudget = budgetCtrl.getData().totals.inc - budgetCtrl.getData().totals.exp;
            const incBudget = budgetCtrl.getData().totals.inc; 
            const expBudget = budgetCtrl.getData().totals.exp; 
            const pecentage = budgetCtrl.getData().percentage; 
            console.log("updated budget => " , totalBudget);
            UICtrl.updateBudget(totalBudget, expBudget, incBudget,pecentage);
        };
        const addItem = () => {
            const inputs = UICtrl.getInput();
            if( inputs.description !=='' && inputs.value > 0 && !isNaN(inputs.value) ){
                UICtrl.addListItem(budgetCtrl.addItem(inputs.type,inputs.description,inputs.value));
                UICtrl.clearFields();

                // calculate adn update budget 
                updateBudget();
            }
            
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
                UICtrl.updateBudget();
                setupEventListener();
            }
        }
    })(budgetController,UIController);

    controller.init();
