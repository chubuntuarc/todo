document.addEventListener('DOMContentLoaded', function() {
  //Hide form
  var link = document.getElementById('new_project');
  link.style.display = 'none';
  //Activate collapsible
  var elems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elems);
  //Activate sidenav
  var sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
  //Activate inputs
  M.updateTextFields();
});