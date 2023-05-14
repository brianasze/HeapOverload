import http from "../http-common.js"

class TagsDataService {
    getTag(query, by = "tag", page = 0) {
        return http.get(`tags?${by}=${query}`)
    }

    addTag(data) {
        return http.post("tags/", data)
    }
}

export default new TagsDataService()