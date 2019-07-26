var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var mongoose = require("mongoose");


const DIR = 'src/uploads';

//app.use(express.static(__dirname));

var picname;

let storage = multer.diskStorage({
 destination: (req, file, cb) => {
 cb(null, DIR);
 },
 filename: (req, file, cb) =>
	{
		picname=Date.now() + file.originalname;
		cb(null, picname);
 }
});
let upload = multer({storage: storage});


//for cors
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();
});
//Signup schema & model
var SignupSchema = new mongoose.Schema(
  {
    Name: String,
    Gender: String,
    Phone: String,
    Username: {type:String,unique:true},
    Password: String,
    Usertype: String
  },
  {
    versionKey: false
  }
);
var Signup = mongoose.model("signup", SignupSchema,"signup");

// Manage Categories schema and model

var CategorySchema = new mongoose.Schema(
  {
    Catname:String,
    Catpic: String
  },
  {
    versionKey: false
  }
);
var managecat = mongoose.model("managecat", CategorySchema,"managecat");

// Manage Sub-categories schema and model

var SubCategorySchema = new mongoose.Schema(
  {
    Catid:String,
    Subcatname:String,
    Subcatpic:String
  },
  {
    versionKey: false
  }
);
var managesubcat = mongoose.model("managesubcat", SubCategorySchema,"managesubcat");

// Manage product schema and model

var ProductSchema = new mongoose.Schema(
  {
    catId: String,
    subcatId: String,
    Name: String,
    Price: Number,
    Desc: String,
    Discount: Number,
    Stock: Number,
    Image: String
  },
  {
    versionKey: false
  }
);
var manageproduct = mongoose.model("manageproduct", ProductSchema, "manageproduct")

// Cart Schema and model
var CartSchema = new mongoose.Schema(
  {
    prodid:String,
    pname:String,
    prate:Number,
    qt:Number,
    tc:Number,
    ppic:String,
    username:String
  },
  {
    versionKey: false
  }
);
var cart = mongoose.model("cart", CartSchema,"cart");

// Checkout Schema and model
var CheckoutSchema = new mongoose.Schema(
  {
    orderamount:String,
    address:String,
    username:String,
    orderdate:String,
    paymentmode:String,
    status:String,
    cardno:String,
    companyName: String,
    holdername:String,
    expdate:String,
    cvvno:String
  },
  {
    versionKey:false
  }
);
var checkout = mongoose.model("checkout",CheckoutSchema,"checkout");

// Order Schema and model
var orderSchema = new mongoose.Schema(
{
  orderid: String,
  pid: String,
  pname: String,
  date: String,
  prate: Number,
  qty: Number,
  tc: Number,
  ppic: String,
  username: String
},
{
  versionKey: false
}
);
var order = mongoose.model("order", orderSchema,"order");

//Contactus schema & model
var ContactusSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    Phone: String,
    Message: String
  },
  {
    versionKey: false
  }
);
var Contactus = mongoose.model("contactus", ContactusSchema,"contactus");


// for req.body.example

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());

// edit profile
app.get("/api/fetchuserdetail", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  Signup.find( {Username: req.query.uname},function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
  });
});

// Contact us

app.post("/api/contactus", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  var newcontactus = new Contactus(
    {
     Name: req.body.nm1,
     Email: req.body.em1,
     Phone: req.body.ph1,
     Message: req.body.msg
});

  newcontactus.save(function(err) {
  if (err) {
     res.send("Error while signing up, try again");
     } else {
      console.log(err);
     res.send("Query Sent");
  }
  mongoose.connection.close();
 });
});

// Signup

app.post("/api/signup", function(req, res) {
 mongoose.connect("mongodb://localhost/angprojdb");

 var newsignup = new Signup(
   {
    Name:req.body.nm,
    Gender:req.body.gen,
    Phone:req.body.ph,
    Username: req.body.em,
    Password: req.body.pass,
    Usertype: req.body.utype
    });

 newsignup.save(function(err) {
 if (err) {
    console.log(err);
    res.send("Error while signing up!");
    } else {
    res.send("Signup Successful");
}
 mongoose.connection.close();
 });
});

// Login

