let selectedIndex;
let selectedIndex2;
let selectedIndex3;

const mySubmitFunction =(e) => {
    e.preventDefault();
    return false;
};

const disabledBtnForm = (inputField, btnId) => {
    $(btnId).prop("disabled" , true); 
    $(inputField).on("input" , function(){
        const textInput = $(this).val().trim();
        if(textInput.length <= 0){   
            $(btnId).prop("disabled" , true);
        }
        else{
            $(btnId).prop("disabled" , false);
        }
    });
};
function saveData(){
    var htmlContent =$("main").html();
    localStorage.setItem("contentData" , htmlContent);
}

const appendForm = (takeinputdata) => { 
    takeinputdata.empty();
    takeinputdata.append(` <div id="attributeForm" class="">
    <label for="id">ID:</label>
    <input type="text" id="id" name="id" class="mt-2"><br>
  
    <label for="class">Class:</label>
    <input type="text" id="class" name="class" class="mt-2"><br>
  
    <label for="value">Value:</label>
    <input type="text" id="value" name="value" class="mt-2"><br>
  
    <label for="disabled">Disabled:</label>
    <input type="checkbox" id="disabled" name="disabled" class= "mt-2">
  
    <label for="readonly">Readonly:</label>
    <input type="checkbox" id="readonly" name="readonly" class= "mt-2">
  
    <label for="require">Required:</label>
    <input type="checkbox" id="require" name="require" class= "mt-2"><br>
  
    <label for="placeholder">Placeholder:</label>
    <input type="text" id="placeholder" name="placeholder"class= "mt-2"><br>
  
    <label for="maxlength">Max Length:</label>
    <input type="number" id="maxlength" name="maxlength"class= "mt-2"><br>
  
    <label for="minLength">Min Length:</label>
    <input type="number" id="minLength" name="minLength"class= "mt-2">

  </div>`);
  };

