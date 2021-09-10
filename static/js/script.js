$( document ).ready(function() {
  const inpFile = document.getElementById("inpFile");
  const previewContainer = document.getElementById("imagePreview");
  var nr_app_run = 1;

  if(inpFile) {
    inpFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();
        const previewImage = previewContainer.querySelector(".image-preview__image");
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function () {
          previewImage.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
      } else {
        const previewImage = previewContainer.querySelector(".image-preview__image");
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "")
      }
    });
  }

  function redirect(){
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      const data = {
        nr_app_run: nr_app_run
      };
      $.post("/postmethod_reset", {data: JSON.stringify(data)},
      function(err, req, resp){
        document.location.href = "/"+ resp["responseJSON"]["nr_app_run"];
      });
    } else {
      document.location.href="https://demo-ocr-fir.herokuapp.com/";
    }
  }

  // Dropdown list with search box
  // $("#selProd").select2();
  // $("#selTrasp").select2();
  // $("#selRacc").select2();

  function getFileData(){
    const fake_path = document.getElementById('inpFile').value;
    const nr_app_run = document.getElementById('nr_app_run').value;
    console.log(nr_app_run)
    const data = {
        file: fake_path.split("\\"),
        nr_app_run: nr_app_run
    };
    $.post("/postmethod", {img_data: JSON.stringify(data)},
        function(err, req, resp){
      window.location.href = "/results/"+ resp["responseJSON"]["unique_id"]
      + "&" + resp["responseJSON"]["nr_app_run"];
    });
  }

  $( "#clearButton" ).click(function(){
    redirect();
  });
  $( "#sendButton" ).click(function(){
    getFileData();
  });
});
