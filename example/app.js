define(function (require) {

  var when = require("when");
  var delay = require("when/delay");
  var moment = require("moment");
  var most = require('most');
  var map = require("amp-map");
  var contains = require("amp-contains");

  var xInput = document.querySelector('input.x');
  var yInput = document.querySelector('input.y');
  var resultNode = document.querySelector('.result');
  mostDemo();

  h2("moment");
  append(moment().format());

  h2("amp-map");
  append(map([1,2,3], function (a) { return a + 1; }))

  h2("when, when/delay, amp-contains");
  append("waiting for 2 seconds...")
  delay(2000).then(function () {
    return when(5).then(function (result) {
      if (contains([1,2,3,4,5], result)) {
        append("done");
      }
    });
  });

  function h2(text) {
    var h2 = document.createElement("h2");
    h2.textContent = text;
    document.body.appendChild(h2);
  }

  function append(text) {
    var div = document.createElement("div");
    div.textContent = text;
    var br = document.createElement("br");
    document.body.appendChild(br);
    document.body.appendChild(div);
    document.body.appendChild(br);
  }

  function mostDemo() {
    // x represents the current value of xInput
    var x = most.fromEvent('input', xInput).map(toNumber);

    // y represents the current value of yInput
    var y = most.fromEvent('input', yInput).map(toNumber);

    // result is the live current value of adding x and y
    var result = most.combine(add, x, y);

    // Observe the result value by rendering it to the resultNode
    result.observe(renderResult);
  };

  function add(x, y) {
    return x + y;
  }

  function toNumber(e) {
    return Number(e.target.value);
  }

  function renderResult(result) {
    resultNode.textContent = result;
  }

});