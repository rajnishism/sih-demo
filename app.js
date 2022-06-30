const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var router = express.Router();
const multer = require("multer");
const cookierParser= require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs');
app.use(cookierParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage
})

//Middleware
const auth = async (req,res,next) =>{
  try{
    const token= req.cookies.jwt;
    if(!token){
      return res.redirect('/login');
    }
    else{
      const verifyUser=  jwt.verify(token,"thisismyspecialtokenworthninetyninerupeesanditshouldbemorethanthirtytwocharacters" );
      console.log(verifyUser);
      if(verifyUser ){
        next();
      }
      else{
        console.log("verification failed");
      }
    }

  }
  catch(err){
    console.log(err);
  }
}


// database save
const mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Rajnishism:R%40jn%21sh321@cluster0.xcseb.mongodb.net/sih-necbdc?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
  useNewUrlParser: false,
  useUnifiedTopology: false
});



const projectSchema = {
  title: String, // String is shorthand for {type: String}
  body: String,
  date: String,
  imglink: [String],
};

const Project = mongoose.model("project", projectSchema);

//News Databsase collection
const articleSchema = {
  title: String, // String is shorthand for {type: String}
  body: String,
  imglink: [String],
};

const Article = mongoose.model("article", articleSchema);
// tender schema Databsase

const tenderSchema = {
  title: String, // String is shorthand for {type: String}
  issuedDate: String,
  lastDate: String,
  body: String,
};

const Tender = mongoose.model("tender", tenderSchema);


app.use(require('./auth')); //


//Routing app.get only



app.get('/', (req, res) => {

  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {
      Project.find({}, (err, recentProject) => {
        res.render('index', {
          recentProject: recentProject,
          recentTender: recentTender,
          recentArticle: recentArticle,
          nArticle: recentArticle.length,
          nTender: recentTender.length,
          nProject: recentProject.length
        })
      })

    })


  })


})

app.get('/history', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('history', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })

})



app.get('/about', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('about', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })

})

app.get('/consultancy', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('consultancy', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })

})

app.get('/article', (req, res) => {
  Article.find({}, (err, docs) => {
    Tender.find({}, (err, recentTender) => {
      Article.find({}, (err, recentArticle) => {

        res.render('article', {
          article: docs,
          recentTender: recentTender,
          recentArticle: recentArticle,
          nArticle: recentArticle.length,
          nTender: recentTender.length,
        })

      })


    })

  })

})

app.get('/article/:title', (req, res) => {
  var title = req.params.title;
  Article.findOne({
    title: title
  }, (err, found) => {
    if (found) {
      Tender.find({}, (err, recentTender) => {
        Article.find({}, (err, recentArticle) => {

          res.render('singlePageArticle', {
            recentTender: recentTender,
            recentArticle: recentArticle,
            nArticle: recentArticle.length,
            nTender: recentTender.length,
            title: title,
            body: found.body,
          })

        })


      })
    } else {
      console.log(err);
    }
  })
})

app.get('/resources', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('resources', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })
})

app.get('/rti', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('rti', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })

})

app.get('/staff', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {
      res.render('staff', {
        nArticle: recentArticle.length,
        nTender: recentTender.length,
        recentTender: recentTender,
        recentArticle: recentArticle,


      })
    })
  })

})

app.get('/service', (req, res) => {
  res.render('service', {});

})

app.get('/projects', (req, res) => {

  Project.find({}, (err, projects) => {
    Tender.find({}, (err, recentTender) => {
      Article.find({}, (err, recentArticle) => {

        res.render('projects', {
          projects: projects,
          nProjects: projects.length,
          recentTender: recentTender,
          recentArticle: recentArticle,
          nArticle: recentArticle.length,
          nTender: recentTender.length,
        })


      })


    });
  })

})

// individual project singlePage
app.get('/projects/:title', (req, res) => {

  var title = req.params.title;
  Project.findOne({
    title: title
  }, (err, found) => {
    Tender.find({}, (err, recentTender) => {
      Article.find({}, (err, recentArticle) => {


        res.render('singlePageProject', {
          imglink: found.imglink,
          nImgLink: found.imglink.length,
          title: title,
          body: found.body,
          imglink: found.imglink,
          recentTender: recentTender,
          recentArticle: recentArticle,
          nArticle: recentArticle.length,
          nTender: recentTender.length,


        })


      })


    });

  })




})




