// global variables for database calls
req = ""
query = ""
results = ""

btnAddCustomer.onclick = function() {
  query = "INSERT INTO customer VALUES ('17','Jesse Antiques','1113 F St','Omaha','NE','68178')"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    if (req.responseText == 500) { // means the insert succeeded
      NSB.MsgBox("You have successfully added the Customer!")
    } else
      NSB.MsgBox("There was a problem with adding the Customer to the database.")
  } else {
    // transit error
    NSB.MsgBox("Error: " + req.status);
  }

  query = `SELECT name from customer ORDER BY customer_id DESC`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    //save the sate of the customer 
    results = JSON.parse(req.responseText)
  } else {
    // transit error
    console.log(`Error: ${req.status}`);
  }
  // putting new list of customers into txtDelete
  let customersAdd = ""
  for (i = 0; i <= results.length - 1; i++)
    customersAdd = customersAdd + results[i] + "\n"
  // change value of text area
  txtAdd.value = customersAdd
}
Button1.onclick=function(){
  ChangeForm(customerUpdate)
}
