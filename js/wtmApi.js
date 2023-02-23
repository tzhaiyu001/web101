var url_LoginJwt=  "http://60.214.131.142:3301/api/_Account/LoginJwt";
var url_GetfileInfo="http://60.214.131.142:3301/api/_file/GetFileInfo/"
var data_USER = {
"account": "admin",
"password": "000000"
};

// var data_DwSearch=  {"Dwqy": "市中区","Dwfzrdh":"18263212655"}
// var url_DwSearch = "http://60.214.131.142:3301/api/Dw/Search";
function runApi(_url,_data,_fun) {
    $.ajax({
        type: "POST",
        url: url_LoginJwt,
        data: JSON.stringify(data_USER),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var jwt = data.access_token;
            $.ajax({
                type: "post",
                url: _url,
                contentType: "application/json",
                data: JSON.stringify(_data),
                //验证
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", 'Bearer '+ jwt);
                },
                success: function (rec) {

                    var json_rec_data=  jQuery.parseJSON(rec);
                    _fun(json_rec_data);
                },
                error: function (rec) {
                    console.log(rec);
                    return "error";
                }
            });
        },
        error: function (data) {
            console.log(data);
            return "error";
        }
    });
}
