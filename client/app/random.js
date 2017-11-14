const DomoList = function(props) {
  if (props.domo === null) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }
  
  return (
    <div className="domoList">
      <div key={props.domo._id} className="domo">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace"/>
        <h3 className="domoName"> Name: {props.domo.name}</h3>
        <h3 className="domoAge"> Age: {props.domo.age}</h3>
        <h3 className="domoLocation">Location: {props.domo.location}</h3>
      </div>
    </div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/random', null, (data) => {
    ReactDOM.render(
      <DomoList domo={data.domo}/>, document.querySelector("#domos")
    );
  });
};

const setup = function() {
  ReactDOM.render(
    <DomoList domo={[]} />, document.querySelector("#domos")
  );
  loadDomosFromServer();
};

$(document).ready(function() {
  setup();
});