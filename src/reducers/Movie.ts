import MovieActionType from '../actions/Movie/ActionType';
import MovieAction from '../actions/Movie/Action';
import { MovieListModel, MovieModel } from "../model/MovieModel";
import createReducer from "./createReducer";

const initialStateMovie: MovieListModel = {
	results : [],
	offset: 0,
	count: 0
};

export const movie = createReducer<MovieListModel>(initialStateMovie, {
	[MovieActionType.GET_MOVIE_SUCCEEDED](state: MovieListModel, action: MovieAction) {
		const newList:any = []
		const result:any = action.payload
		result.results.map( (value:MovieModel)  => {
			const category = value.id
			const src = value.file
			newList.push({
				category,
				src
			})
		});
		return {
			results : newList,
			offset : result.offset,
			count: result.count,
		}
	}
});

