import jsonwebtoken from "jsonwebtoken";

class JWT{
    constructor(){
        // this.sign = this.sign.bind(this);
        // this.verify = this.verify.bind(this);
    }

    generateAccessCode(length : number = 7){
        let codes = "";
        const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        for (let i = 0; i < length; i++) {
            const charPicker = Math.round(Math.random() * 1);

            // randomize between 0 and the lenght of the array
            if(charPicker == 0){
                const arrayPicker = Math.round(Math.random() * (alphabets.length - 1));
                codes += alphabets[arrayPicker]
            }else{
                const arrayPicker = Math.round(Math.random() * (numbers.length - 1));
                codes += numbers[arrayPicker]
            }
        }

        return codes;
    }

    sign(payload : {[key : string] : any}, secret : string, options : jsonwebtoken.SignOptions){
        return jsonwebtoken.sign(payload, secret, options);
    }

    verify(token : string, secret : string, options : jsonwebtoken.VerifyOptions){
        return jsonwebtoken.verify(token, secret, options);
    }
}

export default JWT;