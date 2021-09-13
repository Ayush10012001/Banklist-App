'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const displaymovements=function(acc, sort= false){
  containerMovements.innerHTML=" ";
  const movs = sort ? movements.slice().sort((a,b)=> a - b) : acc.movements;
movs.forEach(function(mov,i){
const type= mov > 0 ?'deposit' : 'withdrawal';
const html = `
  <div class="movements__row">
    <div class="movements__type 
    movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>
`;

containerMovements.insertAdjacentHTML('afterbegin',html);
});
};

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300,8999];


// const movemntusd=movements.map(function(mov){
//   return mov*1.1;
// }
// );


const useraccount1 = function(accs){
accs.forEach(function(acc){
  acc.username= acc.owner
  .toLowerCase()
  .split(' ')
  .map(mov=> mov[0])
  .join('');
});

};
useraccount1(accounts);
console.log(accounts);


const total = function(acc){
const cashdeposit = acc.movements.filter(mov => mov > 0).reduce((acc,mov)=>acc+=mov,0);
labelSumIn.innerHTML=`${cashdeposit}`;
};


const total1 = function(acc){
  const cashdeposit = acc.movements.filter(mov => mov < 0).reduce((acc,mov)=>acc+=mov,0);
  labelSumOut.innerHTML=`${Math.abs(cashdeposit)}`;
  };
  

const labelbal=function(acc){
acc.balance= acc.movements.reduce((acc,ele)=>acc+ele,0);
labelBalance.innerHTML=`₹${acc.balance}`;
};


/////////////////////////////////////////////////
let currentaccount;
//login
btnLogin.addEventListener('click',function(e){
e.preventDefault();

currentaccount = accounts.find(
  acc => acc.username === inputLoginUsername.value
  );
console.log(currentaccount.username);
if(currentaccount?.pin === Number(inputLoginPin.value)){
  displayAll(currentaccount);
document.querySelector('.app').style.opacity = 100;
labelWelcome.innerHTML = `Welcome Back, ${currentaccount.owner.toUpperCase()}`;

inputLoginUsername.value = inputLoginPin.value = '';
displayAll(currentaccount);
}
});

const displayAll= function(currentaccount){
  labelbal(currentaccount);
total(currentaccount);
total1(currentaccount);
displaymovements(currentaccount);
};
//transfer

btnTransfer.addEventListener('click',function(e){
e.preventDefault();
const amount=Number(inputTransferAmount.value);
const person=accounts.find(acc => acc.username === inputTransferTo.value);
inputTransferAmount.value = inputTransferTo.value = '';
if (
  amount > 0 &&
  person &&
  currentaccount.balance >= amount &&
  person?.username !== currentaccount.username
) {

  // Doing the transfer
  currentaccount.movements.push(-amount);
  person.movements.push(amount);
  console.log(currentaccount.movements);
  displayAll(currentaccount);
}
});


btnClose.addEventListener('click', function(e){
  e.preventDefault();

if(
  inputCloseUsername.value === currentaccount.username &&
  Number(inputClosePin.value) === currentaccount.pin
  )
  {
const index = accounts.findIndex( acc => acc.username === currentaccount.username);
accounts.splice(index,1);
console.log(accounts);
document.querySelector('.app').style.opacity = 0;

  }
});


//transfer loan, if any deposit is atleast 10% of requested amount

btnLoan.addEventListener('click', function(e){
e.preventDefault();
const amount = Number(inputLoanAmount.value);
if(
  amount > 0 && currentaccount.movements.some(val => val >= amount*0.1)
)
{
  currentaccount.movements.push(amount);
  displayAll(currentaccount);
};
});

let sorted=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displaymovements(currentaccount,!sorted);
  sorted = !sorted;
})