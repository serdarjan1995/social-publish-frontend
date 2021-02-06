<template>
  <v-sheet max-width="380" class="mx-auto" color="transparent">

    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form" class="my-10">

      <v-text-field :error-messages="fieldErrors('form.email')" @input="$v.form.email.$touch()"
                    @blur="$v.form.email.$touch()" prepend-inner-icon="email"
                    v-model="form.email" label="Email" solo flat/>

      <v-btn block type="submit" :disabled="$v.$invalid" :loading="loader">Send OTP</v-btn>

    </v-form>

  </v-sheet>
</template>

<script>
import {required, email} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  email: "",
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: {required, email},
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "Please enter email",
        email: "Email must be valid",
      },
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      errors: null,
      loader: false,
    };
  },
  methods: {
    submit() {
      this.loader = true;
      this.$store.dispatch("restore/restoreRequest", this.form)
          .then(() => {
            this.$v.$reset();
            setTimeout(() => {
              this.loader = false;
              this.$emit("next", {email: this.email});
            }, 2000);
          })
    },

  },
};
</script>