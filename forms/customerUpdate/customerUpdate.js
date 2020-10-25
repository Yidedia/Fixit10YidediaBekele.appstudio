// global variables for database calls
req = ""
query = ""
results = ""

customerUpdate.onshow = function() {
  drpUpdate.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
    console.log(results)
  }
  if (results.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers to Update.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= results.length - 1; i++)
      drpUpdate.addItem(results[i])
  }
}

drpUpdate.onclick = function(s) {
  // check to see if dropdown was clicked
  if (typeof(s) == "object")
    return
  else {
    drpUpdate.value = s // make dropdown show the choice the user made
  }
}