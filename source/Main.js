/* Copyright 2011 Akanster, All rights reserved. */
enyo.kind({
	name: "Akanster.HackerNewsReaderHD.Main",
	kind: enyo.VFlexBox,
	components: [
		{flex: 1, kind: "Scroller", className: "list-body", autoHorizontal: false, horizontal: false, components: [
			{name: "list", kind: "VirtualRepeater", onSetupRow: "getListItem",
				components: [
					{kind: "Item", flex: 1, tapHighlight: true, layoutKind: "VFlexLayout", components: [
						{name: "newsTitle", className: "news-title"},
						{kind: "HFlexBox", components: [
							{name: "newsPoints", className: "news-points"},
						]}
					]}
				]
			}
		]},
		{name: "getShots", kind: "WebService", onSuccess: "gotShots", onFailure: "gotShotsFailure"},
		{kind: "Toolbar", className: "enyo-toolbar-light hackernews-toolbar", components: [
			{name: "refreshButton", icon: "images/icons/menu-icon-refresh.png", className: "refresh-button", onclick: "refreshClick"},
			{flex: 1},
			{kind: "RadioGroup", style: "width:400px", value: "Front", onChange: "radioButtonSelected", components: [
				{caption: "Front Page", value: "Front"},
				{caption: "Ask HN", value: "Ask"},
				{caption: "New Posts", value: "New"}
			]},
			{flex: 1},
			{name: "forwardButton", icon: "images/icons/menu-icon-forward.png", className: "forward-button", onclick: "forwardClick"}
		]}
	],
	create: function() { // override the inherited create method from VFlexBox
		this.inherited(arguments); //calls the create method of our kind's superkind
		this.results = [];
		this.nextId;
		this.temp;
		
		this.urlFront = "http://api.ihackernews.com/page/";
		this.urlAsk = "http://api.ihackernews.com/ask/";
		this.urlNew = "http://api.ihackernews.com/new/";
		
		//this.url = "http://api.ihackernews.com/page/";
		
		this.$.getShots.setUrl(this.urlFront);
		this.$.getShots.call();
	},
	refreshClick: function() { // reset tab button
		//this.$.getShots.setUrl(this.url);
		this.$.getShots.call();
	},
	forwardClick: function() { // error.  when you set url, dont get it again and add next url to it.  get the base API url!
		this.temp = this.$.getShots.url + this.nextId;
		this.$.getShots.setUrl(this.temp);
		//temp = "";
		this.$.getShots.call();
	},
	gotShots: function(inSender, inResponse, inRequest) {
		this.results = inResponse.items;
		this.nextId = inResponse.nextId;
		
		this.log("nextId: " + this.nextId);
		this.log("Success!: URL -> " + this.$.getShots.url);
		
		this.$.list.render();
	},
	gotShotsFailure: function(inSender, inResponse) {
		// TODO: handle failure gracefully.  Save previous data.  If we get here, revert to previous state!.
		console.log("got failure from getFeed");
	},
	getListItem: function(inSender, inIndex) {
		var r = this.results[inIndex];
		if (r) {
			this.$.newsTitle.setContent(r.title);
			this.$.newsPoints.setContent(r.points + ((r.points == "1") ? " point" : " points") + " by " + r.postedBy + " " + r.postedAgo + " | " + r.commentCount + ((r.commentCount == "1") ? " comment" : " comments"));
			// ((r.points == "1") ? " point" : " points")
			return true;
		}
	},
	radioButtonSelected: function(inSender) {
		this.log(inSender.getValue() + " tab clicked!");
		
		this.$.scroller.setScrollTop(0);
		this.$.scroller.setScrollLeft(0);
		
		switch (inSender.getValue())
		{
			case "Front":
				this.$.getShots.setUrl(this.urlFront);
				break;
			case "Ask":
				this.$.getShots.setUrl(this.urlAsk);
				break;
			case "New":
				this.$.getShots.setUrl(this.urlNew);
				break;
		}
		//this.$.list.punt();
		this.$.getShots.call();
	}
});