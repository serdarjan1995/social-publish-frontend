<template>
  <div>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="'#mail-server'">
        {{ $t('GeneralSettings.configureMailServer') }}
      </v-tab>
      <v-tab :href="'#email-template'">
        {{ $t('GeneralSettings.emailTemplate') }}
      </v-tab>








      <v-tab-item :key="1" :value="'mail-server'" class="myCustom">
        <form @submit.prevent="submitMailServerForm()" ref="mailServerForm">
          <v-row class="pa-5">
            <v-col cols="12" md="12">
              <h3>
                <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                {{ $t('GeneralSettings.configureMailServer') }}
              </h3>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.emailFrom')" v-model="mailServerForm.emailFrom"/>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.yourName')" v-model="mailServerForm.yourName"/>
            </v-col>
            <v-col cols="12" md="12">
              <span>Email Protocol</span>
              <v-radio-group v-model="mailServerForm.emailProtocol">
                <v-radio :label="$t('GeneralSettings.emailMail')" value="mail"></v-radio>
                <v-radio :label="$t('GeneralSettings.emailSmtp')" value="smtp"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12">
              <h3>
                <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                {{ $t('GeneralSettings.configureSmtp') }}
              </h3>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.smtpServer')" v-model="mailServerForm.smtpServer"/>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.smtpPort')" v-model="mailServerForm.smtpPort"/>
            </v-col>
            <v-col cols="12" md="12">
              <span>{{ $t('GeneralSettings.smtpEncryption') }}</span>
              <v-select :items="encryptions" v-model="mailServerForm.smtpEncryption"/>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.smtpUsername')" v-model="mailServerForm.smtpUsername"/>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field :label="$t('GeneralSettings.smtpPassword')" v-model="mailServerForm.smtpPassword"/>
            </v-col>
            <v-col cols="12" md="12">
              <h3>
                <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                Email notifications
              </h3>
            </v-col>
            <v-col cols="12" md="12">
              <span>{{ $t('GeneralSettings.welcomeEmail') }}</span>
              <v-radio-group v-model="mailServerForm.welcomeEmailStatus">
                <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
                <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12">
              <span>{{ $t('GeneralSettings.paymentSuccess') }}</span>
              <v-radio-group v-model="mailServerForm.paymentSuccessStatus">
                <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
                <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12">
              <span>{{ $t('GeneralSettings.renewalReminders') }}</span>
              <v-radio-group v-model="mailServerForm.renewalRemindersStatus">
                <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
                <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn type="submit" tile color="indigo" dark>
                {{ $t('GeneralSettings.submit') }}
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-tab-item>









      <v-tab-item :key="2" :value="'email-template'" class="myCustom">
        <form @submit.prevent="submitEmailTemplateForm()" ref="emailTemplateForm">
          <v-col cols="12" md="12">
            <v-alert type="info" style="white-space: pre;">{{ $t('GeneralSettings.emailTemplateMessage') }}</v-alert>
          </v-col>
          <v-col cols="12" md="12">
            <h3>
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              {{ $t('GeneralSettings.emailActivation') }}
            </h3>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                :label="$t('GeneralSettings.subject')" v-model="emailTemplateForm.emailActivation" />
          </v-col>
          <v-col cols="12" md="12">
                    <span>
                        {{ $t('GeneralSettings.content') }}
                    </span>
          </v-col>
          <v-col cols="12" md="12">
            <h3>
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              {{ $t('GeneralSettings.welcomeEmail') }}
            </h3>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                :label="$t('GeneralSettings.subject')" v-model="emailTemplateForm.welcomeEmail" />
          </v-col>
          <v-col cols="12" md="12">
                    <span>
                        {{ $t('GeneralSettings.content') }}
                    </span>
          </v-col>
          <v-col cols="12" md="12">
            <h3>
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              {{ $t('GeneralSettings.forgotPassword') }}
            </h3>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                :label="$t('GeneralSettings.subject')" v-model="emailTemplateForm.forgotPassword" />
          </v-col>
          <v-col cols="12" md="12">
                    <span>
                        {{ $t('GeneralSettings.content') }}
                    </span>
          </v-col>
          <v-col cols="12" md="12">
            <h3>
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              {{ $t('GeneralSettings.renewalReminders') }}
            </h3>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                :label="$t('GeneralSettings.subject')" v-model="emailTemplateForm.renewalReminders" />
          </v-col>
          <v-col cols="12" md="12">
                    <span>
                        {{ $t('GeneralSettings.content') }}
                    </span>
          </v-col>
          <v-col cols="12" md="12">
            <h3>
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              {{ $t('GeneralSettings.paymentSuccess') }}
            </h3>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                :label="$t('GeneralSettings.subject')" v-model="emailTemplateForm.paymentSuccess" />
          </v-col>
          <v-col cols="12" md="12">
                    <span>
                        {{ $t('GeneralSettings.content') }}
                    </span>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn type="submit" tile color="indigo" dark>
              {{ $t('GeneralSettings.submit') }}
            </v-btn>
          </v-col>
        </form>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      tabs: 3,
      encryptions: ['None', 'TSL', 'SSL'],
      mailServerForm: {
        emailFrom: '',
        yourName: '',
        emailProtocol: '',
        smtpServer: '',
        smtpPort: '',
        smtpEncryption: '',
        smtpUsername: '',
        smtpPassword: '',
        welcomeEmailStatus: '',
        paymentSuccessStatus: '',
        renewalRemindersStatus: '',
      },
      emailTemplateForm:{
        emailActivation: '',
        welcomeEmail: '',
        forgotPassword: '',
        renewalReminders: '',
        paymentSuccess: '',
      }
    }
  },
  methods: {
    submitMailServerForm() {
      this.$store.dispatch("email_server/updateEmailServerSettings", this.mailServerForm);
    },
    submitEmailTemplateForm(){
      this.$store.dispatch("email_template/updateEmailTemplateSettings", this.emailTemplateForm);
    }
  }
}
</script>