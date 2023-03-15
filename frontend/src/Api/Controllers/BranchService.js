import ApiService from "../ApiService.js";
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 
class BranchService {
	
	static actionBranch(body) {
		return ApiService.post("api/branch/newbranch", body);
	}
}

export default BranchService;