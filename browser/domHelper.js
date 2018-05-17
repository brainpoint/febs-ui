
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
  event.preventDefault();
}


function maskPreventHandler2(event){
  event.stopPropagation();
  // event.preventDefault();
}

// event.
exports.maskPreventEvent = function(ee) {

  var children = ee.children();
  
  if (window.febs.utils.browserIsMobile()) {
    children.off('touchmove', maskPreventHandler2);
    children.on('touchmove', maskPreventHandler2);
    ee.off('touchmove', maskPreventHandler);
    ee.on('touchmove', maskPreventHandler);
  }
  else {
    children.off('mousewheel', maskPreventHandler2);
    children.on('mousewheel', maskPreventHandler2);
    ee.off('mousewheel', maskPreventHandler);
    ee.on('mousewheel', maskPreventHandler);
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
    if (dom.addEventListener) {
      dom.removeEventListener('touchstart', mobile_onTouchstart);
      dom.removeEventListener('touchmove', mobile_onTouchmove);
      dom.removeEventListener('touchend', mobile_onTouchend);
      dom.removeEventListener('touchcancel', mobile_onTouchcancel);
      
      dom.addEventListener('touchstart', mobile_onTouchstart, true);
      dom.addEventListener('touchmove', mobile_onTouchmove, true);
      dom.addEventListener('touchend', mobile_onTouchend, true);
      dom.addEventListener('touchcancel', mobile_onTouchcancel, true);
    }
    else {
      dom.detachEvent('ontouchstart', mobile_onTouchstart);
      dom.detachEvent('ontouchmove', mobile_onTouchmove);
      dom.detachEvent('ontouchend', mobile_onTouchend);
      dom.detachEvent('ontouchcancel', mobile_onTouchcancel);
      
      dom.attachEvent('ontouchstart', mobile_onTouchstart);
      dom.attachEvent('ontouchmove', mobile_onTouchmove);
      dom.attachEvent('ontouchend', mobile_onTouchend);
      dom.attachEvent('ontouchcancel', mobile_onTouchcancel);
    }
  } // if.
}
