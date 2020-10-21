// global variables for database calls
let req = ""
let query = ""
let results = ""
let pw = "Berhanu#0721" // put your database password here
let userName = 'ymb85951'
/*
customerSelect.onshow=function(){
    // set height property of textarea control 
    // - special code, add to final project
    txtResults_contents.style.height = "100px"
}
*/

customerSelect.onshow = function() {
  drpCustomer.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=ymb85951&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
    console.log(results)
  }
  if (results.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= results.length - 1; i++)
      drpCustomer.addItem(results[i])
  }

}


drpCustomer.onclick = function(s) {
  // this 'if' kicks user out if they  just clicked on control 
  // but not on one item in the list.
  if (typeof(s) == "object")
    return
  else { // the user picked something
    /*item user chose and output 
    it in a label, using a literal.
    */
    drpCustomer.value = s // make dropdown show the choice the user made
    txtResults1.value = `You picked ${s} -that is a great choice!`
  }
}