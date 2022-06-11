const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//multer
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json())

// database save
const mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Rajnishism:R%40jn%21sh321@cluster0.xcseb.mongodb.net/sih-necbdc?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: false, useUnifiedTopology: false});

const projectSchema = {
  title:  String, // String is shorthand for {type: String}
  body:   String,
  date: String,
  imglink: [String],
};

const Project = mongoose.model("project", projectSchema);

//News Databsase collection
const articleSchema = {
  title:  String, // String is shorthand for {type: String}
  body:   String,
  imglink: [String],
};

const Article = mongoose.model("article", articleSchema);
// tender schema Databsase

const tenderSchema = {
  title:  String, // String is shorthand for {type: String}
  issuedDate:   String,
  lastDate: String,
  body: String,
};

const Tender = mongoose.model("tender", tenderSchema);
//Routing app.get only

app.get('/',(req,res)=>{

  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('index',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )


})

app.get('/history',(req,res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('history',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )

})



app.get('/about',(req,res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('about',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )

})

app.get('/consultancy',(req,res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('consultancy',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )

})

app.get('/article',(req,res)=>{
  Article.find({}, (err, docs)=>{
    Tender.find({}, (err, recentTender)=>{
      Article.find({}, (err, recentArticle)=>{

        res.render('article',{article: docs, recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

      })


      }
    )

  })

})

app.get('/article/:title',(req,res)=>{
  var title=req.params.title;
  Article.findOne({title : title}, (err, found)=>{
    if(found){
      Tender.find({}, (err, recentTender)=>{
        Article.find({}, (err, recentArticle)=>{

          res.render('singlePageArticle',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length,  title: title, body: found.body, })

        })


        }
      )
    }
    else{
      console.log(err);
    }
  })
})

app.get('/resources',(req,res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('resources',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )
})

app.get('/rti',(req,res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('rti',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )

})

app.get('/staff',(req,res)=>{
  res.render('staff',{});

})

app.get('/service',(req,res)=>{
  res.render('service',{});

})

app.get('/projects',(req,res)=>{

  Project.find({}, (err, projects)=>{
    Tender.find({}, (err, recentTender)=>{
      Article.find({}, (err, recentArticle)=>{

        res.render('projects',{  projects: projects, nProjects: projects.length,  recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })


      })


      }
    );
  })

})

// individual project singlePage
app.get('/projects/:title',(req,res)=>{

  var title= req.params.title;
  Project.findOne({title: title},(err, found)=>{
    Tender.find({}, (err, recentTender)=>{
      Article.find({}, (err, recentArticle)=>{
        console.log(found.imglink[0]);


        res.render('singlePageProject',{  imglink: found.imglink[0], nImgLink: found.imglink.length, title: title, body: found.body, imglink: found.imglink,  recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })


      })


      }
    );

  })




})




app.get('/tenders',(req,res)=>{
  Tender.find({}, function (err, docs) {
  if(err)
  console.log(err);
  else
  {
    Tender.find({}, (err, recentTender)=>{
      Article.find({}, (err, recentArticle)=>{

        res.render('tender',{ tenders: docs, recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

      })


      }
    );

  }
  });

})


app.get('/contact',(req,res)=>{
  res.render('contact',{});

})

//dashboard
app.get('/dashboard',(req,res)=>{
  res.render('dashboard')
});

app.get('/dashboard/tenders',(req,res)=>{
  res.render('compose',{})
});

app.get('/dashboard/create-project',(req, res)=>{
  res.render('composeProject')
})

// individual tender page

app.get('/tenders/:title',(req,res)=>{

  Tender.findOne({title: req.params.title},(err, found)=>{
    if(err){
      console.log(err);
    }
    else{
      if(found){
        Tender.find({}, (err, recentTender)=>{
          Article.find({},(err, recentArticle)=>{
            res.render('singlePage',{title: req.params.title, issuedDate: found.issuedDate, lastDate: found.lastDate, recentTender: recentTender ,recentArticle: recentArticle, body: found.body , nTender: recentTender.length, nArticle: recentArticle.length,  })

          })
        }
      )
      }
      else{
        res.send('no result found');
      }
    }
  })

});

app.get('/about',(req,res)=>{

})

app.post('/tenders', (req,res)=>{
  console.log(req.body.title);
  console.log(req.body.issuedDate);
  console.log(req.body.lastDate);
  console.log(req.body.body);

  const newTender = new Tender({
    title: req.body.title,
    issuedDate: req.body.issuedDate,
    body: req.body.body,
    lastDate: req.body.lastDate,

  })
  console.log(req.body);
  newTender.save(function(err) {
  if (!err)
    res.send("success");
  else {
    res.send(err);
  }
  });

})

app.post('/projects',upload.array('imglink') ,(req,res,next)=>{

  var filename = [];
  for(var i=0; i<req.files.length; i++)  {
    filename[i]=req.files[i].originalname;
  }
  console.log(filename);
  console.log(req.body.title);
  console.log(req.body.body);

  const newProject = new Project({
    title: req.body.title,
    imglink: filename,
    body: req.body.body,

  })

  newProject.save(function(err) {
  if (!err)
    res.send("success");
  else {
    res.send(err);
  }
  });

})


app.get('/feedback',(req, res)=>{
  Tender.find({}, (err, recentTender)=>{
    Article.find({}, (err, recentArticle)=>{

      res.render('resources',{ recentTender: recentTender , recentArticle:recentArticle,  nArticle: recentArticle.length, nTender:recentTender.length, })

    })


    }
  )
})


//PORT
const PORT = process.env.PORT || 3000;
console.log(PORT );

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log(PORT);
