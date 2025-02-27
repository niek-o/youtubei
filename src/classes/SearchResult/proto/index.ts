import proto from "protocol-buffers";

import {
	SearchDuration,
	SearchOptions,
	SearchSort,
	SearchType,
	SearchUploadDate,
} from "../SearchResult";
import { SearchProto as ProtoType } from "./SearchProto";

// TODO move this to .proto file
export const SearchProto = proto<ProtoType>(`
	message SearchOptions {
		message Options {
			optional int32 uploadDate = 1;
			optional int32 type = 2;
			optional int32 duration = 3;
		}

		optional int32 sortBy = 1;
		optional Options options = 2;
	}
`);

const searchUploadDateProto: Record<SearchUploadDate, number> = {
	all: 0,
	hour: 1,
	today: 2,
	week: 3,
	month: 4,
	year: 5,
};

const searchTypeProto: Record<SearchType, number> = {
	all: 0,
	video: 1,
	channel: 2,
	playlist: 3,
};

const searchDurationProto: Record<SearchDuration, number> = {
	all: 0,
	short: 1,
	long: 2,
	medium: 3,
};

const searchSortProto: Record<SearchSort, number> = {
	relevance: 0,
	rating: 1,
	date: 2,
	view: 3,
};

export const optionsToProto = (options: SearchOptions): ProtoType["SearchOptions"] => {
	return {
		sortBy: options.sortBy && searchSortProto[options.sortBy],
		options: {
			duration: options.duration && searchDurationProto[options.duration],
			type: options.type && searchTypeProto[options.type],
			uploadDate: options.uploadDate && searchUploadDateProto[options.uploadDate],
		},
	};
};
