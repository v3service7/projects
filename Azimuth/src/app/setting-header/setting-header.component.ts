import { Component, Inject, ViewContainerRef, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Service } from '../service/service';
declare var $ : any;

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.css']
})
export class SettingHeaderComponent implements OnInit {

	openTabs = [];

	constructor(
		@Inject(Service) service,
		@Inject(ViewContainerRef) viewContainerRef,
		public services : Service,
		private router : Router
		) {
		service.setRootViewContainerRef(viewContainerRef);
		this.callJquery();
	}

	homePage(){
		this.router.navigate(['/']);
	}

	callJquery(){
		var _that = this;
		$(document).ready(function() {
	        $("#documents a").click(function() {
	            this.addTab($(this));
	        });

	        $('#topTabs').on('click', 'div.tabAnchor' , function() {
	            var contentname = $(this).attr("id") + "_content";
	            console.log(contentname)
	            $("#content p").hide();
	            $("#topTabs li").removeClass("current");
	            $("#" + contentname).show();
	            $(this).parent().addClass("current");
	        });

	        $('#topTabs').on('click', ' a.remove',  function() {
	            var tabid = $(this).parent().find(".tabAnchor").attr("id");

	            $("[rel="+tabid+"]").removeClass('selected');
	            
	            _that.openTabs = _that.openTabs.filter((obj) => {
		            return (obj.atr != tabid);
		        });

		        localStorage.removeItem('settingOpenTabs');
		        localStorage.setItem('settingOpenTabs', JSON.stringify(_that.openTabs));


	            var contentname = tabid + "_content";
	            $("#" + contentname).remove();
	            $(this).parent().remove();
	            if ($("#topTabs li.current").length == 0 && $("#topTabs li").length > 0) {
	                var firsttab = $("#topTabs li:first-child");
	                firsttab.addClass("current");
	                var firsttabid = $(firsttab).find("div.tabAnchor").attr("id");

	                $("[rel="+firsttabid+"]").addClass('selected');

	                $("#" + firsttabid + "_content").show();
	            }
	        });
	    });
	}

	ngOnInit() {
		if (localStorage.getItem('settingOpenTabs')) {
			this.openTabs = JSON.parse(localStorage.getItem('settingOpenTabs'));

			if (this.openTabs.length > 0) {
				this.openTabs.forEach((item)=>{
					this.addTab(item['atr'], item['atrId']);
				});
			}
		}
	}

	addAnotherTab(tab){
		let atr = tab.getAttribute('rel');
		let atrId = tab.getAttribute('id');
		this.addTab(atr, atrId);
	}

	getTabName(type){
		if (type == 'Period_Config') {
			return 'Period Config'
	    }else if(type == 'Transaction_Config'){
	    	return 'Transaction Config'
	    }else{
	    	return 'Territory Config'
	    }
	}

	addTab(atr , atrId) {
		$('.list-group-item').removeClass('selected');
		$('#' + atrId).addClass('selected');

		let tabName = this.getTabName(atr);


    	if ($("#" + atr).length != 0){
    		var contentname = atr + "_content";
            $("#content p").hide();
            $("#topTabs li").removeClass("current");
            $("#" + contentname).show();
            $("#" + atr).parent().addClass("current");
    	}else{
    		let obj = {'atr' : atr, 'atrId' : atrId}

			let indx = this.openTabs.findIndex((item)=>{
    			return (item['atr'] == atr);
    		})

    		if (indx == -1) {
    			this.openTabs.push(obj);
    		}

    		localStorage.setItem('settingOpenTabs', JSON.stringify(this.openTabs));

    		$("#topTabs li").removeClass("current");
            $("#content p").hide();
            $("#topTabs").append("<li class='current tabHeading maxWidth12'><div class='tabAnchor' id='" +
                atr + "'>" + tabName + 
                "</div><a href='javascript:void(0)' class='remove'>x</a></li>");


            let content = this.services.addDynamicComponent(atr);

            $("#content").append("<p class = 'tabContent' id='" + atr + "_content'></p>");

            $("#" + atr + '_content').append(content);
            $("#" + atr + "_content").show();
    	}
    }

}
