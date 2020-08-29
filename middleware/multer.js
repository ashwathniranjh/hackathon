app.use(
    multer(
      { 
        storage: fileStorage, 
        limits:
          { 
            fileSize:'2mb' 
          }, 
        fileFilter: fileFilter 
      }
    ).fields(
      [
        { 
          name: 'resume', 
          maxCount: 1 
        }, 
        { 
          name: 'image', 
          maxCount: 1 
        }
      ]
    )
  );