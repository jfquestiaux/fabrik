/*! fabrik */
var FbThumbsList=new Class({options:{imageover:"",imageout:"",userid:"",formid:0,noAccessMsg:"",canUse:!0},Implements:[Events,Options],initialize:function(a,b){this.setOptions(b),this.col=document.getElements("."+a),this.origThumbUp={},this.origThumbDown={},Fabrik.bootstrapped||this.options.j3?"comment"===this.options.voteType?this.setUpBootstrappedComments():this.setUpBootstrapped():this.col.each(function(a){var b=a.getParent(".fabrik_row");if(b){var c=b.id.replace("list_"+this.options.renderContext+"_row_",""),d=a.getElements(".thumbup"),e=a.getElements(".thumbdown");d.each(function(a){this.options.canUse?(a.addEvent("mouseover",function(){a.setStyle("cursor","pointer"),a.src=this.options.imagepath+"thumb_up_in.gif"}.bind(this)),a.addEvent("mouseout",function(){a.setStyle("cursor",""),a.src="up"===this.options.myThumbs[c]?this.options.imagepath+"thumb_up_in.gif":this.options.imagepath+"thumb_up_out.gif"}.bind(this)),a.addEvent("click",function(){this.doAjax(a,"up")}.bind(this))):a.addEvent("click",function(a){a.stop(),this.doNoAccess()}.bind(this))}.bind(this)),e.each(function(a){this.options.canUse?(a.addEvent("mouseover",function(){a.setStyle("cursor","pointer"),a.src=this.options.imagepath+"thumb_down_in.gif"}.bind(this)),a.addEvent("mouseout",function(){a.setStyle("cursor",""),a.src="down"===this.options.myThumbs[c]?this.options.imagepath+"thumb_down_in.gif":this.options.imagepath+"thumb_down_out.gif"}.bind(this)),a.addEvent("click",function(){this.doAjax(a,"down")}.bind(this))):d.addEvent("click",function(a){a.stop(),this.doNoAccess()}.bind(this))}.bind(this))}}.bind(this))},setUpBootstrappedComments:function(){document.addEvent("click:relay(*[data-fabrik-thumb])",function(a,b){if(this.options.canUse){var c=b.hasClass("btn-success")?!1:!0,d=b.get("data-fabrik-thumb"),e=b.get("data-fabrik-thumb-formid"),f=b.get("data-fabrik-thumb-rowid");if(this.doAjax(b,d,c),"up"===d)if(c){b.addClass("btn-success");var g=document.getElements("button[data-fabrik-thumb-formid="+e+"][data-fabrik-thumb-rowid="+f+"][data-fabrik-thumb=down]");g.removeClass("btn-danger")}else b.removeClass("btn-success");else{var h=document.getElements("button[data-fabrik-thumb-formid="+e+"][data-fabrik-thumb-rowid="+f+"][data-fabrik-thumb=up]");c?(b.addClass("btn-danger"),h.removeClass("btn-success")):b.removeClass("btn-danger")}}else a.stop(),this.doNoAccess()}.bind(this))},setUpBootstrapped:function(){this.col.each(function(a){var b=a.getParent(".fabrik_row");if(b){var c=(b.id.replace("list_"+this.options.renderContext+"_row_",""),a.getElement("button.thumb-up")),d=a.getElement("button.thumb-down");c.addEvent("click",function(a){if(a.stop(),this.options.canUse){var b=c.hasClass("btn-success")?!1:!0;this.doAjax(c,"up",b),b?(c.addClass("btn-success"),"null"!==typeOf(d)&&d.removeClass("btn-danger")):c.removeClass("btn-success")}else this.doNoAccess()}.bind(this)),"null"!==typeOf(d)&&d.addEvent("click",function(a){if(a.stop(),this.options.canUse){var b=d.hasClass("btn-danger")?!1:!0;this.doAjax(d,"down",b),b?(d.addClass("btn-danger"),c.removeClass("btn-success")):d.removeClass("btn-danger")}else this.doNoAccess()}.bind(this))}}.bind(this))},doAjax:function(a,b,c){if(this.options.canUse){c=c?!0:!1;{var d=a.getParent(),e=a.get("data-fabrik-thumb-rowid");document.id("count_thumb"+b+e)}Fabrik.loader.start(d),this.thumb=b;var f={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"thumbs",method:"ajax_rate",g:"element",element_id:this.options.elid,row_id:e,elementname:this.options.elid,userid:this.options.userid,thumb:this.thumb,listid:this.options.listid,formid:this.options.formid,add:c};"comment"===this.options.voteType&&(f.special="comments_"+this.options.formid),new Request({url:"",data:f,onComplete:function(a){{var b=document.id("count_thumbup"+e),c=document.id("count_thumbdown"+e);d.getElements(".thumbup"),d.getElements(".thumbdown")}Fabrik.loader.stop(d),a=JSON.decode(a),a.error?console.log(a.error):Fabrik.bootstrapped?(d.getElement("button.thumb-up .thumb-count").set("text",a[0]),"null"!==typeOf(d.getElement("button.thumb-down"))&&d.getElement("button.thumb-down .thumb-count").set("text",a[1])):(b.set("html",a[0]),c.set("html",a[1]))}.bind(this)}).send()}else this.doNoAccess()},doNoAccess:function(){""!==this.options.noAccessMsg&&alert(this.options.noAccessMsg)}});