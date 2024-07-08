import jsonwebtoken from "jsonwebtoken";

class JWT{
    constructor(){
        // this.sign = this.sign.bind(this);
        // this.verify = this.verify.bind(this);
    }

    sign(payload : {[key : string] : any}, secret : string, options : jsonwebtoken.SignOptions){
        return jsonwebtoken.sign(payload, secret, options);
    }

    verify(token : string, secret : string, options : jsonwebtoken.VerifyOptions){
        return jsonwebtoken.verify(token, secret, options);
    }
}

export default JWT;