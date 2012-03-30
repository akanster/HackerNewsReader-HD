/* Copyright 2011 Akanster, All rights reserved. */
enyo.kind({
	name: "Akanster.HackerNewsReaderHD",
	kind: enyo.VFlexBox,
	components: [
		{name: "header", kind: "Akanster.HackerNewsReaderHD.Header"},
		{name: "pane", kind: "Pane", flex: 1, onSelectView: "viewSelected", transitionKind: "enyo.transitions.Simple",
			components: [  // first view will be selected by default
				{name: "shotBrowser", className: "enyo-bg", kind: "Akanster.HackerNewsReaderHD.Main"}
			]
		}
	],
	create: function() {
		this.inherited(arguments);
	}
});