const $element = $('input[type="range"]');
const $tooltip = $('#range-tooltip');
const sliderStates = [
    // <span class="tooltiptext">Firebeatz<img  src="https://static.wixstatic.com/media/e2aefa_51973dc920ba493fbf358dee40340ca7~mv2.png/v1/fill/w_511,h_170,al_c/e2aefa_51973dc920ba493fbf358dee40340ca7~mv2.png"></span>



  {name: "low", tooltip:  "Most people do this", range: _.range(1000, 5000) },
  {name: "med", tooltip: "Pretty good", range: _.range(5000, 10000)},
  {name: "high", tooltip: "Yeah! now we are talking", range: _.range(10000,20000) },
  {name: "ultra-high", tooltip: "Awesome! you save a lot", range: [20000] },

];
var currentState;
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
      updateState($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
    checkState($handle[0], this.value);
  });

// Update the value inside the slider handle
function updateHandle(el, val) {
  el.textContent = val;
}

// Check if the slider state has changed
function checkState(el, val) {
  // if the value does not fall in the range of the current state, update that shit.
  if (!_.contains(currentState.range, parseInt(val))) {
    updateState(el, val);
  }
}

// Change the state of the slider
function updateState(el, val) {
  for (var j = 0; j < sliderStates.length; j++){
    if (_.contains(sliderStates[j].range, parseInt(val))) {
      currentState = sliderStates[j];
      // updateSlider();
    }
  }
  // If the state is high, update the handle count to read 50+
  if (currentState.name == "high") {
    updateHandle($handle[0], "10000+");
  }
  // Update handle color
  $handle
    .removeClass (function (index, css) {
    return (css.match (/(^|\s)js-\S+/g) ||   []).join(' ');
  })
    .addClass("js-" + currentState.name);
  // Update tooltip
  $tooltip.html(currentState.tooltip);
}
