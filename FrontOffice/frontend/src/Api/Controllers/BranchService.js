import ApiService from "../ApiService.js";
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 
class BranchService {
	
	static actionBranch(body) {
		return ApiService.post("api/branch/newbranch", body);
	}

	// static getAllOpenBranchesByRegion(region) {
	// 	return ApiService.post("api/branch/branchesbyregion", region);
	// }
}

export default BranchService;