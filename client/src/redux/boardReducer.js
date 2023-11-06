const TYPE_SAVE = 'POST_SAVE';
const TYPE_DETAIL = 'POST_DETAIL';
const TYPE_EDIT = 'POST_EDIT';
const TYPE_REMOVE = 'POST_REMOVE';

export const savePost = (postData) => ({
    type : TYPE_SAVE,
    postData : {
        id : postData.id,
        title : postData.title,
        content : postData.content,
    }
})

export const detailPost = (id) => ({
    type : TYPE_DETAIL,
    postData :{
        id : id,
    }
})

export const editPost = (postData) => ({
    type: TYPE_EDIT,
    postData: {
        id: postData.id,
        title: postData.title,
        content: postData.content,
    }
})

export const removePost = (id) => ({
    type: TYPE_REMOVE,
    postData: {
        id: id,
    }
})

const initialState = {
    lastId :0,
    postData : [
        {
            id : '',
            title : '',
            content : '',
        }
    ],
    selectPostData: {},
}

export default function boardReducer(state = initialState, action){
    switch(action.type){
        case TYPE_SAVE:
            return {
                lastId : state.lastId+1,
                postData : state.postData.concat({
                    ...action.postData,
                    id : state.lastId +1,
                })
            }
        case TYPE_DETAIL: 
            return{
                ...state,
                selectPostData : state.postData.find(item=> item.id === action.postData.id)
            }
        case TYPE_EDIT:
            return {
                ...state,
                postData: state.postData.map(item => item.id === action.postData.id ? {...action.postData} : item),
                selectPostData: {}
            }
        case TYPE_REMOVE:
            return {
                lastId : state.lastId===action.postData.id ? state.lastId -1 : state.lastId,
                postData : state.postData.filter(item => item.id !==action.postData.id),
                selectPostData : {}
            }
        default:
            return state

    }
}