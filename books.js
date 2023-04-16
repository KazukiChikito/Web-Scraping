const axios = require("axios");
const cheerio = require("cheerio");
const j2cp = require("json2csv").Parser;
const fs = require("fs");

const url = "http://books.toscrape.com/index.html";
let baseUrl = "http://books.toscrape.com/";
const book_data = [];

async function getBooks(url){
  try{
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const books = $("article");
    books.each(function(){
      title = $(this).find("h3 a").text();
      price = $(this).find(".price_color").text();
      instock = $(this).find(".instock").text().trim();

      book_data.push({title, price, instock});
    })

    if($(".next a").length>0){
      console.log($(".next a").length);
      if($(".next a").attr("href")==="catalogue/page-2.html"){
        next_page=baseUrl + $(".next a").attr("href");
        baseUrl += "catalogue/";
        getBooks(next_page);
      }
      else if($(".next a").attr("href")==="page-3.html" || $(".next a").attr("href")==="page-4.html"){
        next_page = baseUrl + $(".next a").attr("href");
        getBooks(next_page);
      }
      else{
        const parser = new j2cp();
        const csv = parser.parse(book_data);
        fs.writeFileSync("./concak.csv",csv);
      }
    }
    console.log(book_data);
  }
  catch(err){
    console.error(err);
  }
}

getBooks(url);
