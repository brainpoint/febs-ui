
/**
* @desc: 复制属性. 不会复制class属性.
* @param matchCB: function(attrName): boolean; 返回true表明允许复制.
*                 null表示全部复制.
* @return: 
*/
exports.copyAttrs = function(from, to, matchCB) {
  matchCB = matchCB || function() { return true; }

  // copy attri.
  var attris = from[0].attributes;
  if (attris) {
    for (var j = 0; j < attris.length; j++) {
      var name = attris[j].nodeName.toLowerCase();
      if (name != 'class' && matchCB(name)) {
        to.attr(name, from.attr(name));
        if (attris[j].nodeName == 'id') {
          from.removeAttr('id');
        }
      }
    }
  }
}

/**
* @desc: 复制类.
* @return: 
*/
exports.copyClass = function(from, to) {
  // copy class.
  var classDom = from.attr('class');
  if (!window.febs.string.isEmpty(classDom)) {
    classDom = classDom.split(' ');
    for (var jjj = 0; jjj < classDom.length; jjj++) {
      if (!to.hasClass(classDom[jjj])) {
        to.addClass(classDom[jjj]);
      }
    }
  }
}


function maskPreventHandler(event){
  // if (event.target == event.currentTarget) {
    event.preventDefault();
    return false;
  // }
}

// event.
exports.maskPreventEvent = function(ee) {
  if (window.febs.utils.browserIsMobile()) {
    window.febs.dom.removeEventListener(ee[0], 'touchmove', maskPreventHandler);
    window.febs.dom.addEventListener(ee[0], 'touchmove', maskPreventHandler);
  }
  else {
    window.febs.dom.removeEventListener(ee[0], 'mousewheel', maskPreventHandler);
    window.febs.dom.addEventListener(ee[0], 'mousewheel', maskPreventHandler);
  }
}

//
// prevent mobile event.
function mobile_onTouchstart(event) {
  event = event || window.event;
  event.target.__touchstart_at = Date.now();
}
function mobile_onTouchmove(event) {
  event = event || window.event;
  if (event.target.__touchstart_at && Date.now()-event.target.__touchstart_at > 450) {
    event.preventDefault();
    // return false;
  } else {
    delete event.target.__touchstart_at;
  }
}
function mobile_onTouchend(event) {
  event = event || window.event;
  delete event.target.__touchstart_at;
}
var mobile_onTouchcancel = mobile_onTouchend;

/**
* @desc: 
* @param dom: HtmlElement.
*/
exports.mobile_preventTouchEvent = function(dom) {
  if (window.febs.utils.browserIsMobile()) {
    window.febs.dom.removeEventListener(dom, 'touchstart', mobile_onTouchstart);
    window.febs.dom.removeEventListener(dom, 'touchmove', mobile_onTouchmove);
    window.febs.dom.removeEventListener(dom, 'touchend', mobile_onTouchend);
    window.febs.dom.removeEventListener(dom, 'touchcancel', mobile_onTouchcancel);
    
    window.febs.dom.addEventListener(dom, 'touchstart', mobile_onTouchstart, true);
    window.febs.dom.addEventListener(dom, 'touchmove', mobile_onTouchmove, true);
    window.febs.dom.addEventListener(dom, 'touchend', mobile_onTouchend, true);
    window.febs.dom.addEventListener(dom, 'touchcancel', mobile_onTouchcancel, true);
  } // if.
}
