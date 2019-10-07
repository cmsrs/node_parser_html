var assert = require('assert');

Parser = require("../server/models/Parser.js");
const P = new Parser();


describe('ParserClass', () => {

  describe('all process', () => {
    it('all process', () => {
      const dataIn = {
          "html": "<p>Polscy siatkarze...</p>",
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };

      const v = P.validate( dataIn );
      assert.equal(v, true);
      const out =  P.parseHtml( dataIn );

      P.saveStrToFile(out, () => {
        P.getHtml( (data) => {
          //console.log('gggg');
          assert.equal(data, dataIn.html);
        });
      });
    });
  });


  describe('getHtml', () => {
    it('get parse html ', () => {
      P.getHtml( (data) => {
        assert.ok(data);
      });
    });
  });

  describe('saveStrToFile', () => {
    it('save str to file ', () => {
      const str = "test123";
      P.saveStrToFile(str, () => {
        assert.ok(true);
      });
    });
  });

  describe('parseHtml', () => {

    it('parse html test1', () => {
      const dataIn = {
          "html": "<p>Polscy siatkarze w półfinale mistrzostw Europy w Lublanie chcieli przełamać złą passę w pojedynkach ze Słoweńcami. W dwóch poprzednich edycjach czempionatu Starego Kontynentu odpadli właśnie po porażkach z tymi rywalami. Niestety tym razem znów się nie udało.</p>",
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };

      const out =  P.parseHtml( dataIn );
      const count1 = out.split("http://www.infor.pl").length - 1;
      assert.equal(count1, 1);

      const count2 = out.split("http://www.dziennik.pl").length - 1;
      assert.equal(count2, 0);
    });

    it('parse html test2', () => {
      const dataIn = {
          "html": "<span>Test: lasami państwowymi</span><p>Polscy siatkarze w półfinale mistrzostw Europy w Lublanie chcieli przełamać złą passę w pojedynkach ze Słoweńcami. W dwóch poprzednich edycjach czempionatu Starego Kontynentu odpadli właśnie po porażkach z tymi rywalami. Niestety tym razem znów się nie udało.</p>",
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };

      const out =  P.parseHtml( dataIn );
      const count1 = out.split("http://www.infor.pl").length - 1;
      assert.equal(count1, 1);

      const count2 = out.split("http://www.dziennik.pl").length - 1;
      assert.equal(count2, 1);
    });

    it('parse html test3 - big string', () => {

      let str = '';
      const n = 10000;
      for(let i=0; i<n; i++){
        str += "<span>Test: lasami państwowymi</span><p>Polscy siatkarze w półfinale mistrzostw Europy w Lublanie chcieli przełamać złą passę w pojedynkach ze Słoweńcami. W dwóch poprzednich edycjach czempionatu Starego Kontynentu odpadli właśnie po porażkach z tymi rywalami. Niestety tym razem znów się nie udało.</p>";
      }

      const dataIn = {
          "html": str,
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };

      const out =  P.parseHtml( dataIn );
      const count1 = out.split("http://www.infor.pl").length - 1;
      assert.equal(count1, n);

      const count2 = out.split("http://www.dziennik.pl").length - 1;
      assert.equal(count2, n);
    });


  });

  describe('validate', () => {
    it('validate ', () => {

      const dataIn = {
          "html": "test12",
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };
      const v1 = P.validate( dataIn );
      assert.equal(v1, true);

      const dataIn2 = {
          "html2": "test12",
          "keys": [{"key": "mistrzostw Europy", "url": "http://www.infor.pl"}, {"key": "lasami państwowymi", "url": "http://www.dziennik.pl"}]
      };
      const v2 = P.validate( dataIn2 );
      assert.equal(v2, false);
    });
  });


});
