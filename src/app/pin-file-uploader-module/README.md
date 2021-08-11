
Input 
    fileUploadBaseUrl : string , Base url of upload api

    config 
    {
        "name": "files", // Name of the request parameter to identify the files at backend.
        "multiple": "true", // Used to select multiple files at once from file dialog.
        "accept": "image/*", // Pattern to restrict the allowed file types such as "image/*". use false for all files
        "disabled": false, // Disables the upload functionality.
        "auto": false, // When enabled, upload begins automatically after selection is completed.
        "maxFileSize": 5000000, // Maximum file size allowed in bytes.
        "fileLimit": 10, // Maximum number of files that can be uploaded.
        "uniqueId":"vsb23", // name by which we will create folder at server end
        "mode":"basic"  	// basic or advanced
    }    
