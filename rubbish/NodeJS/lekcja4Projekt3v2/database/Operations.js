module.exports = function () {

    var opers = {

        // wstawienie jednego "rekordu" do dokumentu - INSERT

        InsertOne: function (data) {
            data.save(function (error, data, dodanych) {
                //console.log("Operations.js | dodano \n" + data)
            })
        },

        // pobranie wszystkich "rekordów" z dokumentu - SELECT
        // zwracamy uwagę na argument Model

        SelectAll: function (Model,callback) {
            Model.find({}, function (err, data) {
                if (err) return console.error(err);
                callback(data);
            })
        },

        //pobranie z ograniczeniem ilości i warunkiem - WHERE, LIMIT

        //SelectByImie: function (Model, imie, count) {
        //    Model.find({ imie: imie }, function (err, data) {
        //        if (err) return console.error(err);
        //        console.log(data);
        //    }).limit(count)
        //},

        SelectByImie: function (Model, imie,/* count,*/callback) {
            Model.find({ user: imie },
                function(err, data) {
                    if (err) return console.error(err);
                    //console.log(data);
                    callback(data);
                })
            //.limit(count);

        },
        SelectAndLimit: function (Model, count, callback) {
            var obj = {};
            Model.find({}, function (err, data) {
                if (err) {
                    obj.data = err
                }
                else {
                    obj.data = data
                }
                //funkcja zwracająca dane na zewnątrz
                callback(obj);
            }).limit(count)
        },
        //aktualizacja - np zamiana imienia - UPDATE

        UpdateImie: function (Model, oldName, newName) {
            Model.update({ imie: oldName }, { imie: newName }, function (err, data) {
                if (err) return console.error(err);
                //console.log(data);
            })
        },

        //usuniecie danych - DELETE

        DeleteAll: function (Model) {
            Model.remove(function (err, data) {
                if (err) return console.error(err);
                //console.log(data);
            })
        },

        

        // pozostałe niezbędne operacje trzeba sobie dopisać samemu, 
        // na podstawie dokumentacji Mongoose
    }

    return opers;

}