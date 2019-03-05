<template>
    <div class="invoice mtb-30">

        <InvoiceInsert />

        <div class="invoice__result" v-if="loading">
            <div class="preloader">
                Loading ...
            </div>
            <div class="error pt-15" v-if="error_text">
                {{ error_text }}
            </div>
        </div>

        <div class="invoice__result" v-if="!loading && invoiceItems.length > 0">

            <InvoiceTable />

            <div class="invoice__summary mt-30">
                Summary: <span class="invoice__summary-count">${{ invoiceSummary }}</span>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    import { DATABASE_URL } from '../constants';

    import ClearParams from '../mixins/clear-params';

    import InvoiceTable from "./InvoiceTable";
    import InvoiceInsert from "./InvoiceInsert";

    export default {
        name: "Invoice",
        components: { InvoiceInsert, InvoiceTable },
        mixins: [ ClearParams ],
        data() {
            return {
                error_text: ''
            }
        },
        computed: {
            invoiceItems() {
                return this.$store.state.invoice_items;
            },
            loading() {
                return this.$store.state.loading;
            },
            invoiceSummary() {
                return this.$store.getters.invoiceSummary
            }
        },
        mounted() {
            setTimeout(() => {
                axios.get(DATABASE_URL).then((response) => {
                    this.$store.commit('reloadItems', response.data);
                    this.$store.commit('changeLoading');
                }).catch(() => this.error_text = 'No connection to database. Please check the json-server');
            }, 500)
        }
    }
</script>

<style>
    .invoice {
        box-shadow: 0 3px 15px rgba(0,0,0,.2);
        padding: 15px;
    }
    .invoice__summary {
        font-size: 16px;
    }
    .invoice__summary-count {
        font-weight: 700;
    }
    .preloader, .error {
        font-size: 12px;
    }
    @media only screen and (max-width: 767px) {
        body, .invoice {
            font-size: 12px;
        }
        .invoice__summary {
            font-size: 14px;
        }
    }
</style>