app.get('/tenders', (req, res) => {
  Tender.find({}, function(err, docs) {
    if (err)
      console.log(err);
    else {
      Tender.find({}, (err, recentTender) => {
        Article.find({}, (err, recentArticle) => {

          res.render('tender', {
            tenders: docs,
            recentTender: recentTender,
            recentArticle: recentArticle,
            nArticle: recentArticle.length,
            nTender: recentTender.length,
          })

        })


      });

    }
  });

})


app.get('/contact', (req, res) => {
  res.render('contact', {});

})

//dashboard
app.get('/dashboard', auth, (req, res) => {
  Tender.find({}, (err, tenders) => {
    Article.find({}, (err, articles) => {
      Project.find({}, (err, projects) => {
        res.render('dashboard', {
          tenders: tenders,
          projects: projects,
          articles: articles,
          nArticle: articles.length,
          nTender: tenders.length,
          nProject: projects.length,
        })
      })
    })
  })
});

app.get('/dashboard/create-tenders', auth, (req, res) => {
  res.render('compose', {})
});

app.get('/dashboard/create-project', auth, (req, res) => {
  res.render('composeProject')
})

app.get('/dashboard/create-article', auth, (req, res) => {
  res.render('composeArticle')
})

// individual tender page

app.get('/tenders/:title', (req, res) => {

  Tender.findOne({
    title: req.params.title
  }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        Tender.find({}, (err, recentTender) => {
          Article.find({}, (err, recentArticle) => {
            res.render('singlePage', {
              title: req.params.title,
              issuedDate: found.issuedDate,
              lastDate: found.lastDate,
              recentTender: recentTender,
              recentArticle: recentArticle,
              body: found.body,
              nTender: recentTender.length,
              nArticle: recentArticle.length,
            })

          })
        })
      } else {
        res.send('no result found');
      }
    }
  })

});

app.get('/about', (req, res) => {

})

app.post('/articles', (req, res) => {

  console.log(req.body.title);
  console.log(req.body.body);

  const newArticle = new Article({
    title: req.body.title,
    body: req.body.body,

  })
  console.log(req.body);
  newArticle.save(function(err) {
    if (!err)
      res.send("success");
    else {
      res.send(err);
    }
  });

})

