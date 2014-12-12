(function($, window, document, undefined){

function FadeDeSwitch() {}

FadeDeSwitch.prototype = {
  
  init: function(opt) {
    var self = this;
    self.prm = {
      wrapper: '#fade-de-switch',
      container: '.container',
      item: '.item',
      pointers: '.pointers',
      duration: 5000
    }
    $.extend( self.prm, opt );
    
    self.$wrapper = $( self.prm.wrapper );
    self.$container = self.$wrapper.find( self.prm.container );
    self.$item = self.$container.find( self.prm.item );
    
    self.duration = self.prm.duration;
    self.count_min = 0;
    self.count_max = self.$item.length - 1;
    self.timer;
    self.once = false;
    self.count = self.getCookieCount();
    self._count = -1;
    
    self.setPointer();
    
    return self;
  },
  
  
  start: function() {
    var self = this;
    
    self.$item.eq( self.count ).css('display', 'block');
    self.$pointer.eq( self.count ).addClass('is-active');
    self._count = self.count;
    
    if( self.count ) {
      self.$pointers.css('display', 'block');
    }
    
    self.timer = setTimeout(
      $.proxy( self.ignition, self ),
      self.duration - 1000
    );
    
    self.setEvent();
  },
  
  
  setEvent: function() {
    var self = this;
    
    self.$container.click(function(){
      self.ignition();
    });
    
    self.$pointer.click(function(){
      self.count = self.$pointer.index(this);
      self.count--;
      self.ignition();
      //self.listFS.moveToPoint(self.count);
      return false;
    });
    
    $(window).load(function(){
      self.setHeight();
    });
  },
  
  
  setPointer: function() {
    var self = this;
    self.$pointers = self.$wrapper.find( self.prm.pointers );
    (function(){
      var str = '<span class="pointer is-none"></span>';
      for(var i=0,len=self.count_max; i<len; i++){
        str += '<span class="pointer"></span>';
      }
      self.$pointers.html(str);
    })();
    self.$pointer = self.$pointers.children('.pointer');
  },
  
  
  ignition: function() {
    var self = this;
    //console.log( self.count, self.count_max );
    
    if( self.count >= self.count_max ) {
      self.count = self.count_min;
    } else {
      self.count++;
    }
    
    self.animation();
  },
  
  
  animation: function() {
    var self = this;
    if( self._count == self.count ) return false;
    //console.log( 'animation', self.count, self._count );
    
    clearTimeout( self.timer );
    
    if( !self.once ) {
      self.$pointers.css('display', 'block');
      self.once = true;
    }
    
    if( -1 != self._count ) {
      self.$item.eq( self._count ).stop(true,false).fadeOut( 1400 );
      self.$pointer.eq( self._count ).removeClass('is-active');
    }
    
    self.$item.eq( self.count ).stop(true,false).fadeIn( 1400 );
    self.$pointer.eq( self.count ).addClass('is-active');
    
    self._count = self.count;
    
    $.cookie('fade-de-switch__count', self.count );
    //$.cookie('fade-de-switch_count', self.count, {path:'/'});
    
    self.timer = setTimeout(
      $.proxy( self.ignition, self ),
      self.duration
    );
  },
  
  
  getCookieCount: function() {
    var self = this,
        result = 0,
        count = $.cookie('fade-de-switch__count');
    
    result = ( count )? Number( count ) : 0 ;
    return result;
  },
  
  
  setHeight: function() {
    var self = this,
        maxHeight = 0;
    
    self.$item.each(function(){
      var $me = $(this),
          $img = $me.find('img');
          height = $img.height();
      maxHeight = Math.max( height, maxHeight );
    });
    
    self.$container.height( maxHeight );
  }
  
}

window.FadeDeSwitch = FadeDeSwitch;

})(jQuery, this, this.document);