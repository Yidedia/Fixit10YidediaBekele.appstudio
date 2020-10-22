req = ""
query = ""
results = ""

customerSelect.onshow = function() {
  txtCustDlt.style.height = "100px"
}

customerDelete.onshow = function() {
  drpCustDlt.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    customerResultsDtl = JSON.parse(req.responseText)
    console.log(customerResultsDtl)
  }
  if (customerResultsDtl.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers to delete.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerResultsDtl.length - 1; i++)
      drpCustDlt.addItem(customerResultsDtl[i])
  }
}