app.post("/api/login", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.body);

  Signup.find({ Username:req.body.username,Password:req.body.pass}, function(err, data)
  {
  if (err)
  {
  console.log(err);
  res.send(err);
  }
  else
  {
  console.log(data);
  res.send(data);
  }
  mongoose.connection.close();
 });
});

// Change Password

app.put("/api/changepassword", (req, res) => {
  mongoose.connect("mongodb://localhost/angprojdb");

  Signup.updateOne({
    Username: req.body.un,
    Password: req.body.cpass
  },
  {
    $set:
    {
       Password: req.body.newp
    }
  },
  (err, data) => {
    if (err) {
      console.log(err);
      res.send("Failed to Change the Password")
    } else res.send(data);
  });
  mongoose.connection.close();
});

// Search userInfo by email

app.post("/api/srchusr", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  Signup.find({ Username:req.query.em}, function(err, data)
  {
  if (err)
  {
  console.log(err);
  res.send(err);
  }
  else
  {
  console.log(data);
  res.send(data);
  }
  mongoose.connection.close();
  });
 });

 // All users info

 app.get("/api/alluser", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  Signup.find(function(err, data) {
  if (err) {
    console.log(err);
    res.send(err);
  } else {
    console.log(data);
    res.send(data);
   }
   mongoose.connection.close();
 });
});

// Delete user

app.delete("/api/delmemb", (req, res) => {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  Signup.remove ({ _id: req.query.id}, function(err, data) {
    if (err) {
      console.log(err);
      res.send("Failed");
    } else {
      console.log(data);
      res.send("Successfully Deleted");
    }
    mongoose.connection.close();
  });
});

// Insert Category

app.post("/api/managecat", upload.single("photo"), (req, res) => {
  mongoose.connect("mongodb://localhost/angprojdb");

  if (!req.file) {
    picname = "noimagefound.png";
  }

  var newmanagecat = new managecat({Catname: req.body.catname, Catpic: picname});
  newmanagecat.save( function(err) {
     if (err) {
       console.log(err);
       res.send("Failed");
     } else {
       res.send("Successfully Inserted");
     }
     mongoose.connection.close();
  });
})

 // fetch categories
 app.get("/api/fetchcategories", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  managecat.find(function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
  });
});

// Fetch sub-categories

 app.get("/api/fetchsubcategories", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  managesubcat.find({Catid: req.query.catid}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
  });
});


// Update categories

app.put("/api/updatecat", upload.single('photo'),function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  //var d = new Date();

  if (!req.file)
  {
  picname = req.body.oldpic;
  }
  else
  {
    if(req.body.oldpic != "noimagefound.png")
    {
      fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
      if (err) throw err;
      console.log('file was deleted');
      });
    }
  }
  managecat.update({ _id: req.body.cid }, { $set: {Catname: req.body.catname, Catpic: picname}},function(err) {
  if (err)
  {
  console.log(err);
  res.send("Failed");
  }
  else
  {
  res.send("Successfully Updated");
  }
  mongoose.connection.close();
  });
 });

 // Delete Category along with Sub-cat and products
// -------------------------------------------------
 app.delete("/api/delcat", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  managecat.remove({_id: req.query.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send("Successfully deleted")
      }
      mongoose.connection.close();
  });
});

app.delete("/api/delsubcat", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  managesubcat.remove({Catid: req.query.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send("Successfully deleted")
      }
      mongoose.connection.close();
  });
});

app.delete("/api/delproducts", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  manageproduct.remove({catId: req.query.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send("Successfully deleted")
      }
      mongoose.connection.close();
  });
});
// -------------------------------------------------


app.delete("/api/delsubcatbyid", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  managesubcat.remove({_id: req.query.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send("Successfully deleted")
      }
      mongoose.connection.close();
  });
});

