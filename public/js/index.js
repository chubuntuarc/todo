document.addEventListener('DOMContentLoaded', function() {
  //Hide form
  var link = document.getElementById('new_project');
  link.style.display = 'none';
  //Activate collapsible
  var elems = document.querySelectorAll('.collapsible');
  var collapsibleInstance = M.Collapsible.init(elems);
  //Activate sidenav
  var sidenav = document.querySelectorAll('.sidenav');
  var sidenavInstance = M.Sidenav.init(sidenav);
  //Activate inputs
  M.updateTextFields();
});


//Show new project form n hide sidenav
function show_form(){
  document.getElementById('new_project').style.display = 'block';
}