const getIndexOfSelectedHeading = () => {
  $(".dynamicSelect").on("change", function () {
    selectedIndex = $(this).prop("selectedIndex");
  });
};
const getIndexOfSelectedHeading2 = () => {
    $(".selectheading").on("change", function () {
      selectedIndex2 = $(this).prop("selectedIndex");
      populatesubheading();
    });
  };
  const getIndexOfSelectedHeading3 = () => {
    $(".selectsubheading").on("change", function () {
      selectedIndex3 = $(this).prop("selectedIndex");
    });
  };

   const sortableFunction = () => {
    $(function () {
      $("main").sortable({
        update: function (event, ui) {
          saveData();  
        },
        cursor: "move",
      });
      $("aside").sortable({
        update: function (event, ui) {
          saveData();
        },
        cursor: "move",
        connectWith: "aside",
      });
      $(".mx-5").sortable({
        connectWith: "aside > div",
        items: "> form",
        cursor: "move",
        update: function (event, ui) {
          saveData();
        },
      });
    });
  };

  const inputTypesData = [ 
    { type: "text", attrs: ["name", "placeholder", "maxlength", "label", "required"] },
    { type: "textarea", attrs: ["name", "placeholder", "maxlength", "label", "required"] },
    { type: "number", attrs: ["name", "min", "max", "label"] },
    { type: "email", attrs: ["name", "placeholder", "label"] },
    { type: "checkbox", attrs: ["name", "checked", "label"] },
    { type: "radio", attrs: ["name", "value", "checked", "label"] },
    { type: "password", attrs: ["name", "minlength", "maxlength", "label"] },
    { type: "date", attrs: ["name", "min", "max"] },
    { type: "button", attrs: ["name", "value"] },
    { type: "file", attrs: ["name", "accept"] },
    { type: "color", attrs: ["name", "value"] },
    { type: "range", attrs: ["name", "min", "max", "value", "label"] },
    { type: "hidden", attrs: ["name", "value"] },
    { type: "submit", attrs: ["name", "value","label"] },
    { type: "reset", attrs: ["name", "value"] },
    { type: "select"}
  ];
  const OnlyInputType = () => { 
    const inputType = inputTypesData.map((ele) => ele.type);
    return inputType;
  };

  function updateSelectOptions(array, selectid) {
    if (!array) {
      return;
    }
  
    var select = $(selectid);
    select.empty();
    var defaultOption = $("<option>", { 
      value: null,
      text: "Select any input data type",
    });
    select.append(defaultOption);
    for (var i = 0; i < array.length; i++) { 
      var option = $("<option>", { 
        value: array[i], 
        text: array[i] 
    });
      select.append(option);
    }
  }

  $(document).ready(function () {
    loadData(); 
    sortableFunction();
    getIndexOfSelectedHeading();
    getIndexOfSelectedHeading2();
    getIndexOfSelectedHeading3();
    disabledBtnForm(".input1", ".btn1");
  
    //delete-section 
    $("main").on("click", ".delete-section", function () {
      $(this).closest("section").remove();  
      saveData();
    });
    $("main").on("click", ".delete-subheading", function () {
      $(this).closest(".mx-5").remove(); 
      saveData();
    });   
    $("main").on("click", ".delete-input", function () {
      var inputContainer = $(this).closest("div"); 
      inputContainer.remove();
      saveData();
    });
    updateSelectOptions(OnlyInputType(), ".selectinputtype");
    
    //modals 
    $("#headingModal").click(function () {
        $(".input1").val("");
    });

    $("#SubheadingModalbtn").click(function () {
        $(".input2").val("");
        populateHeadingSelect();
    });

    $("#form3").click(function () {
        $(".selectsubheading").empty();
        const defaultOption = `<option> select subheading </option>`;
        $(".selectsubheading").append(defaultOption);
        $("#attributeForm").remove();
        $(".selectinputtype").val("Select any of the input");
        populateHeadingSelectinput2();
    });

    $(".btn1").click(function () {
    var heading = $(".input1").val();
    if (heading == "") {
    alert("enter heading");
    return;
    }
    appendHeading(heading);
    saveData();
    $(".input1").val("");
    sortableFunction();
    });

    $(".btn2").click(function () {
    var heading = $(".dynamicSelect").val();
    var subheading = $(".input2").val();
    if (heading === "" || subheading === "" || heading == "Select Heading") {
        return;
    } else {
        appendSubheading(heading, subheading);
        saveData();
    }
    $(".input2").val("");
    $(".exampleModal2").removeClass("show");
    $(".exampleModal2").modal("hide");
    sortableFunction();
    });
       
    var optionsData = [];

    $(".btn3").click(() => {
    const input1 = $(".selectheading").val();
    const input2 = $(".selectsubheading").val();
    const input3 = $(".selectinputtype").val();
    console.log(input1,input2,input3)
    var errors = []; 
       
    if (input1 == "Select heading") {
        errors.push("Please select a valid heading for Heading."); 
    }     
    if (input2 == "select subheading" || input2 == null) {
        errors.push("Please select a valid subheading for Sub Heading.");
    }  
    if (input3 == "Select any of the input...") {
        errors.push("Please select a valid heading for Input Type.");
    }    
    if (errors.length > 0) {
        $(".error").text(errors.join("\n"))
        errors.splice(0,errors.length) //it removes elements from starting index 0 upto the end of array errors
        return;
    }

    // let url = 'http://127.0.0.1:5500/index.html?' ;
    // $(".formAppend div").each(function() {
    //   const controlName = $(this).attr("name");
    //   const controlValue = $(this).val();
    //   url += '&' + encodeURIComponent(controlName) + '=' + encodeURIComponent(controlValue);
    // });
    // history.pushState({} ,'',url);





    var section = $("main > section").eq(selectedIndex2 - 1);
    var targetDiv = section.find("aside > div.mx-5").eq(selectedIndex3 - 1).find("form");
    const selectedDiv = targetDiv;

    if (input3 === "select") {
      var optionsData = [];
      $('input[id=123]').each(function() {
        var valueEle = $(this).val();
        optionsData.push(valueEle);
      });
      var selectElement = $("<div class='p-2 my-2 d-flex align-items-center mx-4'><select class='form-select w-25'></select></div>");
      for (let i = 0; i < optionsData.length; i++) {
        var option = $("<option>").text(optionsData[i]).val(optionsData[i]);
        selectElement.find("select").append(option);
      }
      selectElement.find("select")[0].selectedIndex = 2;
      var deleteButton = $("<button class='delete-input btn btn-info btn-sm'>Delete Input</button>");
      selectElement.append(deleteButton);
      selectedDiv.append(selectElement);
      saveData();
    }
    else {
      var id = $("#id").val();
      var className = $("#class").val();
      var value = $("#value").val();
      var disabled = $("#disabled").prop("checked");
      var readonly = $("#readonly").prop("checked");
      var require = $("#require").prop("checked");
      var placeholder = $("#placeholder").val();
      var maxlength = $("#maxlength").val();
      var minLength = $("#minLength").val();
      var name = $("#inputName").val();
      var newInput = $(
        `<div class=' p-2 my-2 d-flex align-items-center mx-4'><input class='w-50 d-block mt-2'><button class='delete-input btn btn-info btn-sm'>Delete input</button></div>`
      );      
      switch (input3) {
        case "text":
          newInput.find("input").attr({
            id: id,
            type: "text",
            class: className,
            value: value,
            name: value,
            disabled: disabled ? "disabled" : undefined,
            readonly: readonly ? "readonly" : undefined,
            required: require ? "required" : undefined,
            placeholder: placeholder,
            maxlength: maxlength,
            minlength: minLength,
          });
          break;
        
          case "textarea":
            newInput = $(
                "<div class=' p-2 my-2 d-flex align-items-center mx-4'><textarea class='form-control w-75 mx-4'>"+ value + "</textarea><button class='delete-input btn btn-info btn-sm'>Delete Input</button></div>"
            );
            var textareaElement = newInput.find("textarea");
            textareaElement.attr({
                id: id,
                type: "text",
                class: className,
                value : value,
                name: value,
                disabled: disabled ? "disabled" : undefined,
                readonly: readonly ? "readonly" : undefined,
                required: require ? "required" : undefined,
                placeholder: placeholder,
                maxlength: maxlength,
                minlength: minLength,
            });
            var textareaElement = textareaElement.val();
            console.log(value)
            break;
            
        case "checkbox":
          newInput = $(
            `<div class=' p-2 my-2 d-flex align-items-center mx-4'><button class='delete-input btn btn-info btn-sm'>Delete Input</button></div>`
          );
          var checkboxValues = value.split(",");
          checkboxValues.forEach(function (checkboxValue) {
            checkboxValue = checkboxValue.trim();
            var checkboxElement = $("<input>", {
              id: id + "_" + checkboxValue,
              type: "checkbox",
              class: className,
              disabled: disabled ? "disabled" : undefined,
              readonly: readonly ? "readonly" : undefined,
              required: require ? "required" : undefined,
            });
            var labelElement = $("<label>", {
              for: id + "_" + checkboxValue,
              text: checkboxValue,
            });
            newInput.prepend(checkboxElement, labelElement);
          });
          break;

        case "number":
          newInput.find("input").attr({
            id: id,
            type: "number",
            class: className,
            value: value,
            name: value,
            disabled: disabled ? "disabled" : undefined,
            readonly: readonly ? "readonly" : undefined,
             required: require ? "required" : undefined,
            placeholder: placeholder,
            maxlength: maxlength,
            minlength: minLength,
          });
          break;
         
          case "radio":
            newInput = $(
                `<div class=' p-2 my-2 d-flex align-items-center mx-4'><button class='delete-input btn btn-info btn-sm'>Delete Input</button></div>`
            );
            var radioValue = value.split(",");
            radioValue.forEach(function (radioValues) {
                radioValues = radioValues.trim();
                var radioElement = $("<input>", {
                    id: id + "_" + radioValues,
                    type: "radio",
                    class: className,
                    name: id, // Assign the same name to all radio buttons in this group
                    disabled: disabled ? "disabled" : undefined,
                    readonly: readonly ? "readonly" : undefined,
                    required: require ? "required" : undefined,
                });
                var labelElement = $("<label>", {
                    for: id + "_" + radioValues,
                    text: radioValues,
                });
                newInput.prepend(radioElement, labelElement);
            });
            break;
        
          case "submit":
            newInput
            .find("input")
            .attr({
              id: id,
              type: "submit",
              class: className,
              value: value,
              name: value,
              disabled: disabled ? "disabled" : undefined,
              readonly: readonly ? "readonly" : undefined,
              required: require ? "required" : undefined,
              
            });            
            console.log(value);
            break;
            
          case "reset":
            newInput
              .find("input")
              .attr({
                id: id,
                type: "reset",
                class: className,
                value: value,
                name: name,
                disabled: disabled ? "disabled" : undefined,
                readonly: readonly ? "readonly" : undefined,
                required: require ? "required" : undefined,
              });
                // $("{id}").click(function(){
                //   $(".appendForm")[0].reset();
                // });
            break;
        
        case "range":
          newInput
            .find("input")
            .attr({
              type: "range",
              id: id,
              min: minLength,
              max: maxlength,
              value: value,
              disabled: disabled ? "disabled" : undefined,
              readonly: readonly ? "readonly" : undefined,
               required: require ? "required" : undefined,
            });
          break;
        
        default:
          newInput
            .find("input")
            .attr({
              id: id,
              type: input3,
              class: className,
              value: value,
              name: value,
              disabled: disabled ? "disabled" : undefined,
              readonly: readonly ? "readonly" : undefined,
               required: require ? "required" : undefined,
              placeholder: placeholder,
              maxlength: maxlength,
              minlength: minLength,
            });
          break;
      }

      selectedDiv.append(newInput);
    

    }
    $(".selectheading").val("Select heading");
    $(".selectsubheading").val("select subheading");
    $(".selectinputtype").val("Select any input data type");
    var takeinputdata = $(".takeinputdata");
    appendForm(takeinputdata);
    $(".exampleModal3").removeClass("show");
    $(".exampleModal3").modal("hide");
    saveData();
  });

  function populateHeadingSelect() {
    var headings = $("h2");
    var select = $(".dynamicSelect");
    select.empty();
    select.append("<option selected>" + "Select Heading" + "</option>");
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }
  function populateHeadingSelectinput2() {
    var headings = $("h2");
    var select = $(".selectheading");
    select.empty();
    select.append("<option>" + "Select heading" + "</option>");
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }

  function appendHeading(heading) {
    $("main").append(
      "<section class='class1 bg-light w-50 my-2 p-2 position-relative'><button class='delete-section btn btn-danger position-absolute end-0 mx-2'>⨯</button><h2 class='heading'>" +
        heading +
        "</h2><aside class=' p-3'></aside></section>"
    );
  }

  function appendSubheading(heading, subheading) {
    getIndexOfSelectedHeading();
    console.log(selectedIndex);
    var section = $("main > section").eq(selectedIndex - 1);
    if (section.length === 0) {
      console.error("Section not found for heading: " + heading);
      return;
    }
    var newSubheadingDiv = $(
      "<div class='mx-5 bg-light w-50 my-2 p-2 position-relative'><h4 class='subheading'>" +
        subheading +
        "</h4><button class='delete-subheading btn btn-danger position-absolute end-0 top-0 mx-2'>⨯</button><form method='GET' class='formAppend'></form></div>"
    );
    
    section.find("aside").append(newSubheadingDiv);
  }

  function loadData() {
    var contentData = localStorage.getItem("contentData");
    if (contentData) {
      $("main").html(contentData);
    }
  };  
});
const populatesubheading = () => {
  var section = $("main > section").eq(selectedIndex2 - 1);
  console.log(section, "section....");
  const h4Elements = section.find("h4.subheading");

  console.log(h4Elements, "h4elements");
  const h4TextArray = h4Elements
    .map(function () {
      return $(this).text();
    })
    .get();
  console.log(h4TextArray);
  var selectsubheading = $(".selectsubheading");

  selectsubheading.empty();
  selectsubheading.append("<option>" + "select subheading" + "</option>");
  if (h4TextArray && h4TextArray.length) {
    for (let i = 0; i < h4TextArray.length; i++) {
      selectsubheading.append("<option>" + h4TextArray[i] + "</option>");
    }
  } else {
    console.log("TextArray is either not defined or empty.");
  }
};

