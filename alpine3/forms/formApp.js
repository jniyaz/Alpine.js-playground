import Alpine from "https://cdn.skypack.dev/alpinejs";
import kingshottIodine from "https://cdn.skypack.dev/@kingshott/iodine";
import AlpineFormHandler from './helper.js';

Alpine.data("form", form);
Alpine.start();

function form() {
    return {
        inputElements: [],
        name: "Niyaz",
        formValidate: null,

        init() {
            this.inputElements = [...this.$el.querySelectorAll("input[data-rules]")];
            this.formValidate = new AlpineFormHandler(this, this.inputElements);
        },

        change: function (event) { this.formValidate.inputChange(event) },

        submit: function () {
            const validated = this.formValidate.handleFormValidation();
            if (!validated) {
                return "Something went wrong";
            } else {
                console.log('submitted..');
            }
        },
    };
}