app.delete("/api/delproductsbysubid", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  manageproduct.remove({subcatId: req.query.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send("Successfully deleted")
      }
      mongoose.connection.close();
  });
});

 // Insert Sub-category

 app.post("/api/addsubcat",upload.single('photo'), function(req, res)
{
 mongoose.connect("mongodb://localhost/angprojdb");
 //var d = new Date();
 if (!req.file)
 {
 picname="noimagefound.png";
 };

 var newmanagesubcat = new managesubcat( {Catid:req.body.cid, Subcatname:req.body.scatname,Subcatpic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

// Update subcategory

//update  sub-categories
app.put("/api/updatesubcat", upload.single('photo'),function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  //var d = new Date();
  if (!req.file)
  {
       picname=req.body.oldpic;
  }
  else
  {
	  if(req.body.oldpic!="noimagefound.png")
	  {
		  fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
		  if (err) throw err;
		  console.log('file was deleted');
		  });
	  }
  }
  managesubcat.update({ _id: req.body.scid }, { $set: {Catid:req.body.catid, Subcatname: req.body.scatname, Subcatpic:picname}},function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Successfully Updated");
    }
    mongoose.connection.close();
  });
});

// Add product

app.post("/api/addproduct",upload.single('photo'), function(req, res)
{
 mongoose.connect("mongodb://localhost/angprojdb");
 // var d = new Date();
 if (!req.file)
 {
 picname="noimagefound.png";
 };

 var newmanageproduct = new manageproduct(
   {
   catId: req.body.cid,
   subcatId: req.body.subcatid,
   Name: req.body.pname,
   Price: req.body.prate,
   Desc: req.body.pdesc,
   Discount: req.body.pdiscount,
   Stock: req.body.pstock,
   Image: picname
  });
 newmanageproduct.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 }
 else
 {
 res.send("Successfully Inserted");
 }
 mongoose.connection.close();
 });
});

// Fetch products based on their respective catid and subcatid
app.get("/api/fetchproducts", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  manageproduct.find({
    subcatId: req.query.subcat
  }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  })
});

// Fetch products based on their respective catid and subcatid
app.get("/api/fetchproductsforhome", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  manageproduct.find({
    subcatId: req.query.subcat
  }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  }).limit(4)
});

// Fetch product details
app.get("/api/fetchproddetails", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  manageproduct.find({_id: req.query.pid}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
    }
	mongoose.connection.close();
  });
});

//Update Products

app.put("/api/updateProduct", upload.single('photo'),function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  //var d = new Date();
  if (!req.file)
  {
       picname=req.body.oldpic;
  }
  else
  {
	  if(req.body.oldpic!="noimagefound.png")
	  {
		  fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
		  if (err) throw err;
		  console.log('file was deleted');
		  });
	  }
  }
  manageproduct.update({ _id: req.body.prodid }, { $set: {catId:req.body.cid,subcatId:req.body.subcatid,Name:req.body.pname,Price:req.body.prate,Desc:req.body.pdesc, Discount:req.body.pdiscount, Stock:req.body.pstock, Image:picname}},function(err) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send("Successfully Updated");
    }
    mongoose.connection.close();
  });
});

  // Delete product
  app.delete("/api/delprod", function(req, res) {
    mongoose.connect("mongodb://localhost/angprojdb");
    console.log(req.query)
    manageproduct.remove({ _id: req.query.id}, function(err, data) {
      if (err) {
      console.log(err);
      res.send("Failed");
    } else {
      console.log(data);
      res.send("Successfully Deleted");
    }
    mongoose.connection.close();
 });
});

app.delete("/api/delsubcat", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query)
  managesubcat.remove({ _id: req.query.id}, function(err, data) {
    if (err) {
    console.log(err);
    res.send("Failed");
  } else {
    res.send("Success");
    console.log(data);
  }
  mongoose.connection.close();
});
});
app.delete("/api/delprodbysub", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query)
  manageproduct.remove({ subcatId: req.query.subid}, function(err, data) {
    if (err) {
    console.log(err);
    res.send("Failed");
  } else {
    res.send("Successfully Deleted Sub-category and its respective products");
    console.log(data)
  }
  mongoose.connection.close();
});
});

// Add cart
app.post("/api/addcart", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  var newcart = new cart( {prodid:req.body.prodid,pname:req.body.pname,prate:req.body.prate,qt:req.body.qt,tc:req.body.tc,ppic:req.body.ppic,username:req.body.username} );

  newcart.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Error while adding to cart, try again");
    }
    else
    {
      res.send("Added to cart successfully");
    }
    mongoose.connection.close();
  });
});

//get cart products from showcart component

