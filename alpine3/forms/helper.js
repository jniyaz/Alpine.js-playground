/* jshint esversion: 6 */

export default class AlpineFormHandler {
    constructor(thisContext, inputElements) {
        this._inputElements = inputElements;
        this._context = thisContext;
        this.initElements();
        this.updateErrorMessages();
    }

    initElements() {
        this._inputElements.map((ele) => {
            this._context[ele.name] = {
                serverErrors: JSON.parse(ele.dataset.serverErrors),
                blurred: false
            };
        });
    }

    updateErrorMessages() {
        this._inputElements.map((ele) => {
            this._context[ele.name].errorMessage = this.getErrorMessage(ele);
        });
    }

    getError() {
        this._inputElements.map((input) => {
            this._context[input.name].blurred = true;
        });
    }

    getErrorMessage(ele) {
        //Return any server errors if they're present
        if (this._context[ele.name].serverErrors.length > 0) {
            return input.serverErrors[0];
        }
        //Check using iodine and return the error message only if the element has not been blurred
        const error = Iodine.is(ele.value, JSON.parse(ele.dataset.rules));
        if (error !== true && this._context[ele.name].blurred) {
            return Iodine.getErrorMessage(error);
        }
        //return empty string if there are no errors
        return "";
    }

    inputChange(event) {
        //Ignore all events that aren't coming from the inputs we're watching
        if (!this._context[event.target.name]) {
            return false;
        }
        if (event.type === "input") {
            this._context[event.target.name].serverErrors = [];
        }
        if (event.type === "focusout") {
            this._context[event.target.name].blurred = true;
        }
        this.updateErrorMessages();
    }

    handleFormValidation() {
        const validate = this._inputElements.filter((input) => {
            return Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true;
        });
        if (validate.length > 0) {
            document.getElementById(validate[0].id).scrollIntoView();
            this.getError();
            this.updateErrorMessages();
            return false;
        } else {
            return true;
        }
    }
}
