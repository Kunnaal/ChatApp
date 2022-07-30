// Code generator function

// Array to store all codes
var code_arr = []

module.exports.codeGenerator = (req, res) => {
    // console.log(String.fromCharCode(Math.floor((Math.random() * 100)/4)+97))
    let code_str = ''
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            code_str = code_str.concat('-')
        }
        code_str = code_str.concat(String.fromCharCode(Math.floor((Math.random() * 104) / 4) + 97))
    }

    let data = {
        "code": code_str
    };
    code_arr.push(data.code);
    console.log(code_arr);
    res.send(data);
};

