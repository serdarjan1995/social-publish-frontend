<template v-if="1">
  <v-form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.general') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.environment') }}</span>
        <v-radio-group v-model="form.environment">
          <v-radio :label="$t('GeneralSettings.live')" value="live"></v-radio>
          <v-radio :label="$t('GeneralSettings.sandbox')" value="sandbox"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="6">
        <span>{{ $t('GeneralSettings.currency') }}</span>
        <v-text-field v-model="form.currency" />
      </v-col>
      <v-col cols="12" md="6">
        <span>{{ $t('GeneralSettings.symbol') }}</span>
        <v-text-field v-model="form.symbol" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.paypalOneTime') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.paypalOneTimeStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.clientId') }}</span>
        <v-text-field v-model="form.paypalOneTimeClientID" />
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.clientSecretKey') }}</span>
        <v-text-field v-model="form.paypalOneTimeSecretKey" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.paypalRecurring') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.payPalRecurringStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('GeneralSettings.webhookUrl') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/paypal_recurring/webhook"
                                                                      target="_blank">https://example.com/paypal_recurring/webhook</a><br/>
          <strong>{{ $t('GeneralSettings.requiredEvents') }}:</strong> {{ $t('GeneralSettings.paypalRequiredMessage') }}
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.webhookId') }}</span>
        <v-text-field v-model="form.payPalRecurringWebHookID" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.paytrOneTime') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.paytr') }}</span>
        <v-radio-group v-model="form.payTRStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.paytrId') }}</span>
        <v-text-field v-model="form.payTRMerchantID" />
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.paytrKey') }}</span>
        <v-text-field v-model="form.payTRMerchantKey" />
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.paytrSalt') }}</span>
        <v-text-field v-model="form.payTRMerchantSalt" />
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.testMode') }}</span>
        <v-radio-group v-model="form.testMode" >
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.stripeOneTime') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.stripeOneTimeStatus" >
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.publishableKey') }}</span>
        <v-text-field v-model="form.stripeOnePublishableKey" />
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.secretKey') }}</span>
        <v-text-field v-model="form.stripeOneSecretKey" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.stripeRecurring') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.stripeRecurringStatus" >
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('GeneralSettings.webhookUrl') }}:</strong> <a target="_blank" style="color:White"
                                                                      href="https://example.com/stripe_recurring/webhook">https://example.com/stripe_recurring/webhook</a><br/>
          <strong>{{ $t('GeneralSettings.requiredEvents') }}:</strong> {{ $t('GeneralSettings.stripeRequiredMessage') }}
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.signingSecret') }}</span>
        <v-text-field v-model="form.stripeRecurringSigingSecret" />
      </v-col>
      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('GeneralSettings.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      dates: ['d/m/Y', 'd M, Y', 'm/d/Y', 'Y-m-d'],
      datetimes: ['d/m/Y g:i A', 'm/d/Y g:i A', 'd/m/Y H:i', 'm/d/Y H:i', 'Y-m-d g:i A', 'Y-m-d H:i'],
      form: {
        environment: '',
        currency: '',
        symbol: '',
        paypalOneTimeStatus: '',
        paypalOneTimeClientID: '',
        paypalOneTimeSecretKey: '',
        payPalRecurringStatus: '',
        payPalRecurringWebHookID: '',
        payTRStatus: '',
        payTRMerchantID: '',
        payTRMerchantKey: '',
        payTRMerchantSalt: '',
        testMode: '',
        stripeOneTimeStatus: '',
        stripeOnePublishableKey: '',
        stripeOneSecretKey: '',
        stripeRecurringStatus: '',
        stripeRecurringSigingSecret: '',
      },
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("payment/updatePayments", this.form);
    }
  }
};
</script>
