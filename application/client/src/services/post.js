import axios from "axios"

/*
    This is where we define our apis from the web application to the web server
*/

class PostDataService {
    /*
        Returns a get call with no query so will give all data back, this is really not safe and should be changed for getXItem
    */
    getAll(page = 0) {
        return axios.get(`http://34.125.134.2:5000/api/post`)
    }
    /*
        Returns items specified, this could be expanded on by checking the by variable, to get tags, titles, posts or anything else
    */
    find(by = "title", query) {
        return axios.get(`http://34.125.134.2:5000/api/post?${by}=${query}`)
    }
    /*
        Post request to send data to the server, there is an error somewhere along this pipeline that doesn't get the data across
    */
    addPost(data) {
        return axios.post("http://34.125.134.2:5000/api/post", data)
    }

    addTagToPost(data){
        return axios.post("http://34.125.134.2:5000/api/post/tag", data)
    }
}

export default new PostDataService()