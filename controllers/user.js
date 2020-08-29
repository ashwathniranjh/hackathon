const User = require('../models/users');
const Template = require('../models/template');
const path = require('path');
const mongodb = require('mongodb');
const multer = require('multer');
const Category = require('../models/category');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
      cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.fieldname}-${file.originalname}`);
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('banner');
  
  function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(extname && mimetype){
      return cb(null, true);
    }
    else{
      cb('error: images only!');
    }
  }

  exports.getIndex = async (req, res, next) => {
      try{
    let templates = await Template.find({user: req.user._id});
    console.log(templates[0].images.images);
      res.render('user/dashboard',{
        path: '/dashboard',
        pageTitle: 'Your Dashboard',
        templates: templates,
        isAuthenticated: req.session.isLoggedIn
      });
    
      }
      catch(err){
          console.log(err);
      }
  };

  exports.getTemplate = (req,res,next) => {
      let tempId = req.params.templateId;
      Template.findById(new mongodb.ObjectId(tempId))
      .populate('category')
      .then(template => {
          console.log('i am trying');
          if(template.category.title === 'blog'){
              res.render('user/templates/blog', {
                template: template,
                pageTitle: `Template`,
                path: `/template/${template._id}`,
                isAuthenticated: req.session.isLoggedIn
              });
          }
          else if(template.category.title === 'photography'){
            res.render('user/templates/photography', {
                template: template,
                pageTitle: `Template`,
                path: `/template/${template._id}`,
                isAuthenticated: req.session.isLoggedIn
              });
          }
          else if(template.category.title === 'professional'){
            res.render('user/templates/professional', {
                template: template,
                pageTitle: `Template`,
                path: `/template/${template._id}`,
                isAuthenticated: req.session.isLoggedIn
              });
          }
      })
      .catch(err => {
          console.log(err);
      });
  };

  exports.getAddTemplate = (req, res, next) => {
    Category.find()
    .then(categories => {
        res.render('user/create', {
            pageTitle: 'Create New template',
            path: '/create',
            categories: categories,
            isAuthenticated: req.session.isLoggedIn
          });
    })
  };

  exports.postAddTemplate = (req, res, next) => {
    
    upload(req, res, (err) => {
      if(err){
        console.log(err);
      }
      else{
    
        const date = new Date().toISOString();
        console.log(req.file);
        const title = req.body.title;
        const category = req.body.category;
        const description = req.body.description;
       const image =  `http://localhost:3000/${req.file.filename}`;
        let template = new Template({
            title:title,
            category: category,
            description: description,
            images: {type: 'banner', images: image},
            user: req.user._id
        });
        template
          .save()
          .then(result => {
            console.log('Created template');
            console.log('saved');
            res.redirect('/dashboard');
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
};



