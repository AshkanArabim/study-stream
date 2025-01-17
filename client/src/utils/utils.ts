type JSONValue = string | number | boolean | JSONObject | null ; // | JSONArray
interface JSONObject {
    [key: string]: JSONValue;
}
// interface JSONArray extends Array<JSONValue> {} 

export function extractStrings(obj: JSONObject): string[] {
    const result: string[] = [];

    function traverse(value: JSONValue): void {
        if (typeof value === "string") {
            result.push(value);
        } else if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    traverse(item);
                }
            } else {
                for (const key in value) {
                    traverse(value[key]);
                }
            }
        }
    }

    traverse(obj);
    return result;
}