app.get("/api/fetchcart", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  cart.find({ username:req.query.uname }, function(err, data)
  {
  if (err)
  {
  console.log(err);
  res.send("Failed");
  }
  else
  {
  console.log(data);
  res.send(data);
  mongoose.connection.close();
  }
  });
 });

 //delete cart products from show cart products

app.delete("/api/deletecartprod", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  cart.remove({ _id: req.query.id }, function(err, data)
  {
  if (err)
  {
  console.log(err);
  res.send("Failed");
  }
  else
  {
  console.log(data);
  res.send("Successfully Deleted");
  mongoose.connection.close();
  }
  });
 });

//get order number for ordersuccess component
app.post("/api/checkout", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  d = new Date();

  var newcheckout = new checkout(
    {
      orderamount:req.body.billtot, address:req.body.add,username:req.body.un,orderdate: d, paymentmode: req.body.pmode, status: 'processing',
      cardno: req.body.cardno,companyName: req.body.coname,holdername: req.body.hname, expdate: req.body.expdt, cvvno: req.body.cvv
     });
  newcheckout.save(function(err, data) {
  if (err)
  {
  console.log(err);
  }
  else
  {
  res.send(data);
  }
  mongoose.connection.close();
  })
 });

 //get order number for ordersuccess component
app.get("/api/getordernum", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  checkout.find({ username: req.query.un }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  }).sort({"orderdate":-1});
});

// all user's orders
app.get("/api/getallorderdetails", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  checkout.find(function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  }).sort({"orderdate":-1});
});

// Get cart by username
app.get("/api/getcart", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);

  cart.find({username:req.query.un}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);

    }
	mongoose.connection.close();
  });
});

// Insert order details for ordersuccess component
app.post("/api/orderitems",function(req,res)
{
mongoose.connect("mongodb://localhost/angprojdb");
var neworder=req.body;

order.insertMany(neworder, function (err, docs) {
      if (err){
          return console.error(err);
      } else {
      console.log("Multiple documents inserted to Collection");
      res.send("Successfully inserted");
    }
    mongoose.connection.close();
  });
});

// Update stock after the successful of order
app.put("/api/updatestock",function(req,res){
  mongoose.connect("mongodb://localhost/angprojdb");
  var updatelist=req.body;
  for(let x=0;x<updatelist.length;x++)
  {
  manageproduct.updateOne({_id:updatelist[x].pid},{$inc: {"S  tock":-updatelist[x].qty}},function(err,data){
  if (err)
  {
   console.log(err);
   res.send("Failed");
  } else
  {
   console.log(data);
  }
  mongoose.connection.close();
 });
 }
 res.send("Successfully Updated");
});

// empty cart after transaction
app.delete("/api/emptycart", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  cart.remove({ username:req.query.un }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("removed to cart successfully");
    }
    mongoose.connection.close();
  });
});

// Get order details by user
app.get("/api/getorderdetailsbyuser", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  order.find({ orderid: req.query.orderid }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});
app.get("/api/getorderdetailbyordernum", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  checkout.find({ username: req.query.uname }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

// update status

app.put("/api/updateStatus", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  checkout.updateOne({ _id: req.body.orderid}, { $set: { status: req.body.newstatus}}, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Status updated");
    }
    mongoose.connection.close();
  });
});

// fetch messages
app.get("/api/fetchContactusmessages", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");

  Contactus.find(function(err, data) {
    if (err)
    {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  })
});

// edit profile

app.put("/api/editprofile", function(req, res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  Signup.updateOne({ Username: req.body.oldem}, { $set: { Name: req.body.nm, Phone: req.body.ph, Username: req.body.em}}, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});


app.get("/api/fetchproductbysearch",function(req,res) {
  mongoose.connect("mongodb://localhost/angprojdb");
  console.log(req.query);
  console.log("hello");

  // db.users.find(name: new RegExp(search));
  // ({name: { $regex: '.' + name + '.' } }).limit(5);

  var pname=req.query.querysearch;
  manageproduct.find({Name: { $regex: '.*' + pname ,$options:'i' }}, function(err,data){
     if(err)
     {
       console.log(err);
       res.send("No result found");
     }
     else
     {
       console.log(data);
       res.send(data);
     }
     mongoose.connection.close();
  });
});


app.listen(3000, () => console.log('Node.js server is running on port 3000'))
