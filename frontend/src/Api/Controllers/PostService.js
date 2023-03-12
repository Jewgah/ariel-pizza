import ApiService from "../ApiService.js";
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 
class PostService {
	static createNewPost(body) {
		return ApiService.post("api/post/new", body);
	}
}

export default PostService;
