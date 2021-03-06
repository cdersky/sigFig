// grab image path
const galleryPath = './Gallery/pictures/';

// place images on the page
for(var i = 1; i < 13; i++){
  var imageNode = document.createElement('img');
  imageNode.className = 'draggable';
  imageNode.src = galleryPath + i +'.png';
  document.getElementById('container').appendChild(imageNode);
  // console.log(imageNode.src);
}

function nearest(number, n) {
  console.log('number:', number)
  console.log('n:', n)
  console.log('returning number: ', Math.round(number / n) * n);
  return Math.round(number / n) * n;
}

// Obtain a node list of all elements that have class="draggable":
var draggable = document.getElementsByClassName('draggable'),
    draggableCount = draggable.length, // cache the length
    i; // iterator placeholder

// This function initializes the drag of an element where an
// event ("mousedown") has occurred:
function startDrag(evt) {

    // The element's position is based on its top left corner,
    // but the mouse coordinates are inside of it, so we need
    // to calculate the positioning difference:
    var diffX = evt.clientX - this.offsetLeft,
        diffY = evt.clientY - this.offsetTop,
        that = this; // "this" refers to the current element,
    // let's keep it in cache for later use.

    // moveAlong places the current element (referenced by "that")
    // according to the current cursor position:
    function moveAlong(evt) {
        evt.preventDefault();
        var left = parseInt(evt.clientX - diffX);
        console.log(':::::::::: ', left)
        var top = parseInt(evt.clientY - diffY);

        // check for screen boundaries
        if (top < 0) { top = 0; }
        if (left < 0) { left = 0; }
        if (top > window.innerHeight-1) 
            { top = window.innerHeight-1; }
        if (left > window.innerWidth-1) 
            { left = window.innerWidth-1; }

        // set new position
        that.style.position = 'absolute';
        that.style.left = left + 'px';
        that.style.top = top + 'px';

        
    }

    // stopDrag removes event listeners from the element,
    // thus stopping the drag:
    function stopDrag() {
        // snap to grid
        var left = parseInt(evt.clientX - that.offsetLeft);
        console.log('@@@@@@@@@@@@@ ', left)
        console.log('########### ', nearest(left, 5))
        that.style.left = nearest(left, 5) + 'px';
        console.log('%%%%%%%@@@@ ', that.style.left)

        document.removeEventListener('mousemove', moveAlong);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', moveAlong);
    return false;
}

// Now that all the variables and functions are created,
// we can go on and make the elements draggable by assigning
// a "startDrag" function to a "mousedown" event that occurs
// on those elements:
if (draggableCount > 0) for (i = 0; i < draggableCount; i += 1) {
    draggable[i].addEventListener('mousedown', startDrag);
}


function snapToGrip (val,gridSize){
    var snap_candidate = gridSize * Math.floor(val/gridSize);
    if (val-snap_candidate < 2) {
        return snap_candidate;
    }
    else {
        return null;
    }
};
