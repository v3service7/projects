import { Component, Inject, ViewContainerRef, OnInit } from '@angular/core';

import { Service } from '../service/service';
declare var $ : any;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(
		@Inject(Service) service,
		@Inject(ViewContainerRef) viewContainerRef,
		public services : Service
		) {

		service.setRootViewContainerRef(viewContainerRef);
		this.callJquery();
	}

	callJquery(){
		$(document).ready(function() {
	        $("#documents a").click(function() {
	            this.addTab($(this));
	        });

	        $('#tabs').on('click', 'a.tab' , function() {
	            var contentname = $(this).attr("id") + "_content";
	            console.log(contentname)
	            $("#content p").hide();
	            $("#tabs li").removeClass("current");
	            $("#" + contentname).show();
	            $(this).parent().addClass("current");
	        });

	        $('#tabs').on('click', ' a.remove',  function() {
	            var tabid = $(this).parent().find(".tab").attr("id");
	            var contentname = tabid + "_content";
	            $("#" + contentname).remove();
	            $(this).parent().remove();
	            if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {
	                var firsttab = $("#tabs li:first-child");
	                firsttab.addClass("current");
	                var firsttabid = $(firsttab).find("a.tab").attr("id");
	                $("#" + firsttabid + "_content").show();
	            }
	        });
	    });
	}

	ngOnInit() {
	}

	addAnotherTab(tab){
		this.addTab(tab);
	}

	getTabName(type){
		if (type == 'Agent') {
			return 'Agent'
	    }else if(type == 'Payee_Hirarchy'){
	    	return 'Payee Hirarchy'
	    }else if(type == 'Sub_Trans_1'){
	    	return 'Sub Transaction 1'
	    }else if(type == 'Sub_Trans_2'){
	    	return 'Sub Transaction 2'
	    }else if(type == 'Sub_Trans_3'){
	    	return 'Sub Transaction 3'
	    }else{
	    	return 'Reference'
	    }
	}

	addTab(link) {
		let atr = link.getAttribute('rel');

		let tabName = this.getTabName(atr);


    	if ($("#" + atr).length != 0){
    		var contentname = atr + "_content";
            $("#content p").hide();
            $("#tabs li").removeClass("current");
            $("#" + contentname).show();
            $("#" + atr).parent().addClass("current");
    	}else{
    		$("#tabs li").removeClass("current");
            $("#content p").hide();
            $("#tabs").append("<li class='current'><a class='tab' id='" +
                atr + "' href='javascript:void(0)'>" + tabName + 
                "</a><a href='javascript:void(0)' class='remove'>x</a></li>");


            let content = this.services.addDynamicComponent(atr);

            $("#content").append("<p id='" + atr + "_content'></p>");

            $("#" + atr + '_content').append(content);
            $("#" + atr + "_content").show();
    	}
    }

}
