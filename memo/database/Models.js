module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        nickname: { type: String, required: true },
        password: { type: String, required: true },
        logged_in: { type: Boolean, required: true },
        played: { type: Number, required: true },
        won: { type: Number, required: true },
        sid: { type: String, required: false }
    });

    var models = {
        User: mongoose.model("User", userSchema)
    }

    return models;
}