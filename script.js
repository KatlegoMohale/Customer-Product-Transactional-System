//creating customer, product and transactions
var myCustomers = [
]

var myProducts = [
]

var myTransactions = [
]
    
//get customer and product select id from transaction box
var select1 = document.getElementById('sCustomers');
var select2 = document.getElementById('sProducts');

//when window load adds data in array to elements if array are not empty
function onLoad(){
    if (typeof(storage)!=="undefined")
    {
        var customer = JSON.parse(localStorage.getItem('newCustomer'));
        myCustomers.push(customer);
        
        var product = JSON.parse(localStorage.getItem('newProduct'));
        myProducts.push(product);
        
        var transaction = JSON.parse(localStorage.getItem('newtransaction'));
        myTransactions.push(transaction);
    }
    else{
        console.log('LocalStorage not supported')
    }
}

function addCustomer()
{
    //get variable values from inputs
    var ncid = + new Date();
    var ncname = document.getElementById("cname").value;
    var ncsurname = document.getElementById("csurname").value;
    
    //create a new customer object with variables and keys
    var newCustomer = {id: ncid, name: ncname,surname: ncsurname};
    //add new customer to the array
    myCustomers.push(newCustomer);
    
    //adding data to local storage
    localStorage.setItem('newCustomer',JSON.stringify(myCustomers));

    console.log(myCustomers);

    //string of html code for a new row with variables
    var nrow1 = '<tr onclick="rCustomer(this)" class="rows"> <td style="display:none;">'+ncid+'</td><td>'+ncname+'</td><td>'+ncsurname+'</td></tr>'
    //variable where row code is inserted inside customer table
    var html1 = document.getElementById("cTable").innerHTML+nrow1;
    //set inside of customer table to the complete new row and existing column code
    document.getElementById("cTable").innerHTML = html1;

    //create an option element
    var option1 = document.createElement('option');
    //add the input box value as transaction box customer select text
    option1.appendChild(document.createTextNode(ncname));
    //add the option into the select
    select1.appendChild(option1);

}

function rCustomer(x1)
{
    //gets index of selected row in table
    var index1 = x1.rowIndex;
    //gets id of the customer table
    var table1 = document.getElementById("cTable");
    //delete the selected row in the table
    table1.deleteRow(index1);
    
    var arrindex1 = index1-1;
    //delete the object in the array
    myCustomers.splice(arrindex1,1);
}

function addProduct(){

    //get variable values from inputs
    var npid = + new Date();
    var npname = document.getElementById("pname").value;
    var npprice = document.getElementById("pprice").value;
    
    //create a new customer object with variables and keys
    var newProduct = {id: npid, name: npname, price: npprice};
    //add new customer to the array
    myProducts.push(newProduct);
    console.log(myProducts);

    //adding data to local storage
    localStorage.setItem('newProduct',JSON.stringify(myProducts));

    //string of html code for a new row with variables
    var nrow2 = '<tr onclick="rProduct(this)" class="rows"> <td style="display:none;">'+npid+'</td><td>'+npname+'</td><td>'+npprice+'</td></tr>'
    //variable where row code is inserted inside product table
    var html2 = document.getElementById("pTable").innerHTML+nrow2;
    //set inside of product table to the complete new row and existing column code
    document.getElementById("pTable").innerHTML = html2;
    
    //get adding the selected product as an option in the transaction box product select
    var option2 = document.createElement('option');
    option2.appendChild(document.createTextNode(npname));
    select2.appendChild(option2);
}

function rProduct(x2)
{
    //delete a product from the table and the object array
    var index2 = x2.rowIndex;
    var table2 = document.getElementById("pTable")
    table2.deleteRow(index2);
    var arrindex2 = index2-1;
    myProducts.splice(arrindex2,1);
}

function addTransaction(){

    var ntid = + new Date();
    var ntcname = select1.options[select1.selectedIndex].text;
    var ntpname = select2.options[select2.selectedIndex].text;
    var tpquantity = document.getElementById("tpQuatity").value;

    var arrPrice = myProducts.find( x => x.name === ntpname).price;
    var tprice = tpquantity*arrPrice;

    var newTransaction = {customer: ntcname, id: ntid, product: ntpname, price: tprice, quantity: tpquantity};
    myTransactions.push(newTransaction);
    
    localStorage.setItem('newTransaction',JSON.stringify(myTransactions));

    console.log(myTransactions);

    var nrow3 = '<tr class="rows"> <td>'+ntcname+'</td><td>'+ntpname+'</td><td>'+tpquantity+'</td><td>'+tprice+'</td></tr>'
    var html3 = document.getElementById("tTable").innerHTML+nrow3;

    document.getElementById("tTable").innerHTML = html3; 
}

