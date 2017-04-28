/*
 Coolshare Angular PubSub - A package/service to provide
 publish/subscribe pattern for communication in Angular

 Copyright (C) 2017 Mark Qian <markqian@hotmail.com>


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

import { Directive, ElementRef } from '@angular/core';

import {PubSubManager} from './PubSubManager'


@Directive({ selector: '[publisher]' })
export class Publisher {
    pubSubManager: PubSubManager;
    element:any;
    options:any;
    
	constructor(el: ElementRef) {
		this.pubSubManager = PubSubManager.Instance;
		this.element = el.nativeElement;
		var ttt:string = "("+this.element.attributes.publisher.nodeValue+")";
		this.options = eval(ttt);
		var self = this;
		var eventType:string = "click";
		if (this.options["event"] !== undefined) {
			
			eventType = this.options["event"];
		}
		this.element["on"+eventType] = function() {
			var ttt:string = "("+self.element.attributes.publisher.nodeValue+")";
			self.options = eval(ttt);
			self.handleMacroWords(self.options.options);
			/*for (var i in self.options) {
			  var item = self.options[i];
			  if (item==="___VALUE___") {
				  self.options[i] = self.element;
			  } //else if (item["___FUNCTION___"]!==undefined && this.props.owner!==undefined) {
				//  self.options[i] = this.props.owner[item["___FUNCTION___"]]();
			  //}
		   }*/
			self.pubSubManager.publish(self.options.topic, self.options.options||{});
		}
	

/*
   // this.publish = this.publish.bind(this);
    if (props.classes) {
    	let cn = [];
    	for (let c of props.classes) {
    		cn.push(c);
    	}
    	this.ppp.className = cn.join(" ");
    }
    this.event = "Click";
    if (props.event) {
    	this.event = props.event;
    }*/
    
  }
  
  handleMacroWords(obj:any) {
  	for (let key in obj) {
  		let value:any = obj[key];
  		if (typeof value === "string") {
  			obj[key] = this.handleMacroWord(value);
  		} else if (typeof value === "number"){
  			continue;
  		} else {
  			this.handleMacroWords(obj[key]);
  		}
  	}
  }
  
  handleMacroWord(value:string) {
  	if (value==="___VALUE___") {
  		return this.element.value;
  	}
  	return value;
  }
  
 /* publish(e) {
	  console.log("publishing:"+this.props.topic+" event:"+this.props.event)
	  var options = {};
	  if (this.props.options) {
		  options = eval("("+this.props.options+")")
		  for (var i in options) {
			  var item = options[i];
			  if (item==="___VALUE___") {
				  var $this = $(e.target);
				  options[i] = $(e.target).val();
			  } else if (item["___FUNCTION___"]!==undefined && this.props.owner!==undefined) {
				  options[i] = this.props.owner[item["___FUNCTION___"]]();
			  }
		  }
	  }
	  this.pubSubManager.publish(this.props.topic, options);
  }
  
  render() {
	  var self = this;
	  var notFound = false;
	  var children = React.Children.map(this.props.children, function (c, index) {		  
		  var ppp = $.extend({}, c.props);
		  ppp["on"+self.event] = self.publish;
		  var ccc = React.DOM[c.type];
		  if (ccc) {
			  return ccc(ppp);
		  } else {
			  notFound = true;
			  return c;
		  }
		  
      });
	  if (notFound) {
		  var ppp = {};
		  if (self.props.classes) {
	    	var cn = [];
	    	for (var c in self.props.classes) {
	    		cn.push(c);
	    	}
	    	ppp.className = cn.join(" ");
	      }

	      if (self.props.event) {
	    	ppp["on"+self.props.event] = function() {
	    		self.publish();
	    	}
	      } else {
	    	ppp["onClick"] = self.publish;
	      }
		  return <div { ...ppp } >{self.props.children}</div>;
	  } else {
		  return (
				  <div>
				  {children}
				  </div>
		    );
	  }
	  
  }*/
}
