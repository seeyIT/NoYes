﻿module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var podatnikSchema = new Schema(
        {
            imie: { type: String, required: true },
            nazwisko: { type: String, required: true },
            podatek: { type: Number, default: 0 },
            alive: { type: Boolean, default: false },
            age: { type: Number, required: true, min: 13, max: 120 }
        });


    // obiekt który chcemy wyeksportować z tego pliku
    // może zawierać więcej niż jeden model,
    // co jest zakomentowane

    var models = {
        Podatnik: mongoose.model("Podatnik", podatnikSchema),
        // Kierowca: mongoose.model("Kierowca", kierowcaSchema) , 
        // Inny: mongoose.model("Inny", innySchema) ,   
    }

    return models;

}