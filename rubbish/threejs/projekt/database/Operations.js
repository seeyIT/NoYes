module.exports = function () {
    var ops = {
        insert: function (data) {
            data.save(function (error, data, dodanych) {
                console.log("dodano " + data)
            });
        },

        selectAll: function (Model) {
            Model.find({}, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            });
        },

        selectByImie: function (Model, imie, count) {
            Model.find({ imie: imie }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            }).limit(count);
        },

        updateImie: function (Model, oldName, newName) {
            Model.update({ imie: oldName }, { imie: newName }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            });
        },

        deleteAll: function (Model) {
            Model.remove(function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            });
        }
    }

    return ops;
}