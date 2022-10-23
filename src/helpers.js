export function waitForElm(selector) {
	return new Promise(resolve => {
		const cache = document.querySelector(selector)
		if (cache) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(_ => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});


		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false
		})
	})
}
/**
export interface CommentThread {
	kind:          string;
	etag:          string;
	nextPageToken: string;
	pageInfo:      PageInfo;
	items:         Item[];
}

export interface Item {
	kind:    Kind;
	etag:    string;
	id:      string;
	snippet: ThreadSnippet;
}

export interface ThreadSnippet {
	videoId:         VideoID;
	topLevelComment: TopLevelComment;
	canReply:        boolean;
	totalReplyCount: number;
	isPublic:        boolean;
}

export interface TopLevelComment {
	kind:    Kind;
	etag:    string;
	id:      string;
	snippet: CommentSnippet;
}

export enum Kind {
	YoutubeCommentThread = "youtube#commentThread",
	YoutubeComment = "youtube#comment",
}

export interface CommentSnippet {
	videoId:               string;
	textDisplay:           string;
	textOriginal:          string;
	authorDisplayName:     string;
	authorProfileImageUrl: string;
	authorChannelUrl:      string;
	authorChannelId:       AuthorChannelID;
	canRate:               boolean;
	viewerRating:          ViewerRating;
	likeCount:             number;
	publishedAt:           Date;
	updatedAt:             Date;
}

export interface AuthorChannelID {
	value: string;
}

export enum ViewerRating {
	None = "none",
}

export interface PageInfo {
	totalResults:   number;
	resultsPerPage: number;
}
*/