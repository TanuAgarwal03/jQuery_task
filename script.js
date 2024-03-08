// AJAX - Asynchronous Javascript and XML 

// $(function(){
//     $("button").on("click" , function(){
//         var text = $(this).text();
//         alert(text);
//     })
// })

// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
//   })

// function mySubmitFunction(event) {
//     // Prevent the default form submission
//     event.preventDefault();

//     // Get the values from the input field and dropdown list
//     var inputValue = document.getElementById("input1").value;
//     var dropdownValue = document.getElementById("dropdown1").value;

//     // Do something with the values (for example, log them to the console)
//     console.log("Input value: " + inputValue);
//     console.log("Dropdown value: " + dropdownValue);

//     // Optionally, you can perform further actions here

//     // Return false to prevent the form from being submitted
//     return false;
//   }
//   var options = [
//     { value: 'option1', text: 'Option 1' },
//     { value: 'option2', text: 'Option 2' },
//     { value: 'option3', text: 'Option 3' }
//   ];

//   // Function to populate dropdown options
//   function populateDropdown() {
//     var dropdown = document.getElementById('dropdown1');

//     // Clear existing options
//     dropdown.innerHTML = '';

//     // Add options from the array
//     options.forEach(function(option) {
//       var optionElement = document.createElement('option');
//       optionElement.value = option.value;
//       optionElement.text = option.text;
//       dropdown.appendChild(optionElement);
//     });
//   }

// $(document).ready(function() {
//   // Event handler for dropdown1 change event
//   $('#selectheading').change(function() {
//     var selectedValue = $(this).val();
    
//     // Clear dropdown2
//     $('#selectsubheading').empty();
    
//     // Add options to selectsubheading based on the selection in selectheading
//     if (selectedValue === 'option1') {
//       $('#selectsubheading').append('<option value="suboption1">Suboption 1</option>');
//       $('#selectsubheading').append('<option value="suboption2">Suboption 2</option>');
//     } else if (selectedValue === 'option2') {
//       $('#selectsubheading').append('<option value="suboption3">Suboption 3</option>');
//       $('#selectsubheading').append('<option value="suboption4">Suboption 4</option>');
//     } else if (selectedValue === 'option3') {
//       $('#selectsubheading').append('<option value="suboption5">Suboption 5</option>');
//       $('#selectsubheading').append('<option value="suboption6">Suboption 6</option>');
//     }
//   });
// });
let selectedIndex;
let selectedIndex2;
let selectedIndex3;

const mySubmitFunction =(e) => {
    e.preventDefault();
    return false;
};

const disabledBtnForm = (inputField, btnId) => {
    $(btnId).prop("disabled" , true);  //initially disable the submit button
    $(inputField).on("input" , function(){
        const textInput = $(this).val();
        if(textInput.length <= 0){      //no heading text is entered
            $(btnId).prop("disabled" , true);
        }
        else{
            $(btnId).prop("disabled" , false); //enable the submit button 
        }
    });
};
function saveData(){
    var htmlContent =$("main").html();
    localStorage.setItem("contentData" , htmlContent);
}

const appendForm = (takeinputdata) => {  //appending the fields to the form input 
    takeinputdata.empty();
    takeinputdata.append(` <div id="attributeForm" class="d-flex">
    <label for="id">ID:</label>
    <input type="text" id="id" name="id">
  
    <label for="class">Class:</label>
    <input type="text" id="class" name="class">
  
    <label for="value">Value:</label>
    <input type="text" id="value" name="value">
  
    <label for="disabled">Disabled:</label>
    <input type="checkbox" id="disabled" name="disabled">
  
    <label for="readonly">Readonly:</label>
    <input type="checkbox" id="readonly" name="readonly">
  
    <label for="require">Require:</label>
    <input type="checkbox" id="require" name="require">
  
    <label for="placeholder">Placeholder:</label>
    <input type="text" id="placeholder" name="placeholder">
  
    <label for="maxlength">Max Length:</label>
    <input type="number" id="maxlength" name="maxlength">
  
    <label for="minLength">Min Length:</label>
    <input type="number" id="minLength" name="minLength">
  
  
  </div>`);
  };

