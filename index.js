require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./database/config");
const Razorpay = require("razorpay");
const shortid = require("shortid");

const { MongoClient } = require("mongodb");

const app = express();
const fileUpload = require("express-fileupload");
const fs = require("fs");
app.use(express.static("public"));
app.use(fileUpload());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const { PORT } = process.env;

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  maxConnections: 50,
  auth: {
    user: process.env.USER_ID,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/req-to-speak", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client
    .db("globalLegalAssociation")
    .collection("RequestToSpeak");
  collection.insertOne(req.body);
  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `${req.body.firstName} wants to connect with you`,
    text: `Here below are the details
    first Name : ${req.body.firstName}
    Last Name : ${req.body.lastName}
    Email : ${req.body.email}
    Company Name : ${req.body.companyName}
    Phone Number : ${req.body.phone}
    Address: ${req.body.address}
    Type : ${req.body.type},
    Payment Mode : ${req.body.payment}
    Voucher Applied :- ${req.body.voucher}
    `,
  });
});

app.post("/", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("globalLegalAssociation").collection("sponsors");
  collection.insertOne(req.body);
  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `${req.body.name} wants to connect with you`,
    text: `Here below are the details
    Name : ${req.body.name}
    Email : ${req.body.email}
    Company Name : ${req.body.companyName}
    Phone Number : ${req.body.phone}
    Address: ${req.body.address}
    Location: ${req.body.location}
    Type : ${req.body.type}
    Payment Mode : ${req.body.payment}
    Voucher Applied :- ${req.body.voucher}
    `,
  });
});

app.post("/speaker", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("globalLegalAssociation").collection("speakers");
  collection.insertOne(req.body);
  console.log(req.body);
  const test = transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `${req.body.name} wants to connect with you`,
    text: `Here below are the details
     Name : ${req.body.name}
    Email : ${req.body.email}
    Company Name : ${req.body.companyName}
    Phone Number : ${req.body.phone}
    Number of passes: ${req.body.passes}
    Address: ${req.body.address} 
    Type: ${req.body.type} 
    Location: ${req.body.location}
    Dinner : ${
      req.body.type.includes("Cocktail") || req.body.type.includes("Exhibition")
        ? "paid"
        : req.body.dinner === true
        ? "paid"
        : "not paid "
    }
    Payment Mode : ${req.body.payment}
    Voucher Applied :- ${req.body.voucher}
      `,
  });
  resp.status(200).json({ status: true });
});
app.post("/contact", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("globalLegalAssociation").collection("contacts");
  collection.insertOne(req.body);
  console.log(req.body);
  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `${req.body.name} wants to contact with you`,
    text: `Here below are the details
    Name : ${req.body.name}
    Email : ${req.body.email}
    Phone Number : ${req.body.phone}
    Message : ${req.body.text}
    `,
  });
});

app.post("/leads", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err, "error");
  });

  const collection = client
    .db("globalLegalAssociation")
    .collection("leads-genearated");
  collection.insertOne(req.body);
  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `Visitors on the Global Legal Association`,
    text: `Leads on the  Global Legal Association
    Name : ${req.body.name}
    Email : ${req.body.email}
    Phone number : ${req.body.phone}
    Query : ${req.body.query}
    `,
  });
});

app.post("/awards", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });

  const collection = client
    .db("globalLegalAssociation")
    .collection("awards-and-recognition");
  collection.insertOne(req.body);

  // const myFile = req.files.file;
  // console.log(myFile, "myfile");
  // thisfilename = "clientupload.xlsx";
  // myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
  //   if (err) {
  //     console.log(err);
  //     return resp.status(700).send({ msg: "There is Error" });
  //   }
  // });
  // const referral = req.files.referral;
  // console.log(referral, "referral");
  // thisfilename = "clientupload.xlsx";
  // referral.mv(`${__dirname}/public/${referral.name}`, function (err) {
  //   if (err) {
  //     console.log(err);
  //     return resp.status(700).send({ msg: "There is Error" });
  //   }
  // });

  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    subject: `Awards for the Global Legal Association`,
    text: `Awards nominee on the  Global Legal Association
    Name : ${req.body.name}
    Address : ${req.body.address}
    Phone : ${req.body.phone}
    Business Duration : ${req.body.businessDuration}
    EmployeeCount : ${req.body.employeeCount}
    Category : ${req.body.category}
    Global Presence : ${req.body.presence}
    `,
    // attachments: [
    //   {
    //     filename: `${myFile.name}`,
    //     path: `${__dirname}/public/${myFile.name}`,
    //   },
    //   {
    //     filename: `${referral.name}`,
    //     path: `${__dirname}/public/${referral.name}`,
    //   },
    // ],
  });
});

app.get("/demo", async (req, resp) => {
  resp.send("hello the API is working");
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_PASSWORD ,
});

app.post("/razorpay/:currency/:amount", async (req, resp) => {
  const payment_capture = 1;
  var amount = (req.params.amount * 100).toString();
  amount = Math.ceil(amount);
  const currency = req.params.currency.toString();
  const receipt = shortid.generate();
  const options = {
    amount,
    currency,
    receipt,
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);

    resp.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    resp.status(400).json({
      err: error,
    });
  }
});
app.post("/razorpay", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("globalLegalAssociation").collection("payments");
  collection.insertOne(req.body);
  transporter.sendMail({
    from: "events@globallegalassociation.org , faiz@globallegalassociation.org",
    to: `${req.body.email},events@globallegalassociation.org`,
    subject: `Payment successful`,
    text: `Your payment has been successful for ${req.body.type}
           Order Id- ${req.body.response.bill_id}
           Thanks and Regards,
           Global Legal Association `,
  });
});

app.post("/no-payments", async (req, resp) => {
  const uri =
    "mongodb+srv://abscod:abscod12345@cluster0.tlalbb1.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  client.connect((err) => {
    console.log(err);
  });
  const collection = client.db("globalLegalAssociation").collection("enquiry");
  collection.insertOne(req.body);
  resp.status(200).json({ status: true });
});
//--Award--------------------------------------------
app.post("/awardForm", async (req, resp) => {
  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: `${req.body.email}, faiz@globallegalassociation.org,events@globallegalassociation.org`,
    subject: `Award Form`,
    text: `Award Form
    First Name : ${req.body.FirstName}
    Last Name : ${req.body.LastName}
    Address : ${req.body.Address}
    Phone : ${req.body.Phone}
    Organization : ${req.body.Organization}
    Nomination : ${req.body.Nomination}
    Category : ${req.body.Category}
    Sub-Category : ${req?.body?.SubCategory}
    City : ${req?.body?.City}
    JobTitle: ${req?.body?.JobTitle}
    Street Address : ${req?.body?.StreetAddress}
   Zip Code : ${req?.body?.codeZip}
   Email: ${req?.body?.email}
    `,
  });

  transporter.sendMail({
    from: "events@globallegalassociation.org",
    to: `${req.body.email}`,
    subject: `GLA Award`,
    text: `Award Form
    Hello ${req?.body?.FirstName},

Thank you for submitting the nomination for the Global Legal Association Awards. 

We will get back to you in case we need more information.

All the best.

Regards
Team GLA 

    `,
  });
  resp.status(200).json({
    status: "Success",
  });
});

app.listen(PORT);
console.log(`server running at port ${PORT}`);
