const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9999;

app.use(cors());

const gifts = [
  {
    id: 1,
    title: "Vase",
    image: "/images/img1.png",
    price: "$39.99",
    description: "A custom star map showing the night sky of a special moment in your life.",
    link: "https://moro.ua/collections/%D0%B2%D0%B0%D0%B7%D0%B8/products/%D0%B2%D0%B0%D0%B7%D0%B0-%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D1%96%D1%87%D0%BD%D0%B0-%D0%BA%D1%80%D1%83%D0%B3%D0%BB%D0%B0-%D0%BC%D0%B0%D0%BB%D0%B0-m-9437s?variant=46907469988118"
  },
  {
    id: 2,
    title: "Cozy Cup",
    image: "/images/img2.png",
    price: "$22.00",
    description: "A calming desktop Zen garden to bring peace and mindfulness to your space.",
    link: "https://utopia8.ua/product/150596?utm_source=google&utm_medium=cpc&utm_campaign=IW/PMax/Home/ROAS=460+-4,01&gad_source=1&gad_campaignid=15832519410&gbraid=0AAAAABXzt4ue89RbdwcT7Re2W0xOGHXb6&gclid=Cj0KCQjwsNnCBhDRARIsAEzia4CR7Vd6Mpn9oo-cTdP-md998NzJHd-YcRYqyotRHoVTRfg0PFoTqbwaAhYUEALw_wcB"
  },
  {
    id: 3,
    title: "Mirror",
    image: "/images/img3.png",
    price: "$24.50",
    description: "A handcrafted box that plays a delicate melody — perfect for nostalgic hearts.",
    link: "https://moro.ua/collections/%D0%B4%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D0%B0/products/%D0%B4%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D0%BE-%D0%BD%D0%B0-%D0%BC%D0%B5%D1%82%D0%B0%D0%BB%D0%B5%D0%B2%D1%96%D0%B9-%D0%BF%D1%96%D0%B4%D1%81%D1%82%D0%B0%D0%B2%D1%86%D1%96-%D0%BE%D0%BA%D0%BE-32%D1%81%D0%BC-m-2453?variant=45276165275926"
  },
  {
    id: 4,
    title: "Handcream",
    image: "/images/img4.jpg",
    price: "$49.99",
    description: "A beautiful necklace personalized with the name or word of your choice.",
    link: "https://jul.ua/product/minikrem-dlya-ruk-cherry--santal?utm_source=google&utm_medium=cpc&utm_campaign=JUL_PMax_AD&utm_term=&utm_content=||c|&gad_source=1&gad_campaignid=20361838528&gbraid=0AAAAAp5vd20J9CqvkEt1n98zBlJbZ9WAH&gclid=Cj0KCQjwsNnCBhDRARIsAEzia4Dm3UOPYgW_cB-_QU1FZ1rhxbAYva8745d810M9xxUEfqWIP8yTLHwaAg2JEALw_wcB"
  },
  {
    id: 5,
    title: "Cup",
    image: "/images/img5.png",
    price: "$29.00",
    description: "Scratch off places you’ve visited on this interactive world map!",
    link: "https://utopia8.ua/product/150108?utm_source=google&utm_medium=cpc&utm_campaign=IW/PMax/Home/ROAS=460+-4,01&gad_source=1&gad_campaignid=15832519410&gbraid=0AAAAABXzt4ue89RbdwcT7Re2W0xOGHXb6&gclid=Cj0KCQjwsNnCBhDRARIsAEzia4AaW9lYyOerpfnU63p87hcKaUQnR_M2cRdbaKUqOrDgcTxUT_Bd89EaArfTEALw_wcB"
  },
  {
    id: 6,
    title: "Sunglasses",
    image: "/images/img6.png",
    price: "$19.95",
    description: "A creative book filled with romantic, adventurous, and funny date ideas.",
    link: "https://utopia8.ua/product/143049"
  },
  {
    id: 7,
    title: "Pearl Earrings",
    image: "/images/img7.png",
    price: "$34.90",
    description: "Warm, dimmable lamp for quiet evenings, books, and soft playlists.",
    link: "https://utopia8.ua/product/147320"
  },
  {
    id: 8,
    title: "Vintage Cup",
    image: "/images/img8.png",
    price: "$18.75",
    description: "Make your own delicious hot chocolate with marshmallows and spice!",
    link: "https://tarlini.com.ua/ua/kruzhka-vintage-tulip/?utm_source=google&utm_medium=cpc&utm_campaign=pmax_3&utm_content=&utm_term=&gad_source=1&gad_campaignid=22323689478&gbraid=0AAAAADQ0HGYfsy8m34b70TMmAjfkqYTdu&gclid=Cj0KCQjwsNnCBhDRARIsAEzia4D_EDeJB5GICdXDBBWN7qg0rOVmV0Ox76Z-_Mo7llDA489z3vJhoQIaAuZVEALw_wcB"
  },
  {
    id: 9,
    title: "Tea Set",
    image: "/images/img9.png",
    price: "$16.40",
    description: "Stainless steel mug with your own message — keeps drinks warm all day.",
    link: "https://tea-touch.com.ua/velikij-nabir-chayu-na-12-smakiv-vse-v-odnomu?gclid=Cj0KCQjwsNnCBhDRARIsAEzia4CehyYvlIgkFe8vGUxaeS8_jFZI2y-SVo9YZgsuQF-74y1DfpflBY0aAvwmEALw_wcB&utm_source=google&utm_medium=cpc&utm_campaign=september_new&utm_term=&utm_content=present-tea"
  },
  {
    id: 10,
    title: "Plate Kyiv",
    image: "/images/img10.png",
    price: "$27.30",
    description: "Three handcrafted candles with seasonal scents to cozy up your space.",
    link: "https://vsisvoi.ua/store/tarilka-pomarancevij-tmp-231-744-614946?utm_source=google&utm_medium=gix_cpc&utm_campaign=pmax_all_no_crea&utm_term=&gad_source=1&gad_campaignid=21846543072&gbraid=0AAAAADMRrIYsLvToAKlGtaVlUWed2wq97&gclid=Cj0KCQjwsNnCBhDRARIsAEzia4DWEJzDMT_PcgMrE4pHYn3OwGDdvSjdJWV6sWBv45AiQ1vxNWgKtvAaAofZEALw_wcB"
  }
];


app.get("/gifts", (req, res) => {
  res.json(gifts);
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
