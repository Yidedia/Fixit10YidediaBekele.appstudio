// global variables for database calls
req = ""
query = ""
results = ""

customerDelete.onshow = function() {
  drpDelete.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    customerDeleteR = JSON.parse(req.responseText)
    console.log(customerDeleteR)
  }
  if (customerDeleteR.length == 0) {
    // if no customers in a table brings back this message
    errorMsg.value = "There are no customers to delete."
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerDeleteR.length - 1; i++)
      drpDelete.addItem(customerDeleteR[i])
  }
}

drpDelete.onclick = function(s) {
  // check to see if dropdown was clicked
  if (typeof(s) == "object")
    return
  else {
    drpSelect.value = s // make dropdown show the choice the user made
    let DeleteNameDel = s
    // make sure the customers name is in the database before you try to delete it
    let found = false
    for (i = 0; i <= customerDeleteR.length - 1; i++) {
      if (DeleteNameDel == customerDeleteR[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
      errorMsg.value = `${DeleteNameDel} is not in the database.`
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = " + '"' + DeleteNameDel + '"'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)
      
      if (req.status == 200) { //transit worked.
        if (req.responseText == 500) // means the insert succeeded
          console.log(`You have successfully deleted the pet named ${DeleteNameDel}`)
        else
          console.log(`There was a problem deleting ${DeleteNameDel} from the database.`)
      } else {
        // transit error
        console.log(`Error: ${req.status}`);
      }
    }
    // run the ajax to get the new list of customers
    query = `SELECT name from customer`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      // transit error
      console.log(`Error: ${req.status}`);
    }
    // putting new list of customers into txtDelete
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"
    // change value of text area
    txtDelete.value = customersLeft
  }
}
btnAdd.onclick=function(){
  ChangeForm(customerAdd)
}
