//Classes

class Budget{
    constructor(budget){
        this.budget = Number ( budget );
        this.budgetLeft = this.budget;
    }

    subtractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}

//Everything html

class HTML{

    //inserts value
    insertBudget( amount ){
        console.log(amount)
        budgetTotal.innerHTML = `${amount}`;
        budgetRemaining.innerHTML = `${amount}`;

    }

    printMessage( message, alert) {
        const messgeWrapper = document.createElement('div');
        messgeWrapper.classList.add('text-center','alert', alert);
        messgeWrapper.appendChild(document.createTextNode(message));
         
        document.querySelector('.primary').insertBefore(messgeWrapper, addExpenseForm);

        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            
            
        }, 3000);
    }


    addExpenseToList(name, amount){
        const expenseList = document.querySelector('#expenses ul');

        const li = document.createElement('li');
        li.classList = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
        ${name}
        <span class="badge badge-primary badge-pill"> $ ${amount}</span>
        `;

     expenseList.appendChild(li);
    }

    trackBudget(amount){
        const budgetL = budget.subtractFromBudget(amount);
        budgetRemaining.innerHTML = `${budgetL}`;

        if((budget.budget / 4) > budgetL) {
            budgetRemaining.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetRemaining.parentElement.parentElement.classList.add('alert-danger');
        } else if((budget.budget / 2) > budgetL) {
            budgetRemaining.parentElement.parentElement.classList.remove('alert-success');
            budgetRemaining.parentElement.parentElement.classList.add('alert-warning');
        }

    }
}





//Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetRemaining = document.querySelector('span#left');
      
const html = new HTML()

let budget, userBudget;


//Event Listeners 
eventListeners();
function eventListeners(){

    //Initialise app
    document.addEventListener('DOMContentLoaded', function(){
        userBudget = prompt('What\'s your budget this week?');

        if(userBudget === null || userBudget === "" || userBudget === '0'){
            window.location.reload();
        } else{
            //budget works
            budget = new Budget(userBudget);
            html.insertBudget( budget.budget );

            //console.log(budget)
        }
    })

    //Adding expenses
    addExpenseForm.addEventListener('submit', function(e){
         e.preventDefault();
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if( expenseName === "" || amount === ""){
            html.printMessage('There was an error, all fields are mandtory', 'alert-danger')
        }else{
            html.addExpenseToList(expenseName,amount);
            console.log('done')
            html.trackBudget(amount);
            html.printMessage('Added', 'alert-success')
            addExpenseForm.reset();
        }
       


    })
}