const getIndexOfSelectedHeading = () => {
  $("#dynamicSelect").on("change", function () {
    selectedIndex = $(this).prop("selectedIndex");
  });
};
const getIndexOfSelectedHeading2 = () => {
    $("#selectheading").on("change", function () {
      selectedIndex2 = $(this).prop("selectedIndex");
      populateheadingsub();
    });
  };
  const getIndexOfSelectedHeading3 = () => {
    $("#selectsubheading").on("change", function () {
      selectedIndex3 = $(this).prop("selectedIndex");
    });
  };
  const sortableFunction = () => {
    $(function () {
    $("main").sortable({
    update: function (event, ui) { //this event is triggered when sorting operation is completed
    saveData();   //this function is called to save the updated order of elements 
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


  const inputTypesData = [     //array containing objects with input types and their attributes
    { type: "text", attrs: ["name", "placeholder", "maxlength", "label", "required"] },
    { type: "textarea", attrs: ["name", "placeholder", "maxlength", "label", "required"] },
    { type: "number", attrs: ["name", "min", "max", "label"] },
    { type: "email", attrs: ["name", "placeholder", "label"] },
    { type: "password", attrs: ["name", "minlength", "maxlength", "label"] },
    { type: "date", attrs: ["name", "min", "max"] },
    { type: "button", attrs: ["name", "value"] },
  ];
  const OnlyInputType = () => { //function to extract only the input types from above function
    const inputType = inputTypesData.map((ele) => ele.type);
    return inputType;
  };

  function updateSelectOptions(array, selectid) { //function to update the options of dropdown based on array of values 
    if (!array) {
      return;
    }
  
    var select = $(selectid);
    select.empty();
    var defaultOption = $("<option>", {  //create a default option with some text
      value: null,
      text: "Select any of the heading...",
    });
    select.append(defaultOption);  //append the default option to the dropdown 
    for (var i = 0; i < array.length; i++) { 
      var option = $("<option>", { //Create an option element for each value in the array
        value: array[i], 
        text: array[i] 
    });
      select.append(option);
    }
  }

  $(document).ready(function () {
    loadData();  //load data from localstorage or database 
    sortableFunction();
    getIndexOfSelectedHeading();
    getIndexOfSelectedHeading2();
    getIndexOfSelectedHeading3();
    disabledBtnForm("#input1", "#btn1");
  
    $("main").on("click", ".delete-section", function () {
      $(this).closest("section").remove();  //removes the closest section 
      saveData();  //save the changes made to the data 
    });
    $("main").on("click", ".delete-subheading", function () {
      $(this).closest(".mx-5").remove(); //removes the subheading section from DOM
      saveData();
    });
       
    $("main").on("click", ".delete-input", function () {
      var inputContainer = $(this).closest("form"); //removes the form section from DOM
      inputContainer.remove();
      saveData();
    });
    updateSelectOptions(OnlyInputType(), "#selctinputtype");
    
    $("#headingModalbtn").click(function () {
        $("#input1").val("");
    });

    $("#SubheadingModalbtn").click(function () {
        $("#input2").val("");
        populateHeadingSelect();
    });

    $("#form1").click(function () {
        $("#selectsubheading").empty();
        const defaultOption = `<option> select subheading </option>`;
        $("#selectsubheading").append(defaultOption);
        $("#attributeForm").remove();
        $("#selctinputtype").val("Select any of the input...");
        populateHeadingSelectinput2();
    });

    $("#btn1").click(function () {
    var heading = $("#input1").val();
    if (heading == "") {
    alert("enter heading");
    return;
    }
    appendHeading(heading);
    saveData();
    $("#input1").val("");
    sortableFunction();
    });

    $("#btn2").click(function () {
    var heading = $("#dynamicSelect").val();
    var subheading = $("#input2").val();
    if (heading === "" || subheading === "" || heading == "Select Heading") {
        return;
    } else {
        appendSubheading(heading, subheading);
        saveData();
    }
    $("#input2").val("");  //clear the value of element with id input2 
    $("#exampleModal2").removeClass("show");
    $("#exampleModal2").modal("hide");
    sortableFunction();
    });
       
    var optionsData = [];

    $("#btn3").click(() => {
    const input1 = $("#selectheading").val();
    const input2 = $("#selectsubheading").val();
    const input3 = $("#selctinputtype").val();
    console.log(input1,input2,input3)
    var errors = []; //array to store the arrays is any of these conditions gets true 
       
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
        $("#error").text(errors.join("\n"))
        errors.splice(0,errors.length)
        return;
    }
    
       
   })
  })

// $(document).ready(function() {
//     $('#input1').on('input', function() {
//         var inputValues = $(this).val().trim().split(','); // Split input values by comma
        
//         // Clear previous options in the dropdown
//         $('#selectheading').empty();
        
//         // Add new options to the dropdown
//         $.each(inputValues, function(index, value) {
//             // Trim leading/trailing whitespace from each value
//             value = value.trim();
//             if (value !== '') {
//                 // Append an option element to the dropdown
//                 $('#selectheading').append($('<option>', {
//                     value: value,
//                     text: value
//                 }));
//             }
//         });
//     });
// });


// on refreshing the page , the content in the field remain intact

// $(document).ready(function() {
//     // Load data from localStorage if available
//     var savedValues = localStorage.getItem('inputValues');
//     if (savedValues) {
//         $('#input1').val(savedValues);
//         updateDropdown(savedValues);
//     }
    
//     $('#input1').on('input', function() {
//         var inputValues = $(this).val().trim();
//         updateDropdown(inputValues);
        
//         // Save input values to localStorage
//         localStorage.setItem('inputValues', inputValues);
//     });
    
//     function updateDropdown(inputValues) {
//         var inputArray = inputValues.split(',').map(function(value) {
//             return value.trim();
//         }).filter(function(value) {
//             return value !== '';
//         });

//         // Clear previous options in the dropdown
//         $('#selectheading').empty();

//         // Add new options to the dropdown
//         $.each(inputArray, function(index, value) {
//             $('#selectheading').append($('<option>', {
//                 value: value,
//                 text: value
//             }));
//         });
//     }
// });













