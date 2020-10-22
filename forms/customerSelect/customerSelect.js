// global variables for database calls
let req = ""
let query = ""
let results = ""
let pw = "Berhanu#0721" // put your database password here
let userName = 'ymb85951'

customerSelect.onshow = function() {
  txtCustomer.style.height = "100px"
}

customerSelect.onshow = function() {
  drpCustFind.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    customerResultsFind = JSON.parse(req.responseText)
    console.log(customerResultsFind)
  }
  if (customerResultsFind.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers to delete.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerResultsFind.length - 1; i++)
      drpCustFind.addItem(customerResultsFind[i])
  }
}

drpCustFind.onclick = function(s) {
  // this 'if' kicks user out if they  just clicked on control 
  // but not on one item in the list.
  if (typeof(s) == "object")
    return
  else { // the user picked something
    drpCustFind.value = s // make dropdown show the choice the user made
    query = `SELECT state from customer WHERE name = '${s}'`
    //Grab the state of the customer chosen
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerState = JSON.parse(req.responseText)
      console.log(customerState)
    }
    query = `SELECT name from customer WHERE state = '${customerState[0]}'`
    // get the other customers who have the same state
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerWithTheSameState = JSON.parse(req.responseText)
      console.log(customerWithTheSameState)
    }

    let customerMessage = ""
    for (i = 0; i <= customerWithTheSameState.length - 1; i++)
      customerMessage = customerMessage + customerWithTheSameState[i] + "\n"
    txtCustomer.value = customerMessage
  }
}
nxt.onclick=function(){
  ChangeForm(customerDelete)
}
