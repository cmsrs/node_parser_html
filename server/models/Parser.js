const fs = require('fs');

class Parser {

  constructor() {
      this.filename = './data.txt';
  }

  /**
  * get file contetent
  */
  getHtml(cb){
    fs.readFile(this.filename, 'utf8', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  }

  /**
  * return parse html
  */
  parseHtml( dataIn ){
    let out = dataIn.html;
    for( let item of dataIn.keys ){
      const itemOut =  '<a href=\"'+item.url+'\">'+item.key+'</a>';
      out = out.split(item.key).join(itemOut);
    }
    return out;
  }

  saveStrToFile( str, cb ){
    fs.writeFile(this.filename, str, (err) => {
      if (err){
        throw err;
      }
      cb();
    });
  }

  /**
  *  TODO: more validation rules
  */
  validate( dataIn ){
    if(!dataIn.html){
      return false;
    }
    return true;
  }
}

module.exports = Parser;
