/* Copyright 2011 Akanster, All rights reserved. */
enyo.kind({
	name: "Akanster.HackerNewsReaderHD.Header",
	kind: enyo.VFlexBox,
	components: [ 
		{kind: "Header", className: "enyo-header hackernews-header", components: [
			{flex: 1},
			{content: "HackerNews Reader HD"}, 
			{flex: 1}
		]}
	]
});