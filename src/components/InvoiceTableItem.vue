<template>
    <div class="invoice__table-row">
        <div class="r colp-xs-5">

            <div class="col-25">
                <div class="invoice__table-col">
                    {{ invoice_item.name }}
                </div>
            </div>

            <div class="col-25">
                <div class="invoice__table-col">
                    {{ invoice_item.quantity }}
                    <input
                        v-if="invoice_item.is_editing"
                        v-model="edit.quantity"
                        @input="$v.edit.quantity.$touch()"
                        @keyup.enter="invoiceSave(invoice_item)"
                        :class="{'invalid': $v.edit.quantity.$error}"
                        class="invoice__edit-input"
                        type="number"
                        min="0"
                        title="Change value"
                    />
                </div>
            </div>

            <div class="col-25">
                <div class="invoice__table-col">
                    ${{ invoice_item.price }}
                    <input
                        v-model="edit.price"
                        v-if="invoice_item.is_editing"
                        @input="$v.edit.price.$touch()"
                        @keyup.enter="invoiceSave(invoice_item)"
                        :class="{'invalid': $v.edit.price.$error}"
                        class="invoice__edit-input"
                        type="number"
                        min="0"
                        title="Change value"
                    />
                </div>
            </div>

            <div class="col-25">
                <div class="invoice__table-col t-r" v-if="!invoice_item.is_editing">
                    <button
                        @click="invoiceDelete(invoice_item)"
                        class="btn btn-icon btn-icon--delete"
                        title="Delete"
                    ></button>
                    <button
                        @click="invoiceEdit(invoice_item)"
                        class="btn btn-icon btn-icon--edit"
                        title="Edit"
                    ></button>
                </div>
                <div class="invoice__table-col t-r" v-if="invoice_item.is_editing">
                    <button
                        @click="invoiceSave(invoice_item)"
                        class="btn btn-icon btn-icon--save"
                        title="Save"
                    ></button>
                    <button
                        @click="invoiceCancel(invoice_item)"
                        class="btn btn-icon btn-icon--cancel"
                        title="Cancel"
                    ></button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';

    import ClearParams from '../mixins/clear-params';

    export default {
        name: "InvoiceTableItem",
        props: {
            invoice_item: Object
        },
        mixins: [ ClearParams ],
        data() {
            return {
                edit: {
                    quantity: null,
                    price: null
                }
            }
        },
        validations: {
            edit: {
                quantity: {
                    required,
                    positive: value => value >= 0
                },
                price: {
                    required,
                    positive: value => value >= 0
                }
            }
        },
        methods: {
            invoiceEdit(invoice_item) {
                this.$store.commit('singleEditing');

                this.edit.quantity = invoice_item.quantity;
                this.edit.price = invoice_item.price;

                invoice_item = {
                    ...invoice_item,
                    is_editing: !invoice_item.is_editing
                }

                this.$store.commit('changeInvoiceItemState', invoice_item);
            },
            invoiceSave(invoice_item) {
                if (!this.edit.price || !this.edit.quantity) return;

                if (!this.$v.edit.price.$error && !this.$v.edit.quantity.$error) {
                    invoice_item = {
                        ...invoice_item,
                        price: this.edit.price,
                        quantity: this.edit.quantity,
                        is_editing: !invoice_item.is_editing
                    }
                    this.$store.dispatch('putInvoiceItem', invoice_item).then(() => {
                        this.clearParams(this.edit);
                        this.$v.$reset();
                    });
                }

            },
            invoiceCancel(invoice_item) {
                invoice_item = {
                    ...invoice_item,
                    is_editing: !invoice_item.is_editing
                }
                this.$store.commit('changeInvoiceItemState', invoice_item);
                this.$v.$reset();
                this.clearParams(this.edit);
            },
            invoiceDelete(invoice_item) {
                this.$store.dispatch('deleteInvoiceItem', invoice_item);
            },
        }
    }
</script>

<style>
    .invoice__table-row:hover {
        background-color: var(--color-gray-light);
    }
    .invoice__edit-input {
        position: absolute;
        left: 0;
        width: 100%;
        border: 1px solid var(--color-gray);
    }
    .invoice__edit-input.invalid {
        border-color: var(--color-red);
    }
</style>