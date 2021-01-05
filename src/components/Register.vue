<template>
  <div class="section">
    <h3 class="title is-3">Register</h3>
    <h2 class="title is-2">Say no to poverty</h2>
    <Form :validation-schema="schema" v-slot="{ errors }" @submit="onSubmit">
      <div class="columns">
        <div class="column is-one-fifth">Your name:</div>
        <div class="column"><Field class="input" name="name" as="input" /></div>
        <span>{{ errors.name }}</span>
      </div>
      <div class="columns">
        <div class="column is-one-fifth">Your email:</div>
        <div class="column"><Field class="input" name="email" as="input" /></div>
        <span>{{ errors.email }}</span>
      </div>
      <div class="columns">
        <div class="column is-one-fifth">Password:</div>
        <div class="column">
          <Field class="input" name="password" as="input" type="password" />
        </div>
        <span>{{ errors.password }}</span>
      </div>
      <div class="columns">
        <div class="column is-one-fifth">Repeat password:</div>
        <div class="column">
          <Field class="input" name="repeatPassword" as="input" type="password" />
        </div>
        <span>{{ errors.repeatPassword }}</span>
      </div>
      <div class="columns">
        <div class="column">
          <button class="button is-link">Register</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import Api from "./Api";
import Session from "@/components/Session";
import router from "@/router";

export default {
  name: "Register",
  components: {
    Field,
    Form
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Your name is required."),
      email: yup
        .string()
        .required("Email is required.")
        .email("That is not a valid email."),
      password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters."),
      repeatPassword: yup
        .string()
        .required("Repeat your password.")
        .oneOf([yup.ref("password")], "Passwords must match")
    });
    return {
      schema
    };
  },
  methods: {
    onSubmit: function(values) {
      Api.post("/api/auth/register/", {
        name: values.name,
        email: values.email,
        password: values.password
      })
        .then(result => {
          Session.update({ ...result.data, active: true });
          router.push({ name: "Home" });
        })
        .catch(error => {
          let message = error?.response?.data;
          if (!message) {
            message = "Error creating a user";
          }

          this.eventBus.emit("show-alert", {
            message: message,
            level: "danger"
          });
          window.x = error;
          console.error(error);
        });
    }
  }
};
</script>