app.post('/tenders', (req, res) => {
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

app.post('/projects', upload.array('imglink'), (req, res, next) => {

  var filename = [];
  for (var i = 0; i < req.files.length; i++) {
    filename[i] = req.files[i].originalname;
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

app.post('/projects/:title', (req, res) => {
  var title = req.params.title;
  Project.deleteOne({
    title: title
  }, (err, done) => {
    if (err)
      console.log(err);
    res.send("1 document deleted");
  })
})

app.post('/articles/:title', (req, res) => {

  var title = req.params.title;
  Article.deleteOne({
    title: title
  }, (err, done) => {
    if (err)
      console.log(err);
    res.send("1 Article deleted");
  })
})


app.post('/tenders/:title', (req, res) => {

  var title = req.params.title;
  Tender.deleteOne({
    title: title
  }, (err, done) => {
    if (err)
      console.log(err);
    res.send("1 Tender deleted");
  })
})


app.get('/feedback', (req, res) => {
  Tender.find({}, (err, recentTender) => {
    Article.find({}, (err, recentArticle) => {

      res.render('feedback', {
        recentTender: recentTender,
        recentArticle: recentArticle,
        nArticle: recentArticle.length,
        nTender: recentTender.length,
      })

    })


  })
})


// search features
app.post('/search', (req, res) => {
  var input = req.body.searchInput;
  res.redirect(`/search/${input}`);
})

app.get('/search/:input', (req, res) => {
  var input = req.params.input;
  console.log(input);
  Project.find({
    $or: [{
      title: {
        $regex: input,
        $options: '$i'
      }
    }, {
      body: {
        $regex: input,
        $options: '$i'
      }
    }]
  }, (err, projects) => {
    Article.find({
      $or: [{
        title: {
          $regex: input,
          $options: '$i'
        }
      }, {
        body: {
          $regex: input,
          $options: '$i'
        }
      }]
    }, (err, articles) => {
      Tender.find({
        $or: [{
          title: {
            $regex: input,
            $options: '$i'
          }
        }, {
          body: {
            $regex: input,
            $options: '$i'
          }
        }]
      }, (err, tenders) => {
        Tender.find({}, (err, recentTender) => {
          Article.find({}, (err, recentArticle) => {
            Project.find({}, (err, recentProject) => {
              res.render('search', {
                projects: projects,
                tenders: tenders,
                articles: articles,
                sArticle: articles.length,
                sProjects: projects.length,
                sTender: tenders.length,
                recentTender: recentTender,
                recentArticle: recentArticle,
                recentProject: recentProject,
                searchInput: input,
                nArticle: recentArticle.length,
                nProjects: recentProject.length,
                nTender: recentTender.length,
              });
            })

          })


        })
      })
    })
  })
})


app.get('/article/:title/edit', auth,(req, res) => {
  var title = req.params.title;
  Article.findOne({
    title: title
  }, (err, article) => {

    res.render('edit/editArticle', {
      title: title,
      body: article.body,
    });
  })

})

app.post('/article/:title/edit', auth,(req, res) => {

  var title = req.params.title;
  var id;

  var newTitle = req.body.title;
  var newBody = req.body.body;

  Article.findOne({
    title: title
  }, (err, found) => {
    if (!err) {
      var id = found.id;
      console.log(id);
    } else
      console.log(err);
  })
  var myquery = {
    id: id
  };
  var newvalues = {
    $set: {
      title: newTitle,
      body: newBody
    }
  };
  Article.updateOne(myquery, newvalues, (err, response) => {
    if (err) throw err;
    console.log("1 document updated");
    console.log(response);
  })

});

app.post('/tenders/:title/edit', auth, (req, res) => {
  var title = req.params.title;
  const  filter = {
    title: title
  };
  // update the value of the 'z' field to 42
  const updateDocument = {
    $set: {
      title: req.body.title,
      body: req.body.body,
    },
  };
  const result =  Tender.updateOne(filter, updateDocument,(err)=>{
    if(err)
    console.log(err);
    else
    res.send("suceesfully updated")
  });

})
app.get('/tenders/:title/edit',(req,res)=>{
  Tender.findOne({title: req.params.title},(err, tender)=>{
    console.log(tender.body);
    res.render('edit/editTender',{title: req.params.title, body: tender.body,})
  })
})
// update projects section
app.get('/projects/:title/edit',(req,res)=>{
  var title= req.params.title;
  Project.findOne({title: title},(err, project)=>{
    if(err)
    console.log(err);
    else{
      res.render('edit/editProject',{title: title, body: project.body});
    }
  })
})


app.post('/projects/:title/edit',(req,res)=>{
  var newTitle= req.body.title;
  var newBody= req.body.body;
  var title = req.params.title;
  console.log(newTitle);
  console.log(newBody);
  const  filter = {
    title: title
  };
  // update the value of the 'z' field to 42
  const updateDocument = {
    $set: {
      title: newTitle,
      body: newBody,
    },
  };
  const result =  Project.updateOne(filter, updateDocument,(err)=>{
    if(err)
    console.log(err);
    else
    res.send("suceesfully updated")
  });

})

app.post('/articles/:title',(req, res)=>{
  var title= req.params.title;
  Article.deleteOne({
    title: title
  }, (err, done) => {
    if (err)
      console.log(err);
    res.send("1 document deleted");
  })

})

//all articles of Dashboard
app.get('/dashboard/article', auth,(req,res)=>{
  Article.find({},(err, article)=>{
    res.render('dashboardList',{count: article.length , content: article})
  })

})


app.get('/dashboard/projects', auth, (req,res)=>{
  Project.find({}, (err, projects)=>{
    res.render('dashboardList',{count: projects.length, content: projects})
  })
})

app.get('/dashboard/tenders', auth, (req,res)=>{
  Tender.find({}, (err, tenders)=>{
    res.render('dashboardList',{count: tenders.length , content: tenders  })
  })
})
//PORT
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
console.log(PORT);
