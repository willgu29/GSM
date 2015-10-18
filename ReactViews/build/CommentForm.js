"use strict";

var Comment = React.createClass({
  displayName: "Comment",

  render: function render() {
    var displayAuthor;
    var isAnonymous = this.props.anonymous;
    if (isAnonymous) {
      displayAuthor = "Anonymous";
    } else {
      displayAuthor = this.props.author;
    }
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "p",
        null,
        React.createElement(
          "em",
          null,
          displayAuthor
        ),
        " says: ",
        this.props.children
      )
    );
  }

});
var CommentBox = React.createClass({
  displayName: "CommentBox",

  loadCommentsFromServer: function loadCommentsFromServer() {
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
  handleCommentSubmit: function handleCommentSubmit(comment) {
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
        this.loadCommentsFromServer();
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
    this.loadCommentsFromServer();
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
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }

});

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.authorFullName, anonymous: comment.isAnonymous },
        comment.text
      );
    });
    return React.createElement(
      "div",
      { className: "commentList" },
      commentNodes
    );
  }
});

var CommentForm = React.createClass({
  displayName: "CommentForm",

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var checkbox = React.findDOMNode(this.refs.anonymous);
    var anonymousStatus;
    if (checkbox.checked) {
      anonymousStatus = true;
    } else {
      anonymousStatus = false;
    }
    console.log("anonymousStatus : " + anonymousStatus);
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({ anonymous: anonymousStatus, text: text });
    React.findDOMNode(this.refs.anonymous).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "commentForm", onSubmit: this.handleSubmit },
      "Anonymous? ",
      React.createElement("input", { type: "checkbox", name: "anonymous", ref: "anonymous" }),
      React.createElement("input", { type: "text", size: "60", placeholder: "Say something positive/negative...", ref: "text" }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }

});

var href = window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/comments/" + user_id;
React.render(React.createElement(CommentBox, { url: urlCall }), document.getElementById("commentForm"));