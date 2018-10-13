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
  //Initialize objects
  var projectsRef;
  initialize();
});

function initialize(){
  //Collection object of projects
  projectsRef = db.collection("projects");
  //Look for projects list
  getProjects();
}


//Show new project form n hide sidenav
function show_form(){
  document.getElementById('new_project').style.display = 'block';
}

//Get proyects list
function getProjects(){
  projectsRef.orderBy("name").onSnapshot(function(doc) {
        //Cleaning projectc list
        document.getElementById("projects_list").innerHTML = '';
        //Check data source
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        //Get data
        doc.forEach(doc =>{
        var ul = document.getElementById("projects_list");
        var li = document.createElement("li");
        //Inner li data
        var data = '<div class="collapsible-header">'+doc.data().name+' <span class="badge">'+doc.data().deadline+'</span></div>';
        data += '<div class="collapsible-body"><span>'+doc.data().description+'</span></div>';
        //Add list item
        li.innerHTML = data;
        ul.appendChild(li);
        data = '';
    });
    //Hide loader
    document.getElementById('loading').style.display = 'none';
  });
}

//Save new projects
function saveProject(){
  //Get values 
  var name = document.getElementById('name').value;
  var description = document.getElementById('description').value;
  var contact = document.getElementById('contact').value;
  var cost = document.getElementById('cost').value;
  var start_date = document.getElementById('start_date').value;
  var deadline = document.getElementById('deadline').value;
  var url = document.getElementById('url').value;
  //Validate inputs
  if(name === '' && description === '' && contact === '' && cost === '' && start_date === '' && deadline === '' && url === ''){ 
    M.toast({html: 'Favor de llenar todos los campos', classes: 'rounded'}); 
  }else{
    projectsRef.doc().set({
      name: name,
      description: description,
      contact: contact,
      cost: cost,
      start_date: start_date,
      deadline: deadline,
      url : url
    }).then(function() {
      document.getElementById('new_project').style.display = 'none';
      M.toast({html: 'Proyecto guardado', classes: 'rounded'}); 
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  return false;
}