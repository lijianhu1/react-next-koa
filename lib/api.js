const tool = require("./tool");

module.exports = {
    prepareAuth(success){
      tool.ajax({
          url:"/prepare-auth",
          type:"get",
          success
      })
    },
    getUserInfo(success){
        tool.ajax({
            url:"/api/user/info",
            type:"get",
            success
        })
    }
}