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
        //Get data
        doc.forEach(doc =>{
        var ul = document.getElementById("projects_list");
        var li = document.createElement("li");
        //Inner li data
        var data = '<div class="collapsible-header">'+doc.data().name+' <span class="badge">'+doc.data().deadline+'</span></div>';
        data += '<div class="collapsible-body"><span>'+doc.data().description+'</span><span class="badge edit-badge"><a href="#!" class="grey-text" onclick="editProject(\''+doc.id+'\');"><i class="small material-icons">create</i></a></span></div>';
        //Add list item
        li.innerHTML = data;
        ul.appendChild(li);
        data = '';
    });
    //Hide loader
    document.getElementById('loading').style.display = 'none';
  });
}

//Save and update projects
function saveProject(){
  //Get values 
  var id = document.getElementById('id_project').value;
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
  }else if(id !== ''){
    projectsRef.doc(id).set({
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
      //Clean inputs
      document.getElementById('id_project').value = '';
      document.getElementById('name').value = '';
      document.getElementById('description').value = '';
      document.getElementById('contact').value = '';
      document.getElementById('cost').value = '';
      document.getElementById('start_date').value = '';
      document.getElementById('deadline').value = '';
      document.getElementById('url').value = '';
      //Restart inputs
      M.updateTextFields();
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }else{
    projectsRef.add({
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
      //Clean inputs
      document.getElementById('id_project').value = '';
      document.getElementById('name').value = '';
      document.getElementById('description').value = '';
      document.getElementById('contact').value = '';
      document.getElementById('cost').value = '';
      document.getElementById('start_date').value = '';
      document.getElementById('deadline').value = '';
      document.getElementById('url').value = '';
      //Restart inputs
      M.updateTextFields();
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  return false;
}

//Get edit data from project
function editProject(id){
  projectsRef.doc(id).get().then(function(doc) {
      if (doc.exists) {
          document.getElementById('id_project').value = doc.id;
          document.getElementById('name').value = doc.data().name;
          document.getElementById('description').value = doc.data().description;
          document.getElementById('contact').value = doc.data().contact;
          document.getElementById('cost').value = doc.data().cost;
          document.getElementById('start_date').value = doc.data().start_date;
          document.getElementById('deadline').value = doc.data().deadline;
          document.getElementById('url').value = doc.data().url;
          document.getElementById('new_project').style.display = 'block';
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

//Delete project
function deleteProject(){
  var checkstr =  confirm('Deseas eliminar el proyecto?');
    if(checkstr === true){
      var id = document.getElementById('id_project').value;
      projectsRef.doc(id).delete().then(function(doc) {
        document.getElementById('new_project').style.display = 'none';
        M.toast({html: 'Proyecto eliminado', classes: 'rounded'}); 
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    }else{
      return false;
    }
}