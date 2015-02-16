var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
var Flag = false;
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageURI) {
    // Uncomment to view the base64-encoded image data

    // Get image handle
    //
    var cameraImage = document.getElementById('aa');
    // Unhide image elements
    //
    cameraImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    Flag = true;
    cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    console.log('이거 임'+imageURI);
    // Get image handle
    //
    var galleryImage = document.getElementById('aa');
    // Unhide image elements
    //
    galleryImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    Flag = false;
    galleryImage.src = imageURI;
    
}
// A button will call this function
//

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}
// A button will call this function
//

function getPhoto(source) {
	
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
   
}
// Called if something bad happens.
//

function onFail(message) {
    //alert('Failed because: ' + message);
}

function upload() {
    var img = document.getElementById('aa');
    console.log(img);
    var imageURI = img.src;
    
    console.log(imageURI);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = localStorage.getItem('Project_Id')+'-'+imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    console.log(options);
    console.log('여기까진되나?');
    var ft = new FileTransfer();
    console.log(imageURI);
    
    ft.upload(imageURI, "http://165.132.221.182:3000/App_Upload_Capture", win, fail,
          options);
      
    
//    if(Flag == true){
//    	
//    	
//    	
//    	
//    	
//    ft.upload(imageURI, "http://165.132.221.182:3000/App_Upload_Capture", win, fail,
//        options);
//    }
//    else
//    {
//    	console.log('여기들어갑니다.');
//    	console.log(imageURI);
//    	ft.upload(imageURI, "http://165.132.221.182:3000/aaa", win, fail,
//    	        options);
//    }
//    console.log('여기까진되나?');
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}