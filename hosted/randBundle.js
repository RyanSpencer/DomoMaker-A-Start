"use strict";

var DomoList = function DomoList(props) {
  if (props.domo === null) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  return React.createElement(
    "div",
    { className: "domoList" },
    React.createElement(
      "div",
      { key: props.domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        props.domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " Age: ",
        props.domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoLocation" },
        "Location: ",
        props.domo.location
      )
    )
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/random', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domo: data.domo }), document.querySelector("#domos"));
  });
};

var setup = function setup() {
  ReactDOM.render(React.createElement(DomoList, { domo: [] }), document.querySelector("#domos"));
  loadDomosFromServer();
};

$(document).ready(function () {
  setup();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
