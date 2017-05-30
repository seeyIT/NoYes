module.exports = function (mongoose) {

    // dla skrócenia późniejszej pisowni 

    var Schema = mongoose.Schema;

    // przykładowy schemat podatnika
    // zawiera niezbędne informacje na temat struktury tworzonego dokumentu
    // zwłaszcza : typ danych, czy pole jest wymagane, wartości domyślne, ew zakres

    var brickSchema = new Schema(
        {
            name: { type: String, required: true },
            user: { type: String, required: true },
            positionX: { type: Number, required: true },
            positionY: { type: Number, required: true },
            positionZ: { type: Number, required: true },
            color: { type: String,  defualt: "0xffffff" },
        });

    //nazwa, user,pozycja, kolor, 
    //default: false,
    // obiekt który chcemy wyeksportować z tego pliku
    // może zawierać więcej niż jeden model,
    // co jest zakomentowane

    var models = {
        Brick: mongoose.model("Brick", brickSchema),
        // Kierowca: mongoose.model("Kierowca", kierowcaSchema) , 
        // Inny: mongoose.model("Inny", innySchema) ,   
    }

    return models;

}