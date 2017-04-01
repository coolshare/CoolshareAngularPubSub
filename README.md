Coolshare Pub/Sub for Angular
===========================

By Mark Qian 3/2017 (markqian@hotmail.com)

The demo page: http://angularpubsub.coolshare.surge.sh

Description:

	Common ways to communicate between modules of your application using core Angular functionality include:

    - Using services
    - A module can be injected into another module
    - Using events
    - By assigning models on $rootScope
    - Directly between controllers, using $parent, $$childHead, $$nextSibling, etc.
    - Directly between controllers, using ControllerAs, or other forms of inheritance
    - More...
    
    There are three categories: 
    	- global (such as rootScope) or relative (like parent)
    	- events
    	- DI
    	
    The problem with first two categories is that you have to hard code the reference of parties. This is really bad 
    as things changing during development and it is hard to be tested.
    
    To target the problem, Angular provides a powerful mean, DI, to isolate service producers and consumers. 
    Even though DI provides some degree of isolation, it uses references(the machine addresses) to represent dependencies,
    which reduces a lot of potential on flexibility. 
    
    My point is that to achieve the better flexibility, the application level logic including module relation such as dependencies 
    between modules should not reside in codes. They are the "spirit" of the application just like human being mind should be 
    isolated/extracted from the body (codes of modules). DI in Angular can not achieve this since all the logic is represented by 	references.  
    
    An ideal flexible application should be built into two parts: a container with all the modules 
    in your layout and the logic that make the modules work together. It will be perfect if the logic can be
    extracted out of codes (container) and loaded as needed (at runtime!).
    	  
    My "different approach" is point-to-point publish/subscribe with dependency out of codes as plain text. 
    
    You may say, wait a minute: Angular has built-in environment for publish/subscribe - the emit and broadcast. 
    If you don't use broadcast heavily, it might be OK. It will become a performance issue if you have a huge scope 
    hierarchy and use publish/subscribe as your major mean for communication between modules or any DOM components. 
    The broadcasting is really overkill for most cases. Instead, straight point to point invocation is enough for many of us.

The key features:

 - You can publish topics from both javascript and JSX
 - You can specify any event to trigger the publishing
 - Macro Key Words allow you to publish with data you specified.
 

Instructions to use:

 A). publish a topic in two ways:
 
 	a). publish from javascript. To publish a topic in javascript, 
 	    you need to do the following:
 	    
 	    //Import
 	    import {PubSubManager} from './PubSubManager/PubSubManager'
 	    
 	    PubSubManager.Instance.publish("/MyTopic1", {"data":{"name":"John"}});
 	    
 	    
 	    where the second parameter of the "publish" method is "options" which contains the 
 	    data you like to pass with the topic.
 	    
 	b). publish from HTML. To publish a topic in HTML, 
 	    you need to do the following:
 	    
 	    //declare the "Publisher" in ngModel
 	    import { Publisher }  from './PubSubManager/Publisher';

		@NgModule({
		  imports:      [ BrowserModule ],
		  declarations: [ Publisher],
		  bootstrap:    [ AppComponent ]
		})
	
		//in your template	
		<button publisher="{'topic':'/RightPane/Botton/dh', 'options':{'dh':10}}">Button1</button>
		<a publisher="{'topic':'/InsidePane/Link/fg','event':'mouseover'}">Link1</a>
      
      where the attribute "options", optional, contains the data you want to pass with the topic.
      The content contained by "options" needs to be in a JSON format which will be evaluated into a javascript object.
      
      The "event" attribute is optional and the default is "click".

      Macro Key Words:
      ***************
      
        1). ___VALUE___ - this key word pointing to the value of the contained element. For example
           
	           <select publisher="{'topic':'/RightPane/Dropdown/bg', 'options':{'bgColor':'___VALUE___'}}">
	            	<option value="#ff0000">Red</option>
	            	<option value="#00ff00">Green</option>
	            	<option value="#0000ff">Blue</option>
            	</select>
	           
	          The example above indicate the "bgColor" in the options will be set to the value of select when a change
	          event occurs.        
               
  B). subscribe/unsubscribe a topic
  
    To subscribe a topic, you need to do the following:
 	    
 	    //Import
 	    import {PubSubManager} from './PubSubManager/PubSubManager';
 	    
 	    //In constructor
 	   	var topic = "/LeftPane/Botton/bg";
 	   	
 	   	//subscribe the topic and save the id return
	    self.subscriptionMap[topic] = PubSubManager.Instance.subscribe(topic, function(options:any) {
	    	PubSubManager.Instance.log("LeftPane received topic "+topic+" and options="+JSON.stringify(options));
	    	self.bg = options.color;
	    });
	    
	    //...
	    
	    //unsubscribe later
	    var topic = "/LeftPane/Botton/bg";
	    PubSubManager.Instance.unsubscribe(topic, self.subscriptionMap[topic]);
	    
  
  C). To run the sample code, you need to 

		1). download it from 
		
		    https://github.com/coolshare/CoolshareAngularPubSub/archive/master.zip
		    
		    and unzip it to, say c:\CoolshareAngularPubSub
		    
		    
		2). Prepare required environment
		
		    - install node.js
		    - install required lib by running
		       cd  c:\CoolshareAngularPubSub
		       npm install
		       
		3). Start the server and browser by
		
		    npm start
		         
		
		    You should see a browser page is opened at http://localhost:3000
		    
		Click each component on the page and the result will be shown in the console.
		
		Have fun!

  D). To install it into your React application, you need to 
  
     1). npm install coolshare_angular_pub_sub --save
     
     2). Follow the instructions in A). B). above to use it in your application.
     
     
Go Mark's home page http://MarkQian.com to see more.