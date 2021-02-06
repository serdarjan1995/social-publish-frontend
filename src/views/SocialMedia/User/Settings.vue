<template>
    <div class="vuse-content-wrapper">
        <vuse-section-definition
                :title="page"
                icon="dashboard"
        ></vuse-section-definition>
        <v-container fluid  class="fill-height">
            <v-row class="mt-10 mx-0">
            <v-col cols="12" md="4">
                <two-lines-items v-bind="overview" v-if="overview" />

            </v-col>
            <v-col cols="12" md="8">
                <v-sheet class="neu-glow-inset">
                    <v-card-text>
                            <form>
                                <v-text-field
                                        v-model="name"
                                        :error-messages="nameErrors"
                                        :counter="10"
                                        label="Name"
                                        required
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        label="E-mail"
                                        required
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                ></v-text-field>
                                <v-select
                                        v-model="select"
                                        :items="items"
                                        :error-messages="selectErrors"
                                        label="Item"
                                        required
                                        @change="$v.select.$touch()"
                                        @blur="$v.select.$touch()"
                                ></v-select>
                                <v-checkbox
                                        v-model="checkbox"
                                        :error-messages="checkboxErrors"
                                        label="Do you agree?"
                                        required
                                        @change="$v.checkbox.$touch()"
                                        @blur="$v.checkbox.$touch()"
                                ></v-checkbox>

                                <v-btn class="mr-4" @click="submit">submit</v-btn>
                                <v-btn @click="clear">clear</v-btn>
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
    export default {
        mixins: [validationMixin],

        validations: {
            name: { required, maxLength: maxLength(10) },
            email: { required, email },
            select: { required },
            checkbox: {
                checked(val) {
                    return val;
                },
            },
        },
        data() {
            return {
                name: "",
                email: "",
                select: null,
                items: ["Item 1", "Item 2", "Item 3", "Item 4"],
                checkbox: false,
                overview: {
                    title: "overview",
                    icon: "info",
                    items: [
                        {
                            title: "Lead. UI/UX Designer at Hexesis",
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
            submit() {
                this.$v.$touch();
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
</style>
