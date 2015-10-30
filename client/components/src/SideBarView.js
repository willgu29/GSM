
var sideBar = {
  width: "90%",
  background: "white",
  
  
  /*boxShadow: "5px 5px 5px #888888",borderRadius: "10px",*/
  border: "1px solid black",
  marginBottom: "25px",
  
  marginTop: "200",
  marginLeft: "10",
  padding: "20"
}

var SideBarView = React.createClass({
render: function() {
  return (
<div style={sideBar}>
  <div class="card-block">
    <h4 class="card-title">SideBar title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li><hr/>
    <li class="list-group-item">Dapibus ac facilisis in</li><hr/>
    <li class="list-group-item">Vestibulum at eros</li><hr/>
  </ul>
  <div class="card-block">
    <a href="#" class="card-link">Card link</a>&nbsp;
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
)
}});


// React.render(<SideBarView />, document.getElementById("sideBarView"));