const handleInputChange = () => {
  const input3 = $(".selectinputtype").val();

  if (input3 == "Select any input data type") {
    return;
  }
  const takeinputdata = $(".takeinputdata");
  takeinputdata.empty();

  const hiddenFields = ["placeholder", "maxlength", "minLength"];

  if (input3 === "select") {
    let optionsAdded = false; // Flag variable to track if options are added

    const number = $("<input>", {
        type: "number",
        placeholder: "Enter the number of options",
        class: "form-control w-50 mt-3",
    });

    const buttonSubmit = $("<button>Add Options</button>");
    takeinputdata.append(number, buttonSubmit);
    
    buttonSubmit.click(() => {
        // Check if options are already added
        if (!optionsAdded) {
            const noOfInputOptions = parseInt(number.val());

            const selectInput = $("<select>").attr({
                class: "form-control w-50 mt-3"
            });
            for (let i = 0; i < noOfInputOptions; i++) {
                const newInput = $("<input>").attr({
                    placeholder: "Options",
                    id: 123,
                });
                $(".provideoption").append(newInput);
            }
            optionsAdded = true; // Set the flag to true after options are added
        }

        takeinputdata.show();
        
        $('.btn3').on("click", function () {
            $(".provideoption").empty();
            optionsAdded = false; // Reset the flag when options are cleared
        });
    })
    
}
  else if (
    input3 === "checkbox" || input3 === "radio" || input3 === "date" ||
    input3 === "file" || input3 === "color" || input3 === "range" ||
    input3 === "hidden" || input3 === "submit" || input3 === "button"
  ) {
    takeinputdata.empty();
    appendForm(takeinputdata);
    hiddenFields.forEach((field) =>
      $(`#${field}`).hide().prev("label").hide()
    );

    if (input3 === "submit") {
      const nameLabel = $("<label>").text("Name");
      const nameInput = $("<input>").attr({
        type: "text",
        id: "inputName",
      });

      $(".takeinputdata form").prepend(nameLabel, nameInput);
    }
  } else {
    takeinputdata.empty();
    appendForm(takeinputdata);
  }
};
