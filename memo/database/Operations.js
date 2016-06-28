module.exports = function () {
    var opers = {

        // wstawienie jednego "rekordu" do dokumentu - INSERT

        insert: function (data) {
            data.save(function (error, data, dodanych) {
                //console.log("dodano " + data)
            });
        },

        // pobranie wszystkich "rekordów" z dokumentu - SELECT
        // zwracamy uwagę na argument Model

        getAll: function (Model) {
            Model.find({}, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        //pobranie z ograniczeniem ilości i warunkiem - WHERE, LIMIT

        selectByNickname: function (Model, imie, count) {
            Model.find({ imie: imie }, function (error, data) {
                if (error) return console.error(error);
                console.log(data);
            }).limit(count);
        },

        login: function (Model, nickname, password, sid, callback) {
            Model.find({ nickname: nickname, password: password }, function (error, data) {
                if (error) return console.error(error);

                console.log(data);

                if (data.length > 0) {
                    if (data[0].logged_in)
                        callback(false);
                    else {
                        Model.findOne({ nickname: nickname }, function (error, doc) {
                            if (error) return console.error(error);

                            doc.logged_in = true;
                            doc.sid = sid;
                            doc.save();
                        });

                        callback(nickname);
                    }
                }
                else
                    callback(false);
            });
        },

        register: function (Model, nickname, password, callback) {
            Model.find({ nickname: nickname }, function (error, data) {
                if (error) return console.error(error);

                console.log(data.length);

                if (data.length > 0) {
                    callback(false);
                }
                else {
                    var user = new Model({
                        nickname: nickname,
                        password: password,
                        logged_in: false,
                        played: 0,
                        won: 0,
                        sid: null
                    });

                    user.validate(function (error) {
                        console.log(error);
                    });

                    user.save(function (error, data, dodanych) {
                        console.log("Dodano użytkownika " + data);
                        callback(true);
                    });
                }
            });
        },

        logout: function (Model, sid) {
            Model.find({ sid: sid }, function (error, data) {
                if (error) return console.error(error);

                if (data.length > 0) {
                    Model.findOne({ sid: sid }, function (error, doc) {
                        if (error) return console.error(error);

                        doc.logged_in = false;
                        doc.save();
                    });
                }
            });
        },

        getRanking: function (Model, callback) {
            Model.find({}, function (err, data) {
                if (err) return console.error(err);

                var users = [];

                for (var i in data) {
                    users.push({
                        nickname: data[i].nickname,
                        score: (2 * data[i].won) - data[i].played
                    });
                }

                users.sort(function (a, b) {
                    return parseInt(b.score) - parseInt(a.score);
                });

                callback(users);
            })
        },

        incPlayed: function (Model, nickname) {
            Model.findOne({ nickname: nickname }, function (error, doc) {
                if (error) return console.error(error);

                doc.played++;
                doc.save();
            });
        },

        incWon: function (Model, nickname) {
            Model.findOne({ nickname: nickname }, function (error, doc) {
                if (error) return console.error(error);

                doc.won++;
                doc.save();
            });
        },

        logoutAll: function (Model) {
            Model.update({ logged_in: true }, { logged_in: false }, { multi: true }, function (error, data) {
                if (error) return console.error(error);

                console.log(data);
            });
        },

        //usuniecie danych - DELETE

        truncate: function (Model) {
            Model.remove(function (error, data) {
                if (error) return console.error(error);

                console.log(data);
            })
        },

        // pozostałe niezbędne operacje trzeba sobie dopisać samemu, 
        // na podstawie dokumentacji Mongoose
    }

    return opers;

}