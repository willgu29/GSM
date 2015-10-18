"use strict";

var Message = React.createClass({
  displayName: "Message",

  render: function render() {

    return React.createElement(
      "div",
      { className: "message" },
      React.createElement(
        "p",
        null,
        React.createElement(
          "em",
          null,
          this.props.author
        ),
        ": ",
        this.props.children
      )
    );
  }

});
var MessageBox = React.createClass({
  displayName: "MessageBox",

  loadMessagesFromServer: function loadMessagesFromServer() {
    console.log("URL:" + this.props.url);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  handleMessageSubmit: function handleMessageSubmit(comment) {
    //Instant comment load... don't need this for now
    // var comments = this.state.data;
    //   	var newComments = comments.concat([comment]);
    //   	this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (function (data) {
        this.loadMessagesFromServer();
        // this.setState({data: data});
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.loadMessagesFromServer();
    //Don't need constant polling for now
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "Comments"
      ),
      React.createElement(MessageList, { data: this.state.data }),
      React.createElement(MessageForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }

});

var MessageList = React.createClass({
  displayName: "MessageList",

  render: function render() {
    var messageNodes = this.props.data.map(function (message) {
      return React.createElement(
        Message,
        { author: message.authorFullName },
        message.text
      );
    });
    return React.createElement(
      "div",
      { className: "messageList" },
      messageNodes
    );
  }
});

var MessageForm = React.createClass({
  displayName: "MessageForm",

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "messageForm", onSubmit: this.handleSubmit },
      React.createElement("input", { type: "text", size: "60", placeholder: "Say something positive/negative...", ref: "text" }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }

});

var href = window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/message/" + user_id;
React.render(React.createElement(MessageBox, { url: urlCall }), document.getElementById("chatroom"));