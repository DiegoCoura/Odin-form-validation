/****
 * References
 * https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * https://regexr.com/ - Tool by Grant Skinner for testing Regular Expressions
 *
 */

const APP = {
    init() {
      APP.addListeners();
    },
    addListeners() {
      let form = document.sampleForm;
      let fullname = document.getElementById('fullname');
      let email = document.getElementById('email');
      let pass = document.getElementById('pass');
      let cell = document.getElementById('cell');
      let regcode = document.getElementById('regcode');
      let pets = document.getElementById('pets');
      //after changing the whole value
      fullname.addEventListener('change', APP.testName);
      email.addEventListener('change', APP.testEmail);
  
      //while typing
      regcode.addEventListener('input', APP.formatCode);
      cell.addEventListener('input', APP.formatPhone);
  
      //what to do if something went wrong during validation
      fullname.addEventListener('invalid', APP.fail);
      email.addEventListener('invalid', APP.fail);
  
      //when the form gets submitted
      form.addEventListener('submit', APP.validate);
    },
    validate(ev) {
      ev.preventDefault();
      let form = ev.target;
  
      let email = document.getElementById('email');
      console.log('willValidate', email.willValidate);
      //run validation on the whole form when submitting...
  
      // form controls have the following
      // invalid event
      console.log(email.validity);
      // validity readonly prop - a ValidityState object
      // ValidityState object props: (Boolean values)
      // badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow
      // stepMismatch, tooLong, tooShort, typeMismatch, valid, valueMissing
      //
      // willValidate readonly prop - boolean
  
      // validationMessage - readonly prop from browser validation
      //                    or setCustomValidity( ) method
  
      // checkValidity() checks element, returns boolean,
      //                fires the invalid event
  
      // reportValidity() checks AND reports result
      //                  this shows the browser tooltip with warning
      //                  can be called at any point to show message
  
      // setCustomValidity(msg) if called with non-empty string it
      //                    will change the value of validity.valid
      //                    to false and validity.customError to true
    },
    testName(ev) {
      let fullname = ev.target;
      fullname.setCustomValidity(''); //clear old message
      //built-in test for error based on type, pattern, and other attrs
      let currently = fullname.checkValidity();
    },
    testEmail(ev) {
      let email = ev.target;
      //console.log(email.validity);
      email.setCustomValidity(''); //clear old message
      //built-in test for error based on type, pattern, and other attrs
      let currently = email.checkValidity();
      //console.log('currently', currently);
      if (currently) {
        let emReg = new RegExp('@gmail.com$', 'i');
        if (emReg.test(email.value) === false) {
          //not a gmail address
          console.log('NOT a gmail address');
          email.setCustomValidity('NOT a gmail address.');
          console.log(email.validity);
          email.reportValidity(); //show the custom message, trigger invalid event
        }
      }
    },
    formatCode(ev) {
      let regcode = ev.target;
      let val = regcode.value;
      val = val.toUpperCase();
      regcode.value = val; //converts anything typed to uppercase
      //check for i and o used instead of 1 or 0...
      regcode.setCustomValidity('');
      if (/(I|O)/.test(val)) {
        regcode.setCustomValidity(
          'There are no letters i or o in the codes. Should this be a one or a zero?'
        );
        regcode.reportValidity(); //display the message and trigger invalid event
      }
    },
    formatPhone(ev) {
      //format and correct the phone number as user is typing?
      //eg: +1 (555) 555-1212
      //restrict to numbers, parentheses, hyphens, and + as typing?
    },
    checkPasswordRequirements(input) {
      //check password requirements as user types
      // uppercase, lowercase, numeric, length >= 10
      // Allowed: [! @ # $ % ^ & * ( ) . , ? ; : ~]
      let response = {
        upper: false,
        lower: false,
        num: false,
        len: false,
        matches: null,
        invalid: true,
      };
      let txt = input.value.trim();
      response.upper = /[A-Z]/.test(txt);
      response.lower = /[a-z]/.test(txt);
      response.num = /[0-9]/.test(txt);
      response.len = input.value.trim().length >= 10;
      response.matches = txt.match(/([^A-Za-z0-9_!@#$%^&*().,?;:~])/);
      if (response.matches && response.matches.length > 0) {
        response.invalid = false;
      }
      return response;
    },
    fail(ev) {
      let field = ev.target;
      // the invalid event fired
      console.log('INVALID');
      //standard display change for any element
      switch (field.id) {
        case 'email':
          let span = field.parentElement.querySelector('.errMessage');
          span.textContent = 'Must be a valid Gmail address.';
          break;
      }
    },
  };
  document.addEventListener('DOMContentLoaded', APP.init);