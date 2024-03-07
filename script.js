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
let selectedIndex;
let selectedIndex2;
let selectedIndex3;

const mySubmitFunction =(e) => {
    e.preventDefault();
    return false;
};

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


  const inputTypesData = [
    {
      type: "text",
      attrs: ["name", "placeholder", "maxlength", "label", "required"],
    },
    {
      type: "textarea",
      attrs: ["name", "placeholder", "maxlength", "label", "required"],
    },
    { type: "number", attrs: ["name", "min", "max", "label"] },
    { type: "email", attrs: ["name", "placeholder", "label"] },
    { type: "password", attrs: ["name", "minlength", "maxlength", "label"] },
    { type: "date", attrs: ["name", "min", "max"] },
    { type: "button", attrs: ["name", "value"] },
  ];
  const OnlyInputType = () => {
    const inputType = inputTypesData.map((ele) => ele.type);
    return inputType;
  };


















