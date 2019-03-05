<template>
    <div class="invoice__table mt-40">

        <div class="invoice__table-head">
            <div class="r colp-xs-5">
                <div class="col-25">
                    <div class="invoice__table-col">
                        Name
                    </div>
                </div>
                <div class="col-25">
                    <div class="invoice__table-col">
                        Quantity
                    </div>
                </div>
                <div class="col-25">
                    <div class="invoice__table-col">
                        Price
                    </div>
                </div>
            </div>
        </div>

        <div class="invoice__table-body">
            <InvoiceTableItem :invoice_item="item" v-for="item in invoiceItems" :key="item.id" />
        </div>

        <div class="error pt-20" v-if="error">
            {{ error }}
        </div>

    </div>
</template>

<script>
    import InvoiceTableItem from './InvoiceTableItem';

    export default {
        name: "InvoiceTable",
        components: { InvoiceTableItem },
        computed: {
            invoiceItems() {
                return this.$store.state.invoice_items
            },
            error() {
                return this.$store.state.error;
            }
        }
    }
</script>

<style>
    .invoice__table-col {
        padding: 15px 0;
        position: relative;
    }
    .invoice__table-head {
        border-bottom: 2px solid var(--color-gray);
    }
</style>