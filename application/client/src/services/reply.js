import axios from "axios";

class ReplyDataService {
    /*
        {
            "comment":"",
            "post_id":"",
            "comment_by":""
        }
    */
    addReply(data) {
        return axios.post("http://34.125.134.2:5000/api/reply", data)
    }
}

export default new ReplyDataService()