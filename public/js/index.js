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
  getProjects();
});


//Show new project form n hide sidenav
function show_form(){
  document.getElementById('new_project').style.display = 'block';
}

//Get proyects list
function getProjects(){
  var projectsRef = db.collection("projects");
  
  projectsRef.onSnapshot(function(doc) {
        document.getElementById("projects_list").innerHTML = '';
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        
        doc.forEach(doc =>{
        var ul = document.getElementById("projects_list");
        var li = document.createElement("li");
        var div = document.createElement("div");
        var data = '<div class="collapsible-header">'+doc.data().name+' <span class="badge">'+doc.data().deadline+'</span></div>';
        data += '<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>';
        
        div.innerHTML = data;
        li.appendChild(div);
        ul.appendChild(li);
        data = '';
        
    });
    document.getElementById('loading').style.display = 'none';
  });
}