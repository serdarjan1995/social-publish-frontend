<template>
  <div class="vuse-content-wrapper">

    <v-container class="user-update">
      <v-row class="mx-0">
        <v-col class="private-cont" cols="12" md="4">
          <two-lines-items :items="overview"
                           :name="name"
                           :surname="surname"
                           :phone_number="phone_number"
                           :email="email"
                           v-if="overview" />

        </v-col>
        <v-col class="private-right-cols" cols="12" md="8">
          <v-sheet class="neu-glow-inset">
            <v-card-text>
              <form>
                <v-text-field
                    v-model="$store.state.user.profile.name"
                    :error-messages="nameErrors"
                    :counter="20"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="$store.state.user.profile.surname"
                    :error-messages="surnameErrors"
                    :counter="20"
                    label="Surname"
                    required
                    @input="$v.surname.$touch()"
                    @blur="$v.surname.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="$store.state.user.profile.email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="$store.state.user.profile.phone_number"
                    label="Phone Number"
                ></v-text-field>

                <v-btn class="mr-4" @click="submit('profile')">{{ $t("UserProfile.BtnUpdate") }}</v-btn>
              </form>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container >
      <v-row class="mx-0">
        <v-col class="private-cont" cols="12" md="4">
        </v-col>
        <v-col class="private-right-cols"  cols="12" md="8">
          <h3 class="my-3">
            <v-icon style="font-size: 30px;">lock</v-icon>
            <span class="ml-1" style="position: relative; top: 6px;">Password</span>
          </h3>
          <v-sheet class="neu-glow-inset">
            <v-card-text>
              <form>
                <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    required
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="passwordRepeat"
                    type="password"
                    label="Repeat Password"
                    required
                    :error-messages="passwordRepeatErrors"
                    @input="$v.passwordRepeat.$touch()"
                    @blur="$v.passwordRepeat.$touch()"
                ></v-text-field>

                <v-btn class="mr-4" @click="submit('password')">{{ $t("UserProfile.BtnUpdate") }}</v-btn>
              </form>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import TwoLinesItems from "@/components/UI/List/TwoLinesItems"
import { validationMixin } from "vuelidate"
import { required, maxLength, email } from "vuelidate/lib/validators"
import snackbar from "@/store/modules/snackbar";
export default {
  mixins: [validationMixin],
  props: ['authUser'],
  validations: {
    name: { required, maxLength: maxLength(10) },
    surname: { required, maxLength: maxLength(10) },
    password: { required },
    passwordRepeat: { required },
    email: { required, email },
    select: { required },
  },
  data() {
    return {
      name: this.$store.state.user.profile.name,
      surname: this.$store.state.user.profile.surname,
      email: this.$store.state.user.profile.email,
      phone_number: this.$store.state.user.profile.phone_number,
      password: '',
      passwordRepeat: '',
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      overviewInfo: {
        name: this.authUser.name
      },
      overview: {
        title: "overview",
        icon: "info",
        items: [
          {
            title: this.surname,
            subtitle: "Past: ABC Technologies",
            icon: "business",
            iconColor: "blue",
          },
          {
            title: "Master Degree at Oxford University",
            subtitle: "June 2012",
            icon: "school",
            iconColor: "blue-grey",
          },
          {
            title: "Los Angeles, California",
            subtitle: "From New York",
            icon: "house",
            iconColor: "pink",
          },
          {
            title: "Phone",
            subtitle: "+1 2245721247",
            icon: "call",
            iconColor: "blue darken-4",
          },
        ],
      },
      page: "Settings",
      breadcrumbs: [
        {
          text: "Settings",
          disabled: true,
        },
      ],
    };
  },
  computed:{
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
      errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    surnameErrors() {
      const errors = [];
      if (!this.$v.surname.$dirty) return errors;
      !this.$v.surname.maxLength &&
      errors.push("Surname must be at most 10 characters long");
      !this.$v.surname.required && errors.push("Surname is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    passwordRepeatErrors() {
      const errors = [];
      if (!this.$v.passwordRepeat.$dirty) return errors;
      !this.$v.passwordRepeat.required && errors.push("Password Repeat is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  components: {
    TwoLinesItems,
  },
  methods:{
    submit(type) {
      if (type === 'profile') {
        let dataProfile = this.$store.state.user.profile
        this.$store.dispatch("user/authUpdateProfile", dataProfile)
            .then(() => {})
            .catch((e) => {
              console.log("e", e)
            })
      } else if (type === 'password') {
        if (this.password === "" || this.passwordRepeat === "") {
          snackbar.state.snackbarMessage = this.$t('UserProfile.ThisRequired')
          snackbar.state.snackbarColor = "error"
          snackbar.state.snackbar = true
          return
        }
        if (this.password !== this.passwordRepeat) {
          snackbar.state.snackbarMessage = this.$t('UserProfile.PasswordNotMatch')
          snackbar.state.snackbarColor = "error"
          snackbar.state.snackbar = true
        } else {
          let dataPassword = {
            'password': this.password,
            'passwordRepeat': this.passwordRepeat
          }
          this.$store.dispatch("user/authUpdatePassword", dataPassword)
        }

      }

    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
  }
};
</script>

<style scoped>
  .fill-height{
    height: 0 !important;
  }
  .user-update, .vuse-content-wrapper, .private-cont {
    padding: 0 !important;
    margin: 0 !important;
  }
  .private-right-cols {
    padding: 0px;
    padding-left: 13px;
  }
</style>
