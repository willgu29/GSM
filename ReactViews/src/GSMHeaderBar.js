
//May not need this

var headerStyle = {
  backgroundColor: "blue"

};

var HeaderLink = React.createClass({
 
  render: function() {
    return (
      <a href={this.props.url}>{this.props.displayName}</a>
    );
  }
});



var GSMHeaderBar = React.createClass({

  render: function() {
    return (
      <div style={headerStyle}>
        <p>Hello world!</p>
        <HeaderLink url="/" displayName="Experience Social" />
        <HeaderLink url="/me" displayName="Me" />
        <HeaderLink url="/about" displayName="About" />

      </div>
    );
  }
});


React.render(<GSMHeaderBar />, document.body);
