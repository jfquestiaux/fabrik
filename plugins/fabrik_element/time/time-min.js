/*! fabrik */
var FbTime=new Class({Extends:FbElement,initialize:function(a,b){this.plugin="time",this.parent(a,b)},getValue:function(){var a=[];return this.options.editable?(this.getElement(),this._getSubElements().each(function(b){a.push(b.get("value"))}),a):this.options.value},update:function(a){"string"===typeOf(a)&&(a=a.split(this.options.separator)),this._getSubElements().each(function(b,c){b.value=a[c]})}});