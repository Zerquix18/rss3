import { ICurrentUser } from "../../models";

type ActionType = 'set_rss3';
export type Action = { type: ActionType } & { [key: string]: any };

function reducer(state: ICurrentUser, action: Action) {
  switch (action.type) {
    case 'set_rss3':
      return { ...state, rss3: action.rss3, profile: action.profile };
    default:
      return state;
  }
}

export default reducer;
