var template = Handlebars.compile(source);
var vals = { name: "test" };
$("#content").html(template(vals));

var a = vals.convoID;