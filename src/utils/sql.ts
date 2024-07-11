import { SqlType } from "../constants/interface";

class SqlParser{
    private static types : { [key : string] : string} = {
        string: "TEXT",
        number : "INT",
        date : "DATETIME",
        boolean : "INT (11)",
        function : "",
        undefined : ""
    }

    public static parse(fields : SqlType[]) : String{
        let query = "";

        // loop through object
        fields.map((fld, index)=>{
            // skip id field
            if(fld.field !== "id"){
                query += (`${fld.field} ${fld.type}` +  (fld.length ? `(${fld.length}), ` : (index + 1) !== fields.length ? `, ` : ``));
            }
        })

        return query;
    }

    public static queryParse(data : { [key : string] : any}) : [string, any[]]{
        let query = "";
        const values : any[] = [];

        // loop through object
        for (const key in data){
            if(Object.keys(data).indexOf(key) < Object.keys(data).length - 1){
                query += `${key.toUpperCase()} = ?, `;
            }else{
                query += `${key.toUpperCase()} = ?;`;
            }
            
            values.push(data[key]);
        } 

        return [query, values];
    }
}

export default SqlParser;