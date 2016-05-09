/*! Fabrik */
define(["jquery","fab/fabrik"],function(a,b){"use strict";var c=new Class({Implements:[Events],options:{observe:"",trigger:"",cnn:0,table:0,map:"",editOrig:!1,fillOnLoad:!1,confirm:!0,autofill_lookup_field:0},initialize:function(c){var d=this;this.options=a.extend(this.options,c),this.attached=[],this.setupDone=!1,this.setUp(b.getBlock("form_"+this.options.formid)),b.addEvent("fabrik.form.elements.added",function(a){d.setUp(a)}),b.addEvent("fabrik.form.element.added",function(a,b,c){d.element&&c.strElement===d.element.strElement&&(d.element=!1,d.setupDone=!1,d.setUp(a))})},getElement:function(a){var b,c=!1,d=this,e=this.form.formElements.get(this.options.observe),f=0;return e?this.attached.push(e.options.element):(b=Object.keys(this.form.formElements),b.each(function(b){b.contains(d.options.observe)&&(c=d.form.formElements.get(b),d.attached.contains(c.options.element)||d.attached.push(c.options.element),("null"===typeOf(a)||a===f)&&(e=c),f++)})),e},setUp:function(a){var b=this;if(!this.setupDone&&void 0!==a){try{this.form=a}catch(c){return}var d=function(a){b.lookUp(a)},e=!1,f=this.form.formElements.get(this.options.observe);if(f)this.attached.push(f.options.element);else{var g=0,h=Object.keys(this.form.formElements);h.each(function(a){if(a.contains(b.options.observe)){e=b.form.formElements.get(a),b.attached.contains(e.options.element)||b.attached.push(e.options.element);var c=parseInt(e.getRepeatNum(),10);(isNaN(c)||c===g)&&(f=e),g++}})}if(this.element=f,""===this.options.trigger)if(this.element){var i=this.element.getBlurEvent();this.attached.each(function(a){b.form.formElements.get(a);b.form.dispatchEvent("",a,i,function(a){b.lookUp(a)})})}else fconsole("autofill - couldnt find element to observe");else this.form.dispatchEvent("",this.options.trigger,"click",d);if(this.options.fillOnLoad){var j=""===this.options.trigger?this.element.strElement:this.options.trigger;this.form.dispatchEvent("",j,"load",d)}this.setupDone=!0}},lookUp:function(c){if(this.options.trigger||(this.element=c),this.options.confirm!==!0||window.confirm(Joomla.JText._("PLG_FORM_AUTOFILL_DO_UPDATE"))){b.loader.start("form_"+this.options.formid,Joomla.JText._("PLG_FORM_AUTOFILL_SEARCHING")),this.element||(this.element=this.getElement(0));var d=this.element.getValue(),e=this.options.formid,f=this.options.observe,g=this;a.ajax({url:"index.php",method:"post",dataType:"json",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"autofill",method:"ajax_getAutoFill",g:"form",v:d,formid:e,observe:f,cnn:this.options.cnn,table:this.options.table,map:this.options.map,autofill_lookup_field:this.options.autofill_lookup_field}}).always(function(){b.loader.stop("form_"+g.options.formid)}).fail(function(a,b){window.alert(b)}).done(function(a){g.updateForm(a)})}},updateForm:function(a){this.json=a,b.fireEvent("fabrik.form.autofill.update.start",[this,a]);var c,d,e,f,g=this.element.getRepeatNum();0===this.json.length&&window.alert(Joomla.JText._("PLG_FORM_AUTOFILL_NORECORDS_FOUND"));for(c in this.json)this.json.hasOwnProperty(c)&&(d=this.json[c],e=c.substr(c.length-4,4),"_raw"===e&&(c=c.replace("_raw",""),f=c,this.tryUpdate(c,d)||(c=this.updateRepeats(c,d,g,f))));this.options.editOrig===!0&&(this.form.getForm().getElement("input[name=rowid]").value=this.json.__pk_val),b.fireEvent("fabrik.form.autofill.update.end",[this,a])},updateRepeats:function(a,b,c,d){var e,f;if("object"==typeof b)for(e in b)b.hasOwnProperty(e)&&(f=a+"_"+e,this.tryUpdate(f,b[e]));else a+=c?"_"+c:"_0",this.tryUpdate(a,b)||(a="join___"+this.element.options.joinid+"___"+a,this.tryUpdate(d,b,!0));return a},tryUpdate:function(a,b,c){var d,e,f=this;if(c=c?!0:!1){if(d=Object.keys(this.form.formElements).filter(function(b){return b.contains(a)}),d.length>0)return d.each(function(a){e=f.form.elements[a],e.update(b),e.baseElementId!==f.element.baseElementId&&e.element.fireEvent(e.getBlurEvent(),new Event.Mock(e.element,e.getBlurEvent()))}),!0}else if(e=this.form.elements[a],void 0!==e)return"auto-complete"===e.options.displayType&&(e.activePopUp=!0),e.update(b),e.baseElementId!==this.element.baseElementId&&e.element.fireEvent(e.getBlurEvent(),new Event.Mock(e.element,e.getBlurEvent())),!0;return!1}});return c});