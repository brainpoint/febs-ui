
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

// event.
exports.maskPreventEvent = function(ee) {
  if (window.febs.utils.browserIsMobile()) {
    ee.off('touchmove', maskPreventHandler);
    ee.on('touchmove', maskPreventHandler);
  }
  else {
    ee.off('mousewheel', maskPreventHandler);
    ee.on('mousewheel', maskPreventHandler);
  }
}